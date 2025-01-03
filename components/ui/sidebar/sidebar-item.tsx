"use client";
import React, { useEffect } from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "./sidebar";
import { MdArticle, MdDashboard, MdDesignServices } from "react-icons/md";
import { FaKey, FaUser, FaUserPen } from "react-icons/fa6";
// import ThemeSwitch from "../theme-switch";
import { IoIosSettings } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaQuestionCircle, FaUserCog } from "react-icons/fa";
import SidebarMenuNavItem from "./sidebar-menu-nav-item";
import { Role } from "@/types/role.type";
import { useTranslations } from "next-intl";
import { useUnreadMessage } from "@/store/unread-message";

type Props = {
  role: Role | null;
};
export default function SidebarItem({ role }: Props) {
  const t = useTranslations("SidebarItem");
  const { unread_counts, fetchUnreadCounts } = useUnreadMessage();

  useEffect(() => {
    fetchUnreadCounts(true);
  }, [fetchUnreadCounts]);
  const unreadTotalCount = unread_counts.reduce((acc, { total_count }) => {
    return acc + total_count;
  }, 0);

  const items = [
    {
      title: "analytic",
      url: "#",
      children: [
        {
          title: "dashboard",
          resource: "Dashboard",
          url: "/admin-panel/dashboard",
          icon: <MdDashboard />,
        },
      ],
    },
    {
      title: "user-management",
      url: "#",
      children: [
        {
          title: "user",
          resource: "User",
          url: "/admin-panel/user",
          icon: <FaUser />,
        },

        {
          title: "site-user",
          resource: "Site User",
          url: "/admin-panel/site-user",
          icon: <FaUserPen />,
        },
      ],
    },

    {
      title: "admin-management",
      url: "#",
      children: [
        {
          title: "admin",
          resource: "Admin",
          url: "/admin-panel/admin",
          icon: <FaUserCog />,
        },
        {
          title: "role",
          resource: "Role",
          url: "/admin-panel/role",
          icon: <FaKey />,
        },
      ],
    },

    {
      title: "content-management",
      url: "#",
      children: [
        {
          title: "blog",
          resource: "Blog",
          url: "/admin-panel/blog",
          icon: <MdArticle />,
        },

        {
          title: "portfolio",
          resource: "Portfolio",
          url: "/admin-panel/portfolio",
          icon: <MdDesignServices />,
        },

        {
          title: "portfolio-form",
          resource: "Portfolio Form",
          url: "/admin-panel/portfolio-form",
          icon: <FaQuestionCircle />,
        },
      ],
    },

    {
      title: "communication",
      url: "#",
      children: [
        {
          title: "chat",
          resource: "Chat",
          url: "/admin-panel/chat",
          icon: <IoChatboxEllipses />,
          badge: unreadTotalCount,
        },
      ],
    },

    {
      title: "configuration",
      url: "#",
      children: [
        {
          title: "setting",
          resource: "Setting",
          url: "/admin-panel/setting",
          icon: <IoIosSettings />,
        },
      ],
    },
  ];
  const filteredItems = items
    .map((item) => ({
      ...item,
      children: item.children.filter((child) => {
        // TODO: Config later, should only have dashboard and setting
        if (["Dashboard", "Setting", "Portfolio Form"].includes(child.resource))
          return true;
        const permission = role?.permissions.find(
          (perm) => perm.resource?.name === child.resource,
        );
        return permission?.read; // Only include if read is true
      }),
    }))
    .filter((item) => item.children.length > 0);
  return (
    <SidebarContent>
      {filteredItems.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{t(item.title)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.children.map((item) => {
                return <SidebarMenuNavItem item={item} key={item.title} />;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
