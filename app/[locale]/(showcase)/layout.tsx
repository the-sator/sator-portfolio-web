import AppNavbar from "@/components/navbar/app-navbar";
import { NotificationProvider } from "@/context/notification-provider";
import { getUserSession } from "@/data/user";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = await getUserSession();
  return (
    <div>
      <NotificationProvider authId={auth.id}>
        <AppNavbar />
        {children}
      </NotificationProvider>
    </div>
  );
}
