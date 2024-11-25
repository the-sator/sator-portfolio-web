"use client";
import React from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { MdArticle, MdDashboard, MdDesignServices } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
// import ThemeSwitch from "../theme-switch";
import { IoIosSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";

const items = [
  {
    title: "analytic",
    url: "#",
    children: [
      {
        title: "dashboard",
        url: "/admin/dashboard",
        icon: MdDashboard,
      },
    ],
  },
  {
    title: "user-management",
    url: "#",
    children: [
      {
        title: "user",
        url: "/admin-panel/user",
        icon: FaUser,
      },
    ],
  },

  {
    title: "admin-management",
    url: "#",
    children: [
      {
        title: "admin",
        url: "/admin-panel/admin",
        icon: FaUser,
      },
    ],
  },

  {
    title: "content-management",
    url: "#",
    children: [
      {
        title: "blog",
        url: "/admin-panel/blog",
        icon: MdArticle,
      },

      {
        title: "portfolio",
        url: "/admin-panel/portfolio",
        icon: MdDesignServices,
      },

      {
        title: "portfolio-form",
        url: "/admin-panel/portfolio-form",
        icon: FaQuestionCircle,
      },
    ],
  },

  {
    title: "communication",
    url: "#",
    children: [
      {
        title: "chat",
        url: "/admin-panel/chat",
        icon: IoChatboxEllipses,
      },
    ],
  },

  {
    title: "configuration",
    url: "#",
    children: [
      {
        title: "setting",
        url: "/admin-panel/setting",
        icon: IoIosSettings,
      },
    ],
  },
];

export default function SidebarItem() {
  const pathname = usePathname();
  const t = useTranslations("SidebarItem");

  // const path = pathname.split("/")[2];
  const isActivePath = (currentPath: string, childUrl: string) => {
    if (childUrl === "/") {
      return ["/", "/en", "/kh"].includes(currentPath);
    }
    return currentPath.replace(/^\/(en|kh)/, "") === childUrl;
  };

  return (
    <SidebarContent>
      {items.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{t(item.title)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.children.map((child) => (
                <SidebarMenuItem key={child.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath(pathname, child.url)}
                  >
                    <Link href={`${child.url}`} className="text-label">
                      <child.icon />
                      <span>{t(child.title)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
