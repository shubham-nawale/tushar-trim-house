import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { hasAdminAccess } from "@/lib/admin-auth";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}