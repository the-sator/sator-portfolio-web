export const breakpointColumnsObj = {
  default: 4,
  1980: 3,
  1400: 2,
  500: 1,
};

export type HttpError = {
  statusCode: number;
  error: string;
};

export type Session = {
  id: string;
  token: string;
  expiredAt: Date;
};

export type ImagePreview = {
  id: string;
  url: string | null;
  status: UploadState;
};

export enum UploadState {
  PENDING = "pending",
  UPLOADED = "uploaded",
  FAILED = "failed",
}

export type InfinitePaginateResult<T> = {
  data: T;
  hasMore: boolean;
};

export type PaginateMetadata = {
  page: number | null;
  count?: number;
  currentPage?: number;
};

export type PaginateResult<T> = {
  data: T;
  metadata: PaginateMetadata;
};
