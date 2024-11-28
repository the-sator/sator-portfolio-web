import { Resource } from "@/types/resource.type";
import { fetchApi } from "@/utils/fetch-client";
import { cache } from "react";

export const getAllResources = cache(async () => {
  const data = await fetchApi.get<Resource[]>("/admin/resource", ["resource"]);
  return data;
});
