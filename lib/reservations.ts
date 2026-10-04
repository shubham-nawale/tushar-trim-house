import { isSupabaseConfigured, supabase, supabaseAdmin } from "@/lib/supabase";
import { validatePhone } from "@/lib/utils";
import type { Reservation } from "@/types";

import { defaultChairs, defaultServices, mockReservations } from "@/lib/mock-data";

export const SALON_OPENING_TIME = "09:00";
export const SALON_CLOSING_TIME = "20:00";

export type ReservationInput = {
  customerName: string;
  customerPhone: string;
  serviceId: string;
  reservationDate: string;
  reservationTime: string;
};

export function listAvailableServices() {
  return defaultServices.filter((service) => service.active);
}

export function validateReservationInput(input: ReservationInput) {
  const service = defaultServices.find((item) => item.id === input.serviceId && item.active);

  if (!service) {
    return { valid: false, error: "This service is no longer available." };
  }

  if (!input.customerName.trim() || input.customerName.trim().length < 2) {
    return { valid: false, error: "Please enter a valid customer name." };
  }

  if (!validatePhone(input.customerPhone)) {
    return { valid: false, error: "Please enter a valid 10-digit mobile number." };
  }

  const start = new Date(`${input.reservationDate}T${input.reservationTime}:00`);
  const end = new Date(start.getTime() + service.duration_minutes * 60_000);

  if (Number.isNaN(start.getTime())) {
    return { valid: false, error: "Please select a valid date and time." };
  }

  const [openHour, openMinute] = SALON_OPENING_TIME.split(":").map(Number);
  const [closeHour, closeMinute] = SALON_CLOSING_TIME.split(":").map(Number);
  const openingTimeMinutes = openHour * 60 + openMinute;
  const closingTimeMinutes = closeHour * 60 + closeMinute;
  const selectedMinutes = start.getHours() * 60 + start.getMinutes();

  if (selectedMinutes < openingTimeMinutes || end.getHours() * 60 + end.getMinutes() > closingTimeMinutes) {
    return { valid: false, error: "Selected time is outside salon hours." };
  }

  const overlappingReservations = mockReservations.filter((reservation) => {
    const reservationStart = new Date(reservation.start_time);
    const reservationEnd = new Date(reservation.end_time);
    return reservationStart < end && reservationEnd > start;
  });

  if (overlappingReservations.length >= 2) {
    return { valid: false, error: "This slot was just booked. Please choose another time." };
  }

  const availableChairs = defaultChairs.filter((chair) => chair.active);
  const assignedChair = availableChairs.find((chair) => {
    return !overlappingReservations.some((reservation) => reservation.chair_id === chair.id);
  });

  if (!assignedChair) {
    return { valid: false, error: "This slot was just booked. Please choose another time." };
  }

  return {
    valid: true,
    service,
    chair: assignedChair,
    start,
    end,
    customerName: input.customerName.trim(),
    customerPhone: input.customerPhone.replace(/\s+/g, ""),
  };
}

export function buildBookingCode() {
  return `TTH-${Math.floor(10000 + Math.random() * 90000)}`;
}

export async function createReservationRecord(input: ReservationInput) {
  const validation = validateReservationInput(input);

  if (!validation.valid || !validation.service || !validation.chair || !validation.start || !validation.end) {
    return { ok: false, error: validation.error || "Something went wrong." };
  }

  const bookingCode = buildBookingCode();
  const reservation = {
    id: `res-${Date.now()}`,
    booking_code: bookingCode,
    customer_name: validation.customerName,
    customer_phone: validation.customerPhone,
    service_id: validation.service.id,
    chair_id: validation.chair.id,
    start_time: validation.start.toISOString(),
    end_time: validation.end.toISOString(),
    status: "RESERVED" as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("reservations")
        .insert({
          booking_code: bookingCode,
          customer_name: validation.customerName,
          customer_phone: validation.customerPhone,
          service_id: validation.service.id,
          chair_id: validation.chair.id,
          start_time: validation.start.toISOString(),
          end_time: validation.end.toISOString(),
          status: "RESERVED",
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        ok: true,
        reservation: data as Reservation,
        message: "Booking confirmed.",
      };
    } catch {
      mockReservations.push(reservation);
      return {
        ok: true,
        reservation,
        message: "Booking confirmed.",
      };
    }
  }

  mockReservations.push(reservation);

  return {
    ok: true,
    reservation,
    message: "Booking confirmed.",
  };
}

export function createMockReservation(input: ReservationInput) {
  const validation = validateReservationInput(input);

  if (!validation.valid || !validation.service || !validation.chair || !validation.start || !validation.end) {
    return { ok: false, error: validation.error || "Something went wrong." };
  }

  const bookingCode = buildBookingCode();
  const reservation = {
    id: `res-${Date.now()}`,
    booking_code: bookingCode,
    customer_name: validation.customerName,
    customer_phone: validation.customerPhone,
    service_id: validation.service.id,
    chair_id: validation.chair.id,
    start_time: validation.start.toISOString(),
    end_time: validation.end.toISOString(),
    status: "RESERVED" as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockReservations.push(reservation);

  return {
    ok: true,
    reservation,
    message: "Booking confirmed.",
  };
}

export async function findReservationByCode(record: { bookingCode: string; mobile: string }) {
  const normalizedCode = record.bookingCode.trim().toUpperCase();
  const normalizedMobile = record.mobile.replace(/\s+/g, "");

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("booking_code", normalizedCode)
        .eq("customer_phone", normalizedMobile)
        .maybeSingle();

      if (!error && data) {
        return data as Reservation;
      }
    } catch {
      // fall through to mock fallback
    }
  }

  return mockReservations.find(
    (reservation) =>
      reservation.booking_code === normalizedCode &&
      reservation.customer_phone === normalizedMobile,
  );
}

export async function getReservationsForAdmin() {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.from("reservations").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return data as Reservation[];
      }
    } catch {
      // fallback to mock data
    }
  }

  return [...mockReservations].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function updateReservationStatus(id: string, status: Reservation["status"]) {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from("reservations")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (!error) {
        return true;
      }
    } catch {
      // fallback to mock data
    }
  }

  const reservation = mockReservations.find((entry) => entry.id === id);
  if (!reservation) {
    return false;
  }

  reservation.status = status;
  reservation.updated_at = new Date().toISOString();
  return true;
}

export function getCurrentAvailability() {
  const now = new Date();
  const availableChairs = defaultChairs.filter((chair) => {
    return !mockReservations.some((reservation) => {
      const start = new Date(reservation.start_time);
      const end = new Date(reservation.end_time);
      return reservation.chair_id === chair.id && start <= now && end >= now && reservation.status !== "COMPLETED" && reservation.status !== "CANCELLED";
    });
  }).length;

  return {
    availableChairs,
    inServiceChairs: defaultChairs.length - availableChairs,
    nextAvailable: "1:15 PM",
  };
}

export function getBookingLookup(record: { bookingCode: string; mobile: string }) {
  const normalizedCode = record.bookingCode.trim().toUpperCase();
  const normalizedMobile = record.mobile.replace(/\s+/g, "");

  return mockReservations.find(
    (reservation) =>
      reservation.booking_code === normalizedCode &&
      reservation.customer_phone === normalizedMobile,
  );
}

export function getMockDataReservationByCode(code: string) {
  return mockReservations.find((reservation) => reservation.booking_code === code.trim().toUpperCase());
}
