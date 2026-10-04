import { Button } from "@/components/ui/button";

export default function AdminServicesPage() {
  const services = [
    { name: "Haircut", price: 150, duration: 30, active: true },
    { name: "Beard Trim", price: 100, duration: 20, active: true },
    { name: "Haircut + Beard", price: 250, duration: 45, active: true },
    { name: "Haircut + Styling", price: 300, duration: 60, active: true },
  ];

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Services</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tighter">Manage offerings</h1>
          </div>
          <Button className="rounded-full">Add service</Button>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="rounded-3xl border border-white/10 bg-[#141414] p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-medium">{service.name}</h2>
                  <p className="mt-1 text-sm text-[#A8A39A]">₹{service.price} • {service.duration} minutes</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#4ADE80]">{service.active ? "ACTIVE" : "INACTIVE"}</span>
                  <Button variant="secondary" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
