import ChatBlur from "@/components/chat/chat-blur";
import ChatList from "@/components/chat/chat-list";
import ChatWindow from "@/components/chat/chat-window";
import { Input } from "@/components/ui/input";
import { paginateMessagesByRoomID } from "@/data/chat-message";
import { getAllRooms, getById, getUserChatRoom } from "@/data/chat-room";
import { getUserSession } from "@/data/user";
import { notFound, redirect } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function page({ params, searchParams }: Props) {
  const id = (await params).id;
  const filter = await searchParams;
  const [
    { data: rooms },
    { data: room, error: roomError },
    { error },
    { auth },
  ] = await Promise.all([
    getUserChatRoom(),
    getById(id),
    paginateMessagesByRoomID(id, filter, false),
    getUserSession(),
  ]);

  if (!auth) {
    redirect("/admin-panel/login");
  }

  if (!room) {
    notFound();
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <div className="no-scrollbar relative h-[calc(100svh-90px)] w-full overflow-y-auto rounded-sm bg-accent">
        <div className="sticky top-0 z-10 w-full bg-accent p-2">
          <Input placeholder="Search..." />
        </div>
        <div className="p-2">
          {rooms && rooms.length > 0 ? (
            <ChatList rooms={rooms} activeRoomId={id} isAdmin={false} />
          ) : (
            <div>No Result</div>
          )}
        </div>
      </div>

      <div className="relative col-span-2 h-[calc(100svh-90px)] w-full overflow-hidden rounded-sm bg-accent">
        {error && <ChatBlur room={room} auth={auth} />}
        <ChatWindow filter={filter} room={room} auth={auth} isAdmin={false} />
      </div>
    </div>
  );
}
