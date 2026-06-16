# Prompt Log — Sprint 3: Admin Auth and Candidate Review

## Prompt 3.1: Add auth session helper and requireAdmin guard

**Prompt:**
```
Add auth session helper (src/server/auth/session.ts):
- getSession: returns the current Supabase session or null.
- getCurrentUser: returns the current user or null.
Both use the server client.

Implement requireAdmin (src/server/auth/require-admin.ts):
- Get the current user from the session.
- If no user, return 401 with UNAUTHORIZED error.
- Look up the admin profile by auth_user_id.
- If no profile or not active, return 403 with FORBIDDEN error.
- Return the admin profile on success.

Implement admin profile repository (src/server/repositories/admin-profile.repository.ts):
- findAdminProfileByAuthUserId: queries admin_profiles by auth_user_id, returns single row or null.
```

**Assistant response:**
Created all three files. Session helper uses the Supabase SSR server client. `requireAdmin` returns structured `{ ok: true, admin }` or `{ ok: false, response: Response }` tuples for easy use in API routes. Repository uses service-role client.

**Manual edits:** None.

---

## Prompt 3.2: Create admin API routes

**Prompt:**
```
Create admin API routes under app/api/admin/candidates/:

GET /api/admin/candidates:
- Protected with requireAdmin().
- Accept query params: country, city, englishLevel.
- Return { data: Candidate[] } with filters applied.
- Return 400 on invalid filter values.

GET /api/admin/candidates/[id]:
- Protected with requireAdmin().
- Return { data: Candidate } or 404.

PATCH /api/admin/candidates/[id]/status:
- Protected with requireAdmin().
- Accept { status } in body.
- Validate status is one of In Review, Accepted, Rejected.
- Update status via candidateService.updateStatus with admin id.
- Return { data: Candidate }.

GET /api/admin/candidates/[id]/cv:
- Protected with requireAdmin().
- Generate signed URL for CV via candidateService.getCandidateCvUrl.
- Redirect (302) to the signed URL.

Add these methods to candidate.service.ts:
- getCandidates(filters)
- getCandidateById(id)
- updateStatus(id, status, adminId?)
- getCandidateCvUrl(id)

Add getSignedUrl to cv-storage.service.ts using Supabase Storage createSignedUrl.
```

**Assistant response:**
Created all four API route files. Added the four service methods to `candidate.service.ts`. Added `getCvSignedUrl` to `cv-storage.service.ts`. All routes follow the same pattern: validate → call service → return structured response. CV route validates admin access before generating signed URL.

**Manual edits:** None.

---

## Prompt 3.3: Create admin login page

**Prompt:**
```
Create admin login page at app/admin/login/page.tsx:
- Email and password inputs with Zod validation.
- Uses the Supabase browser client for signInWithPassword.
- On success: show success toast, redirect to /admin/candidates, refresh router.
- On error: show error toast with the error message.
- Responsive layout centered on screen.
- Pre-fill email placeholder with hr.admin@example.com.
- Update app/admin/page.tsx to redirect to /admin/candidates.

Add login validation schema (src/lib/validation/admin.schema.ts):
- Email: required, valid format.
- Password: required, min 6 characters.
```

**Assistant response:**
Created login page with clean centered form, loading state on submit button, and toast notifications. Admin root page now redirects with `redirect("/admin/candidates")`. Login schema validates email format and password length.

**Manual edits:** None.

---

## Prompt 3.4: Create protected admin layout

**Prompt:**
```
Create a protected admin layout at app/admin/layout.tsx (inside a (dashboard) route group):
- Check Supabase session on every request using the server client.
- If no session, redirect to /admin/login.
- Look up admin profile by auth_user_id.
- If profile not found or inactive, sign out and redirect to login.
- Render children within AdminShell component.
- Add signOut server action that clears session and redirects to login.
- Add loading.tsx and error.tsx for admin routes.
```

