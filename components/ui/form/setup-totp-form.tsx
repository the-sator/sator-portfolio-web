"use client";
import React from "react";
import { Input } from "../input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../input-otp";
import { Button } from "../button";
import { UpdateAdminTotp } from "@/types/admin.type";
import { adminTotp } from "@/action/auth.action";
import { toast } from "@/hooks/use-toast";
import { useOverlay } from "@/store/overlay";
import { MODAL_KEY } from "@/constant/modal-key";
type Props = {
  encodedTOTPKey: string;
};
export default function SetupTotpForm({ encodedTOTPKey }: Props) {
  const { closeModal } = useOverlay();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reset behavior
    const formData = new FormData(e.currentTarget);
    const payload: UpdateAdminTotp = {
      key: formData.get("key")!.toString(),
      code: formData.get("code")!.toString(),
    };
    const { error } = await adminTotp(payload);
    if (error) {
      if ("statusCode" in error) {
        toast({
          title: "Setup Totp Error",
          description: error.message,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        toast({
          title: "Setup Totp Error",
          variant: "destructive",
          duration: 1500,
        });
      }
    } else {
      toast({
        title: "Successfully Setup Totp",
        variant: "success",
        duration: 1500,
      });
    }
    closeModal(MODAL_KEY.TOTP);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        name="key"
        defaultValue={encodedTOTPKey}
        className="hidden"
        required
      />
      <p>Verification Code</p>
      <div className="flex w-full flex-col items-center gap-4">
        <InputOTP maxLength={6} name="code">
          <InputOTPGroup className="w-full">
            <InputOTPSlot index={0} className="text-md size-16" />
            <InputOTPSlot index={1} className="text-md size-16" />
            <InputOTPSlot index={2} className="text-md size-16" />
            <InputOTPSlot index={3} className="text-md size-16" />
            <InputOTPSlot index={4} className="text-md size-16" />
            <InputOTPSlot index={5} className="text-md size-16" />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex justify-end">
        <Button>Save changes</Button>
      </div>
    </form>
  );
}
