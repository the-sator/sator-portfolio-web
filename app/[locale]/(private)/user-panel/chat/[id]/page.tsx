import ChatBlur from "@/components/chat/chat-blur";
import ChatWindow from "@/components/chat/chat-window";
import { USER_LOGIN_PATH } from "@/constant/base";
import { paginateMessagesByRoomID } from "@/data/chat-message";
import { getById } from "@/data/chat-room";
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
  const [{ data: room }, { error }, { data }] = await Promise.all([
    getById(id),
    paginateMessagesByRoomID(id, filter, false),
    getUserSession(),
  ]);

  if (!data) {
    redirect(USER_LOGIN_PATH);
  }

  if (!room) {
    notFound();
  }

  return (
    <div className="relative col-span-2 h-[calc(100svh-72px)] w-full overflow-hidden rounded-sm bg-accent">
      {error && <ChatBlur room={room} auth={data} isAdmin={false} />}
      <ChatWindow filter={filter} room={room} auth={data} isAdmin={false} />
    </div>
  );
}
