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
import { InputWithLabel, SelectOption, SelectWithLabel } from "../input-label";
import SubmitButton from "../button/submit-button";
import { toast } from "@/hooks/use-toast";
import { ZodFormattedError } from "zod";
import { CreateSiteUser } from "@/types/site-user.type";
import { createSiteUserAction } from "@/action/site-user.action";
import { User } from "@/types/user.type";
type Props = {
  users: User[];
};
export function CreateSiteUserModal({ users }: Props) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<ZodFormattedError<CreateSiteUser>>();
  const options: SelectOption[] = users.map((user) => ({
    label: user.username,
    value: user.id,
  }));
  const handleCreateSiteUser = async (formData: FormData) => {
    const data: CreateSiteUser = {
      website_name: formData.get("website_name")?.toString() || "",
      link: formData.get("link")?.toString() || "",
      user_id: formData.get("user_id")?.toString() || "",
    };
    console.log(data);
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
            label="Website Name"
            name="website_name"
            errors={errors?.website_name}
            placeholder="Sator's Portfolio"
          />
          <InputWithLabel
            label="Link"
            name="link"
            errors={errors?.link}
            placeholder="https://www.sator-tech.live"
          />
          <SelectWithLabel
            label="User"
            name="user_id"
            errors={errors?.user_id}
            options={options}
            placeholder="Please Select User"
          />
          {/* <InviteChatMemberMultiSelect /> */}
          <SubmitButton label="Save" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
