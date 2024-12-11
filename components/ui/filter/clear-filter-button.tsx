"use client";
import React from "react";
import { Button } from "../button";
import { useQueryParamsContext } from "@/context/query-params-provider";
type ClearButtonProps = React.ComponentProps<typeof Button>;
export default function ClearFilterButton({ ...props }: ClearButtonProps) {
  const { clearQuery } = useQueryParamsContext();
  const handleOnClear = () => {
    clearQuery();
  };
  return (
    <Button {...props} variant="destructive" onClick={handleOnClear}>
      Clear
    </Button>
  );
}
