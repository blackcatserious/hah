# Traceremove Research — Dynamic AI Responsibility Laboratory

A production-oriented **Next.js 16 + Supabase + OpenAI + Paddle** research platform for `traceremove.dev`.

This project replaces the current static Netlify ZIP with a substantially stronger visual and product system. It adds:

- dynamic, searchable public research archive;
- interactive research constellation and public diagnostic;
- private passwordless accounts;
- project and evidence workspaces;
- private document storage;
- AI Responsibility Assessments;
- epistemic risk, responsibility, dignity/contestability, and narrative identity modules;
- versioned findings;
- downloadable PDF reports;
- publication admin;
- Paddle subscription checkout and webhook synchronization;
- Supabase row-level security;
- vector-ready document chunk storage for later RAG/citation search.

## 1. Local start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Without environment variables, all public pages work and the dashboard displays a configuration checklist. Without `OPENAI_API_KEY`, the assessment endpoint uses a deterministic demo engine so the workflow remains testable.

## 2. Supabase

Create a Supabase project and run, in order:

```text
supabase/migrations/0001_initial.sql
supabase/migrations/0002_seed_publications.sql
supabase/migrations/0003_seed_private_archive_candidates.sql
```

The third migration adds previously known working titles as **private archive candidates**. They are not shown publicly and do not claim publication until the source files and external records are verified.

Then set your founder account as admin:

```sql
update public.profiles set role = 'admin' where email = 'YOUR_EMAIL';
```

Authentication settings:

- Enable Email OTP / magic link.
- Add `https://traceremove.dev/auth/callback` to allowed redirect URLs.
- During testing, also add the Netlify preview URL and `http://localhost:3000/auth/callback`.

## 3. Netlify: keep the existing project and domain

Do **not** create a new Netlify site and do not move the domain.

The existing site currently uses a manual static deploy. A dynamic Next.js deployment must be built from source. Use one of these methods:

### Recommended: connect the existing Netlify project to Git

1. Put this source folder in a GitHub repository.
2. In the existing Netlify project, open **Project configuration → Build & deploy → Continuous deployment → Repository**.
3. Link that repository and choose `main`.
4. Netlify reads `netlify.toml` and runs `npm run build`.
5. Keep the existing production domain `traceremove.dev` attached to this same project.

### Alternative: Netlify CLI

```bash
npm install
npx netlify login
npx netlify link
npx netlify deploy --build
npx netlify deploy --build --prod
```

When `netlify link` asks which project to use, select the existing `traceremove.dev` project.

A source ZIP cannot simply be dragged into **Deploy manually** and become a dynamic Next.js application. Drag-and-drop deploys are appropriate for already-built static output; Next.js SSR, route handlers, Server Actions, and functions need a Netlify build or CLI deployment.

## 4. Netlify environment variables

Copy values from `.env.example` into:

**Project configuration → Environment variables**

Required for accounts and database:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Required for live AI analysis:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Required for subscriptions:

- `NEXT_PUBLIC_PADDLE_ENVIRONMENT`
- `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`
- `NEXT_PUBLIC_PADDLE_PRICE_RESEARCHER`
- `NEXT_PUBLIC_PADDLE_PRICE_PROFESSIONAL`
- `NEXT_PUBLIC_PADDLE_PRICE_TEAM`
- `PADDLE_WEBHOOK_SECRET`

Set the Paddle webhook destination to:

```text
https://traceremove.dev/api/billing/paddle/webhook
```

Subscribe to subscription created, updated, activated, paused, and canceled events.

## 5. Current product boundaries

Implemented now:

- research archive backed by Supabase with local fallback;
- publication creation admin;
- passwordless authentication;
- project creation;
- document upload and evidence register;
- four-module AI analysis;
- persistent assessment versions;
- PDF export;
- Paddle checkout and subscription synchronization;
- RLS and private storage policies.

Prepared in the database but not yet automated:

- PDF/DOCX text extraction;
- chunking and embeddings;
- citation-level chat over private documents;
- multi-user team invitations;
- branded institutional report templates;
- metered usage limits by plan.

Those are the next production phase after the core deployment and payment flow are verified.

## 6. Security notes

- Never put `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, or `PADDLE_WEBHOOK_SECRET` in browser code or Git.
- The service role key is used only by the verified Paddle webhook.
- Project rows and storage paths are protected by Supabase RLS.
- AI findings are research and governance analysis, not legal advice, regulatory certification, or technical assurance.

Production environment baseline applied on 2026-07-22 for `traceremove.dev`.
