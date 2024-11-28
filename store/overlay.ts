import { create } from "zustand";
export type OverlayStore = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};
export const useOverlay = create<OverlayStore>((set) => ({
  showModal: false,
  setShowModal: (showModal: boolean) => {
    set({ showModal });
  },
}));
