"use client";
import React, { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import SubmitButton from "../button/submit-button";
import { SecretInputWithLabel } from "../input-label";
import { useOverlay } from "@/store/overlay";
import { useSelectedItem } from "@/store/selected-item";
import { SiteUser } from "@/types/site-user.type";
import { MODAL_KEY } from "@/constant/modal-key";
type Props = {
  siteUsers: SiteUser[] | null;
};
export default function ApiKeyModal({ siteUsers }: Props) {
  const { selectedItem } = useSelectedItem();
  const selectedUser = selectedItem
    ? siteUsers?.find((user) => user.id === selectedItem)
    : undefined;
  const { modals, closeModal } = useOverlay();
  const isOpen = modals[MODAL_KEY.API_KEY];
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log(event.target);
    throw new Error("Function not implemented.");
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal(MODAL_KEY.API_KEY);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View API Key</DialogTitle>
          <DialogDescription>
            View the API key below. You can regenerate it if needed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4">
          <SecretInputWithLabel
            readOnly
            label="Api Key"
            name="api_key"
            value={selectedUser?.api_key}
          />
          <SubmitButton label="Regenerate" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
