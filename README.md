# Recruitment Portal

Responsive recruitment web application for candidate registration and HR review.

This repository is being built for SW Challenge 3. The selected stack is a full-stack Next.js application with Supabase for Postgres, Auth, and Storage.

## Current Sprint

Sprint 1 focuses on project foundation:

- Next.js App Router structure.
- TypeScript strict mode.
- Tailwind CSS baseline.
- API route foundation.
- Domain constants and validation schemas.
- Vitest and Playwright setup.
- Supabase folder placeholders.
- Documentation for local development.

Feature implementation starts in later sprints.

## Prerequisites

- Node.js 20 or newer.
- pnpm 10 or newer.
- A Supabase project for later integration.

## Install

```bash
corepack enable
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

Sprint 1 does not require live Supabase values to render the placeholder app. Sprint 2 and Sprint 3 will require Supabase credentials.

## Run Locally

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
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
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm test
pnpm test:watch
pnpm test:e2e
```

## Project Structure

```text
app/                    Next.js pages, layouts, and API route handlers
components/             Reusable UI, admin, and form components
src/lib/                Shared constants, validation, errors, and utilities
src/server/             Server-only auth, repositories, and services
src/types/              Application and database types
supabase/               Future migrations, seed data, and storage setup
tests/unit/             Vitest unit tests
tests/e2e/              Playwright e2e tests
docs/                   Requirements, architecture, prompts, and implementation plans
```

## Architecture Notes

- The API lives in Next.js Route Handlers under `app/api/*`.
- UI code must not write directly to the database.
- Persistence code belongs in `src/server/repositories/*`.
- Business workflow code belongs in `src/server/services/*`.
- Shared validation belongs in `src/lib/validation/*`.
- CV files will be stored in Supabase Storage, not in the deployed app filesystem.

## Documentation

- [Challenge requirement](docs/requirement/challenge3.md)
- [Vision](docs/vision.md)
- [User stories](docs/user-stories.md)
- [Data model](docs/data-model.md)
- [Stack decision](docs/stack/architecture-stack.md)
- [Sprint 1 plan](docs/implementation-1/sprint-1-plan.md)

