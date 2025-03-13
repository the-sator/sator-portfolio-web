"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { useOverlay } from "@/store/overlay";
import { MODAL_KEY } from "@/constant/modal-key";
import { useSelectedItem } from "@/store/selected-item";
import { FormAttempt } from "@/types/portfolio-form.type";
type Props = {
  formAttempts: FormAttempt[] | null;
};
export default function FormAttemptModal({ formAttempts }: Props) {
  const { modals, closeModal } = useOverlay();
  const { setSelectedItem, selectedItem } = useSelectedItem();
  const isOpen = modals[MODAL_KEY.FORM_ATTEMPT];
  const selectedAttempt = selectedItem
    ? formAttempts?.find((attempt) => attempt.id === selectedItem)
    : undefined;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal(MODAL_KEY.FORM_ATTEMPT);
          setSelectedItem(null);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Attempt</DialogTitle>
        </DialogHeader>
        <ul className="my-4 flex flex-col gap-6">
          {selectedAttempt?.form_response.map((column) => (
            <li key={column.id} className="flex flex-col gap-2 text-sm">
              <p className="text-label">{column.form_question.form_text}</p>
              <p className="">{column.form_option.option_text}</p>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
