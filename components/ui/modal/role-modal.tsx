"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import RolePermissionTable from "../table/table/role-permission-table";
import { DialogDescription } from "@radix-ui/react-dialog";
import { InputWithLabel, SelectOption, SelectWithLabel } from "../input-label";
import { Button } from "../button";
import { IoAddOutline } from "react-icons/io5";
import { Label } from "../label";
import SubmitButton from "../button/submit-button";
import { Resource } from "@/types/resource.type";
import { HttpError } from "@/types/base.type";
import { toast } from "@/hooks/use-toast";
import { CreateRole, Role } from "@/types/role.type";
import { usePermission } from "@/store/permission";
import { adminCreateRole, adminUpdateRole } from "@/action/role.action";
import { ZodFormattedError } from "zod";
import { useOverlay } from "@/store/overlay";
import { useSelectedItem } from "@/store/selected-item";
import { Admin, AssignAdminRole } from "@/types/admin.type";
import { adminAssignRole } from "@/action/admin.action";
type ModalProps = {
  resources?: Resource[] | null;
  id?: number;
  roles?: Role[] | null;
  admins?: Admin[] | null;
  error?: HttpError | null;
};
export function EditRoleModal({ resources, roles }: ModalProps) {
  const { selectedItem } = useSelectedItem();
  const { permissions } = usePermission();

  const { setShowModal, showModal } = useOverlay();
  const role = selectedItem
    ? roles?.find((role) => role.id === selectedItem)
    : undefined;
  const handleUpdateRole = async (formData: FormData) => {
    const data = {
      name: formData.get("name")?.toString(),
      permissions: permissions,
    };
    const response = await adminUpdateRole(Number(selectedItem), data);
    if (response?.error) {
      console.log("response?.erro:", response?.error);
      //IF is http error then show toast
      if ("statusCode" in response.error) {
        toast({
          title: "Login Error",
          description: response.error.error,
          variant: "destructive",
          duration: 1500,
        });
      }
    } else {
      toast({
        title: "Role Updated Successfully",
        variant: "success",
        duration: 1500,
      });
      setShowModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reset behavior
    const formData = new FormData(e.currentTarget);
    await handleUpdateRole(formData);
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      {/* <DialogTrigger className="w-full px-2 py-1 text-left">Edit</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription className="text-label">
            Role: {role?.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label>Permission</Label>
          <RolePermissionTable resources={resources} role={role} />
          <SubmitButton label="Save" />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function CreateRoleModal({ resources, error }: ModalProps) {
  const { permissions } = usePermission();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<ZodFormattedError<CreateRole> | null>(
    null,
  );
  if (error) {
    toast({
      title: "Fail to Fetch Resource",
      description: error.error,
      variant: "destructive",
    });
  }
  const handleCreateRole = async (formData: FormData) => {
    const data = {
      name: formData.get("name")?.toString(),
      permissions: permissions,
    };
    const response = await adminCreateRole(data);
    if (response?.error) {
      //IF is http error then show toast
      if ("statusCode" in response.error) {
        toast({
          title: "Update Role Error",
          description: response.error.error,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        //ELSE set Zod error to input
        setErrors(response.error);
      }
    } else {
      toast({
        title: "Role Added Successfully",
        variant: "success",
        duration: 1500,
      });
      setOpen(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reset behavior
    const formData = new FormData(e.currentTarget);
    await handleCreateRole(formData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <IoAddOutline size={14} />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputWithLabel
            label="Name"
            name="name"
            placeholder="Admin"
            errors={errors?.name}
          />
          <Label>Permission</Label>
          <RolePermissionTable resources={resources} />
          <SubmitButton label="Save" />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AssignRoleModal({ roles, error, admins }: ModalProps) {
  const { showModal, setShowModal } = useOverlay();
  const { selectedItem } = useSelectedItem();
  const [errors, setErrors] =
    useState<ZodFormattedError<AssignAdminRole> | null>(null);
  const admin = admins?.find((admin) => admin.id === selectedItem);
  const options: SelectOption[] = roles!.map((role) => {
    return {
      value: String(role.id),
      label: role.name,
    };
  });
  useEffect(() => {
    if (error) {
      toast({
        title: "Fail to Fetch Resource",
        description: error.error,
        variant: "destructive",
      });
    }
  }, [error]);
  const handleAssignRole = async (formData: FormData) => {
    const data: AssignAdminRole = {
      role_id: Number(formData.get("role_id")!),
      admin_id: (selectedItem as string) || "",
    };
    const response = await adminAssignRole(data);
    if (response?.error) {
      //IF is http error then show toast
      if ("statusCode" in response.error) {
        toast({
          title: "Update Role Error",
          description: response.error.error,
          variant: "destructive",
          duration: 1500,
        });
      } else {
        //ELSE set Zod error to input
        setErrors(response.error);
      }
    } else {
      toast({
        title: "Role Added Successfully",
        variant: "success",
        duration: 1500,
      });
      setShowModal(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleAssignRole(formData);
  };
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <SelectWithLabel
            label="Role"
            name="role_id"
            defaultValue={String(admin ? admin.role_id : 0)}
            options={options}
            placeholder="Admin"
            errors={errors?.role_id}
          />
          <SubmitButton label="Save" />
        </form>
      </DialogContent>
    </Dialog>
  );
}
