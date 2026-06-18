# JobTracker AI: RAG-Powered Application Suite

JobTracker AI is a next-generation job application management system that leverages Retrieval-Augmented Generation (RAG) to provide intelligent insights, resume matching, and automated job analysis.

## 🚀 Finalized Tech Stack

### Frontend & Framework
- **Next.js 14+ (App Router):** For server-side rendering, routing, and high performance.
- **Tailwind CSS:** For rapid, responsive UI development.
- **Shadcn/ui:** For polished, accessible, and consistent components.
- **Lucide React:** For modern iconography.

### Backend & Database
- **NeonDB (PostgreSQL):** Serverless Postgres for application data and RAG features.
- **pgvector:** Used within NeonDB to store and query vector embeddings for RAG.
- **Drizzle ORM:** For type-safe database interactions and migrations.
- **Clerk:** For secure, multi-tenant authentication and user management.

### AI & RAG Integration
- **Vercel AI SDK:** To orchestrate LLM streams and RAG workflows.
- **OpenAI:** For job summarization, matching logic, and embedding generation (`text-embedding-3-small`).
- **pdf-parse:** For server-side extraction of resume content from PDFs.
- **Zod:** For rigorous schema validation of AI outputs and form data.

### State & Caching
- **Zustand:** For lightweight, persistent client-side state management (e.g., UI preferences, Kanban filters).
- **Upstash Redis:** For fast caching, rate limiting (AI usage), and session management.

---

## ✨ Key Features

### 1. Smart Application Management
- **Kanban Board:** Interactive drag-and-drop workflow (Applied, Interviewing, Offer, Rejected) powered by `@dnd-kit`.
- **Automated Job Summarization:** AI automatically extracts key skills and responsibilities from job descriptions.
- **Rich Task Tracking:** Add interview dates, contact persons, and follow-up reminders.
- **Real-time UI Updates:** Powered by Zustand for a seamless, lag-free experience.

### 2. RAG-Powered AI Co-pilot
- **Resume Matcher:** Upload your resume and get a compatibility score (0-100%) against any job description.
- **Smart Search:** Natural language queries like *"Find all roles where I've interviewed for Senior React positions"* using vector similarity search in NeonDB.
- **Skill Gap Analysis:** AI identifies matching and missing critical skills based on your uploaded resume.

### 3. Analytics & Insights
- **Conversion Funnel:** Visualize your success rate from application to interview to offer with Pie Charts.
- **Activity Tracking:** Bar chart visualization of your application volume over the last 30 days.

### 4. Enterprise-Grade Security
- **Secure Authentication:** Multi-factor authentication via Clerk.
- **Protected Routes:** Middleware-level protection for all dashboard and API routes.

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd application-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your credentials:
```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# NeonDB (Postgres)
DATABASE_URL=...

# Upstash Redis
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

# OpenAI API
OPENAI_API_KEY=...
```

### 4. Push Database Schema
```bash
npx drizzle-kit push:pg
```

### 5. Run the development server
```bash
npm run dev
```

---

## 🗺️ Roadmap Progress
- [x] Project Initialization & Auth Setup
- [x] Database Schema & Drizzle Configuration
- [x] State Management (Zustand) & Redis Setup
- [x] Kanban Dashboard Implementation (Drag-and-Drop)
- [x] RAG Integration (Embeddings + Vector Search)
- [x] AI Job Summarizer & Resume Matcher
- [x] Analytics Dashboard
