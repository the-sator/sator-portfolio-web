"use client";
import { initializeSocket } from "@/lib/socket";
import React, { createContext, useContext, useEffect } from "react";

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
  const socket = initializeSocket(authId);
  const handleNotification = () => {
    console.log("Notification");
  };
  useEffect(() => {
    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notification: null }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
