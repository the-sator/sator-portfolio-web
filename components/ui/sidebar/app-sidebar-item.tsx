"use client";
import { useTranslations } from "next-intl";
import React from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "./sidebar";
import SidebarMenuNavItem from "./sidebar-menu-nav-item";
import { RiGlobalLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { IoChatboxEllipses, IoDocumentText } from "react-icons/io5";

export default function AppSidebarItem() {
  const t = useTranslations("SidebarItem");
  const items = [
    {
      title: "site-management",
      url: "#",
      children: [
        {
          title: "site",
          resource: "Website",
          url: "/user-panel/site",
          icon: <RiGlobalLine />,
        },
      ],
    },
    {
      title: "form-management",
      url: "#",
      children: [
        {
          title: "form",
          resource: "Form Attempt",
          url: "/user-panel/form",
          icon: <IoDocumentText />,
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
          url: "/user-panel/chat",
          icon: <IoChatboxEllipses />,
          //   badge: unreadTotalCount,
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
          url: "/user-panel/setting",
          icon: <IoIosSettings />,
        },
      ],
    },
  ];
  return (
    <SidebarContent>
      <div className="w-full p-4">
        <p>SATOR</p>
      </div>
      {items.map((item) => (
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
