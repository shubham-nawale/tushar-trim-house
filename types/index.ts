export type Service = {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
  active: boolean;
};

export type ChairStatus = "AVAILABLE" | "RESERVED" | "IN_SERVICE" | "BLOCKED";

export type Chair = {
  id: string;
  name: string;
  active: boolean;
  status: ChairStatus;
  customer?: string;
  service?: string;
  timeRange?: string;
  reason?: string;
};

export type BookingStatus =
  | "RESERVED"
  | "ARRIVED"
  | "IN_SERVICE"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export type Reservation = {
  id: string;
  booking_code: string;
  customer_name: string;
  customer_phone: string;
  service_id: string;
  chair_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
};
