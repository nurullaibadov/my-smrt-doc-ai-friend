
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 z-10 border-t bg-background p-4 sm:px-6"
    >
      <div className="relative flex items-end gap-2">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-12 resize-none rounded-md border-input py-3 pr-12"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute bottom-1 right-1"
          disabled={inputValue.trim() === "" || isLoading}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        MySmrtDoc provides general information, not medical advice. 
        Always consult a healthcare professional for medical concerns.
      </p>
    </form>
  );
};

export default ChatInput;
