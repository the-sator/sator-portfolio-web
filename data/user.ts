import { AuthSession, Login } from "@/types/auth.type";
import { PaginateResult } from "@/types/base.type";
import { CreateUser, User, UserFilter } from "@/types/user.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";
import { cache } from "react";

export const getAdminPath = () => {
  return `/admin/user`;
};

export const getPath = () => {
  return `/user`;
};

export const getPaginateUsers = async (filter: UserFilter) => {
  const fullUrl = `${getAdminPath()}${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<User[]>>(fullUrl, [
    "users",
  ]);
  if (error) {
    return { data: null, metadata: null, error };
  }

  return {
    data: data?.data || null,
    metadata: data?.metadata || null,
    error: null,
  };
};

export const createUser = async (payload: CreateUser) => {
  const data = await fetchApi.post<User>(`${getAdminPath()}`, payload, [
    "users",
  ]);
  return data;
};

export const userlogin = async (payload: Login) => {
  const data = await fetchApi.post<AuthSession>(`${getPath()}`, payload, [
    "users",
  ]);
  return data;
};

export const getUserSession = cache(async () => {
  const { data, error } = await fetchApi.get<AuthSession>(`${getPath()}/me`, [
    "user-session",
  ]);
  const { auth, session } = data || {};
  return { auth, session, error };
});
