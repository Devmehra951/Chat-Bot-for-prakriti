# Chat Bot for Prakriti 🌿

Production-ready full-stack AI chatbot platform for environmental awareness.

## Features
- GPT-powered environment assistant (climate, pollution, biodiversity, sustainability)
- JWT auth (register/login)
- Persistent chat history with MongoDB
- Responsive React + Tailwind UI with dark/light mode
- Markdown chat rendering, copy, speech synthesis, voice input
- Export chat to TXT/PDF
- Security: Helmet, CORS, rate limiting, morgan, centralized error handling

## Tech Stack
- Frontend: React + Vite, Tailwind, Axios, React Router, Framer Motion, Lucide, React Markdown
- Backend: Node.js, Express, Mongoose, JWT
- AI: OpenAI Chat Completions API
- Deploy: Vercel (client), Render/Railway (server)

## Folder Structure
```bash
client/ ...
server/ ...
```

## Environment Variables
### server/.env
- PORT=5000
- MONGODB_URI=...
- JWT_SECRET=...
- OPENAI_API_KEY=...
- OPENAI_MODEL=gpt-4o-mini
- CLIENT_URL=https://your-frontend-domain.vercel.app

### client/.env
- VITE_API_URL=https://your-backend-domain.onrender.com/api

## Local Setup
```bash
npm install
npm run dev
```
This runs both frontend and backend via `concurrently`.

Or separately:
```bash
npm run dev --workspace client
npm run dev --workspace server
```

## API Endpoints
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/health`
- POST `/api/chat` (auth)
- GET `/api/chats` (auth)

## API Test Examples
```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com","password":"Password123"}'
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"Password123"}'
curl http://localhost:5000/api/health
```

## Validation & Error Handling Examples
- Missing message in `/api/chat` returns `400 {"message":"Message is required"}`
- Invalid JWT returns `401 {"message":"Unauthorized"}`
- Unknown route returns `404 {"message":"Not Found - /route"}`

## Deployment Guide
### Frontend (Vercel)
1. Import `client` folder in Vercel.
2. Build command: `npm run build`
3. Output: `dist`
4. Env: `VITE_API_URL`

### Backend (Render/Railway)
1. Create web service from `server` folder.
2. Start command: `npm start`
3. Add env variables from `.env.example`
4. Set `CLIENT_URL` to frontend domain.

## Screenshots
- `docs/home.png`
- `docs/chatbot.png`
- `docs/mobile.png`

## Viva Notes
- Explain MVC, JWT, rate limiting, and safe system prompt strategy.
- Demo real-time AI environmental Q&A and chat export.
