# Sprint 4 Plan: Prompt Log, Final Polish, and Delivery Completion

## Sprint Goal

Complete the remaining challenge deliverables — create the `/prompts` folder with detailed prompt logs for every feature, ensure all functional and technical acceptance criteria from `challenge3.md` are verified, and polish any rough edges so the repository is deliverable-ready.

By the end of Sprint 4, the repository contains a complete prompt log documenting prompts and manual edits for all three prior sprints, all acceptance criteria are confirmed passing, and the project is ready for submission.

## Scope

### Included

- Create `/prompts` folder with prompt-log files documenting prompts used per feature.
- Document each sprint's prompts, the assistant's responses, and any manual edits made.
- Verify all functional acceptance criteria from `challenge3.md`:
  - Public registration form captures all required fields.
  - Data is persisted through an API.
  - Admin panel shows candidate list with filters (location, English level).
  - Traffic-light rule is applied (B2+/green, B1/yellow, A1-A2/red).
  - Form is responsive on mobile and desktop.
  - PDF CV can be opened from admin table.
  - Candidate status can be updated (Accepted, Rejected, In Review).
- Verify all technical acceptance criteria from `challenge3.md`:
  - Spec documents exist (vision, user stories, data model).
  - A `/prompts` folder collects prompts per feature.
  - A planning file tracks progress (sprint plans).
  - Clear separation of concerns (API, persistence, UI).
  - Basic input validation, error handling, CV file-type/size checks.
  - README lets a peer run the project locally.
- End-to-end manual test of the full candidate-to-admin flow in mock mode.
- Fix any issues uncovered during verification.
- Final update to README and documentation.

### Excluded

- New features beyond the challenge requirements.
- Supabase Auth integration improvements (the mock mode already covers local dev).
- Real deployment to Vercel (out of scope for the challenge deliverable).
- CI/CD pipeline setup.
- Performance optimization.
- Additional test coverage beyond what's needed for acceptance.

## Stories Covered

- All 8 user stories (US-001 through US-008) — verification and polish.
- All 8 technical stories (TS-001 through TS-008) — verification and polish.
- Challenge requirement: Prompt log deliverable.

## Sprint Board

| Task | Status |
| --- | --- |
| Create Sprint 4 planning document. | Done |
| Create `/prompts` folder structure. | Done |
| Write prompt log for Sprint 1 (project foundation). | Done |
| Write prompt log for Sprint 2 (candidate application flow). | Done |
| Write prompt log for Sprint 3 (admin auth and review). | Done |
| Write prompt log for Sprint 4 (this sprint). | Done |
| Verify functional acceptance criteria (form, API, admin, filters, traffic-light, CV, status). | Done |
| Verify technical acceptance criteria (specs, prompts, planning, separation, validation, README). | Done |
| Run full end-to-end manual test in mock mode. | Done |
| Fix any issues found during verification. | Done |
| Final verification (typecheck, lint, test, build). | Done |
| Update README with final delivery notes. | Done |

## Definition of Done

- The `/prompts` folder exists with a prompt-log file for each sprint (1–4).
- Each prompt log documents the prompts used, the assistant's responses, and any manual edits.
- All functional acceptance criteria from `challenge3.md` are verified and passing:
  - Public form captures name, email, phone, age, country, city, English level (dropdown), and PDF CV.
  - Data is persisted in the database through an API.
  - Admin panel shows candidate list with filters by location and English level.
  - Traffic-light rule: B2+ green, B1 yellow, lower levels red.
  - Form is responsive (mobile and desktop).
  - PDF CV can be opened from the admin table.
  - Candidate profile can be marked as Accepted, Rejected, or In Review.
- All technical acceptance criteria from `challenge3.md` are verified and passing:
  - Spec documents exist before code (vision, user stories, data model).
  - A `/prompts` folder collects the prompts used per feature.
  - A planning file tracks the assistant's progress per task (todo / doing / done).
  - The codebase has a clear separation of concerns (API, persistence, UI).
  - Basic input validation, error handling, and CV file-type/size checks are present.
  - The repo has a README that lets a peer run the project locally.
- TypeScript compiles with no errors.
- `pnpm lint` reports zero errors.
- `pnpm test` passes all tests.
- `pnpm build` succeeds.

## Engineering Standards (from previous sprints, plus:)

- Prompt log files live under `/prompts/` at the project root.
- Each sprint gets its own prompt log file: `prompts/sprint-1.md`, `prompts/sprint-2.md`, etc.
- Each prompt log entry includes:
  - The prompt or instruction given to the assistant.
  - A summary of the assistant's response/code changes.
  - Any manual edits made after the assistant's response.
- Manual edits include file path and a short description of what was changed and why.
- Final verification must run the full suite: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`.

## Proposed Sprint 4 File Changes

```
.
|-- prompts/
|   |-- sprint-1.md                    (NEW)
|   |-- sprint-2.md                    (NEW)
|   |-- sprint-3.md                    (NEW)
|   `-- sprint-4.md                    (NEW)
|-- README.md                          (UPDATE - final delivery notes)
`-- docs/
    `-- implementation-1/
        `-- sprint-4-plan.md           (NEW)
```

## Sprint Risks

| Risk | Mitigation |
| --- | --- |
| Prompt logs may be incomplete if prior interactions are not fully remembered. | Reconstruct from the planning documents, code changes, and feature history. Note any gaps explicitly. |
| Some acceptance criteria may fail in mock mode (e.g. signed CV URL). | Mock storage returns a placeholder URL; document this as expected mock behavior. |
| Manual edits may be under-documented. | Review git log and file history to identify manual interventions. |
| Time may be short for full e2e manual test. | Prioritize the most critical flow: form submit → admin login → view → filter → status update. |
