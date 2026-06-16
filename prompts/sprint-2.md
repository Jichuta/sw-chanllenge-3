# Prompt Log — Sprint 2: Candidate Application Flow

## Prompt 2.1: Add Supabase clients and database setup

**Prompt:**
```
Add Supabase client modules: browser.ts, server.ts, and service-role.ts in src/lib/supabase/.
browser.ts uses createBrowserClient from @supabase/ssr.
server.ts uses createServerClient from @supabase/ssr with cookie handling.
service-role.ts uses createClient from @supabase/supabase-js with the service role key.

Create supabase/migrations/0001_initial_schema.sql with tables:
- admin_profiles (id, auth_user_id, email, name, role, is_active, created_at, updated_at)
- candidates (id, name, email, phone, age, country, city, english_level, status, cv_file_name, cv_file_path, cv_mime_type, cv_file_size, status_updated_by, status_updated_at, created_at, updated_at)
Include indexes and foreign key constraints.

Update supabase/seed.sql with:
- One admin profile: hr.admin@example.com, HR Admin, Admin role, active.
- Three candidates: one with C1 (green), one with B2 (green), one with A2 (red).
- Cover at least two countries and two statuses.

Update supabase/storage.sql to create a private candidate-cvs bucket.
```

**Assistant response:**
Created all three Supabase client modules. Migration SQL creates both tables with proper constraints and indexes. Seed data includes 1 admin profile and 3 candidates across different English levels and locations. Storage SQL creates private bucket.

**Manual edits:** None.

---

## Prompt 2.2: Implement candidate repository and CV storage service

**Prompt:**
```
Implement the candidate repository (src/server/repositories/candidate.repository.ts):
- insertCandidate: inserts a row and returns it.
- listCandidates: selects all with optional eq filters for country, city, english_level, ordered by created_at desc.

Implement the CV storage service (src/server/services/cv-storage.service.ts):
- uploadCv: uploads a file buffer to Supabase Storage path candidates/{candidateId}/{fileName}.

Implement the candidate mapper (src/server/mappers/candidate.mapper.ts):
- toCandidate: maps CandidateRow to the Candidate application model.
- toCandidateRow: maps input data to a CandidateRow.

Implement the candidate service (src/server/services/candidate.service.ts):
- createCandidate: generates UUID, uploads CV, inserts candidate row, returns mapped candidate.

All repositories use the service-role client.
```

**Assistant response:**
Created all four files. Repository uses PostgREST query builder with typed responses. CV service uploads to `candidates/{candidateId}/{fileName}` path. Mapper transforms snake_case DB rows to camelCase app types. Service coordinates the full create flow.

**Manual edits:** None.

---

## Prompt 2.3: Create POST /api/candidates route

**Prompt:**
```
Create POST /api/candidates route handler:
- Accept FormData with fields (name, email, phone, age, country, city, englishLevel) and a PDF file (cv).
- Validate text fields with the Zod schema.
- Validate file: must be present, must be application/pdf, must be under 5 MB.
- Call candidateService.createCandidate.
- Return 201 with { data: candidate } on success.
- Return 400 with { error: { code, message } } on validation failure.
- Return 500 on unexpected errors.
- Use the existing apiError helper.
```

**Assistant response:**
Created `app/api/candidates/route.ts` with proper FormData parsing, Zod validation, file validation, and structured error responses. Follows the thin-handler pattern — delegates to the candidate service.

**Manual edits:** None.

---

## Prompt 2.4: Build responsive candidate application form

**Prompt:**
```
Build a responsive candidate application form component using React Hook Form + Zod resolver.
Fields: name, email, phone, age, country, city, englishLevel (dropdown), cv (file upload).
- All fields are required.
- CV accepts only application/pdf.
- Show inline validation errors for each field.
- Submit sends FormData to POST /api/candidates.
- On success, show a success toast (sonner) and reset the form.
- On error, show an error toast.
- The form must be responsive and work on mobile.
- Use the existing Badge, ButtonLink components for consistent styling.

Create the /apply page that renders this form.
Update the homepage to link to the apply page.
Add a Sonner toaster component.
```

**Assistant response:**
Created `components/forms/candidate-application-form.tsx` with all 8 fields. Uses `useForm` with `zodResolver`. File input accepts only `.pdf` with client-side MIME and size validation. Submit handler creates FormData and calls the API. Toast notifications via `sonner`. Created `/apply` page as the form container. Updated homepage with "Apply now" link. Created `toaster.tsx` wrapper for Sonner.

**Manual edits:** None.

---

## Prompt 2.5: Add validation tests and install dependencies

**Prompt:**
```
Add unit tests for candidate validation:
- Test all required fields.
- Test invalid email format.
- Test age out of range (< 16 or > 100).
- Test invalid English level.
- Test CV file type validation.
- Test CV file size validation.
Create the test file at tests/unit/candidate-validation.test.ts.

Ensure sonner and @hookform/resolvers are in package.json dependencies.
Run full verification: pnpm typecheck, pnpm lint, pnpm test, pnpm build.
```

**Assistant response:**
Created `tests/unit/candidate-validation.test.ts` with 12 test cases covering all validation rules. All 15 tests pass. Build compiles successfully with all routes.

**Manual edits:** None.

---

## Prompt 2.6: Handle development without Supabase

**Prompt:**
```
There are errors when running pnpm dev — Supabase env vars are missing locally.
Fix the Supabase client files to gracefully handle missing environment variables.
```

**Assistant response:**
Added env var checks in all three Supabase client files. Removed empty Supabase vars from `.env` to prevent shadowing `.env.local`. Improved admin error boundary to show a configuration guide. Added `force-dynamic` to dashboard layout to prevent build-time prerender of admin pages.

**Manual edits:** None.

---

## Prompt 2.7: Add mock Supabase client for local development

**Prompt:**
```
Create a mock Supabase client that works without Supabase credentials for local development.
The mock should:
- Auto-authenticate as the admin user.
- Return in-memory seed data for candidates.
- Support insert, select, update operations against in-memory storage.
- Provide mock storage operations.
The app should use the real Supabase when env vars are set, and the mock when they're missing.
```

**Assistant response:**
Created `mock-data.ts` with in-memory store and seed data. Created `mock-client.ts` with a fluent query builder supporting `.select()`, `.insert()`, `.update()`, `.eq()`, `.order()`, `.single()`, and `.then()` chaining. All three Supabase client files auto-fallback to mock when env vars are missing.

**Manual edits:** None.
