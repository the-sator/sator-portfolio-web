"use client";
import React, { useEffect } from "react";
import { IoChatbox } from "react-icons/io5";
import { LinkButton } from "../ui/button/link-button";
import Link from "next/link";
import Indicator from "../ui/indicator";
import { useUnreadMessage } from "@/store/unread-message";
import ThemeSwitch from "../ui/theme-switch";

type Props = {
  showChat?: boolean;
};
export default function AppNavbar({ showChat = false }: Props) {
  const { unread_counts, fetchUnreadCounts } = useUnreadMessage();
  useEffect(() => {
    if (!showChat) return;
    fetchUnreadCounts(false);
  }, [fetchUnreadCounts, showChat]);
  const unreadTotalCount = unread_counts.reduce((acc, { total_count }) => {
    return acc + total_count;
  }, 0);
  const navItems = [
    {
      id: 1,
      label: "Home",
      href: "/",
    },
    {
      id: 2,
      label: "Portfolio",
      href: "/",
    },
    {
      id: 3,
      label: "Blog",
      href: "/blog",
    },
    {
      id: 4,
      label: "About",
      href: "/",
    },
    {
      id: 5,
      label: "Contact",
      href: "/",
    },
  ];
  return (
    <nav className="flex h-14 w-full items-center justify-between border-b px-20">
      <div className="flex gap-20">
        <p>LOGO</p>
        <ul className="flex gap-10">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-6">
        {showChat && (
          <Link href={"/chat"} className="relative">
            <IoChatbox size={20} />
            {!!unreadTotalCount && unreadTotalCount > 0 && (
              <Indicator
                className="absolute -right-0.5 -top-0.5 size-3 animate-none rounded-full bg-red-500"
                count={unreadTotalCount}
                size="xs"
              />
            )}
          </Link>
        )}
        <ThemeSwitch />
        <LinkButton href={"/user-panel/site"} className="h-7">
          Dashboard
        </LinkButton>
      </div>
    </nav>
  );
}
