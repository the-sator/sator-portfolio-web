"use client";
import React, { startTransition } from "react";
import { Button } from "../button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { revalidatePathClient } from "@/action";
type Props = {
  shouldRevalidate?: boolean;
};
export default function BackButton({ shouldRevalidate }: Props) {
  const router = useRouter();
  return (
    <Button
      variant={"icon"}
      size={"icon"}
      type="button"
      onClick={() => {
        startTransition(async () => {
          if (shouldRevalidate) {
            await revalidatePathClient("/");
          }
          router.back();
        });
      }}
      className="group h-6 w-6 p-0 hover:text-blue-500"
    >
      <IoIosArrowRoundBack size={32} />
    </Button>
  );
}
