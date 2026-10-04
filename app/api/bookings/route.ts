import { NextResponse } from "next/server";

import {
  createReservationRecord,
  findReservationByCode,
  validateReservationInput,
} from "@/lib/reservations";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const result = await createReservationRecord({
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      serviceId: payload.serviceId,
      reservationDate: payload.reservationDate,
      reservationTime: payload.reservationTime,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      reservation: result.reservation,
      message: result.message,
    });
  } catch {
    return NextResponse.json({ error: "Invalid booking payload." }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingCode = searchParams.get("code") ?? "";
  const mobile = searchParams.get("phone") ?? "";

  if (!bookingCode || !mobile) {
    return NextResponse.json({ error: "Missing booking lookup values." }, { status: 400 });
  }

  const result = await findReservationByCode({ bookingCode, mobile });

  if (!result) {
    return NextResponse.json({ error: "No booking found." }, { status: 404 });
  }

  return NextResponse.json({ booking: result });
}
