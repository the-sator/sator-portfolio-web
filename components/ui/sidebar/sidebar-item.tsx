import React from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "./sidebar";
import { MdArticle, MdDashboard, MdDesignServices } from "react-icons/md";
import { FaKey, FaUser } from "react-icons/fa6";
// import ThemeSwitch from "../theme-switch";
import { IoIosSettings } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import { FaQuestionCircle, FaUserCog } from "react-icons/fa";
import SidebarMenuNavItem from "./sidebar-menu-nav-item";
import { getTranslations } from "next-intl/server";
import { Admin } from "@/types/admin.type";
import { getRoleById } from "@/data/role";

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
type Props = {
  admin: Admin;
};
export default async function SidebarItem({ admin }: Props) {
  const t = await getTranslations("SidebarItem");
  const { data } = await getRoleById(admin.role.id);
  const filteredItems = items
    .map((item) => ({
      ...item,
      children: item.children.filter((child) => {
        // TODO: Config later, should only have dashboard and setting
        if (["Dashboard", "Setting", "Portfolio Form"].includes(child.resource))
          return true;
        const permission = data?.permissions.find(
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
              {item.children.map((child) => {
                return <SidebarMenuNavItem child={child} key={child.title} />;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
