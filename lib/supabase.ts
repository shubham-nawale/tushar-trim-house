import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

export const supabaseAdmin: SupabaseClient | null =
  isSupabaseConfigured && Boolean(serviceRoleKey)
    ? createClient(url!, serviceRoleKey!, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

export function getSupabaseErrorMessage() {
  return "Something went wrong. Please try again.";
}
