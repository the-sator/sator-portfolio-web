import { z } from "zod";
import { BaseFilterSchema } from "./base.type";
export type SiteUser = {
  link: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  auth_id: string;
  profile_url: string | null;
  user_id: string;
  website_name: string;
  username: string;
  api_key: string;
};

export const CreateSiteUserSchema = z.object({
  website_name: z.string().trim().min(1),
  link: z.string().min(1).trim(),
  user_id: z.string().min(1).trim(),
});

export const SiteUserFilterSchema = BaseFilterSchema.extend({
  username: z.string().optional(),
  email: z.string().optional(),
});

export type CreateSiteUser = z.infer<typeof CreateSiteUserSchema>;
export type SiteUserFilter = z.infer<typeof SiteUserFilterSchema>;
