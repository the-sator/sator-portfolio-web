import { PaginateResult } from "@/types/base.type";
import {
  CreateSiteUser,
  SiteUser,
  SiteUserFilter,
} from "@/types/site-user.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";
function getAdminPath() {
  return `/admin/site-user`;
}
export const getPaginateSiteUser = async (filter: SiteUserFilter) => {
  const fullUrl = `${getAdminPath()}${toQueryString({ ...filter })}`;

  const { data, error } = await fetchApi.get<PaginateResult<SiteUser[]>>(
    fullUrl,
    ["site-users"],
  );
  if (error) {
    return { data: null, metadata: null, error };
  }

  return {
    data: data?.data || null,
    metadata: data?.metadata || null,
    error: null,
  };
};

export const createSiteUser = async (payload: CreateSiteUser) => {
  const data = await fetchApi.post<SiteUser>(`${getAdminPath()}`, payload, [
    "site-user",
  ]);
  return data;
};
