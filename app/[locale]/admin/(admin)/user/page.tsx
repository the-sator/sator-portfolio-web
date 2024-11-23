import { Button } from "@/components/ui/button";
import { UserColumns } from "@/components/ui/table/columns/user-columns";
import { DataTable } from "@/components/ui/data-table";
import { User } from "@/types/user.type";
import { getTranslations } from "next-intl/server";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { getAllAdmins } from "@/data/admin";
async function getFakeUserData(): Promise<User[]> {
  return [
    {
      id: "1a2b3c4d",
      username: "devmaster",
      key: "a12b3c4d",
      status: "pending",
      email: "devmaster@example.com",
      created_at: "2024-11-18T09:45:00Z",
    },
    {
      id: "5e6f7g8h",
      username: "codewizard",
      key: "e56f7g8h",
      status: "processing",
      email: "codewizard@example.com",
      created_at: "2024-11-17T13:20:00Z",
    },
    {
      id: "9i0j1k2l",
      username: "bugfixer",
      key: "i90j1k2l",
      status: "success",
      email: "bugfixer@example.com",
      created_at: "2024-11-16T18:10:00Z",
    },
  ];
}

export default async function page() {
  const t = await getTranslations("User");
  const fakeUsers = await getFakeUserData();
  const admin = await getAllAdmins();
  console.log("admin:", admin);
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">{t("user")}</h1>
        <Button variant="outline">
          <IoAddOutline size={14} />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Username" />
        <Input placeholder="Email" />
        <Button variant="destructive">Clear</Button>
      </div>
      <DataTable columns={UserColumns} data={fakeUsers} />
    </div>
  );
}
