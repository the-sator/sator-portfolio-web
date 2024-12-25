import ChatList from "@/components/chat/chat-list";
import { Input } from "@/components/ui/input";
import { USER_LOGIN_PATH } from "@/constant/base";
import { getUserChatRoom } from "@/data/chat-room";
import { getUserSession } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  children: React.ReactNode;
};
export default async function layout({ children }: Props) {
  const [{ data: rooms }, { auth }] = await Promise.all([
    getUserChatRoom(),
    getUserSession(),
  ]);
  if (!auth) {
    return redirect(USER_LOGIN_PATH);
  }
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <div className="no-scrollbar relative h-[calc(100svh-72px)] w-full overflow-y-auto rounded-sm bg-accent">
        <div className="sticky top-0 z-10 flex w-full items-center gap-2 bg-accent p-2">
          <Input placeholder="Search..." />
        </div>
        <div className="p-2">
          {rooms && rooms.length > 0 ? (
            <ChatList rooms={rooms} isAdmin={false} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-label">No Chat Room</p>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
