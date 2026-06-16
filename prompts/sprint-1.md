# Prompt Log — Sprint 1: Project Foundation

## Prompt 1.1: Initialize Next.js project

**Prompt:**
```
Initialize a Next.js project with TypeScript, Tailwind CSS, ESLint, and the App Router.
Configure strict TypeScript mode. Use pnpm as the package manager.
Add Vitest for unit tests and Playwright for e2e tests.
Set up the folder structure as defined in the architecture document.
```

**Assistant response:**
Created the Next.js project scaffold with all requested tooling. Generated `package.json` with scripts for `dev`, `build`, `start`, `lint`, `test`, `test:e2e`. Created TypeScript strict config, Tailwind CSS config, ESLint config, Vitest config, and Playwright config.

**Manual edits:** None.

---

## Prompt 1.2: Create application structure and domain constants

**Prompt:**
```
Create the folder structure: app/(public), app/admin, app/api/health, components/ui, components/forms, components/admin, src/lib, src/lib/validation, src/lib/supabase, src/server/auth, src/server/repositories, src/server/services, src/types, supabase/migrations, tests/unit, tests/e2e.

Add domain constants for English levels (A1-C2) and candidate statuses (In Review, Accepted, Rejected).
Add a traffic-light helper function that maps English levels to green/yellow/red.
Add an apiError helper for structured API error responses.
Add a cn utility using clsx and tailwind-merge.
Add TypeScript types for Candidate, CandidateRow, AdminProfileRow.
Add a shared Zod validation schema for candidate form data.
Add placeholder API route GET /api/health.
Add placeholder public homepage and admin page.
Add placeholder UI components (Badge, ButtonLink).
Add server-side placeholders for auth, repositories, and services.
```

**Assistant response:**
Created all folders and files. Domain constants defined in `src/lib/constants.ts` with `englishLevels`, `candidateStatuses`, `MAX_CV_FILE_SIZE_BYTES`, `ACCEPTED_CV_MIME_TYPE`, and `englishLevelTone` helper. Error helper in `src/lib/errors.ts`. Types in `src/types/candidate.ts` and `src/types/database.ts`. Zod schema in `src/lib/validation/candidate.schema.ts`. API health route returns `{ status: "ok" }`. Homepage and admin page render basic placeholders. `Badge` and `ButtonLink` components created with Tailwind styling.

**Manual edits:** None.

---

## Prompt 1.3: Add tests, environment files, and documentation

**Prompt:**
```
Create a unit test for the English level traffic-light helper (english-level.test.ts).
Test that B2, C1, C2 return green; B1 returns yellow; A1, A2 return red.
Add .gitignore excluding node_modules, .next, .env.local, coverage, test-results.
Add .env.example with NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_CV_BUCKET, NEXT_PUBLIC_APP_URL, PLAYWRIGHT_BASE_URL.
Update README with project description, prerequisites, install, dev, build, lint, test commands.
Add supabase/seed.sql and supabase/storage.sql as placeholders.
```

**Assistant response:**
Created `tests/unit/english-level.test.ts` with 3 test cases covering green, yellow, and red levels. Created `.gitignore` following Next.js best practices. Created `.env.example` with all required variables. Updated README with full documentation. Created placeholder `supabase/seed.sql` and `supabase/storage.sql`.

**Manual edits:** Changed pnpm version in package.json to match local environment.

---

## Prompt 1.4: Install dependencies and verify

**Prompt:**
```
Install all project dependencies and verify the build compiles.
Run pnpm typecheck, pnpm lint, pnpm test, and pnpm build.
```

**Assistant response:**
Installed dependencies including next, react, typescript, tailwindcss, vitest, playwright, clsx, tailwind-merge, lucide-react, zod, react-hook-form, @hookform/resolvers, supabase packages, sonner. Resolved TypeScript strict errors. All verification passes.

**Manual edits:**
- Set `$env:COREPACK_ENABLE="0"` before running pnpm commands due to Node.js v20.15.1 Corepack signature verification failure.
- Removed `packageManager` field from `package.json` to prevent Corepack interference.

---

## Prompt 1.5: Add spec documents

**Prompt:**
```
Create the spec documents required by the challenge:
- docs/vision.md — product vision, goals, target users, core flow, business rules.
- docs/user-stories.md — all user stories and technical stories with acceptance criteria.
- docs/data-model.md — entities, fields, enums, validation rules, seed data, API shapes.
- docs/stack/architecture-stack.md — stack decision, architecture diagram, API design, separation of concerns.
- docs/requirement/challenge3.md — the original challenge requirements.
- docs/implementation-1/sprint-1-plan.md — this sprint plan.
```

**Assistant response:**
Created all spec documents following the challenge requirements. Each document follows a consistent format with clear sections.

**Manual edits:** None.
