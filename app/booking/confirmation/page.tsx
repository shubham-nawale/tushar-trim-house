"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams?: Promise<{ code?: string; phone?: string }>;
}) {
  const [booking, setBooking] = useState<any>(null);
  const [code, setCode] = useState("TTH-10001");
  const [error, setError] = useState("");

  useEffect(() => {
    const resolveCode = async () => {
      if (!searchParams) {
        return;
      }

      const params = await searchParams;
      const resolvedCode = params?.code ?? "TTH-10001";
      const resolvedPhone = params?.phone ?? "";
      setCode(resolvedCode);

      if (!resolvedPhone) {
        setError("Booking details could not be loaded.");
        return;
      }

      try {
        const response = await fetch(
          `/api/bookings?code=${encodeURIComponent(resolvedCode)}&phone=${encodeURIComponent(resolvedPhone)}`
        );

        if (response.ok) {
          const payload = await response.json();
          setBooking(payload.booking ?? null);
          setError("");
          return;
        }

        const payload = await response.json().catch(() => ({}));
        setError(payload.error || "Booking details could not be loaded.");
      } catch {
        setError("Booking details could not be loaded.");
      }
    };

    resolveCode();
  }, [searchParams]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-4 py-16 text-[#F5F2EA]">
      <div className="w-full max-w-xl rounded-4xl border border-white/10 bg-[#141414] p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/10 text-[#4ADE80]">
          <CheckCircle2 size={40} />
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">
          Reservation confirmed
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tighter">
          YOUR SLOT IS RESERVED
        </h1>
        <p className="mt-4 text-[#A8A39A]">Tushar Trim House</p>

        {error ? (
          <div className="mt-6 rounded-2xl border border-[#F87171]/30 bg-[#F87171]/10 px-3 py-3 text-sm text-[#FCA5A5]">
            {error}
          </div>
        ) : null}

        <div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-[#191919] p-5 text-left text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#A8A39A]">Booking ID</span>
            <span className="font-medium">
              {booking?.booking_code ?? code}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A8A39A]">Guest</span>
            <span>{booking?.customer_name ?? "Rahul"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A8A39A]">Service</span>
            <span>{booking?.service_id ?? "Haircut + Beard"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A8A39A]">Date</span>
            <span>
              {booking
                ? new Date(booking.start_time).toLocaleDateString("en-IN")
                : "Today"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A8A39A]">Chair</span>
            <span>{booking?.chair_id ?? "Chair 01"}</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-[#A8A39A]">
          Please arrive 5 minutes before your appointment.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1 rounded-full">
            <Link href="/my-booking">VIEW BOOKING</Link>
          </Button>
          <Button asChild variant="secondary" className="flex-1 rounded-full">
            <Link href="/">BACK TO HOME</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
