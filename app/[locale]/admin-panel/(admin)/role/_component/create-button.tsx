"use client";
import { Button } from "@/components/ui/button";
import { MODAL_KEY } from "@/constant/modal-key";
import { useOverlay } from "@/store/overlay";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

export default function CreateButton() {
  const { openModal } = useOverlay();

  return (
    <Button
      variant="outline"
      onClick={() => {
        openModal(MODAL_KEY.CREATE);
      }}
    >
      <IoAddOutline size={14} />
      <p className="text-sm group-hover:text-blue-700">Create</p>
    </Button>
  );
}
