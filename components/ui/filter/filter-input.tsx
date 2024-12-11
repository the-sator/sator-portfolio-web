"use client";
import React, { useState } from "react";
import { Input } from "../input";
import { useDebouncedCallback } from "use-debounce";
import { useUpdateQuery } from "@/hooks/use-update-query";
import { useQueryParamsContext } from "@/context/query-params-provider";
type Props = {
  filterKey: string;
  debounce?: boolean;
};
type FilterInputProps = React.ComponentProps<typeof Input> & Props;

export default function FilterInput({
  debounce = true,
  filterKey,
  ...props
}: FilterInputProps) {
  const [query, setQuery] = useState("");
  const { updateQuery } = useQueryParamsContext();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (debounce) {
      if (!query) return;
      debouceSearch();
      return;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
  };
  const debouceSearch = useDebouncedCallback(async () => {
    handleOnFilter();
  }, 500);

  const handleOnFilter = () => {
    updateQuery({ [filterKey]: query });
  };

  return <Input {...props} onChange={handleChange} onKeyDown={handleKeyDown} />;
}
