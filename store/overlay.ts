import { create } from "zustand";
export type OverlayStore = {
  modals: Record<string, boolean>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  toggleModal: (modalId: string) => void;
  closeAll: () => void;
};
export const useOverlay = create<OverlayStore>((set) => ({
  modals: {},
  openModal: (modalId: string) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    }));
  },
  closeModal: (modalId: string) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    }));
  },
  toggleModal: (modalId: string) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: !state.modals[modalId] },
    }));
  },
  closeAll: () => {
    set((state) => {
      const closedModals = Object.keys(state.modals).reduce(
        (acc, modalId) => {
          acc[modalId] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      return { modals: closedModals };
    });
  },
}));
