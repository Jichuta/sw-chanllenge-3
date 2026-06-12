# Architecture and Stack Decision

## Decision Summary

Use a full-stack Next.js application deployed on Vercel, with Supabase for PostgreSQL, admin authentication, and PDF CV storage.

We do not need a separate backend service for this challenge. The requirement says data must be persisted "through an API" and the codebase must have clear separation of concerns between API, persistence, and UI. Next.js Route Handlers satisfy the API requirement when implemented under `app/api/*`, while still keeping a single deployable project.

This is the best initial stack because it is simple enough for the 2 to 3 day challenge, professional enough for an HR internal tool, and easy to deploy without managing a custom server.

## Recommended Stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Framework | Next.js with App Router | Supports UI pages, server-rendered admin screens, and API Route Handlers in one project. |
| Language | TypeScript | Reduces mistakes in form data, API payloads, DB types, and status enums. |
| Runtime | Node.js runtime for API routes | Better fit for file uploads, Supabase SDK usage, validation, and server-side auth checks. |
| UI | React + Tailwind CSS | Fast responsive UI development with consistent styling. |
| Components | shadcn/ui style components or local reusable components | Professional tables, forms, dialogs, badges, inputs, and buttons without heavy custom UI work. |
| Icons | lucide-react | Clean icons for admin actions, filters, upload, open CV, sign out, and status controls. |
| Forms | React Hook Form | Ergonomic form state and validation integration. |
| Validation | Zod | Shared validation schemas for client and server. |
| Database | Supabase Postgres | Production-ready PostgreSQL with a free development path and future-proof persistence. |
| Auth | Supabase Auth | Handles admin sign-in, sessions, JWTs, and later growth without storing passwords ourselves. |
| File Storage | Supabase Storage | Stores uploaded PDF CVs outside the Next.js filesystem, which is required for serverless deployment. |
| Data Access | Supabase server client behind repository functions | Keeps DB queries out of React components and API handlers. |
| Testing | Vitest for unit tests, Playwright for one happy-path e2e smoke test | Enough coverage for validation, traffic-light rules, and critical candidate/admin flows. |
| Deployment | Vercel | Native Next.js hosting with serverless/managed runtime support. |

## Why Not a Separate API?

The challenge asks for:

- A frontend form.
- A backend REST API.
- A database.
- Clear separation of concerns: API, persistence, UI.

It does not say the REST API must be a separate Express/Nest/FastAPI service. For this project, a separate API would add extra setup, extra deployment, CORS, duplicated environment configuration, and more moving parts without improving the challenge outcome.

The correct interpretation for this MVP is:

- UI lives in `app/*` pages and React components.
- REST endpoints live in `app/api/*/route.ts`.
- Persistence logic lives in `src/server/repositories/*`.
- Business rules live in `src/server/services/*` and shared domain helpers.
- Validation schemas live in `src/lib/validation/*`.

This gives the required separation while keeping one deployable application.

## Deployment Architecture

```text
Browser
  |
  | Public candidate form and protected admin UI
  v
Next.js on Vercel
  |
  | app/api Route Handlers
  v
Server-side application layer
  |
  | Supabase server client
  v
Supabase
  |
  | Postgres: candidates, admin_profiles
  | Auth: HR admin accounts
  | Storage: private CV PDF bucket
```

## API Design

