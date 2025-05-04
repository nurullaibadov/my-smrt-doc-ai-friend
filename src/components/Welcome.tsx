
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Welcome: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
          </svg>
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">
          MySmrtDoc
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Your AI Medical Assistant
        </p>
        <p className="mb-8 text-muted-foreground">
          Get health guidance, medical information, and support through natural conversation with our AI medical assistant.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/chat">Start a Conversation</Link>
          </Button>
          <div className="text-sm text-muted-foreground">
            <p>
              For informational purposes only. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
