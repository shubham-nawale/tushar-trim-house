import type { Chair, Reservation, Service } from "@/types";

export const defaultServices: Service[] = [
  { id: "svc-haircut", name: "Haircut", description: "Precision cut", price: 150, duration_minutes: 30, active: true },
  { id: "svc-beard", name: "Beard Trim", description: "Sharp detailing", price: 100, duration_minutes: 20, active: true },
  { id: "svc-both", name: "Haircut + Beard", description: "Full groom refresh", price: 250, duration_minutes: 45, active: true },
  { id: "svc-styling", name: "Haircut + Styling", description: "Styled finish", price: 300, duration_minutes: 60, active: true },
];

export const defaultChairs: Chair[] = [
  { id: "chair-1", name: "Chair 01", active: true, status: "IN_SERVICE", customer: "Rahul", service: "Haircut + Beard", timeRange: "12:30 PM – 1:15 PM" },
  { id: "chair-2", name: "Chair 02", active: true, status: "AVAILABLE", customer: "", service: "", timeRange: "" },
];

export const mockReservations: Reservation[] = [
  {
    id: "res-1",
    booking_code: "TTH-10001",
    customer_name: "Rahul",
    customer_phone: "9876543210",
    service_id: "svc-both",
    chair_id: "chair-1",
    start_time: "2026-09-28T12:30:00.000Z",
    end_time: "2026-09-28T13:15:00.000Z",
    status: "IN_SERVICE",
    created_at: "2026-09-28T12:00:00.000Z",
    updated_at: "2026-09-28T12:00:00.000Z",
  },
  {
    id: "res-2",
    booking_code: "TTH-10002",
    customer_name: "Amit",
    customer_phone: "9123456780",
    service_id: "svc-beard",
    chair_id: "chair-2",
    start_time: "2026-09-28T14:00:00.000Z",
    end_time: "2026-09-28T14:20:00.000Z",
    status: "RESERVED",
    created_at: "2026-09-28T13:45:00.000Z",
    updated_at: "2026-09-28T13:45:00.000Z",
  },
];

export function getServices() {
  return defaultServices;
}

export function getChairStatus() {
  return defaultChairs;
}

export function getReservations() {
  return mockReservations;
}

export function getNextAvailableSlot() {
  return "1:15 PM";
}

export function getAvailabilitySummary() {
  return {
    availableChairs: 1,
    inServiceChairs: 1,
    nextAvailable: "1:15 PM",
  };
}
