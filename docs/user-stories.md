# User Stories

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
