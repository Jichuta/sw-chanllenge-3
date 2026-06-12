# Recruitment Portal

Responsive recruitment web application for candidate registration and HR review.

This repository is being built for SW Challenge 3. The selected stack is a full-stack Next.js application with Supabase for Postgres, Auth, and Storage.

## Current Sprint

Sprint 2 implements the candidate application flow:

- Responsive candidate form with React Hook Form + Zod validation.
- `POST /api/candidates` with server-side validation and file checks.
- CV PDF upload to Supabase Storage (max 5 MB).
- Candidate data persisted in Supabase Postgres via the API.
- Toast notifications for submission success and error states.
- Supabase client setup (browser, server, service-role).
- Database migration and seed data.
- Unit tests for validation schemas.

Sprint 1 (foundation) and Sprint 2 (application flow) are complete. Sprint 3 will add admin auth and candidate review.

## Prerequisites

- Node.js 20 or newer.
- pnpm 10 or newer.
- A Supabase project (required for Sprint 2 features).

## Install

```bash
pnpm install
```

## Environment

Create a local env file:

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

Sprint 2 requires valid Supabase credentials. Run the migration in `supabase/migrations/0001_initial_schema.sql` and the storage setup in `supabase/storage.sql` on your Supabase project before using the form.

## Run Locally

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

Apply page:

```text
http://localhost:3000/apply
```

Health route:

```text
http://localhost:3000/api/health
```

Admin placeholder:

```text
http://localhost:3000/admin
```

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

