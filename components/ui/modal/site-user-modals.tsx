"use client";
import React, { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { IoAddOutline } from "react-icons/io5";
import { InputWithLabel } from "../input-label";
import SubmitButton from "../button/submit-button";
import { Checkbox } from "../checkbox";
import { Label } from "../label";
import { toast } from "@/hooks/use-toast";
import { ZodFormattedError } from "zod";
import { CreateSiteUser } from "@/types/site-user.type";
import { createSiteUserAction } from "@/action/site-user.action";

export function CreateSiteUserModal() {
  const [inputType, setInputType] = useState("password");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<ZodFormattedError<CreateSiteUser>>();
  const handleCreateSiteUser = async (formData: FormData) => {
    const data: CreateSiteUser = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      username: formData.get("username")?.toString() || "",
    };
    const { error } = await createSiteUserAction(data);
    if (error) {
      if ("statusCode" in error) {
        toast({
          title: "Create Site User Error",
          description: error.error,
          variant: "destructive",
        });
        return;
      }
      setErrors(error);
      return;
    }
    toast({
      title: "Create Site User Successful",
      variant: "success",
    });
    setOpen(false);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleCreateSiteUser(formData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1">
          <IoAddOutline size={14} />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Site User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4">
          <InputWithLabel
            label="Username"
            name="username"
            errors={errors?.username}
          />
          <InputWithLabel label="Email" name="email" errors={errors?.email} />
          <InputWithLabel
            type={inputType}
            label="Password"
            name="password"
            errors={errors?.password}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={() =>
                setInputType((prev) =>
                  prev === "password" ? "text" : "password",
                )
              }
            />
            <Label className="text-xs">Show Password</Label>
          </div>
          <SubmitButton label="Save" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
