import ChatList from "@/components/chat/chat-list";
import { Input } from "@/components/ui/input";
import { CreateChatRoomModal } from "@/components/ui/modal/chat-room-modals";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { getAdminSession } from "@/data/admin";
import { getAllInvitableChatMember } from "@/data/chat-member";
import { getAllRooms } from "@/data/chat-room";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  children: React.ReactNode;
};
export default async function layout({ children }: Props) {
  const [{ data: rooms }, { data: chatMember }, { auth }] = await Promise.all([
    getAllRooms(),
    getAllInvitableChatMember(),
    getAdminSession(),
  ]);
  if (!auth) {
    return redirect(ADMIN_LOGIN_PATH);
  }
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <div className="no-scrollbar relative h-[calc(100svh-72px)] w-full overflow-y-auto rounded-sm bg-accent">
        <div className="sticky top-0 z-10 flex w-full items-center gap-2 bg-accent p-2">
          <Input placeholder="Search..." />
          <CreateChatRoomModal member={chatMember} admin={auth} />
        </div>
        <div className="p-2">
          {rooms && rooms.length > 0 ? (
            <ChatList rooms={rooms} isAdmin={true} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-label">Click + to add chat room</p>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
