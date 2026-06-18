# JobTracker AI 🚀

JobTracker AI is an intelligent, RAG-powered job application suite designed to streamline your job search. By combining modern project management with cutting-edge AI, it helps you track applications, analyze job descriptions, and match your resume to roles with precision.

## ✨ Features

- **📊 Intelligent Kanban Board:** Manage your application funnel with a seamless drag-and-drop interface.
- **🧠 RAG-Powered Insights:** Automatically summarize job descriptions and identify key requirements using Retrieval-Augmented Generation.
- **🎯 AI Resume Matcher:** Upload your resume and get instant compatibility scores and skill gap analysis for any job post.
- **🔍 Smart Search:** Query your entire application history using natural language (e.g., *"Show me high-paying React roles I applied to last month"*).
- **📈 Advanced Analytics:** Visualize your search progress with conversion funnels and activity charts.
- **📄 PDF Parsing:** Seamlessly extract and store resume content for localized AI context.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Neon PostgreSQL](https://neon.tech/) with `pgvector`
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **AI Orchestration:** [Vercel AI SDK](https://sdk.vercel.ai/) & [OpenAI](https://openai.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Caching:** [Upstash Redis](https://upstash.com/)
- **Charts:** [Recharts](https://recharts.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- An OpenAI API Key
- A Neon Database (Postgres)
- A Clerk Account (for Auth)
- An Upstash Redis Instance

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/jobtracker-ai.git
   cd jobtracker-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file and add the following:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   DATABASE_URL=...
   UPSTASH_REDIS_REST_URL=...
   UPSTASH_REDIS_REST_TOKEN=...
   OPENAI_API_KEY=...
   ```

4. **Initialize the database:**
   ```bash
   npx drizzle-kit push:pg
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🛡️ Security

- All user data is isolated at the database level using Clerk IDs.
- Sensitive API routes are protected by server-side middleware.
- Resumes are parsed in memory and never stored as public assets.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
