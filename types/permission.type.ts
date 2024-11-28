import { Resource } from "./resource.type";

export type Permission = {
  resource_id?: number;
  role_id?: number;
  read?: boolean;
  write?: boolean;
  delete?: boolean;
  resource?: Resource;
};
