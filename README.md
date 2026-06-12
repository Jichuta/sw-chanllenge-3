# Recruitment Portal

Responsive recruitment web application for candidate registration and HR review.

This repository is being built for SW Challenge 3. The selected stack is a full-stack Next.js application with Supabase for Postgres, Auth, and Storage.

## Current Sprint

Sprint 3 implements the HR admin workflow:

- Supabase Auth admin sign-in at `/admin/login`.
- Protected admin layout with server-side session check.
- Admin candidate list with filters by country, city, English level.
- English level traffic-light badges (green/yellow/red).
- Admin API routes (list, detail, status update, CV signed URL).
- Candidate profile page with status update control.
- Secure CV opening via signed URLs from Supabase Storage.
- Sign-out functionality in the admin header.
- Loading and error states for admin pages.
- Playwright e2e smoke tests for public pages.

All three sprints are complete. The project now covers the full candidate-to-admin workflow.

## Prerequisites

- Node.js 20 or newer.
- pnpm 10 or newer.

## Quick Start (Local Mock Mode)

Run the app without any external services:

```bash
pnpm install
pnpm dev
```

The app starts in **mock mode** using an in-memory data store. No Supabase project is needed.

**Admin login credentials** (mock mode):

| Email | Password |
| --- | --- |
| hr.admin@example.com | ChangeMe123! |

Open:

```text
http://localhost:3000               # Public homepage
http://localhost:3000/apply          # Candidate form
http://localhost:3000/admin/login    # Admin sign-in
http://localhost:3000/admin/candidates  # Candidate list
http://localhost:3000/api/health     # Health check
```

## Production Setup (with Supabase)

### Environment

```bash
cp .env.example .env.local
```

Required variables:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_CV_BUCKET=candidate-cvs
NEXT_PUBLIC_APP_URL=http://localhost:3000
PLAYWRIGHT_BASE_URL=http://localhost:3000
```

When valid Supabase credentials are detected, the app automatically switches from mock mode to the real Supabase backend.

### Setup Steps

1. Run `supabase/migrations/0001_initial_schema.sql` on your Supabase project.
2. Run `supabase/storage.sql` to create the private CV bucket.
3. Create an admin auth user in Supabase Auth dashboard:
   - Email: `hr.admin@example.com`
   - Password: `ChangeMe123!`
4. Update `supabase/seed.sql` with the auth user ID and run it.
5. (Optional) Upload sample CV files for seed candidates to the `candidate-cvs` bucket.

## Scripts

```bash
pnpm dev         # Start dev server
pnpm build       # Production build
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm typecheck   # Run TypeScript check
pnpm test        # Run unit tests
pnpm test:watch  # Run tests in watch mode
pnpm test:e2e    # Run Playwright e2e tests
```

## Project Structure

```text
app/                    Next.js pages, layouts, and API route handlers
components/             Reusable UI, admin, and form components
src/lib/                Shared constants, validation, errors, and utilities
src/lib/supabase/       Supabase client modules (browser, server, service-role)
src/server/             Server-only auth, repositories, services, and mappers
src/types/              Application and database types
supabase/               Migrations, seed data, and storage setup
tests/unit/             Vitest unit tests
tests/e2e/              Playwright e2e tests
docs/                   Requirements, architecture, prompts, and implementation plans
```

## Architecture Notes

- The API lives in Next.js Route Handlers under `app/api/*`.
- UI code must not write directly to the database.
- Persistence code belongs in `src/server/repositories/*`.
- Business workflow code belongs in `src/server/services/*`.
- CV files are stored in Supabase Storage, not in the deployed app filesystem.
- Client validation is for UX only; server-side validation is enforced on all API inputs.

## Documentation

- [Challenge requirement](docs/requirement/challenge3.md)
- [Vision](docs/vision.md)
- [User stories](docs/user-stories.md)
- [Data model](docs/data-model.md)
- [Stack decision](docs/stack/architecture-stack.md)
- [Sprint 1 plan](docs/implementation-1/sprint-1-plan.md)
- [Sprint 2 plan](docs/implementation-1/sprint-2-plan.md)
- [Sprint 3 plan](docs/implementation-1/sprint-3-plan.md)

