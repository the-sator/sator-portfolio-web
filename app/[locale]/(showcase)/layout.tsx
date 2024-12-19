import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button/link-button";
import Link from "next/link";
import React from "react";
import { IoChatbox } from "react-icons/io5";

export default function layout({ children }: { children: React.ReactNode }) {
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
    <div>
      <header>
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
            <Link href={"/chat"}>
              <IoChatbox size={20} />
            </Link>
            <LinkButton href={"/login"} className="h-7">
              Login
            </LinkButton>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
