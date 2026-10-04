import { Button } from "@/components/ui/button";

export default function AdminBookingsPage() {
  const bookings = [
    { time: "12:00", name: "Rahul", service: "Haircut", chair: "Chair 01", status: "IN SERVICE" },
    { time: "12:30", name: "Amit", service: "Beard", chair: "Chair 02", status: "RESERVED" },
    { time: "1:15", name: "Sagar", service: "Haircut + Beard", chair: "Chair 01", status: "RESERVED" },
  ];

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Bookings</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tighter">Today</h1>
          </div>
        </div>

        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={`${booking.time}-${booking.name}`} className="rounded-3xl border border-white/10 bg-[#141414] p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1 text-sm text-[#A8A39A]">
                  <p className="text-lg font-medium text-[#F5F2EA]">{booking.time}</p>
                  <p>{booking.name}</p>
                  <p>{booking.service}</p>
                  <p>{booking.chair}</p>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <span className="text-[#C9A66B]">{booking.status}</span>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm">Mark Arrived</Button>
                    <Button size="sm">Start Service</Button>
                    <Button variant="secondary" size="sm">Complete</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
