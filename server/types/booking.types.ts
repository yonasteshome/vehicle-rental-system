export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface CreateBookingInput {
  vehicleId: string;
  startDate: Date;
  endDate: Date;
}
