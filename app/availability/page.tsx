import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getChairStatus } from "@/lib/mock-data";

export default function AvailabilityPage() {
  const chairs = getChairStatus();

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">लाइव्ह उपलब्धता</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tighter">कुर्सी स्थिती</h1>
          </div>
          <Button asChild variant="secondary" className="rounded-full px-5">
            <Link href="/booking">आता बुक करा</Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {chairs.map((chair) => (
            <div key={chair.id} className="rounded-[28px] border border-white/10 bg-[#141414] p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-medium">{chair.name}</h2>
                <span className={chair.status === "AVAILABLE" ? "text-[#4ADE80]" : chair.status === "IN_SERVICE" ? "text-[#F87171]" : "text-[#C9A66B]"}>
                  {chair.status === "AVAILABLE" ? "🟢 उपलब्ध" : chair.status === "IN_SERVICE" ? "🔴 सेवा सुरु" : "🟡 आरक्षित"}
                </span>
              </div>
              <div className="mt-6 text-[#A8A39A]">
                {chair.status === "AVAILABLE" ? (
                  <p>बुकिंगसाठी उपलब्ध</p>
                ) : (
                  <>
                    <p className="text-lg text-[#F5F2EA]">{chair.customer}</p>
                    <p>{chair.service}</p>
                    <p>{chair.timeRange}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
