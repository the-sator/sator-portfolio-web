import { CreateFormResponse } from "@/types/portfolio-form.type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type PortfolioFormState = {
  name: string;
  setName: (data: string) => void;
  responses: CreateFormResponse[];
  setResponses: (data: CreateFormResponse) => void;
  clearResponse: () => void;
};
export const usePortfolioForm = create<PortfolioFormState>()(
  persist(
    (set) => ({
      responses: [],
      name: "",
      setName: (data: string) => set({ name: data }),
      setResponses: (data) => {
        set((state) => {
          const existingResponseIndex = state.responses.findIndex(
            (response) => response.question_id === data.question_id,
          );

          if (existingResponseIndex !== -1) {
            // If the response exists, update it
            const updatedResponses = [...state.responses];
            updatedResponses[existingResponseIndex] = data;
            return { responses: updatedResponses };
          } else {
            // If the response doesn't exist, add it
            return { responses: [...state.responses, data] };
          }
        });
      },
      clearResponse: () => set({ responses: [] }),
    }),
    {
      name: "form-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
