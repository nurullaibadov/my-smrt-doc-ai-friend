
import React from "react";
import { Message } from "../types/chat";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn("flex w-full items-start gap-4 py-4", 
        isUser ? "justify-end" : "justify-start",
        "chat-message-animate-in"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-primary text-primary-foreground">MD</AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={cn(
          "relative max-w-md rounded-lg px-4 py-3 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p>{message.content}</p>
        <div className="mt-1 text-right">
          <span className="text-xs opacity-50">
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback className="bg-secondary">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
