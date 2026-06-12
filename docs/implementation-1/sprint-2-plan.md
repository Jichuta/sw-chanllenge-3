# Sprint 2 Plan: Candidate Application Flow

## Sprint Goal

Implement the public candidate registration flow with client and server validation, a REST API endpoint for submission, PDF CV file type and size checks, database persistence via Supabase, and a responsive form with success/error feedback.

By the end of Sprint 2, a candidate can fill out the form, upload a PDF CV, submit their data, see validation errors inline, and receive a success notification. The data is persisted in Supabase through the API. The candidate can use the form from mobile and desktop.

Sprint 2 deliberately avoids implementing admin authentication, admin candidate table, admin filters, and admin status updates. Those belong in Sprint 3.

## Scope

### Included

- Supabase client setup (browser, server, service-role clients).
- Database migration `0001_initial_schema.sql` for `candidates` and `admin_profiles` tables.
- Seed data for the HR admin profile and demo candidates across English levels and locations.
- Storage setup SQL for the private `candidate-cvs` bucket.
- `POST /api/candidates` route handler.
- CV file validation (MIME type `application/pdf`, max 5 MB).
- CV upload to Supabase Storage.
- `Candidate` insert into Supabase Postgres.
- Shared `Candidate` mapper (DB row to application model).
- Full candidate service and repository implementation.
- Responsive candidate application form with React Hook Form + Zod.
- Dedicated `/apply` public page.
- Update homepage to link to the apply page.
- Toast notification component for success / error feedback.
- Unit tests for candidate validation schema.
- Update unit test for file validation if applicable.
- Documentation updated (README, sprint plan).

### Excluded

- Admin authentication and session management (Sprint 3).
- Admin candidate list, filters, and table (Sprint 3).
- Admin candidate profile view (Sprint 3).
- Admin status update (Sprint 3).
- Admin CV opening (Sprint 3).
- Real e2e smoke test (Sprint 3).
- Supabase Auth sign-up flow (Sprint 3).
- Row Level Security policies (Sprint 3).

## Stories Covered

- US-001: Submit Candidate Registration.
- US-002: Use the Form on Mobile.
- TS-001: Persist Data Through an API.
- TS-003: Validate Candidate Input.

## Sprint Board

| Task | Status |
| --- | --- |
| Create Sprint 2 planning document. | Done |
| Add Supabase client modules (browser, server, service-role). | Todo |
| Add database migration `0001_initial_schema.sql`. | Todo |
| Add seed data with HR admin and demo candidates. | Todo |
| Add storage bucket setup SQL. | Todo |
| Implement CV file validation helper. | Todo |
| Implement candidate mapper (DB row to app model). | Todo |
| Implement candidate repository (insert + list). | Todo |
| Implement CV storage service (upload to Supabase). | Todo |
| Implement candidate service (create flow). | Todo |
| Add `POST /api/candidates` route handler. | Todo |
| Add `src/lib/supabase/` client modules. | Todo |
| Add toast notification component. | Todo |
| Build responsive candidate application form. | Todo |
| Create `/apply` page and update homepage. | Todo |
| Add unit tests for candidate validation. | Todo |
| Install dependencies (`sonner` for toasts) if needed. | Todo |
| Run verification commands (typecheck, lint, test, build). | Todo |

## Definition of Done

- A candidate can submit the form from desktop and mobile.
- The form validates all required fields client-side with React Hook Form + Zod.
- The form shows inline validation errors for invalid inputs.
- CV upload accepts only PDF files and rejects files over 5 MB.
- The API validates input again server-side with Zod.
- The API returns consistent structured error responses on failure.
- Candidate data is persisted in Supabase Postgres through the API.
- CV file is uploaded to Supabase Storage (private bucket).
- The candidate sees a success toast after submission.
- The form is responsive and usable on mobile.
- Unit tests exist for validation schemas.
- TypeScript compiles with no errors.
- `pnpm lint` reports zero errors.
- `pnpm test` passes all tests.
- `pnpm build` succeeds.

## Engineering Standards (from Sprint 1, plus:)

