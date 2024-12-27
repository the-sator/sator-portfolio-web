import { z } from "zod";
import { Admin } from "./admin.type";
import { User } from "./user.type";
import { BaseFilterSchema } from "./base.type";
import { ChatMemberRole, ChatMessageType } from "@/enum/chat.enum";
export type ChatMember = {
  id: string;
  admin_id: string;
  user_id: string;
  chat_room_id: string;
  role: ChatMemberRole;
  joined_at: Date;
  left_at?: Date;
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
  last_message_id?: string;
  last_message?: ChatMessage;
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
  media?: string[];
  message_type: ChatMessageType;
  chat_member: ChatMember;
  chat_room: ChatRoom;
};

export type InvitableChatMember = {
  admins: Admin[];
  users: User[];
};

export type ChatRoomRef = {
  scrollToBottom: () => void;
};

export const CreateChatMessageSchema = z.object({
  chat_member_id: z.string(),
  chat_room_id: z.string(),
  content: z.string().trim(),
  media: z.array(z.string()).optional(),
  message_type: z.nativeEnum(ChatMessageType),
});

export const CreateChatMemberSchema = z.object({
  user_id: z.string().optional(),
  admin_id: z.string().optional(),
  role: z.nativeEnum(ChatMemberRole),
  chat_room_id: z.string({ message: "Chat Room ID is Required" }),
});

export const CreateChatRoomSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  chat_members: z.array(z.string()).optional(),
  is_group: z.boolean().optional(),
});

export const ChatMessageFilterSchema = BaseFilterSchema.extend({
  content: z.string().optional(),
});

export const InviteChatMemberSchema = z.object({
  chat_members: z.array(z.string(), { message: "Chat Member is Required" }),
  chat_room_id: z.string({ message: "Chat Room ID is Required" }),
});

export const ChangeChatRoomNameSchema = z.object({
  name: z.string({ message: "Name is Required" }),
});

export const ChatRoomFilterSchema = BaseFilterSchema.extend({
  chat_room_name: z.string().optional(),
});

export type CreateChatMember = z.infer<typeof CreateChatMemberSchema>;
export type CreateChatMessage = z.infer<typeof CreateChatMessageSchema>;
export type CreateChatRoom = z.infer<typeof CreateChatRoomSchema>;
export type ChangeChatRoomName = z.infer<typeof ChangeChatRoomNameSchema>;
export type ChatMessageFilter = z.infer<typeof ChatMessageFilterSchema>;
export type InviteChatMember = z.infer<typeof InviteChatMemberSchema>;
export type ChatRoomFilter = z.infer<typeof ChatRoomFilterSchema>;
