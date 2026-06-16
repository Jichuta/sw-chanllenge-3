# Sprint 5 Plan: Polish, Edge Cases, Testing & UX Improvements

## Sprint Goal

Address remaining polish items, edge cases, and UX improvements identified after completing all functional and technical acceptance criteria. This sprint focuses on hardening the application — better error handling, testing coverage, accessibility, and admin UX enhancements — without introducing major new features.

## Scope

### Included

**Duplicate Email Handling**
- Add a unique constraint violation check in the `POST /api/candidates` route.
- Return a structured 409 response with a clear message when a candidate with the same email already exists.
- Show the duplicate email error in the frontend toast.

**CV Download Button**
- Add an explicit "Download CV" button on the candidate profile page alongside the "Open CV" link.
- The button triggers a download via the `download` attribute or a blob fetch.

**Filters Loading State & Partial Matching**
- Add a loading spinner or skeleton while filtered results are being fetched in the candidate table.
- Change country/city filters from exact match to case-insensitive partial match (`ILIKE` / `includes`).

**File Size Client Message**
- Customize the Zod file validation error message to say "CV must be under 5 MB" instead of the default Zod message.
- Apply to both client-side schema and server-side validation.

**Mock Data Persistence (Optional SQLite)**
- Add a lightweight SQLite integration using `better-sqlite3` or `sql.js` for local development.
- When running in mock mode (no Supabase env vars), persist data to a local SQLite file instead of in-memory arrays.
- This ensures candidate submissions survive server restarts during local development.

**e2e Test for Full Mock Mode Flow**
- Expand the Playwright e2e test to cover the complete candidate-to-admin flow:
  - Navigate to public form and submit a candidate.
  - Sign in as admin (mock mode with cookie auth).
  - View candidate list and verify the new entry appears.
  - Filter candidates by location and English level.
  - Open candidate profile and verify details.
  - Update candidate status.
  - Verify the status change is reflected.

**Accessibility Polish**
- Audit the candidate form and admin panel for accessibility issues.
- Add `aria-label` attributes to icon-only buttons and form inputs where missing.
- Add `role` attributes and `aria-live` regions for dynamic content (toasts, filter results).
- Improve keyboard navigation (tab order, focus management after status update).
- Add focus-visible ring styles consistent with Tailwind forms.

**Candidate Delete (Admin)**
- Add a "Delete" button on the candidate profile page (and optionally in the table row).
- Add `DELETE /api/admin/candidates/[id]` route with admin auth guard.
- Show a confirmation dialog before deletion.
- Remove candidate from the list after successful deletion.

**Pagination for Candidate Table**
- Add server-side pagination to `GET /api/admin/candidates` with `page` and `pageSize` query params.
- Add pagination controls (Previous/Next and page numbers) to the candidate table component.
- Default page size: 20.
- Show total count and current page range.

### Excluded

- Supabase Auth real integration (remains mock-only for local dev; real Supabase is separate setup).
- Cloud deployment (Vercel, Docker).
- CI/CD pipeline.
- Performance optimization beyond pagination (indexes, query tuning).
- Multi-language / i18n support.
- Email notifications or interview scheduling.

## Stories Covered

| Story | Description | Status |
| --- | --- | --- |
| US-001 | Submit Candidate Registration — polish email error UX | Enhancement |
| US-002 | Use the Form on Mobile — a11y polish | Enhancement |
| US-004 | View Candidate List — pagination, loading state | Enhancement |
| US-005 | Filter Candidates — partial match, loading state | Enhancement |
| US-007 | Open Candidate CV — download button | Enhancement |
| US-008 | Update Candidate Status — no new changes | — |
| TS-003 | Validate Candidate Input — improved file-size message | Enhancement |

Plus new internal tasks (not in original stories):
- Candidate delete endpoint and UI
- Mock data persistence via SQLite
- Full e2e test for mock mode
- Accessibility audit

## Sprint Board

