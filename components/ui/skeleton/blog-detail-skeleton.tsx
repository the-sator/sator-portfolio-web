import React from "react";
import { Skeleton } from "../skeleton";

export default function BlogDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="min-h-[200px] w-full" />
      <Skeleton className="min-h-[calc(100vh-300px)] w-full" />
    </div>
  );
}
