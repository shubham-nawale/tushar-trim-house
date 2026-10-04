import Link from "next/link";

import { Button } from "@/components/ui/button";
import { signOutAdminAction } from "@/lib/admin-auth";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Tushar Trim House</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tighter">Dashboard</h1>
          </div>
          <nav className="hidden items-center gap-5 text-sm text-[#A8A39A] md:flex">
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/orders">Bookings</Link>
            <Link href="/admin/services">Services</Link>
            <Link href="/admin/settings">Settings</Link>
            <form action={signOutAdminAction}>
              <Button type="submit" variant="secondary" className="rounded-full px-4">
                Logout
              </Button>
            </form>
          </nav>
        </header>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            ["Today's Bookings", "14"],
            ["Completed", "8"],
            ["Upcoming", "4"],
            ["Cancelled", "2"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[22px] border border-white/10 bg-[#141414] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#A8A39A]">{label}</p>
              <p className="mt-3 text-3xl font-medium text-[#F5F2EA]">{value}</p>
            </div>
          ))}
        </div>

        <section className="rounded-[30px] border border-white/10 bg-[#141414] p-5 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-medium">Live status</h2>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8A39A]">Today</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[26px] border border-white/10 bg-[#191919] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Chair 01</h3>
                <span className="text-[#F87171]">🔴 IN SERVICE</span>
              </div>
              <div className="mt-6 space-y-2 text-sm text-[#A8A39A]">
                <p className="text-lg text-[#F5F2EA]">Rahul</p>
                <p>Haircut + Beard</p>
                <p>12:30 PM – 1:15 PM</p>
              </div>
              <Button className="mt-6 w-full rounded-full">Complete</Button>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-[#191919] p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium">Chair 02</h3>
                <span className="text-[#4ADE80]">🟢 AVAILABLE</span>
              </div>
              <div className="mt-10 text-sm text-[#A8A39A]">
                <p>Available for booking</p>
              </div>
              <Button variant="secondary" className="mt-6 w-full rounded-full">Block chair</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
