import { create } from "zustand";
import { BookingStatus } from "@/types/booking"; // ✅ USE SHARED TYPE

interface BookingState {
  startDate: string | null;
  endDate: string | null;

  status: BookingStatus; // now matches everywhere
  bookingId: string | null;

  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;

  setStatus: (status: BookingStatus) => void;
  setBookingId: (id: string | null) => void;

  resetDates: () => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  startDate: null,
  endDate: null,

  status: null, // ✅ IMPORTANT (not "idle")
  bookingId: null,

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),

  setStatus: (status) => set({ status }),
  setBookingId: (id) => set({ bookingId: id }),

  resetDates: () =>
    set({
      startDate: null,
      endDate: null,
    }),

  reset: () =>
    set({
      startDate: null,
      endDate: null,
      status: null,
      bookingId: null,
    }),
}));