import ChatBlur from "@/components/chat/chat-blur";
import ChatWindow from "@/components/chat/chat-window";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { getAdminSession } from "@/data/admin";
import { getAllInvitableChatMember } from "@/data/chat-member";
import { paginateMessagesByRoomID } from "@/data/chat-message";
import { getById } from "@/data/chat-room";
import { notFound, redirect } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function page({ params, searchParams }: Props) {
  const { id } = await params;
  const filter = await searchParams;
  const [{ data: room }, { error }, { data: members }, { data: admin }] =
    await Promise.all([
      getById(id, true),
      paginateMessagesByRoomID(id, filter, true),
      getAllInvitableChatMember(id),
      getAdminSession(),
    ]);
  if (!room) {
    notFound();
  }

  if (!admin) {
    redirect(ADMIN_LOGIN_PATH);
  }

  return (
    <div className="relative col-span-2 h-[calc(100svh-72px)] w-full overflow-hidden rounded-sm bg-accent">
      {error && <ChatBlur room={room} auth={admin} isAdmin={true} />}
      <ChatWindow
        filter={filter}
        room={room}
        auth={admin}
        isAdmin={true}
        members={members}
      />
    </div>
  );
}
