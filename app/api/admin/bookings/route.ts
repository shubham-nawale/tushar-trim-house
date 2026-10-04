import { NextResponse } from "next/server";

import { hasAdminAccess } from "@/lib/admin-auth";
import { getReservationsForAdmin, updateReservationStatus } from "@/lib/reservations";

export async function GET() {
  const isAuthorized = await hasAdminAccess();

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await getReservationsForAdmin();
  return NextResponse.json({ bookings });
}

export async function PATCH(request: Request) {
  const isAuthorized = await hasAdminAccess();

  if (!isAuthorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing booking ID or status." }, { status: 400 });
    }

    const updated = await updateReservationStatus(id, status);

    if (!updated) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid update payload." }, { status: 400 });
  }
}
