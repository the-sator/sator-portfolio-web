import { UploadState } from "@/enum/base.enum";
import { WSEventType } from "@/enum/ws-event.enum";
import { z } from "zod";

export const breakpointColumnsObj = {
  default: 4,
  1980: 3,
  1400: 2,
  500: 1,
};

export type HttpResponse = {
  statusCode: number;
  message: string;
};

export type Session = {
  token: string;
  expires_at: Date;
};

export type ImagePreview = {
  id: string;
  url: string | null;
  status: UploadState;
};

export type InfinitePaginateResult<T> = {
  data: T;
  hasMore: boolean;
};

export type PaginateMetadata = {
  page: number | null;
  count?: number;
  current_page?: number;
  page_count?: number;
  page_size?: number;
};

export type PaginateResult<T> = {
  data: T;
  metadata: PaginateMetadata;
};

export type NextPrevious = {
  next: string | null;
  previous: string | null;
};

export type WSPayload<T> = {
  type: WSEventType;
  data: T;
};

export const BaseFilterSchema = z.object({
  page: z.string().min(1).optional(),
  limit: z.string().min(1).optional(),
});

export type BaseFilter = z.infer<typeof BaseFilterSchema>;
