import cors from "cors";
import express, {
  type ErrorRequestHandler,
  type Request,
  type Response
} from "express";
import { router as chatRouter } from "./routes/chat.routes.js";

export function createApp() {
  const app = express();

  app.use(cors({
    origin: [
      'http://localhost:5173',
      process.env.CLIENT_URL
    ]
  }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_request: Request, response: Response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/chat", chatRouter);

  const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    const status =
      typeof (error as { status?: unknown }).status === "number"
        ? ((error as { status: number }).status)
        : 500;

    response.status(status).json({
      error: error.message || "Внутренняя ошибка сервера."
    });
  };

  app.use(errorHandler);

  return app;
}
