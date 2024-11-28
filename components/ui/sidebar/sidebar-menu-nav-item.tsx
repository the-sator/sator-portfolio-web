"use client";
import React, { ReactElement } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import { IconType } from "react-icons/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
type Props = {
  child: {
    title: string;
    url: string;
    resource: string;
    icon: ReactElement;
  };
};
export default function SidebarMenuNavItem({ child }: Props) {
  const pathname = usePathname();
  const t = useTranslations("SidebarItem");
  const isActivePath = (currentPath: string, childUrl: string) => {
    if (childUrl === "/") {
      return ["/", "/en", "/kh"].includes(currentPath);
    }
    return currentPath.replace(/^\/(en|kh)/, "") === childUrl;
  };
  return (
    <SidebarMenuItem key={child.title}>
      <SidebarMenuButton asChild isActive={isActivePath(pathname, child.url)}>
        <Link href={`${child.url}`} className="text-label">
          {child.icon}
          <span>{t(child.title)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
