import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTime(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

export function formatBookingCode(value: number) {
  return `TTH-${String(value).padStart(5, "0")}`;
}

export function sanitizePhone(value: string) {
  return value.replace(/[^\d+]/g, "").slice(0, 15);
}

export function validatePhone(phone: string) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ""));
}
