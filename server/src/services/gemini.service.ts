import { GoogleGenAI } from "@google/genai";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function generateChatReply(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    const error: Error & { status?: number } = new Error("Не задан API_KEY для AI сервиса.");
    error.status = 500;
    throw error;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: messages.map((entry) => ({
        role: entry.role === "assistant" ? "model" : "user",
        parts: [{ text: entry.content }]
      }))
    });

    const text = response.text;

    if (!text) {
      const error: Error & { status?: number } = new Error("Gemini API не вернул текст.");
      error.status = 502;
      throw error;
    }

    return text;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Ошибка при обращении к Gemini API.";
    const error: Error & { status?: number } = new Error(message);
    error.status =
      typeof err === "object" && err !== null && "status" in err && typeof err.status === "number"
        ? err.status
        : 500;
    throw error;
  }
}
