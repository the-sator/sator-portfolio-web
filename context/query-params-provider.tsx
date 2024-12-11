"use client";
import React, { createContext, useContext } from "react";
import { useUpdateQuery as useInternalUpdateQuery } from "@/hooks/use-update-query";

const QueryParamsContext = createContext({
  updateQuery: (filters: Record<string, string | undefined>) => {},
  isPending: false,
});

export const QueryParamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { updateQuery, isPending } = useInternalUpdateQuery();

  return (
    <QueryParamsContext.Provider value={{ updateQuery, isPending }}>
      {children}
    </QueryParamsContext.Provider>
  );
};

export const useQueryParamsContext = () => useContext(QueryParamsContext);
