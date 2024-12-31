import React from "react";

export default async function page() {
  return (
    <div className="col-span-2 hidden h-[calc(100svh-72px)] w-full items-center justify-center overflow-hidden rounded-sm bg-accent sm:flex">
      <span className="rounded-full bg-background px-4 py-1 text-sm">
        Select a chat to start messaging
      </span>
    </div>
  );
}
