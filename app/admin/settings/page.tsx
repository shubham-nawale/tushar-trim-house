"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  const [opening, setOpening] = useState("");
  const [closing, setClosing] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/salon");
      if (!res.ok) throw new Error("failed");
      const json = await res.json();
      const salon = json.salon ?? {};
      setOpening((salon.opening_time ?? salon.opening_time ?? "").slice(0, 5));
      setClosing((salon.closing_time ?? salon.closing_time ?? "").slice(0, 5));
    } catch (e) {
      // fallback empty
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/salon", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ opening_time: opening + ":00", closing_time: closing + ":00" }),
      });
      if (res.ok) {
        await load();
      }
    } catch (e) {
      // ignore
    }
    setSaving(false);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-4 py-8 text-[#F5F2EA] sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Settings</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tighter">सॅलॉन वेळा</h1>
        </div>

        <section className="rounded-[20px] border border-white/10 bg-[#141414] p-6">
          {loading ? (
            <p className="text-[#A8A39A]">लोड करत आहे…</p>
          ) : (
            <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col">
                <span className="mb-2 text-sm text-[#A8A39A]">ओपनिंग टाइम</span>
                <input type="time" value={opening} onChange={(e) => setOpening(e.target.value)} className="rounded-md border bg-[#0B0B0B] px-3 py-2 text-[#F5F2EA]" />
              </label>

              <label className="flex flex-col">
                <span className="mb-2 text-sm text-[#A8A39A]">क्लोजिंग टाइम</span>
                <input type="time" value={closing} onChange={(e) => setClosing(e.target.value)} className="rounded-md border bg-[#0B0B0B] px-3 py-2 text-[#F5F2EA]" />
              </label>

              <div className="sm:col-span-2">
                <Button type="submit" className="rounded-full" disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </Button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
