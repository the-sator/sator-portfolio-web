"use client";
import { ToastAction } from "@/components/ui/toast";
import { WSEventType, WSReceiver } from "@/enum/ws-event.enum";
import { useToast } from "@/hooks/use-toast";
import { initializeSocket } from "@/lib/socket";
import { useUnreadMessage } from "@/store/unread-message";
import { WSPayload } from "@/types/base.type";
import { ChatMessage } from "@/types/chat.type";
import { useParams, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useRef } from "react";

const NotificationContext = createContext({
  notification: null,
});

export const NotificationProvider = ({
  authId,
  children,
}: {
  authId: string;
  children: React.ReactNode;
}) => {
  //   const { updateQuery, clearQuery, isPending } = useInternalUpdateQuery();
  const params = useParams();
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const { unread_counts, setUnreadCounts } = useUnreadMessage();
  const paramsRef = useRef(params.id); // Create a ref to store params.id
  const unreadCountsRef = useRef(unread_counts);
  const socket = initializeSocket(authId);

  useEffect(() => {
    unreadCountsRef.current = unread_counts;
  }, [unread_counts]);

  useEffect(() => {
    paramsRef.current = params.id;
  }, [params.id]);

  const handleNotification = () => {
    console.log("Notification");
  };

  const handleNewMessage = (payload: WSPayload<ChatMessage>) => {
    if (payload.type === WSEventType.NEW_MESSAGE) {
      if (paramsRef.current === payload.data.chat_room_id) return;
      if (
        payload.data.chat_member.user_id === authId ||
        payload.data.chat_member.admin_id === authId
      )
        return;
      const unread = unreadCountsRef.current.find(
        (u) => u.chat_room_id === payload.data.chat_room_id,
      );
      if (!unread) {
        toast({
          title: "Error",
          description: "Unread count not found",
          variant: "destructive",
        });
        return;
      }
      setUnreadCounts(
        payload.data.chat_room_id,
        (unread.total_count += 1 || 1),
      );
      toast({
        title: "New Message",
        description: payload.data.content,
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => {
              dismiss();
              router.push(`/admin-panel/chat/${payload.data.chat_room_id}`);
            }}
          >
            View
          </ToastAction>
        ),
      });
    }
  };

  useEffect(() => {
    socket.on("notification", handleNotification);
    socket.on(`${WSReceiver.MEMBER}:${authId}`, handleNewMessage);
    return () => {
      socket.off("notification", handleNotification);
      socket.off(`${WSReceiver.MEMBER}:${authId}`, handleNewMessage);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notification: null }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
