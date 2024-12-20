import ChatList from "@/components/chat/chat-list";
import { Input } from "@/components/ui/input";
import { getAllRooms } from "@/data/chat-room";
import React from "react";

export default async function page() {
  const { data: rooms } = await getAllRooms();
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <div className="no-scrollbar relative h-[calc(100svh-72px)] w-full overflow-y-auto rounded-sm bg-accent">
        <div className="sticky top-0 z-10 w-full bg-accent p-2">
          <Input placeholder="Search..." />
        </div>
        <div className="p-2">
          {rooms && rooms.length > 0 ? (
            <ChatList rooms={rooms} isAdmin={true} />
          ) : (
            <div>No Result</div>
          )}
        </div>
      </div>

      <div className="col-span-2 flex h-[calc(100svh-72px)] w-full items-center justify-center overflow-hidden rounded-sm bg-accent">
        <span className="rounded-full bg-background px-4 py-1 text-sm">
          Select a chat to start messaging
        </span>
      </div>
    </div>
  );
}
