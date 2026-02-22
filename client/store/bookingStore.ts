import { create } from "zustand";

interface BookingState {
  startDate: Date | null;
  endDate: Date | null;

  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  resetDates: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  startDate: null,
  endDate: null,

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  resetDates: () => set({ startDate: null, endDate: null }),
}));