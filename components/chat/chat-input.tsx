"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MdSend } from "react-icons/md";
import { ChatRoom, ChatRoomRef, CreateChatMessage } from "@/types/chat.type";
import { toast } from "@/hooks/use-toast";
import { sendMessageAction } from "@/action/chat-message.action";
import { ChatMessageType } from "@/enum/chat.enum";
import MultiUploadButton from "../ui/button/multi-upload-button";
import { ImagePreview } from "@/types/base.type";
import { FiPaperclip } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Spinner from "../ui/spinner";
import ImageContainerBlurClient from "../ui/image/image-container-blur-client";
import { IoIosClose } from "react-icons/io";
import { UploadState } from "@/enum/base.enum";
import { User } from "@/types/user.type";
import { Admin } from "@/types/admin.type";
type Props = {
  auth: User | Admin;
  room: ChatRoom;
  isAdmin: boolean;
  chatRoomRef: React.RefObject<ChatRoomRef>;
};
export default function ChatInput({ room, auth, isAdmin, chatRoomRef }: Props) {
  const [content, setContent] = useState("");
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [images, setImages] = useState<File[] | null>(null);

  const chat_member = room.chat_members
    ? room.chat_members.find(
        (member) => member.admin_id === auth.id || member.user_id === auth.id,
      )
    : undefined;

  const handleSendMessage = async () => {
    if (!content.trim() && imagePreviews.length === 0) {
      toast({
        title: "Message content cannot be empty",
        variant: "destructive",
      });
      return;
    }
    if (!chat_member) {
      toast({
        title: "You are not a member",
        variant: "destructive",
      });
      return;
    }
    const medias = imagePreviews.map((image) => image.url || "") || [];
    const payload: CreateChatMessage = {
      chat_member_id: chat_member.id,
      chat_room_id: room.id,
      content: content,
      media: medias,
      message_type:
        medias && medias.length > 0
          ? ChatMessageType.IMAGE
          : ChatMessageType.TEXT,
    };

    const { error } = await sendMessageAction(payload, isAdmin);
    if (error) {
      toast({
        title: "Send Message Error",
        description: error.error,
        variant: "destructive",
      });
    } else {
      if (chatRoomRef.current) {
        chatRoomRef.current.scrollToBottom();
      }
      setContent("");
      setImagePreviews([]);
      setImages(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleDeletePreview = (id: string) => {
    setImagePreviews((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <div className="relative">
      {imagePreviews.length > 0 && (
        <div
          className={cn("flex h-20 w-full items-center gap-4 bg-popover px-4")}
        >
          {imagePreviews.map((image, index) => (
            <div key={index} className="relative my-2">
              {image.status === UploadState.PENDING ? (
                <div className="relative left-0 top-0 z-10 flex size-14 items-center justify-center bg-accent/90">
                  <Spinner size={24} />
                </div>
              ) : image.status === UploadState.UPLOADED ? (
                <ImageContainerBlurClient
                  src={image.url!} // Safe to access as it's set on upload completion
                  className="size-14 rounded-sm"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-sm bg-red-500 text-white">
                  Failed
                </div>
              )}
              <Button
                variant="icon"
                type="button"
                size="icon"
                onClick={() => handleDeletePreview(image.id)}
                className="absolute -right-1 -top-1 z-20 h-4 w-4 rounded-full bg-red-500 hover:bg-red-500/50"
              >
                <IoIosClose />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="relative z-20 flex h-10 items-center">
        <Input
          placeholder="Write something here"
          className="h-full rounded-br-none rounded-tr-none bg-popover pr-14"
          name="content"
          value={content}
          autoComplete="off"
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="default"
          type="button"
          onClick={handleSendMessage}
          className="h-10 rounded-bl-none rounded-tl-none p-4"
        >
          <MdSend />
        </Button>
        <MultiUploadButton
          setImagePreviews={setImagePreviews}
          images={images}
          setImages={setImages}
          className="absolute right-14"
        >
          <Button variant="icon" type="button">
            <FiPaperclip />
          </Button>
        </MultiUploadButton>
        {/* <Button
          variant="icon"
          type="button"
          className="absolute right-14"
          onClick={() => setIsShow(!isShow)}
        >
          <FiPaperclip />
        </Button> */}
      </div>
    </div>
  );
}
