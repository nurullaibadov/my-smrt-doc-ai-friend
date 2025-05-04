
import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import { Message } from "../types/chat";
import { v4 as uuidv4 } from "uuid";
import { sendMessageToOpenAI } from "../services/openaiService";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hi there! I'm MySmrtDoc, your AI medical assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (content: string) => {
    const newUserMessage: Message = {
      id: uuidv4(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    
    try {
      // Send to OpenAI and get response
      const response = await sendMessageToOpenAI([...messages, newUserMessage]);
      
      // Add AI response to chat
      const newAIMessage: Message = {
        id: uuidv4(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, newAIMessage]);
    } catch (error) {
      console.error("Error getting response from AI:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        content: "I'm sorry, I'm having trouble connecting. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle scroll events to show/hide scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      
      setShowScrollButton(!isNearBottom);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-screen flex-col bg-background">
      <ChatHeader />
      
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 sm:px-6"
      >
        <div className="mx-auto max-w-3xl">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {showScrollButton && (
        <Button
          onClick={scrollToBottom}
          className="scroll-to-bottom-button"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;
