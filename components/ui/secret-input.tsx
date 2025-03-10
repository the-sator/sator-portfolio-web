import React, { ComponentProps, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { cn } from "@/lib/utils";
type SecretInputProps = {
  className?: string;
} & ComponentProps<typeof Input>;
export default function SecretInput({ className, ...props }: SecretInputProps) {
  const [hide, setHide] = useState(true);
  return (
    <div className={cn("relative w-full", className)}>
      <Input
        {...props}
        type={hide ? "password" : "text"}
        variant="outline"
        className="pr-8"
      />
      <Button
        type="button"
        variant={"icon"}
        className="absolute inset-y-1/2 right-2 h-fit -translate-y-1/2 p-1"
        onClick={() => {
          setHide(!hide);
        }}
      >
        {hide ? <IoEye /> : <IoEyeOff />}
      </Button>
    </div>
  );
}
