import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import Navbar from "@/components/ui/nav";
import { AppSidebar } from "@/components/ui/sidebar/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import { USER_LOGIN_PATH } from "@/constant/base";
import { NotificationProvider } from "@/context/notification-provider";
import { getUserSession } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { data } = await getUserSession();
  if (!data) {
    redirect(USER_LOGIN_PATH);
  }
  return (
    <div>
      <SidebarProvider className="relative flex flex-1">
        <NotificationProvider authId={data.id}>
          <AppSidebar />{" "}
          <div className="w-full overflow-hidden">
            <Navbar
              sidebarTrigger={<SidebarTrigger />}
              currentLocale={locale}
            />
            {children}
            <ConfirmationDialog />
          </div>
        </NotificationProvider>
      </SidebarProvider>
    </div>
  );
}