**Assistant response:**
Created `app/admin/(dashboard)/layout.tsx` with server-side session check, admin profile verification, and sign-out server action. Created `loading.tsx` with a simple centered loading indicator. Created `error.tsx` with "Try again" button and error message.

**Manual edits:** None.

---

## Prompt 3.5: Build admin UI components

**Prompt:**
```
Build the following admin components:

1. EnglishLevelBadge: displays English level with traffic-light colors (green/yellow/red).
2. CandidateFilters: form with country, city, englishLevel dropdowns + clear button.
3. CandidatesTable: table with columns Name, Email, Location, English, Status, Date, CV, View.
   - English level uses EnglishLevelBadge.
   - Status uses Badge with tone colors.
   - CV opens via /api/admin/candidates/[id]/cv.
   - View links to /admin/candidates/[id].
4. CandidateStatusSelect: dropdown to change candidate status with confirmation.
   - Shows loading state during update.
   - Calls PATCH /api/admin/candidates/[id]/status.
   - Emits onStatusChange callback on success.
   - Shows toast on error.

All components use existing patterns: lucide-react icons, Badge, cn utility, consistent styling.
```

**Assistant response:**
Created all four components. `EnglishLevelBadge` uses the `englishLevelTone` helper from constants. `CandidatesTable` handles empty state. `CandidateStatusSelect` has loading/error handling and toast feedback.

**Manual edits:** None.

---

## Prompt 3.6: Create admin candidate pages

**Prompt:**
```
Create admin candidate list page (app/admin/(dashboard)/candidates/page.tsx):
- Client component with useState/useEffect.
- Fetches from GET /api/admin/candidates on mount.
- Renders CandidateFilters + CandidatesTable.
- Handles loading, empty, and error states.
- Filter handler re-fetches with query params.

Create admin candidate profile page (app/admin/(dashboard)/candidates/[id]/page.tsx):
- Client component with useParams.
- Fetches from GET /api/admin/candidates/[id].
- Shows all candidate fields: name, email, phone, age, country, city, English level.
- Shows CV download link, file size, submission date, last update date.
- Shows current status badge + CandidateStatusSelect for status changes.
- Back link to candidate list.
- Handles loading, not found, and error states.
```

**Assistant response:**
Created both pages with full state handling. List page supports filter re-fetching. Profile page shows all candidate details and inline status update. Both pages follow the established pattern of client-side data fetching with toast error feedback.

**Manual edits:** None.

---

## Prompt 3.7: Add e2e test and update seed data

**Prompt:**
```
Add a Playwright e2e smoke test (tests/e2e/candidate-admin-flow.spec.ts):
- Test that public pages load (homepage, apply page, admin login page).
- Verify form fields are present.
- Verify admin login page has email and password inputs.
- Do not depend on Supabase being configured (skip tests that require API calls).

Update supabase/seed.sql with the auth user reference for Supabase Auth setup.
Update README with Sprint 3 documentation.
Run full verification: pnpm typecheck, pnpm lint, pnpm test, pnpm build.
```

**Assistant response:**
Created e2e smoke test covering public page loads. Updated seed SQL with auth user reference. Updated README with Sprint 3 docs. All verification passes.

**Manual edits:** None.

---

## Prompt 3.8: Add local mock auth with login flow

**Prompt:**
```
The mock auto-authenticates but it should require login first.
Fix the mock so:
- Visiting /admin/candidates without auth redirects to /admin/login.
- The login page accepts email/password and sets a session cookie.
- The server mock reads the cookie to verify the session.
- Sign out actually clears the cookie.
- Add a local_users table with seed credentials (hr.admin@example.com / ChangeMe123!).
```

**Assistant response:**
Refactored mock client into three factories: browser (document.cookie), server (next/headers cookies), data-only (no auth). Browser `signInWithPassword` validates against `MOCK_LOCAL_USERS` and sets a `mock-session` cookie. Server `getSession` reads the cookie. `signOut` clears it via the cookie store.

**Manual edits:** Fixed sign out — initially the server mock's `signOut` was a no-op; added `setAllCookies` callback to properly clear the cookie.
