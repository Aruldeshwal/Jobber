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
- **OpenAI / Gemini API:** For job summarization, matching logic, and embedding generation.
- **Zod:** For rigorous schema validation of AI outputs and form data.

### State & Caching
- **Zustand:** For lightweight, persistent client-side state management (e.g., UI preferences, Kanban filters).
- **Upstash Redis:** For fast caching, rate limiting (AI usage), and session management.

---

## ✨ Finalized Features

### 1. Smart Application Management
- **Kanban Board:** Drag-and-drop workflow (Applied, Interviewing, Offer, Rejected).
- **Automated Job Scraping:** Paste a URL to automatically extract company name, role, and description.
- **Rich Task Tracking:** Add interview dates, contact persons, and follow-up reminders.
- **Real-time UI Updates:** Powered by Zustand for a seamless, lag-free experience.

### 2. RAG-Powered AI Co-pilot
- **Resume Matcher:** Upload your resume and get a compatibility score (0-100%) against any job description.
- **Skill Gap Analysis:** AI identifies missing keywords or skills required for a specific role based on your resume.
- **Smart Search:** Natural language queries like *"Find all roles where I've interviewed for Senior React positions"* using vector search.
- **AI Cover Letter Drafts:** Generate tailored cover letters that highlight your most relevant experience for a specific job post.
- **Usage Rate Limiting:** Implemented via Redis to manage AI API costs and prevent abuse.

### 3. Analytics & Insights
- **Conversion Funnel:** Visualize your success rate from application to interview to offer.
- **Market Trends:** Insights into which skills/roles are most frequent in your search history.

### 4. Enterprise-Grade Security
- **Multi-Factor Auth:** Secure login via Clerk.
- **Data Privacy:** Your resumes and applications are encrypted and isolated to your account.

---

## 🛠️ Getting Started (Preview)

1. **Clone the repo:** `git clone ...`
2. **Install dependencies:** `npm install`
3. **Setup Environment:** Configure `.env.local` with Neon, Clerk, and OpenAI keys.
4. **Push Schema:** `npx drizzle-kit push:pg`
5. **Run Dev:** `npm run dev`

---

## 🗺️ Roadmap
- [x] Project Initialization & Auth Setup
- [x] Database Schema & Drizzle Configuration
- [x] State Management (Zustand) & Redis Setup
- [ ] Kanban Dashboard Implementation
- [ ] RAG Integration (Embeddings + Vector Search)
- [ ] AI Job Summarizer & Matcher
- [ ] Analytics Dashboard
