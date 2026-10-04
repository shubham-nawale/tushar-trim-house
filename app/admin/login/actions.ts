"use server";

import { signInAdminAction } from "@/lib/admin-auth";

export async function submitLoginAction(formData: FormData) {
  await signInAdminAction(formData);
}
