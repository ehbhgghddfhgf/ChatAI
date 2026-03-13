# Chat App on Svelte + Express

## Быстрый старт

1. Создать `.env` на основе `.env.example`.
2. Установить зависимости:

```bash
npm install
```

3. Запустить проект в режиме разработки:

```bash
npm run dev
```

- front: `http://localhost:5173`
- back: `http://localhost:3001`

## Docker

```bash
docker compose up --build
```

- приложение: `http://localhost:8080`

## .env

- `GEMINI_API_KEY` - ключ Gemini API
- `GEMINI_MODEL` - модель, по умолчанию `gemini-3-flash-preview`
- `SERVER_PORT` - порт Express в локальной разработке
- `CLIENT_PORT` - порт Vite в локальной разработке