- Use React Hook Form for form state management.
- Use Zod schemas via `@hookform/resolvers` for client validation.
- Use `sonner` for toast notifications (import `toast` from `sonner`).
- Keep the form component client-side (`"use client"`).
- Do not call Supabase directly from the form; always go through the API.
- File validation must happen both client-side (UX) and server-side (security).
- Use the existing `apiError` helper for structured API error responses.
- Use the existing `cn` utility for conditional class names.
- Use `NextResponse.json` for API responses.
- Keep API handlers thin — delegate to services and repositories.
- `POST /api/candidates` returns 201 on success, 400 on validation error, 500 on unexpected error.
- Use the existing `MAX_CV_FILE_SIZE_BYTES` and `ACCEPTED_CV_MIME_TYPE` constants.

## Proposed Sprint 2 File Changes

```text
.
|-- app/
|   |-- (public)/
|   |   |-- apply/
|   |   |   `-- page.tsx                          (NEW)
|   |   `-- page.tsx                              (UPDATE)
|   `-- api/
|       `-- candidates/
|           `-- route.ts                           (NEW)
|-- components/
|   |-- forms/
|   |   |-- candidate-application-form.tsx         (NEW)
|   |   `-- candidate-application-placeholder.tsx  (REMOVE)
|   `-- ui/
|       `-- toaster.tsx                            (NEW)
|-- src/
|   |-- lib/
|   |   |-- constants.ts                          (no change)
|   |   |-- errors.ts                             (no change)
|   |   |-- supabase/
|   |   |   |-- browser.ts                        (NEW)
|   |   |   |-- server.ts                         (NEW)
|   |   |   `-- service-role.ts                   (NEW)
|   |   |-- utils.ts                              (no change)
|   |   `-- validation/
|   |       `-- candidate.schema.ts               (UPDATE - add CV fields)
|   |-- server/
|   |   |-- mappers/
|   |   |   `-- candidate.mapper.ts               (NEW)
|   |   |-- repositories/
|   |   |   `-- candidate.repository.ts           (UPDATE)
|   |   `-- services/
|   |       |-- candidate.service.ts              (UPDATE)
|   |       `-- cv-storage.service.ts             (NEW)
|   `-- types/
|       |-- candidate.ts                          (no change)
|       `-- database.ts                           (no change)
|-- supabase/
|   |-- migrations/
|   |   `-- 0001_initial_schema.sql               (NEW)
|   |-- seed.sql                                  (UPDATE)
|   `-- storage.sql                               (UPDATE)
|-- tests/
|   `-- unit/
|       |-- candidate-validation.test.ts          (NEW)
|       `-- english-level.test.ts                 (no change)
|-- package.json                                  (UPDATE - add sonner)
|-- README.md                                     (UPDATE)
`-- docs/
    `-- implementation-1/
        `-- sprint-2-plan.md                      (NEW)
```

## Sprint Risks

| Risk | Mitigation |
| --- | --- |
| Supabase credentials not available locally. | Document that `.env.local` must have valid Supabase values. Provide a local fallback strategy (mock or skip storage). |
| Supabase Storage upload may fail without bucket setup. | Run `storage.sql` manually in Supabase dashboard or CLI before testing. |
| PDF upload to Supabase fails in development. | Log storage errors server-side and return a clear 500 to the client. |
| Form becomes too complex for Sprint 2. | Keep the form focused on the required fields. Skip advanced UX until Sprint 3. |
| Tests require Supabase connection. | Unit tests mock the repository layer; do not depend on live Supabase. |

## Next Sprint Preview

Sprint 3 should implement the HR admin workflow:

- Supabase Auth integration for admin sign-in.
- Admin login page (`/admin/login`).
- Protected admin layout with session check.
- `GET /api/admin/candidates` with filters.
- Admin candidate table with filters.
- `GET /api/admin/candidates/:id` profile view.
- `PATCH /api/admin/candidates/:id/status` for status updates.
- `GET /api/admin/candidates/:id/cv` for secure CV access.
- Admin seed data.
- Playwright e2e smoke test.
