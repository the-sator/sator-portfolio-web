import LoginForm from "@/components/ui/form/login-form";
import React from "react";
``;
export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <LoginForm isAdmin={false} />
    </div>
  );
}
