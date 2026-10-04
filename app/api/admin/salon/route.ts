import { NextResponse } from "next/server";

import { hasAdminAccess } from "@/lib/admin-auth";
import { isSupabaseConfigured, supabaseAdmin } from "@/lib/supabase";
import { SALON_OPENING_TIME, SALON_CLOSING_TIME } from "@/lib/reservations";

export async function GET() {
  const isAuthorized = await hasAdminAccess();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.from("salons").select("*").limit(1).single();
      if (!error && data) {
        return NextResponse.json({ salon: data });
      }
    } catch {
      // fallthrough to fallback
    }
  }

  return NextResponse.json({ salon: { opening_time: SALON_OPENING_TIME, closing_time: SALON_CLOSING_TIME } });
}

export async function PATCH(request: Request) {
  const isAuthorized = await hasAdminAccess();
  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { opening_time, closing_time } = body;
    if (!opening_time || !closing_time) {
      return NextResponse.json({ error: "Missing times" }, { status: 400 });
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        // update the first salon row
        const { data, error } = await supabaseAdmin.from("salons").update({ opening_time, closing_time }).limit(1);
        if (!error) {
          return NextResponse.json({ ok: true, salon: data?.[0] ?? null });
        }
      } catch {
        // fallback
      }
    }

    // fallback: accept but do not persist
    return NextResponse.json({ ok: true, salon: { opening_time, closing_time } });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
