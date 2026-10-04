import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { hasAdminAccess } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Try to detect the requested path from headers so the login page itself
  // is not redirected back to itself. Fallbacks are conservative.
  const hdrs = headers();
  const invokePath = String(hdrs.get("x-invoke-path") || hdrs.get("x-nextjs-pathname") || hdrs.get("x-original-uri") || "");

  const isLoginRequest = invokePath.includes("/admin/login");

  const isAllowed = await hasAdminAccess();

  if (!isAllowed && !isLoginRequest) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
