import AppNavbar from "@/components/navbar/app-navbar";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { NotificationProvider } from "@/context/notification-provider";
import { getUserSession } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserSession();
  if (!data) {
    redirect(ADMIN_LOGIN_PATH);
  }
  return (
    <div>
      <NotificationProvider authId={data.id}>
        <AppNavbar />
        {children}
      </NotificationProvider>
    </div>
  );
}
