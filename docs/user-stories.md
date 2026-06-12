# User Stories

## Implementation Priority

The project will be delivered in small implementation sprints so the repository remains runnable after each step.

### Sprint 1: Project Foundation

Goal: create the Next.js TypeScript foundation, documentation, folder structure, validation conventions, test setup, and local run instructions.

Included stories:

- TS-005: Set up the application foundation.
- TS-006: Define project structure and engineering standards.
- TS-007: Set up automated tests.
- TS-008: Document local development workflow.

Not included yet:

- Candidate submission persistence.
- Supabase Auth integration.
- Admin candidate table implementation.
- PDF upload to Supabase Storage.

### Sprint 2: Candidate Application Flow

Goal: implement the public candidate form, candidate validation, candidate API endpoint, and CV file checks.

Included stories:

- US-001: Submit Candidate Registration.
- US-002: Use the Form on Mobile.
- TS-001: Persist Data Through an API.
- TS-003: Validate Candidate Input.

### Sprint 3: Admin Auth and Candidate Review

Goal: implement HR admin sign-in, protected admin pages, candidate list, filters, profile view, CV opening, and status updates.

Included stories:

- US-003: Sign In as HR Admin.
- US-004: View Candidate List.
- US-005: Filter Candidates.
- US-006: See English Level Status.
- US-007: Open Candidate CV.
- US-008: Update Candidate Status.
- TS-002: Seed Initial Data.
- TS-004: Prepare for Supabase Auth.

## Candidate Stories

### US-001: Submit Candidate Registration

As a candidate, I want to submit my personal information and CV so that I can apply for the recruitment process.

Acceptance criteria:

- The form captures name, email, phone, age, country, city, English level, and CV.
- All fields are required.
- English level is selected from a dropdown.
- CV upload only accepts PDF files.
- The candidate sees a clear success message after submission.
- The candidate sees validation errors when required or invalid data is submitted.

### US-002: Use the Form on Mobile

As a candidate, I want the registration form to work on mobile so that I can apply from any device.

Acceptance criteria:

- The form layout adapts to small screens.
- Inputs are readable and easy to tap.
- Submit actions and validation messages remain visible and understandable.

## Admin Stories

### US-003: Sign In as HR Admin

As an HR admin, I want to sign in before accessing candidate data so that applicant information is protected from public access.

Acceptance criteria:

- The admin area requires authentication.
- A seeded admin account exists for local development and demos.
- Invalid credentials show a clear error.
- A signed-in admin can sign out.
- Unauthenticated users are redirected away from admin screens.

### US-004: View Candidate List

As an HR admin, I want to view all candidate submissions so that I can review applicants.

Acceptance criteria:

- The admin panel displays a table of candidates.
- Each row shows name, email, phone, location, English level, status, and CV access.
- Candidate rows are loaded from the API.
- The candidate list is only available to authenticated admins.
- Empty and error states are handled.

### US-005: Filter Candidates

As an HR admin, I want to filter candidates by location and English level so that I can find relevant applicants faster.

Acceptance criteria:

- HR admin can filter by country and/or city.
- HR admin can filter by English level.
- Filters can be cleared.
- Filtered results update the candidate table.

### US-006: See English Level Status

As an HR admin, I want English level to be highlighted with traffic-light colors so that I can quickly identify language fit.

Acceptance criteria:

- B2, C1, and C2 appear as green.
- B1 appears as yellow.
- A1 and A2 appear as red.
- The color indicator is visible in the candidate list and profile view.

### US-007: Open Candidate CV

As an HR admin, I want to open a candidate PDF CV so that I can review their resume.

Acceptance criteria:

- Each candidate row provides a CV link or button.
- The CV opens in the browser or downloads as a PDF.
- Missing or unavailable CV files show a clear error.

### US-008: Update Candidate Status

As an HR admin, I want to mark candidates as Accepted, Rejected, or In Review so that I can track review progress.

Acceptance criteria:

- Admin can update candidate status from the admin panel.
- Valid statuses are Accepted, Rejected, and In Review.
- Status changes persist in the database.
- The system records which admin last updated the status when available.
- The UI reflects the updated status after saving.

## Technical Stories

### TS-001: Persist Data Through an API

As a developer, I want candidate data to be stored through a REST API so that frontend, backend, and persistence concerns stay separated.

Acceptance criteria:

- The frontend does not write directly to the database.
- The API validates request data.
- Candidate data is stored in a database.
- CV metadata is associated with the candidate record.

### TS-002: Seed Initial Data

As a developer, I want seed data for required admin and demo records so that the application can be tested locally by the HR team.

Acceptance criteria:

- A default HR admin account is created in development.
- Seed data includes representative candidates across English levels and statuses.
- Seed credentials are documented for local use only.
- Seed data can be recreated safely in a local environment.

### TS-003: Validate Candidate Input

As a developer, I want validation on both frontend and backend so that invalid submissions are rejected consistently.

Acceptance criteria:

- Required fields are validated.
- Email format is validated.
- Age is validated as a reasonable number.
- CV file type and file size are validated.
- API returns useful validation errors.

### TS-004: Prepare for Supabase Auth

As a developer, I want the admin identity model to be compatible with Supabase Auth so that future integration does not require redesigning the HR workflow.

Acceptance criteria:

- Admin profile data is separate from password storage.
- The data model can reference an external auth user id.
- Admin-only API routes check the authenticated admin session.
- Local development can use a simple seeded auth strategy until Supabase is integrated.

### TS-005: Set Up Application Foundation

As a developer, I want the Next.js TypeScript project initialized with consistent tooling so that feature work can start from a reliable base.

Acceptance criteria:

- The repository includes a Next.js App Router structure.
- TypeScript is configured with strict mode.
- ESLint and formatting conventions are available through npm scripts.
- Tailwind CSS global styling is configured.
- The app has a basic public route and admin placeholder route.

### TS-006: Define Project Structure and Engineering Standards

As a developer, I want folders organized by responsibility so that API, persistence, UI, and domain logic stay separated.

Acceptance criteria:

- App routes live under `app/`.
- Reusable UI components live under `components/`.
- Server-only business logic lives under `src/server/`.
- Shared constants, validation, and helpers live under `src/lib/`.
- Types live under `src/types/`.
- Supabase migration and seed files live under `supabase/`.

### TS-007: Set Up Automated Tests

As a developer, I want basic test tooling available from Sprint 1 so that validation and business rules can be verified as features are added.

Acceptance criteria:

- Vitest is configured for unit tests.
- A test script exists in `package.json`.
- At least one unit test covers an existing business helper.
- The testing folder structure is ready for unit and e2e tests.

### TS-008: Document Local Development Workflow

As a developer, I want a README with setup and run commands so that a peer can start the project locally.

Acceptance criteria:

- README explains the project purpose.
- README lists prerequisites.
- README documents install, dev, lint, test, and build commands.
- README documents required environment variables.
- `.env.example` is included.