Use REST-style route handlers. The frontend should call these endpoints instead of writing directly to Supabase tables.

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/candidates` | Public | Submit candidate form and PDF CV. |
| `GET` | `/api/admin/candidates` | Admin only | List candidates with optional filters. |
| `GET` | `/api/admin/candidates/:id` | Admin only | Get candidate profile details. |
| `PATCH` | `/api/admin/candidates/:id/status` | Admin only | Update candidate status. |
| `GET` | `/api/admin/candidates/:id/cv` | Admin only | Generate or redirect to a secure CV URL. |
| `POST` | `/api/auth/sign-out` | Admin only | Optional server-side sign-out helper if needed. |

Admin routes must validate the current Supabase session and confirm the user has an active `admin_profiles` row.

## Recommended Project Structure

```text
.
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   └── apply/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── candidates/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── api/
│   │   ├── candidates/
│   │   │   └── route.ts
│   │   └── admin/
│   │       └── candidates/
│   │           ├── route.ts
│   │           └── [id]/
│   │               ├── route.ts
│   │               ├── status/
│   │               │   └── route.ts
│   │               └── cv/
│   │                   └── route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── admin/
│   │   ├── candidate-filters.tsx
│   │   ├── candidate-status-select.tsx
│   │   ├── candidates-table.tsx
│   │   └── english-level-badge.tsx
│   ├── forms/
│   │   └── candidate-application-form.tsx
│   └── ui/
│       └── ...
├── src/
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── errors.ts
│   │   ├── formatters.ts
│   │   ├── supabase/
│   │   │   ├── browser.ts
│   │   │   ├── server.ts
│   │   │   └── service-role.ts
│   │   └── validation/
│   │       ├── candidate.schema.ts
│   │       └── admin.schema.ts
│   ├── server/
│   │   ├── auth/
│   │   │   ├── require-admin.ts
│   │   │   └── session.ts
│   │   ├── repositories/
│   │   │   ├── admin-profile.repository.ts
│   │   │   └── candidate.repository.ts
│   │   ├── services/
│   │   │   ├── candidate.service.ts
│   │   │   └── cv-storage.service.ts
│   │   └── mappers/
│   │       └── candidate.mapper.ts
│   └── types/
│       ├── candidate.ts
│       └── database.ts
├── supabase/
│   ├── migrations/
│   │   └── 0001_initial_schema.sql
│   ├── seed.sql
│   └── storage.sql
├── tests/
│   ├── unit/
│   │   ├── candidate-validation.test.ts
│   │   └── english-level.test.ts
│   └── e2e/
│       └── candidate-admin-flow.spec.ts
├── docs/
│   ├── requirement/
│   ├── prompts/
│   ├── stack/
│   │   └── architecture-stack.md
│   ├── data-model.md
│   ├── user-stories.md
│   └── vision.md
├── .env.example
├── package.json
├── README.md
└── tsconfig.json
```

## Separation of Concerns

### UI Layer

Location:

- `app/(public)/*`
- `app/admin/*`
- `components/*`

Responsibilities:

- Render pages and components.
- Show form validation feedback.
- Submit data to API routes.
- Display loading, empty, and error states.
- Keep visual rules consistent, especially English level traffic-light badges.

The UI should not call Supabase database tables directly for candidate data. Candidate writes and admin reads should go through API routes so the challenge requirement is clearly met.

### API Layer

Location:

- `app/api/*/route.ts`

Responsibilities:

- Parse request data.
- Validate payloads with Zod.
- Enforce file type and size checks.
- Enforce admin authentication on protected endpoints.
- Call service functions.
- Return consistent JSON responses and HTTP status codes.

API handlers should be thin. They should not contain raw SQL-like query logic or complex business rules.

### Service Layer

Location:

- `src/server/services/*`

Responsibilities:

- Candidate creation workflow.
- CV upload workflow.
- Candidate status update workflow.
- Traffic-light classification if used outside UI.
- Coordinating repository and storage operations.

### Persistence Layer

Location:

- `src/server/repositories/*`
- `src/lib/supabase/*`

Responsibilities:

- Supabase queries.
- Mapping database rows to application objects.
- Keeping table details away from pages and API handlers.

## Supabase Data Strategy

Use Supabase for three things:

1. Postgres tables:
   - `candidates`
   - `admin_profiles`
2. Auth:
   - HR admin email/password sign-in.
   - Session validation for `/admin/*` and `/api/admin/*`.
3. Storage:
   - Private bucket for PDF CV files.
   - Signed URLs or protected API route for opening CVs.

The public candidate form should not require authentication. The API route should use server-side credentials to insert the candidate and upload the PDF after validation.

The admin UI should require a Supabase session and an active `admin_profiles` row.

## Auth Strategy

Use Supabase Auth from the start if possible. It is more professional than writing custom password storage, and it matches the data model already prepared for `auth_user_id`.

Recommended flow:

1. Seed or manually create an HR admin user in Supabase Auth.
2. Insert a matching row in `admin_profiles`.
3. Admin logs in at `/admin/login`.
4. Middleware or server-side checks redirect unauthenticated users.
5. API admin routes call `requireAdmin()` before returning candidate data.

Minimum admin seed:

```text
Email: hr.admin@example.com
Password: ChangeMe123!
Role: Admin
```

For a real deployment, change the seed password immediately and do not expose it in production docs.

## CV Upload and Storage Strategy

Do not rely on the local filesystem for uploaded PDFs in production. Vercel serverless deployments should treat local disk as temporary. Store CVs in Supabase Storage.

Recommended rules:

- Bucket name: `candidate-cvs`.
- Bucket visibility: private.
- Allowed MIME type: `application/pdf`.
- Maximum file size: 5 MB for the MVP.
- Storage path format: `candidates/{candidateId}/cv.pdf`.
- The database stores file name, path, MIME type, and file size.
- Admin CV access uses a protected API route that verifies admin access and returns a signed URL or redirects to it.

## Validation Rules

Use shared Zod schemas where possible:

- Candidate form schema for text fields.
- Server-only file validation for PDF MIME type, extension, and size.
- Admin status update schema.
- Filter query schema for country, city, and English level.

Important: client-side validation is for user experience only. The API must repeat validation because public requests can bypass the browser form.

## UI Design Direction

This is an HR operations tool, not a marketing site.

Use a quiet, professional interface:

- Public form: focused, responsive, clear field grouping, strong error states.
- Admin panel: dense but readable table, filters above the table, status badges, CV action button.
- Candidate profile: compact detail layout with status update control and CV access.
- Avoid oversized hero sections, decorative cards, and promotional copy.

Expected UI components:

- Text inputs.
- Select dropdowns.
- File upload field.
- Submit buttons with loading state.
- Table.
- Filter controls.
- Status badges.
- English level traffic-light badge.
- Dialog or page for candidate profile.
- Toast or inline feedback for success/error states.

## Environment Variables

Use `.env.local` for development and `.env.example` for documentation.

Expected variables:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_CV_BUCKET=candidate-cvs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Rules:

- `NEXT_PUBLIC_*` variables are safe for browser use.
- `SUPABASE_SERVICE_ROLE_KEY` must only be used server-side.
- Never expose service role keys to client components.

## Database and Seed Files

Place database setup under `supabase/`:

```text
supabase/
├── migrations/
│   └── 0001_initial_schema.sql
├── seed.sql
└── storage.sql
```

`0001_initial_schema.sql` should create:

- `admin_profiles`
- `candidates`
- indexes
- constraints
- optional row level security policies

`seed.sql` should create:

- One admin profile linked to a Supabase auth user when available.
- Demo candidates covering green, yellow, and red English levels.
- Demo candidates across at least two locations and two statuses.

For Supabase Auth users, local seeding may require Supabase CLI or manual setup in the dashboard. The README should document the exact local path chosen.

## Testing Strategy

Keep tests focused on challenge risk.

### Unit Tests

Test:

- Candidate validation schema.
- Status update validation.
- English level traffic-light helper.
- File validation helper if isolated.

### E2E Smoke Test

One Playwright test is enough for the MVP:

1. Submit a candidate form with a sample PDF.
2. Sign in as HR admin.
3. Filter candidates.
4. Open the candidate detail.
5. Change status to Accepted.

This proves the main business flow works.

## Implementation Order

1. Scaffold Next.js with TypeScript, Tailwind, ESLint.
2. Add Supabase client setup and environment variables.
3. Add database migration for `admin_profiles` and `candidates`.
4. Add seed data and sample PDF fixture.
5. Implement shared constants and Zod schemas.
6. Implement candidate submission API and CV upload service.
7. Build public candidate form.
8. Implement admin login with Supabase Auth.
9. Protect admin pages and admin API routes.
10. Implement candidate list API with filters.
11. Build admin candidates table and filters.
12. Implement candidate profile view.
13. Implement status update endpoint and UI control.
14. Implement protected CV opening.
15. Add tests for validation and traffic-light rules.
16. Add README run instructions.
17. Update prompt log after each feature.

## Best-Practice Rules for This Project

- Keep API handlers thin.
- Keep Supabase queries in repositories.
- Keep business rules out of React components when they affect server behavior.
- Use TypeScript enums or literal unions for English level and candidate status.
- Validate every public and admin API input with Zod.
- Never trust client-side file validation only.
- Store PDFs in Supabase Storage, not in the deployed app filesystem.
- Keep admin routes protected both in the UI and API.
- Do not use the Supabase service role key in client code.
- Prefer server components for data-heavy admin pages and client components only where interaction is required.
- Keep the MVP small: one admin role, one candidate table, one CV file per candidate.

## Final Recommendation

Use Next.js as a full-stack application, not a separate frontend plus separate API service.

This gives us:

- Public registration form.
- REST API through Next.js Route Handlers.
- Database persistence through Supabase Postgres.
- Admin authentication through Supabase Auth.
- PDF CV storage through Supabase Storage.
- A single Vercel deployment.
- A clean internal architecture that satisfies the challenge's separation-of-concerns requirement.

## References

- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Next.js on Vercel: https://vercel.com/docs/frameworks/full-stack/nextjs
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase Storage: https://supabase.com/docs/guides/storage
- Supabase Pricing: https://supabase.com/pricing