| Task | Status |
| --- | --- |
| Create Sprint 6 planning document | Pending |
| Handle duplicate email gracefully (409 + toast) | Pending |
| Add "Download CV" button on profile page | Pending |
| Add filters loading state (spinner/skeleton) | Pending |
| Change country/city filter to case-insensitive partial match | Pending |
| Customize Zod file-size error message ("CV must be under 5 MB") | Pending |
| Add optional SQLite persistence for mock mode | Pending |
| Write full-flow e2e test for mock mode | Pending |
| Accessibility audit and fixes (aria, keyboard, focus) | Pending |
| Add admin candidate delete (button, confirmation, API route) | Pending |
| Add server-side pagination to candidate list | Pending |
| Add pagination UI controls to candidate table | Pending |
| Final verification (typecheck, lint, test, build) | Pending |

## Definition of Done

- Duplicate email returns 409 with a clear message; frontend displays it in the toast.
- Each candidate profile has both "Open CV" and "Download CV" buttons.
- Filtered candidate list shows a loading indicator while fetching.
- Country and city filters match partial text (case-insensitive).
- File size validation shows "CV must be under 5 MB" on both client and server.
- SQLite persistence is available as an optional drop-in replacement for in-memory mock data.
- Playwright e2e test covers the full mock mode flow (submit → login → view → filter → status update).
- Accessibility review completed: aria labels, roles, focus management, keyboard navigation verified.
- Admin can delete a candidate with confirmation from both profile and table row.
- Candidate list is paginated (default 20 per page) with Previous/Next controls and total count.
- TypeScript compiles with no errors.
- `pnpm lint` reports zero errors.
- `pnpm test` passes all tests.
- `pnpm build` succeeds.

## Engineering Standards (from previous sprints, plus:)

- All new API routes follow the existing patterns (`requireAdmin()`, Zod validation, structured error responses).
- New components follow existing naming conventions and folder structure.
- Accessibility improvements use native HTML semantics where possible, supplemented with WAI-ARIA.
- SQLite integration (if implemented) is opt-in and does not break the existing in-memory mock mode — detect via an env var or the absence of Supabase credentials.
- e2e tests live in `tests/e2e/` and follow the existing Playwright conventions.

## Proposed Sprint 6 File Changes

```
.
|-- app/
|   |-- api/
|   |   `-- admin/
|   |       `-- candidates/
|   |           `-- [id]/
|   |               `-- route.ts                    (UPDATE - add DELETE handler)
|   |-- admin/
|   |   `-- (dashboard)/
|   |       `-- candidates/
|   |           |-- page.tsx                        (UPDATE - add pagination, loading state)
|   |           `-- [id]/
|   |               `-- page.tsx                    (UPDATE - add download CV, delete button)
|-- components/
|   |-- admin/
|   |   |-- candidate-filters.tsx                   (UPDATE - partial match UX, loading)
|   |   |-- candidates-table.tsx                    (UPDATE - pagination, loading skeleton)
|   |   `-- candidate-status-select.tsx             (no changes expected)
|   |-- forms/
|   |   `-- candidate-application-form.tsx          (UPDATE - better file-size error display)
|-- src/
|   |-- lib/
|   |   |-- supabase/
|   |   |   |-- mock-client.ts                     (optional - sqlite migration)
|   |   |   `-- mock-data.ts                       (optional - replace with sqlite)
|   |   `-- validation/
|   |       `-- candidate.schema.ts                 (UPDATE - custom file size message)
|   |-- server/
|   |   |-- repositories/
|   |   |   `-- candidate.repository.ts             (UPDATE - pagination, partial match)
|   |   `-- services/
|   |       `-- candidate.service.ts                 (UPDATE - delete, pagination helpers)
|-- tests/
|   `-- e2e/
|       `-- candidate-admin-flow.spec.ts            (UPDATE - full flow test)
|-- docs/
|   `-- implementation-1/
|       `-- sprint-6-plan.md                        (NEW)
```

## Sprint Risks

| Risk | Mitigation |
| --- | --- |
| SQLite dependency adds complexity and may conflict with the existing mock approach. | Keep SQLite optional (feature flag / env var). In-memory mock remains the default. |
| Full e2e test requires Playwright to support mock cookie auth. | Mock auth uses a simple cookie; set it via `page.evaluate()` in the test setup. |
| Pagination changes may break existing filter/sort behavior. | Add pagination as an additive layer; existing queries without `page` param return all results (backward compatible). |
| Accessibility audit may reveal issues requiring significant markup changes. | Prioritize high-impact / low-effort fixes; defer major restructuring. |
