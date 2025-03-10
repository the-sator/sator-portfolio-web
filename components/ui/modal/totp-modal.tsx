"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import SetupTotpForm from "../form/setup-totp-form";
import { useOverlay } from "@/store/overlay";
import { MODAL_KEY } from "@/constant/modal-key";

type Props = {
  qrcode: string;
  encodedTOTPKey: string;
};
export default function TotpModal({ qrcode, encodedTOTPKey }: Props) {
  const { modals, closeModal } = useOverlay();
  const isOpen = modals[MODAL_KEY.TOTP];
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal(MODAL_KEY.TOTP);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"}>Setup</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>TOTP Setup</DialogTitle>
          <DialogDescription>
            To help strengthen your account please scan this QR with your
            authenticator app an enter the verification code below{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex w-full justify-center">
            <div
              style={{
                width: "200px",
                height: "200px",
              }}
              dangerouslySetInnerHTML={{
                __html: qrcode,
              }}
            ></div>
          </div>
          <SetupTotpForm encodedTOTPKey={encodedTOTPKey} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
