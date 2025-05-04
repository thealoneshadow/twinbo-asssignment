# twinbo-assignment

Note: While I leveraged AI tools as coding assistants to accelerate development, all core logic, implementation, and debugging were independently handled by me. My focus has been on using AI to boost productivity, not to replace critical thinking or problem-solving.

✅ Project Setup
🛠️ Tech Stack:
Frontend: Next.js 15 (App Router), Tailwind CSS, TypeScript, Clerk Auth

Backend: Express.js (Node.js), MongoDB (Mongoose), Gemini API

Deployment: Vercel (Frontend), Render (Backend)

Auth: Clerk (OAuth2, JWT)

AI: Gemini Flask 2.0


 Architecture Overview
🔹 Frontend (Next.js)
Structure:

bash
Copy
Edit
/app
  ├── /chat        → Chat page (authenticated route)
  ├── /components  → Header, MessageBox, etc.
  └── /utils       → Shared helpers
Auth Handling:

Uses <SignedIn>, <SignedOut>, and UserButton from Clerk.

Protected route logic using useUser() + redirect logic.

Chat UI:

Messages rendered with map() from Zustand state.

On form submission, the message is sent to the backend and auto-scrolled using a ref.





Backend (Express)
Structure:

bash
Copy
Edit
/src
  ├── /controllers    → Route logic (chat, user)
  ├── /routes         → API routes
  ├── /models         → Mongoose schemas
  ├── /services       → Gemini integration
  ├── /config         → DB connection
  └── index.js        → App entry point
Key Logic:

/api/chats → addChats, getChats, integrated with Gemini response

/api/users → addUser on first sign-in (Clerk ID based)


| Limitation                       | Details                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **No RLS/AuthZ on DB**           | No per-user access control at DB level. Anyone with an ID could technically fetch chats (though frontend prevents this). |
| **No streaming AI responses**    | Gemini API used synchronously; no token streaming for improved UX.                                                       |
| **Rate limiting missing**        | Could be abused without middleware like `express-rate-limit`.                                                            |
| **No retry/fallback for Gemini** | If Gemini API fails, response is undefined without graceful degradation or logging.                                      |
| **Minimal error handling**       | Errors are mostly console-logged; user feedback (toast or alert) is not implemented in some failure paths.               |
| **Unscalable chat storage**      | All chats are stored in one array per user. For very large history, pagination or lazy loading would be required.        |
| **No tests**                     | No unit/integration tests included yet.                                                                                  |





