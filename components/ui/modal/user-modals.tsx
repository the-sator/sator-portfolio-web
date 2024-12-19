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
import { CreateUser } from "@/types/user.type";
import { createUserAction } from "@/action/user.action";
import { toast } from "@/hooks/use-toast";
import { ZodFormattedError } from "zod";

export function CreateUserModal() {
  const [inputType, setInputType] = useState("password");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<ZodFormattedError<CreateUser>>();
  const handleCreateUser = async (formData: FormData) => {
    const data: CreateUser = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      username: formData.get("username")?.toString() || "",
    };
    const { error } = await createUserAction(data);
    if (error) {
      if ("statusCode" in error) {
        toast({
          title: "Create User Error",
          description: error.error,
          variant: "destructive",
        });
        return;
      }
      setErrors(error);
      return;
    }
    toast({
      title: "Create User Successful",
      variant: "success",
    });
    setOpen(false);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleCreateUser(formData);
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
          <DialogTitle>Create User</DialogTitle>
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
