# Sprint 3 Plan: Admin Auth and Candidate Review

## Sprint Goal

Implement the HR admin workflow with Supabase Auth sign-in, protected admin pages and API routes, candidate list with filters, candidate profile view, status updates, and secure CV opening. By the end of Sprint 3, an admin can sign in, view and filter candidates, open CVs, update statuses, and sign out — completing the full candidate-to-admin workflow.

## Scope

### Included

- Supabase Auth integration for HR admin email/password sign-in.
- Admin login page (`/admin/login`) with error handling.
- Protected admin layout with server-side session check.
- Sign-out functionality in the admin header.
- `GET /api/admin/candidates` with filters (country, city, englishLevel).
- `GET /api/admin/candidates/[id]` for candidate profile.
- `PATCH /api/admin/candidates/[id]/status` for status updates.
- `GET /api/admin/candidates/[id]/cv` for secure CV signed URL.
- Admin candidate table with filters (country, city, english level).
- English level traffic-light badge component.
- Candidate profile page with details and status update control.
- Status update UI with loading state and toast feedback.
- Admin profile repository (real Supabase implementation).
- `requireAdmin()` server-side auth guard (real implementation).
- CV storage service — add `getSignedUrl` for secure CV access.
- Auth session helper.
- Login validation schema.
- Loading and error states for admin pages.
- Update `app/admin/page.tsx` to redirect to candidates.
- Seed data update with Supabase Auth user reference.
- Playwright e2e smoke test for the full flow.
- Update README.

### Excluded

- Row Level Security policies (deferred — service-role client is sufficient for MVP).
- Password reset flow (out of scope for MVP).
- Multiple admin roles (single Admin role only).
- Email notifications.
- Advanced filtering beyond country, city, English level.

## Stories Covered

- US-003: Sign In as HR Admin.
- US-004: View Candidate List.
- US-005: Filter Candidates.
- US-006: See English Level Status.
- US-007: Open Candidate CV.
- US-008: Update Candidate Status.
- TS-002: Seed Initial Data.
- TS-004: Prepare for Supabase Auth.

## Sprint Board

| Task | Status |
| --- | --- |
| Create Sprint 3 planning document. | Done |
| Add auth session helper (`src/server/auth/session.ts`). | Done |
| Implement `requireAdmin()` with real Supabase session + admin profile check. | Done |
| Implement admin profile repository (find by auth user id). | Done |
| Add `getSignedUrl` to CV storage service. | Done |
| Add `getCandidateById`, `updateCandidateStatus`, `getCvSignedUrl` to candidate service. | Done |
| Add login validation schema. | Done |
| Create `GET /api/admin/candidates` route with filters. | Done |
| Create `GET /api/admin/candidates/[id]` route. | Done |
| Create `PATCH /api/admin/candidates/[id]/status` route. | Done |
| Create `GET /api/admin/candidates/[id]/cv` route (signed URL). | Done |
| Create admin login page (`/admin/login`). | Done |
| Create protected admin layout with session check + sign-out. | Done |
| Build `english-level-badge` component. | Done |
| Build `candidate-filters` component. | Done |
| Build `candidates-table` component. | Done |
| Build `candidate-status-select` component. | Done |
| Create admin candidates list page with table + filters. | Done |
| Create admin candidate profile page with status update. | Done |
| Update root admin page to redirect to `/admin/candidates`. | Done |
| Add `loading.tsx` and `error.tsx` for admin routes. | Done |
| Update seed data with Supabase auth user reference. | Done |
| Add Playwright e2e smoke test. | Done |
| Update README with Sprint 3 documentation. | Done |
| Run verification commands (typecheck, lint, test, build). | Done |
| Add local mock auth system (in-memory users + cookie session). | Done |
| Refactor mock client into browser/server/data factories. | Done |
| Add `local_users` seed data with credentials. | Done |
| Document mock login credentials in README and data-model. | Done |

## Definition of Done

