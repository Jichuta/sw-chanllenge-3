# Vision

## Product Summary

Build a responsive recruitment web application for an internal HR team. Candidates can submit their profile and PDF CV through a public form, while authenticated administrators can review, filter, and update each candidate status.

The project is intentionally scoped as a simple MVP that can be completed in 2 to 3 days while still showing clean separation of concerns, database persistence, validation, and a usable admin workflow.

## Goals

- Provide a public candidate registration form.
- Persist candidate data and uploaded CV metadata through a REST API.
- Provide a protected admin panel for HR reviewers.
- Support simple admin authentication from the start, with a path to integrate Supabase Auth later.
- Allow admins to filter candidates by location and English level.
- Show English level with a traffic-light visual rule.
- Allow admins to mark candidates as Accepted, Rejected, or In Review.
- Seed the minimum data needed to run and demo the HR workflow locally.
- Keep project documentation and prompt logs as evidence of the AI-assisted workflow.

## Non-Goals

- Complex permission management beyond a basic admin role.
- Advanced applicant tracking workflows.
- Email notifications.
- Resume parsing or AI scoring.
- Multi-step interview scheduling.
- Cloud deployment automation.

## Target Users

### Candidate

A person applying for a recruitment process. They need a fast, mobile-friendly form to submit personal information and upload a PDF CV.

### Administrator

A member of the HR team who signs in to inspect candidate submissions, filter the list, open CV files, and update candidate review status.

## Core User Flow

1. Candidate opens the public registration form.
2. Candidate enters name, email, phone, age, country, city, English level, and uploads a PDF CV.
3. Frontend validates required fields and PDF constraints before submission.
4. API validates input again, stores the candidate record, and saves the CV file.
5. Admin signs in with a seeded HR account.
6. Admin opens the protected admin panel.
7. Admin filters candidates by location and/or English level.
8. Admin opens a candidate profile or CV.
9. Admin updates the candidate status.

## Business Rules

- CV upload is mandatory.
- CV must be a PDF file.
- Candidate status defaults to `In Review`.
- Admin panel access requires a valid admin session.
- Initial development includes at least one seeded HR admin account.
- English level visual status:
  - `B2`, `C1`, `C2`: green.
  - `B1`: yellow.
  - `A1`, `A2`: red.
- Admin can change candidate status to:
  - `Accepted`
  - `Rejected`
  - `In Review`

## Success Criteria

- A candidate can submit the form from desktop and mobile.
- Candidate data is persisted in the database through the API.
- Admin users must sign in before accessing HR review screens.
- Admin can see candidate rows, filter them, and open the uploaded PDF CV.
- Admin can update candidate review status.
- The repository includes docs, prompt logs, planning notes, and a README to run locally.
