'use client';

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { getBookingLookup } from "@/lib/reservations";

export default function MyBookingPage() {
  const [bookingCode, setBookingCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [booking, setBooking] = useState<any>(null);

  const handleLookup = () => {
    const result = getBookingLookup({ bookingCode, mobile });
    setBooking(result ?? null);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">माझी बुकिंग</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tighter">तुमची बुकिंग तपासा</h1>

        <div className="mt-8 rounded-[28px] border border-white/10 bg-[#141414] p-5 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm text-[#A8A39A]">
              <span>बुकिंग आयडी</span>
              <input
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none"
                placeholder="TTH-10001"
              />
            </label>
            <label className="block space-y-2 text-sm text-[#A8A39A]">
              <span>मोबाईल क्रमांक</span>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none"
                placeholder="१०-अंकी मोबाइल"
              />
            </label>
          </div>

          <Button onClick={handleLookup} className="mt-5 w-full rounded-full">
            बुकिंग पाहा
          </Button>
        </div>

        {booking ? (
          <div className="mt-8 rounded-[28px] border border-white/10 bg-[#141414] p-5 md:p-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">बुकिंग स्थिती</p>
            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between"><span className="text-[#A8A39A]">स्थिती</span><span className="text-[#C9A66B]">{booking.status}</span></div>
              <div className="flex items-center justify-between"><span className="text-[#A8A39A]">सेवा</span><span>{booking.service_id}</span></div>
              <div className="flex items-center justify-between"><span className="text-[#A8A39A]">तारीख</span><span>{new Date(booking.start_time).toLocaleDateString("mr-IN")}</span></div>
              <div className="flex items-center justify-between"><span className="text-[#A8A39A]">वेळ</span><span>{new Date(booking.start_time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span></div>
              <div className="flex items-center justify-between"><span className="text-[#A8A39A]">कुर्सी</span><span>{booking.chair_id}</span></div>
            </div>
            <Button variant="secondary" className="mt-6 w-full rounded-full">बुकिंग रद्द करा</Button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
