import { create } from "zustand";

interface BookingState {
  startDate: string | null;
  endDate: string | null;

  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;

  resetDates: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  startDate: null,
  endDate: null,

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),

  resetDates: () => set({ startDate: null, endDate: null }),
}));