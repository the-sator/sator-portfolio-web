import { ChatMessageType } from "@/enum/chat.enum";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat.type";
import { formatTime } from "./date";

type Props = {
  message: ChatMessage;
  isMe?: boolean;
};

export function RenderMessage({ message, isMe }: Props) {
  console.log("message:", message);
  console.log("ChatMessageType.JOIN:", ChatMessageType.JOIN);
  if (message.message_type === ChatMessageType.TEXT) {
    return (
      <div className={cn("flex w-full", isMe && "justify-end")}>
        <div
          className={cn(
            "relative h-fit min-w-[10%] max-w-[60%] rounded-lg bg-primary px-4 py-1.5 text-sm text-background",
            isMe && "bg-blue-500 text-white",
          )}
        >
          {!isMe && (
            <p className="text-xs font-bold">
              {message.chat_member.admin
                ? message.chat_member.admin.username
                : message.chat_member.user?.username}
            </p>
          )}
          <p>{message.content}</p>
          <p className={cn("mt-2 flex justify-end text-xs italic")}>
            {formatTime(message.created_at)}
          </p>
        </div>
      </div>
    );
  } else if (message.message_type === ChatMessageType.IMAGE) {
    return (
      <div className={cn("flex w-full", "justify-center")}>
        <span className="rounded-full bg-background px-3 py-1 text-xs text-foreground">
          Sent a photo
        </span>
      </div>
    );
  } else {
    return (
      <div className={cn("flex w-full", "justify-center")}>
        <span className="rounded-full bg-background px-3 py-1 text-xs text-foreground">
          {message.content}
        </span>
      </div>
    );
  }
}