- Admin can sign in with email + password at `/admin/login`.
- Invalid credentials show a clear error toast.
- Admin is redirected to `/admin/candidates` after successful login.
- Unauthenticated users are redirected to `/admin/login`.
- Admin can sign out from the admin header.
- Candidate list page fetches data from `GET /api/admin/candidates` with filters.
- Admin can filter by country, city, and English level.
- English level column shows traffic-light colors (green/yellow/red).
- Each candidate row has a CV link that opens/downloads the PDF.
- Admin can click a candidate row to view the profile.
- Candidate profile shows all fields with a status update control.
- Status update persists in the database and reflects immediately.
- Status update records the admin id (`status_updated_by`).
- Loading and error states are handled in admin pages.
- Playwright e2e test covers the full flow (submit, login, filter, view, update status).
- TypeScript compiles with no errors.
- `pnpm lint` reports zero errors.
- `pnpm test` passes all tests.
- `pnpm build` succeeds.

## Engineering Standards (from previous sprints, plus:)

- Admin API routes must call `requireAdmin()` before processing requests.
- Admin pages in `app/admin/*` must use the protected admin layout.
- Use the Supabase server client (with cookies) for auth checks in layout/page components.
- Use the Supabase service-role client for data operations in repositories.
- Sign-out must clear the Supabase session and redirect to the login page.
- CV access uses signed URLs from Supabase Storage (no public bucket).
- Status updates send `PATCH` with JSON body `{ status: "Accepted" }`.
- API returns consistent JSON responses: `{ data: ... }` on success, `{ error: ... }` on failure.
- Use the existing `toCandidate` mapper for API responses.
- Use named exports and arrow functions consistently.

## Proposed Sprint 3 File Changes

```text
|-- app/
|   |-- admin/
|   |   |-- layout.tsx                              (NEW - protected layout)
|   |   |-- login/
|   |   |   `-- page.tsx                            (NEW)
|   |   |-- candidates/
|   |   |   |-- page.tsx                            (NEW)
|   |   |   `-- [id]/
|   |   |       `-- page.tsx                        (NEW)
|   |   |-- loading.tsx                             (NEW)
|   |   |-- error.tsx                               (NEW)
|   |   `-- page.tsx                                (UPDATE - redirect)
|   |-- api/
|   |   `-- admin/
|   |       `-- candidates/
|   |           |-- route.ts                        (NEW)
|   |           `-- [id]/
|   |               |-- route.ts                    (NEW)
|   |               |-- status/
|   |               |   `-- route.ts                (NEW)
|   |               `-- cv/
|   |                   `-- route.ts                (NEW)
|-- components/
|   |-- admin/
|   |   |-- admin-shell.tsx                         (UPDATE - add sign-out)
|   |   |-- candidate-filters.tsx                   (NEW)
|   |   |-- candidate-status-select.tsx             (NEW)
|   |   |-- candidates-table.tsx                    (NEW)
|   |   `-- english-level-badge.tsx                 (NEW)
|-- src/
|   |-- lib/
|   |   `-- validation/
|   |       `-- admin.schema.ts                     (NEW)
|   |-- server/
|   |   |-- auth/
|   |   |   |-- require-admin.ts                    (UPDATE - real impl)
|   |   |   `-- session.ts                          (NEW)
|   |   |-- repositories/
|   |   |   `-- admin-profile.repository.ts         (UPDATE - real impl)
|   |   `-- services/
|   |       |-- candidate.service.ts                (UPDATE - add methods)
|   |       `-- cv-storage.service.ts               (UPDATE - add getSignedUrl)
|-- supabase/
|   `-- seed.sql                                    (UPDATE - auth user)
|-- tests/
|   `-- e2e/
|       `-- candidate-admin-flow.spec.ts            (NEW)
|-- README.md                                       (UPDATE)
```

## Sprint Risks

| Risk | Mitigation |
| --- | --- |
| Supabase Auth requires configured project. | A local mock mode with in-memory data and cookie-based auth replaces Supabase when env vars are absent. See `src/lib/supabase/mock-client.ts`. |
| Signed URLs require Supabase Storage configured. | Mock storage returns placeholder URLs in mock mode. |
| Session cookie handling may differ in dev vs prod. | Use the `@supabase/ssr` package for production; mock mode uses `document.cookie` (browser) / `cookies()` from next/headers (server). |
| E2E test depends on live Supabase. | Run e2e tests with mock mode (no Supabase needed) or against a configured Supabase project. |
| Password changes affect seeded accounts. | Document the seed credentials (`hr.admin@example.com` / `ChangeMe123!`). |
