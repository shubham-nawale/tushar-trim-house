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

export async function signInAdminAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    throw new Error("Please enter your admin email and password.");
  }

  const fallbackMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (fallbackMode) {
    if (email !== DEMO_ADMIN_EMAIL || password !== DEMO_ADMIN_PASSWORD) {
      throw new Error("Invalid admin credentials.");
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, "true", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    redirect("/admin/dashboard");
  }

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || "Invalid admin credentials.");
  }

  redirect("/admin/dashboard");
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
