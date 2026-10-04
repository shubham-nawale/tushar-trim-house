"use server";

import { signInAdminAction } from "@/lib/admin-auth";

export async function submitLoginAction(formData: FormData) {
  return await signInAdminAction(formData);
}
