export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | null;

export interface Vehicle {
  _id: string;
  name: string;
  type: string;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
}

export interface Booking {
  _id: string;
  vehicle: { _id: string };
  startDate: string;
  endDate: string;
  status: BookingStatus;
}