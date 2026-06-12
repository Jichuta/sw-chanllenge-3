# Sprint 1 Plan: Project Foundation

## Sprint Goal

Create a professional Next.js TypeScript foundation that is ready for feature work. By the end of Sprint 1, the repository should have a runnable app shell, clear folder boundaries, baseline validation/domain helpers, test setup, environment documentation, and local development instructions.

Sprint 1 deliberately avoids implementing the full candidate submission, Supabase persistence, admin auth, and admin table. Those belong in later sprints. The goal here is to remove setup risk and make the next work predictable.

## Scope

### Included

- Next.js App Router project structure.
- TypeScript strict configuration.
- Tailwind CSS baseline.
- ESLint configuration.
- Vitest unit test setup.
- Playwright e2e folder placeholder and script.
- `.gitignore`.
- `.env.example`.
- README with local commands.
- Domain constants for English levels and candidate statuses.
- Traffic-light helper for English levels.
- Shared error response helper for API routes.
- Placeholder public page.
- Placeholder admin page.
- Placeholder health API route.
- Supabase folder structure for future migrations and seeds.

### Excluded

- Real Supabase client integration.
- Database migrations beyond placeholder files.
- Candidate form implementation.
- PDF upload implementation.
- HR admin login implementation.
- Admin candidate table implementation.
- Real e2e scenario.

## Stories Covered

- TS-005: Set Up Application Foundation.
- TS-006: Define Project Structure and Engineering Standards.
- TS-007: Set Up Automated Tests.
- TS-008: Document Local Development Workflow.

## Sprint Board

| Task | Status |
| --- | --- |
| Update user stories with sprint implementation priority. | Done |
| Create Sprint 1 planning document. | Done |
| Add Next.js TypeScript project configuration. | Done |
| Add Tailwind and global styling baseline. | Done |
| Add app route placeholders. | Done |
| Add health API route. | Done |
| Add domain constants and validation scaffolding. | Done |
| Add server folder placeholders for auth, services, and repositories. | Done |
| Add Vitest configuration and first unit test. | Done |
| Add Playwright configuration and e2e folder. | Done |
| Add `.gitignore`, `.env.example`, and README. | Done |
| Install dependencies and run verification commands. | Todo |

## Definition of Done

- The app has a clear folder structure matching the architecture decision.
- `package.json` includes scripts for `dev`, `build`, `start`, `lint`, `test`, and `test:e2e`.
- TypeScript, Next.js, Tailwind, Vitest, and Playwright config files exist.
- A unit test exists for the English level traffic-light helper.
- README explains how to install dependencies and start the app.
- `.env.example` documents required environment variables.
- `.gitignore` excludes dependencies, builds, env files, and generated test output.
- No secrets are committed.

## Engineering Standards

- Use TypeScript everywhere.
- Prefer named exports.
- Use arrow functions for local callbacks and helpers where practical.
- Keep API handlers thin.
- Keep reusable business rules in `src/lib` or `src/server`.
- Do not put persistence code in React components.
- Use `NextResponse.json` for API responses.
- Return structured error responses from API routes.
- Keep public UI, admin UI, API, services, repositories, and validation in separate folders.
- Use clear route groups: `(public)` for public screens and `admin` for HR screens.

## Proposed Sprint 1 File Changes

```text
.
|-- .env.example
|-- .gitignore
|-- README.md
|-- app/
|   |-- (public)/
|   |   `-- page.tsx
|   |-- admin/
|   |   `-- page.tsx
|   |-- api/
|   |   `-- health/
|   |       `-- route.ts
|   |-- globals.css
|   `-- layout.tsx
|-- components/
|   |-- admin/
|   |   `-- admin-shell.tsx
|   |-- forms/
|   |   `-- candidate-application-placeholder.tsx
|   `-- ui/
|       |-- badge.tsx
|       `-- button-link.tsx
|-- docs/
|   `-- implementation-1/
|       `-- sprint-1-plan.md
|-- src/
|   |-- lib/
|   |   |-- constants.ts
|   |   |-- errors.ts
|   |   |-- utils.ts
|   |   `-- validation/
|   |       `-- candidate.schema.ts
|   |-- server/
|   |   |-- auth/
|   |   |   `-- require-admin.ts
|   |   |-- repositories/
|   |   |   |-- admin-profile.repository.ts
|   |   |   `-- candidate.repository.ts
|   |   `-- services/
|   |       `-- candidate.service.ts
|   `-- types/
|       |-- candidate.ts
|       `-- database.ts
|-- supabase/
|   |-- migrations/
|   |   `-- .gitkeep
|   |-- seed.sql
|   `-- storage.sql
|-- tests/
|   |-- e2e/
|   |   `-- .gitkeep
|   `-- unit/
|       `-- english-level.test.ts
|-- eslint.config.mjs
|-- next-env.d.ts
|-- next.config.ts
|-- package.json
|-- playwright.config.ts
|-- postcss.config.mjs
|-- tailwind.config.ts
|-- tsconfig.json
`-- vitest.config.ts
```

## Sprint Risks

| Risk | Mitigation |
| --- | --- |
| Dependency installation may require network access. | Commit config and package files first; install when network access is available. |
| Supabase setup can slow the foundation sprint. | Keep Supabase files as placeholders and defer real integration to Sprint 2 or 3. |
| Too much UI work can distract from foundation. | Use simple professional placeholders only. |
| Tests may fail before dependencies are installed. | Document install commands and keep test files valid. |

## Next Sprint Preview

Sprint 2 should implement the candidate application flow:

- Candidate form UI.
- Client and server validation.
- `POST /api/candidates`.
- PDF file type and size checks.
- Supabase Storage upload.
- Candidate insert into Supabase Postgres.
- Success and error states.

