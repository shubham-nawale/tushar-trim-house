'use client';

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function BookingPage() {
  const services = useMemo(() => getServices(), []);
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [reservationDate, setReservationDate] = useState(new Date().toISOString().slice(0, 10));
  const [reservationTime, setReservationTime] = useState("13:15");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedService = services.find((service) => service.id === serviceId) ?? services[0];

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerPhone,
          serviceId,
          reservationDate,
          reservationTime,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        setError(payload.error || "काहीतरी चूक झाली.");
        return;
      }

      router.push(
        `/booking/confirmation?code=${encodeURIComponent(payload.reservation.booking_code)}&phone=${encodeURIComponent(customerPhone)}`
      );
    } catch {
      setError("Booking request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">तुमची वेळ</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tighter">एका मिनिटात बुक करा</h1>
          </div>
          <Button asChild variant="secondary" className="rounded-full px-5">
            <Link href="/availability">उपलब्धता पाहा</Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={handleSubmit} className="rounded-[30px] border border-white/10 bg-[#141414] p-5 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm text-[#A8A39A]">
                <span>नाव *</span>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none placeholder:text-[#A8A39A]"
                  placeholder="तुमचे नाव लिहा"
                  required
                />
              </label>
              <label className="space-y-2 text-sm text-[#A8A39A]">
                <span>मोबाईल क्रमांक *</span>
                <input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none placeholder:text-[#A8A39A]"
                  placeholder="१०-अंकी मोबाइल"
                  pattern="[0-9]{10}"
                  required
                />
              </label>
            </div>

            <div className="mt-5 space-y-5">
              <label className="block space-y-2 text-sm text-[#A8A39A]">
                <span>सेवा *</span>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} • {formatCurrency(service.price)}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 text-sm text-[#A8A39A]">
                  <span>तारीख *</span>
                  <input
                    type="date"
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm text-[#A8A39A]">
                  <span>वेळ *</span>
                  <select
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none"
                  >
                    <option value="13:15">१:१५ PM</option>
                    <option value="13:30">१:३० PM</option>
                    <option value="14:00">२:०० PM</option>
                    <option value="14:30">२:३० PM</option>
                    <option value="15:00">३:०० PM</option>
                  </select>
                </label>
              </div>
            </div>

            {error ? (
              <div className="mt-5 rounded-xl border border-[#F87171]/30 bg-[#F87171]/10 px-3 py-3 text-sm text-[#FCA5A5]">
                {error}
              </div>
            ) : null}

            <Button type="submit" size="lg" className="mt-6 w-full rounded-full text-base" disabled={loading}>
              {loading ? "बुकिंगची पुष्टी केली जात आहे..." : "बुकिंगची पुष्टी करा"}
            </Button>
          </form>

          <aside className="rounded-[30px] border border-[#C9A66B]/20 bg-[#C9A66B]/5 p-5 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">अपॉइंटमेंट सारांश</p>
            <div className="mt-6 space-y-4 text-sm text-[#F5F2EA]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[#A8A39A]">सेवा</span>
                <span>{selectedService?.name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[#A8A39A]">कालावधी</span>
                <span>{selectedService?.duration_minutes} मिनिटे</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[#A8A39A]">तारीख</span>
                <span>{reservationDate}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[#A8A39A]">वेळ</span>
                <span>{new Date(`2024-01-01T${reservationTime}:00`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A8A39A]">अंदाजे खर्च</span>
                <span className="text-[#C9A66B]">{selectedService ? formatCurrency(selectedService.price) : "—"}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
