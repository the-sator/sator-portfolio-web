import { z } from "zod";
import { Admin } from "./admin.type";
import { User } from "./user.type";
export type ChatMember = {
  id: string;
  admin_id: string;
  user_id: string;
  chat_room_id: string;
  role: ChatMemberRole;
  joined_at: Date;
  admin?: Admin;
  user?: User;
  chat_room: ChatRoom;
  chat_messages: ChatMessage[];
};

export type ChatRoom = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  is_group: boolean;
  chat_members: ChatMember[];
  chat_messages: ChatMessage[];
};

export type ChatMessage = {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  chat_member_id: string;
  chat_room_id: string;
  content: string;
  message_type: ChatMessageType;
  chat_member: ChatMember;
  chat_room: ChatRoom;
};

export enum ChatMessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
}
export enum ChatMemberRole {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}

export const CreateChatMessageSchema = z.object({
  chat_member_id: z.string(),
  chat_room_id: z.string(),
  content: z.string().trim().min(1, { message: "Message cannot be empty" }),
  message_type: z.nativeEnum(ChatMessageType),
});

export const CreateChatMemberSchema = z.object({
  user_id: z.string().optional(),
  admin_id: z.string().optional(),
  role: z.nativeEnum(ChatMemberRole),
  chat_room_id: z.string({ message: "Chat Room ID is Required" }),
});

export type CreateChatMember = z.infer<typeof CreateChatMemberSchema>;
export type CreateChatMessage = z.infer<typeof CreateChatMessageSchema>;
