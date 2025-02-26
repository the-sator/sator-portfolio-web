import { ChatRoomContainer } from "@/components/chat/chat-room-container";
import FilterInput from "@/components/ui/filter/filter-input";
import { USER_LOGIN_PATH } from "@/constant/base";
import { getUserSession } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  children: React.ReactNode;
};
export default async function layout({ children }: Props) {
  const { data } = await getUserSession();
  if (!data) {
    redirect(USER_LOGIN_PATH);
  }
  return (
    <div className="grid w-full grid-cols-1 gap-2 p-4 sm:grid-cols-3">
      <ChatRoomContainer auth={data} isAdmin={false}>
        <FilterInput
          placeholder="Search..."
          filterKey="chat_room_name"
          page={false}
        />
      </ChatRoomContainer>
      {children}
    </div>
  );
}
