"use client";
import React, { useEffect } from "react";
import { IoChatbox } from "react-icons/io5";
import { LinkButton } from "../ui/button/link-button";
import Link from "next/link";
import Indicator from "../ui/indicator";
import { useUnreadMessage } from "@/store/unread-message";

export default function AppNavbar() {
  const { unread_counts, fetchUnreadCounts } = useUnreadMessage();
  useEffect(() => {
    fetchUnreadCounts(false);
  }, [fetchUnreadCounts]);
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
      href: "/",
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
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-6">
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
        <LinkButton href={"/login"} className="h-7">
          Login
        </LinkButton>
      </div>
    </nav>
  );
}
