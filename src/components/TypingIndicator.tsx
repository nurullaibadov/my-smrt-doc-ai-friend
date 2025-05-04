
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full items-start gap-4 py-4">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground">MD</AvatarFallback>
      </Avatar>
      <div className="relative max-w-md rounded-lg bg-muted px-4 py-3 text-sm">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
