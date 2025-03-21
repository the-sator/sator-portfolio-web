"use client";
import ChatList from "./chat-list";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { User } from "@/types/user.type";
import { Admin } from "@/types/admin.type";

type Props = {
  auth: User | Admin;
  children: React.ReactNode;
  isAdmin: boolean;
};
export const ChatRoomContainer = ({ auth, isAdmin, children }: Props) => {
  const params = useParams();
  return (
    <div
      className={cn(
        "no-scrollbar relative h-[calc(100svh-72px)] w-full overflow-y-auto rounded-sm bg-accent",
        params.id && "hidden sm:block",
      )}
    >
      <div className="sticky top-0 z-10 flex w-full items-center gap-2 bg-accent p-2">
        {children}
      </div>
      <div className="p-2">
        <ChatList isAdmin={isAdmin} auth={auth} />
      </div>
    </div>
  );
};
