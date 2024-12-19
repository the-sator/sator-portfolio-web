import { LinkButton } from "@/components/ui/button/link-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Not Found</h1>
        <p className="text-sm text-label">Could not find requested resource</p>
      </div>
      <LinkButton href="/">Return Home</LinkButton>
    </div>
  );
}
