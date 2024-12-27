import ChatList from "@/components/chat/chat-list";
import FilterInput from "@/components/ui/filter/filter-input";
import { USER_LOGIN_PATH } from "@/constant/base";
import { getUserSession } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  children: React.ReactNode;
};
export default async function layout({ children }: Props) {
  const { auth } = await getUserSession();
  if (!auth) {
    redirect(USER_LOGIN_PATH);
  }
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <div className="no-scrollbar relative h-[calc(100svh-72px)] w-full overflow-y-auto rounded-sm bg-accent">
        <div className="sticky top-0 z-10 flex w-full items-center gap-2 bg-accent p-2">
          <FilterInput placeholder="Search..." filterKey="chat_room_name" />
        </div>
        <div className="p-2">
          <ChatList isAdmin={false} auth={auth} />
        </div>
      </div>
      {children}
    </div>
  );
}
