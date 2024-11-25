"use client";
import React, { useState } from "react";
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
import { Session } from "@/types/base.type";
import { Admin } from "@/types/admin.type";

type Props = {
  qrcode: string;
  encodedTOTPKey: string;
  admin: Admin;
  session: Session;
};
export default function TotpModal({
  qrcode,
  encodedTOTPKey,
  admin,
  session,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          {!!admin.totp_key ? "Edit" : "Set up"}
        </Button>
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
          <SetupTotpForm
            encodedTOTPKey={encodedTOTPKey}
            admin={admin}
            session={session}
            setOpen={setOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
