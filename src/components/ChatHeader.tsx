
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-4 py-2 sm:px-6">
      <div className="flex items-center space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-pulse"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">MySmrtDoc</h1>
          <p className="text-xs text-muted-foreground">Your AI Medical Assistant</p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default ChatHeader;
