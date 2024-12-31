import React from "react";
import { InputWithLabel } from "../input-label";
import { Label } from "../label";
import RolePermissionTable from "../table/table/role-permission-table";
import SubmitButton from "../button/submit-button";

export default function CreateRoleForm() {
  return (
    <form action="" className="flex flex-col gap-4">
      <InputWithLabel label="Name" name="name" placeholder="Admin" />
      <Label>Permission</Label>
      <RolePermissionTable />
      <SubmitButton label="Save" />
    </form>
  );
}
