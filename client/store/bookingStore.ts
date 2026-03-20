import { create } from "zustand";

type BookingStatus = "idle" | "loading" | "success" | "error";

interface BookingState {
  startDate: string | null;
  endDate: string | null;

  status: BookingStatus;
  bookingId: string | null;

  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;

  setStatus: (status: BookingStatus) => void;
  setBookingId: (id: string | null) => void;

  resetDates: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  startDate: null,
  endDate: null,

  status: "idle",
  bookingId: null,

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),

  setStatus: (status) => set({ status }),
  setBookingId: (id) => set({ bookingId: id }),

  resetDates: () =>
    set({
      startDate: null,
      endDate: null,
      status: "idle",
      bookingId: null,
    }),
}));