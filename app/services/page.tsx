import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function ServicesPage() {
  const services = getServices();

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Services</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tighter">Precision grooming</h1>
          </div>
          <Button asChild variant="secondary" className="rounded-full px-5">
            <Link href="/booking">Reserve now</Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="rounded-[28px] border border-white/10 bg-[#141414] p-6">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full border border-[#C9A66B]/25 bg-[#C9A66B]/10 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-[#C9A66B]">Premium</span>
                <span className="text-xl font-semibold">{formatCurrency(service.price)}</span>
              </div>
              <h2 className="text-2xl font-medium">{service.name}</h2>
              <p className="mt-2 text-sm text-[#A8A39A]">{service.description}</p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-[#A8A39A]">
                <span>{service.duration_minutes} min</span>
                <span className="text-[#C9A66B]">Booked instantly</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
