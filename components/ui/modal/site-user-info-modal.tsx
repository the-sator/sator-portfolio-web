"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { useOverlay } from "@/store/overlay";
import { useSelectedItem } from "@/store/selected-item";
import { SiteUser } from "@/types/site-user.type";
import { MODAL_KEY } from "@/constant/modal-key";
import ModalItemColumn from "../modal-item-column";
import { Button } from "../button";
import { toast } from "@/hooks/use-toast";
type Props = {
  siteUsers: SiteUser[] | null;
};
export default function SiteUserInfoModal({ siteUsers }: Props) {
  const { selectedItem } = useSelectedItem();
  const columns: { title: string; accessKey: keyof SiteUser }[] = [
    {
      title: "ID",
      accessKey: "id",
    },
    {
      title: "Username",
      accessKey: "username",
    },
    {
      title: "API Key",
      accessKey: "api_key",
    },
  ];
  const selectedUser = selectedItem
    ? siteUsers?.find((user) => user.id === selectedItem)
    : undefined;

  const { modals, closeModal } = useOverlay();
  const isOpen = modals[MODAL_KEY.SITE_USER_INFO];
  const copyENV = async () => {
    if (!selectedUser) return;
    await navigator.clipboard
      .writeText(`SITE_ID=${selectedUser.id}\nAPI_KEY=${selectedUser.api_key}
      `);
    toast({
      title: "Environment variables have been copied to your clipboard.",
    });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal(MODAL_KEY.SITE_USER_INFO);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Site User Info</DialogTitle>
          <DialogDescription>
            View site user information to copy and set it as an environment
            variable for the site.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-1 gap-2">
          {columns.map((column) => (
            <ModalItemColumn
              key={column.accessKey}
              title={column.title}
              content={selectedUser?.[column.accessKey]?.toString()}
            />
          ))}
        </div>

        <Button onClick={copyENV} className="mt-4" disabled={!!!selectedUser}>
          Copy for ENV
        </Button>
      </DialogContent>
    </Dialog>
  );
}
