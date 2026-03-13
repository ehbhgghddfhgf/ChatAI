import { Router, type NextFunction, type Request, type Response } from "express";
import { generateChatReply } from "../services/gemini.service.js";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  message?: string;
  messages?: ChatMessage[];
};

type ChatResponseBody = {
  reply: string;
};

type ErrorResponseBody = {
  error: string;
};

export const router = Router();

router.post(
  "/",
  async (
    request: Request<Record<string, never>, ChatResponseBody | ErrorResponseBody, ChatRequestBody>,
    response: Response<ChatResponseBody | ErrorResponseBody>,
    next: NextFunction
  ) => {
    try {
      const requestMessages = request.body?.messages
        ?.filter((entry): entry is ChatMessage => {
          return (
            entry?.role !== undefined &&
            (entry.role === "user" || entry.role === "assistant") &&
            typeof entry.content === "string" &&
            entry.content.trim().length > 0
          );
        })
        .map((entry) => ({
          role: entry.role,
          content: entry.content.trim()
        }));

      const fallbackMessage = request.body?.message?.trim();

      if (!requestMessages?.length && !fallbackMessage) {
        return response.status(400).json({
          error: "Нужно передать message или непустой массив messages."
        });
      }

      const reply = await generateChatReply(
        requestMessages?.length
          ? requestMessages
          : [{ role: "user", content: fallbackMessage as string }]
      );

      return response.json({ reply });
    } catch (error) {
      next(error);
      return undefined;
    }
  }
);
