import AppNavbar from "@/components/navbar/app-navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  );
}
