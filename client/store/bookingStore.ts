import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BookingStatus } from "@/types/booking";

export interface BookingState {
  startDate: string;
  endDate: string;
  status: BookingStatus;
  bookingId: string | null;

  setStartDate: (v: string) => void;
  setEndDate: (v: string) => void;
  setStatus: (s: BookingStatus) => void;
  setBookingId: (id: string | null) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      startDate: "",
      endDate: "",
      status: null,
      bookingId: null,

      setStartDate: (v) => set({ startDate: v }),
      setEndDate: (v) => set({ endDate: v }),
      setStatus: (s) => set({ status: s }),
      setBookingId: (id) => set({ bookingId: id }),

      reset: () =>
        set({
          startDate: "",
          endDate: "",
          status: null,
          bookingId: null,
        }),
    }),
    {
      name: "vehicle-booking-storage",
    }
  )
);