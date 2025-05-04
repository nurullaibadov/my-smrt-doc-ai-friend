
import { Message } from "../types/chat";

// This would typically come from environment variables
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

export const sendMessageToOpenAI = async (messages: Message[]): Promise<string> => {
  // In a production app, this would be a real API call to OpenAI
  // For this demo, we're simulating responses
  console.log("Sending to OpenAI:", messages);
  
  const lastMessage = messages[messages.length - 1];
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple response logic for demo
  const userMessage = lastMessage.content.toLowerCase();
  
  if (userMessage.includes("hello") || userMessage.includes("hi")) {
    return "Hello! I'm MySmrtDoc, your AI medical assistant. How can I help you today?";
  }
  
  if (userMessage.includes("headache")) {
    return "I'm sorry to hear you're experiencing a headache. How long have you been having it, and can you describe the pain? Is it sharp, dull, throbbing, or something else? Also, are you experiencing any other symptoms like nausea, sensitivity to light, or fever?";
  }
  
  if (userMessage.includes("cold") || userMessage.includes("flu") || userMessage.includes("fever")) {
    return "It sounds like you might be experiencing symptoms of a cold or flu. Common remedies include rest, staying hydrated, and over-the-counter medications to manage symptoms. If you have a high fever (above 101°F or 38.3°C) that persists, or if symptoms worsen, I'd recommend consulting with a healthcare provider.";
  }
  
  if (userMessage.includes("thank")) {
    return "You're welcome! Is there anything else I can help you with regarding your health?";
  }
  
  return "I understand your concern. To provide you with the most accurate information, could you share more details about your symptoms? This will help me better understand your situation and provide appropriate guidance.";
};
