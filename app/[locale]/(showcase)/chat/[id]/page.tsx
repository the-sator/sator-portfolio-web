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
    <div className="relative col-span-2 h-[calc(100svh-72px)] w-full overflow-hidden rounded-sm bg-accent">
      {error && <ChatBlur room={room} auth={auth} />}
      <ChatWindow filter={filter} room={room} auth={auth} isAdmin={false} />
    </div>
  );
}
