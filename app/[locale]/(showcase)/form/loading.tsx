import Spinner from "@/components/ui/spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100svh-56px)] w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
