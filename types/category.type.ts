import { z } from "zod";

export enum Color {
  BLUE = "BLUE",
  RED = "RED",
  VIOLET = "VIOLET",
  PURPLE = "PURPLE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  ORANGE = "ORANGE",
  GRAY = "GRAY",
  TEAL = "TEAL",
  INDIGO = "INDIGO",
}

export type Category = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  color: Color;
};

export type CategoryOnPorfolio = {
  portfolio_id: string;
  category_id: string;
  assignedBy: string;
  category: Category;
};

export const CreateCategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  color: z.nativeEnum(Color).optional(),
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
