
import { Message } from "../types/chat";

// This would typically come from environment variables
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

export const sendMessageToOpenAI = async (messages: Message[]): Promise<string> => {
  // In a production app, this would be a real API call to OpenAI
  // For this demo, we're simulating responses
  console.log("Sending to OpenAI:", messages);
  
  const lastMessage = messages[messages.length - 1];
  
  // Simulate API call delay - random delay between 1-3 seconds for more realistic feel
  const randomDelay = Math.floor(Math.random() * 2000) + 1000;
  await new Promise(resolve => setTimeout(resolve, randomDelay));
  
  // Get the user's message in lowercase for easier matching
  const userMessage = lastMessage.content.toLowerCase();
  
  // Check message context from previous messages
  const context = messages.slice(-4).map(m => m.content.toLowerCase()).join(" ");
  
  // Check for greetings
  if ((/hello|hi|hey|howdy|greetings/i).test(userMessage)) {
    return "Hello! I'm MySmrtDoc, your AI medical assistant. How can I help you today?";
  }
  
  // Check for gratitude
  if ((/thank|thanks|appreciate/i).test(userMessage)) {
    return "You're welcome! I'm here to help with any health questions or concerns you have. Is there anything else you'd like to discuss?";
  }
  
  // Check for medical symptoms
  if ((/headache|migraine|head pain|head hurts/i).test(userMessage)) {
    if (context.includes("how long")) {
      return "The duration of your headache is important to note. Headaches lasting more than 72 hours without relief, or severe headaches that come on suddenly ('thunderclap' headaches) require immediate medical attention. Would you like me to provide some potential remedies based on the type of headache you're experiencing?";
    }
    return "I'm sorry to hear you're experiencing a headache. How long have you been having it, and can you describe the pain? Is it sharp, dull, throbbing, or something else? Also, are you experiencing any other symptoms like nausea, sensitivity to light, or fever?";
  }
  
  if ((/stomach|abdomen|belly|tummy/i).test(userMessage) && (/pain|ache|hurt|discomfort/i).test(userMessage)) {
    return "I understand you're experiencing stomach pain. This could be caused by various factors including indigestion, food sensitivities, stress, or other conditions. Can you tell me more about the pain? For example, is it sharp or dull? Constant or intermittent? Have you noticed any patterns related to eating or other activities?";
  }
  
  if ((/cold|flu|fever|cough|congestion|runny nose/i).test(userMessage)) {
    return "It sounds like you might be experiencing symptoms of a cold or flu. Common remedies include rest, staying hydrated, and over-the-counter medications to manage symptoms. If you have a high fever (above 101°F or 38.3°C) that persists, or if symptoms worsen after 7-10 days, I'd recommend consulting with a healthcare provider. Would you like specific recommendations for managing any particular symptoms?";
  }
  
  if ((/diet|nutrition|eat|food|weight|healthy eating/i).test(userMessage)) {
    return "A balanced diet is essential for overall health. The Mediterranean diet, which emphasizes fruits, vegetables, whole grains, lean proteins, and healthy fats, has been associated with numerous health benefits. Would you like some specific dietary recommendations for a particular health goal or condition?";
  }
  
  if ((/exercise|workout|fitness|physical activity/i).test(userMessage)) {
    return "Regular physical activity is important for both physical and mental health. The general recommendation is 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus muscle-strengthening activities twice weekly. What type of exercise are you currently doing or interested in?";
  }
  
  if ((/sleep|insomnia|tired|fatigue|can't sleep|trouble sleeping/i).test(userMessage)) {
    return "Good sleep hygiene is crucial for health. Most adults need 7-9 hours of quality sleep per night. If you're having trouble sleeping, consider establishing a regular sleep schedule, creating a restful environment, limiting screen time before bed, and avoiding caffeine and large meals before sleeping. Would you like more specific advice about your sleep concerns?";
  }
  
  if ((/stress|anxiety|worried|nervous|overwhelmed|mental health/i).test(userMessage)) {
    return "I'm sorry to hear you're feeling stressed or anxious. Managing stress is important for both mental and physical health. Techniques like deep breathing, mindfulness meditation, regular exercise, and adequate sleep can help. Would you like to know more about specific stress management strategies?";
  }
  
  if ((/blood pressure|hypertension|heart|cardiovascular/i).test(userMessage)) {
    return "Maintaining healthy blood pressure is important for heart health. Normal blood pressure is typically around 120/80 mmHg. Lifestyle factors that can help include regular exercise, a balanced diet low in sodium, limiting alcohol, not smoking, and managing stress. Are you currently monitoring your blood pressure?";
  }
  
  if ((/diabetes|blood sugar|glucose|insulin/i).test(userMessage)) {
    return "Managing blood sugar levels is crucial for those with or at risk for diabetes. This typically involves a balanced diet, regular exercise, medication if prescribed, and regular monitoring. What specific aspects of diabetes management would you like to discuss?";
  }
  
  if ((/vitamin|supplement|mineral/i).test(userMessage)) {
    return "While a balanced diet should provide most nutrients, some people benefit from supplements. However, it's important to note that supplements should complement, not replace, a healthy diet. Are you considering a specific supplement, or would you like information about which vitamins might benefit your particular situation?";
  }
  
  if ((/allergy|allergic|reaction/i).test(userMessage)) {
    return "Allergies can range from mild to severe and can be triggered by various substances including foods, medications, insect bites, or environmental factors. Can you share more details about the allergic reactions you're experiencing or concerned about?";
  }
  
  // If message is very short or unclear
  if (userMessage.split(" ").length < 3) {
    return "I'd be happy to help you. Could you provide more details about your question or concern so I can give you the most relevant information?";
  }
  
  // Default response for other medical questions
  if (userMessage.length > 10) {
    return "Thank you for sharing that information. To provide you with the most accurate guidance, could you tell me a bit more about your symptoms, how long you've been experiencing them, and any other relevant health details? This will help me better understand your situation.";
  }
  
  // Fallback response
  return "I understand your concern. To provide you with the most accurate information, could you share more details about your question? This will help me better understand your situation and provide appropriate guidance.";
};
