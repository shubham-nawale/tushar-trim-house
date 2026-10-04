"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { submitLoginAction } from "@/app/admin/login/actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@tushartrimhouse.com");
  const [password, setPassword] = useState("tushartrimhouse");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("password", password);
      const result = await submitLoginAction(formData);

      if (!result?.ok) {
        setError(result?.error || "Invalid admin credentials.");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-4 py-10 text-[#F5F2EA]">
      <div className="w-full max-w-md rounded-[30px] border border-white/10 bg-[#141414] p-6 md:p-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#A8A39A]">Admin access</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tighter">Login</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block space-y-2 text-sm text-[#A8A39A]">
            <span>Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none"
              placeholder="admin@tushartrimhouse.com"
              required
            />
          </label>
          <label className="block space-y-2 text-sm text-[#A8A39A]">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0B0B0B] px-4 py-3 text-[#F5F2EA] outline-none"
              placeholder="••••••••"
              required
            />
          </label>

          {error ? (
            <div className="rounded-xl border border-[#F87171]/40 bg-[#F87171]/10 px-3 py-2 text-sm text-[#FCA5A5]">
              {error}
            </div>
          ) : null}

          <Button type="submit" className="w-full rounded-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-5 text-center text-sm text-[#A8A39A]">
          <Link href="/" className="text-[#C9A66B]">Back to homepage</Link>
        </div>
      </div>
    </main>
  );
}