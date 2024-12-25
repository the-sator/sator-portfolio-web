import ChatBlur from "@/components/chat/chat-blur";
import ChatWindow from "@/components/chat/chat-window";
import { getAdminSession } from "@/data/admin";
import { getAllInvitableChatMember } from "@/data/chat-member";
import { paginateMessagesByRoomID } from "@/data/chat-message";
import { adminGetById } from "@/data/chat-room";
import { notFound, redirect } from "next/navigation";
import React from "react";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function page({ params, searchParams }: Props) {
  const id = (await params).id;
  const filter = await searchParams;
  const [{ data: room }, { error }, { data: members }, { auth }] =
    await Promise.all([
      adminGetById(id),
      paginateMessagesByRoomID(id, filter, true),
      getAllInvitableChatMember(id),
      getAdminSession(),
    ]);

  if (!room) {
    notFound();
  }

  if (!auth) {
    redirect("/login");
  }

  return (
    <div className="relative col-span-2 h-[calc(100svh-72px)] w-full overflow-hidden rounded-sm bg-accent">
      {error && <ChatBlur room={room} auth={auth} isAdmin={true} />}
      <ChatWindow
        filter={filter}
        room={room}
        auth={auth}
        isAdmin={true}
        members={members}
      />
    </div>
  );
}
