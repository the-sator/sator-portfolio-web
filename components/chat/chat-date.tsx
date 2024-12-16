import { formatDate, isDifferentDay } from "@/utils/date";
import React from "react";
type Props = {
  date: Date;
};
export default function ChatDate({ date }: Props) {
  return (
    <div className="mx-auto w-fit rounded-2xl bg-background px-3 py-1">
      <p className="text-xs">
        {isDifferentDay(new Date(date), new Date())
          ? formatDate(date)
          : "Today"}
      </p>
    </div>
  );
}
