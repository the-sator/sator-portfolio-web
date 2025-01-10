import Link from "next/link";
import React from "react";
import Tag from "../ui/tag";
import { formatDate } from "@/utils/date";

export default function BlogCardSimple() {
  return (
    <Link
      href={"/"}
      className="flex items-center justify-between rounded-xl p-2 hover:bg-popover"
    >
      <h1 className="col-span-2">New Title</h1>
      <Tag className="rounded-full">New Updates</Tag>
      <p className="text-xs text-label">{formatDate(new Date())}</p>
    </Link>
  );
}
