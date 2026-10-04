"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getSupabaseServerClient } from "@/lib/supabase-server";

const DEMO_ADMIN_EMAIL = process.env.DEMO_ADMIN_EMAIL ?? "admin@tushartrimhouse.com";
const DEMO_ADMIN_PASSWORD = process.env.DEMO_ADMIN_PASSWORD ?? "tushartrimhouse";
const ADMIN_SESSION_COOKIE = "tth_admin_demo";

export async function hasAdminAccess() {
  const cookieStore = await cookies();

  if (cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "true") {
    return true;
  }

  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    return !error && Boolean(data.user);
  } catch {
    return false;
  }
}

export async function signInAdminAction(
  formData: FormData,
): Promise<{ ok: boolean; error?: string }> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, error: "Please enter your admin email and password." };
  }

  // Allow demo credentials in local/demo mode
  if (email === DEMO_ADMIN_EMAIL.toLowerCase() && password === DEMO_ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, "true", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return { ok: true };
  }

  const supabaseConfigured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (supabaseConfigured) {
    try {
      const supabase = await getSupabaseServerClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { ok: false, error: error.message || "Invalid admin credentials." };
      }

      return { ok: true };
    } catch {
      return { ok: false, error: "Authentication service unavailable." };
    }
  }

  return { ok: false, error: "Invalid admin credentials." };
}

export async function signOutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);

  try {
    const supabase = await getSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    // silent fallback for non-configured Supabase env
  }

  redirect("/admin/login");
}