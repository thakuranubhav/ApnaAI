# Chatbot Stack (db_updated.py + Next.js)

This repo now has:
- `db_updated.py`: LangGraph chatbot logic (existing)
- `api_server.py`: FastAPI wrapper over `db_updated.py`
- `nextjs-chat-ui/`: Next.js web interface

## 1) Start Python backend

```powershell
pip install -r requirements.txt
uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload
```

Backend endpoints:
- `GET /health`
- `GET /threads`
- `POST /threads`
- `GET /threads/{thread_id}/messages`
- `POST /chat`

## 2) Start Next.js frontend

```powershell
cd nextjs-chat-ui
copy .env.local.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## 3) Backend URL

Frontend reads `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_AUTH_API_BASE_URL` from `nextjs-chat-ui/.env.local`.
Defaults are:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
NEXT_PUBLIC_AUTH_API_BASE_URL=https://auth-api-chatbot.onrender.com
```
