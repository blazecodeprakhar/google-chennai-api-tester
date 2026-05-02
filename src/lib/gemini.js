import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiResponse = async (apiKey, prompt, history = []) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    
    // Format history for Gemini
    let chatHistory = history
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }))
      .filter(msg => msg.parts[0].text.trim() !== "");

    // Ensure history starts with a user message
    const firstUserIndex = chatHistory.findIndex(msg => msg.role === 'user');
    chatHistory = firstUserIndex !== -1 ? chatHistory.slice(firstUserIndex) : [];

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("429")) {
      return "Error: Daily limit reached (Quota 429). Please try again later or check your API key.";
    }
    return "Error: I encountered an issue. Please check your connection or API key.";
  }
};
