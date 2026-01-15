import { create } from "zustand";

export const useAppointment = create((set) => ({
  termin: { start: "", end: "", index: "", posible: false },
  update: (newTermin) => set({ termin: newTermin }),
}));
export const useService = create((set) => ({
  service: "",
  update: (newService) => set({ service: newService }),
}));
export const useEmployee = create((set) => ({
  employee: "",
  update: (newEmployee) => set({ employee: newEmployee }),
}));
export const useSalon = create((set) => ({
  salon: "",
  update: (newSalon) => set({ salon: newSalon }),
}));
export const useActiveDays = create((set) => ({
  activeDays: {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: false,
    6: false,
  },
  toggleDay: (index) => {
    set((state) => {
      return {
        activeDays: { ...state.activeDays, [index]: !state.activeDays[index] },
      };
    });
  },
}));
