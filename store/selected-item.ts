import { create } from "zustand";
export type SelectedItem = {
  selectedItem: string | number | null;
  setSelectedItem: (value: string | number) => void;
};

export const useSelectedItem = create<SelectedItem>((set) => ({
  selectedItem: null,
  setSelectedItem: (selectedItem: string | number | null) =>
    set({ selectedItem }),
}));
