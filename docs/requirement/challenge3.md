# SW Challenge 3: Building with a Single AI Code Assistant

| Level | Skills | Required Resources | Time |
|---------|---------|---------|---------|
| Basic | Single-agent coding workflow<br>prompt engineering for code<br>reviewing AI suggestions<br>spec-to-code with assistants | GitHub Copilot or Claude Code<br>Preferred language<br>PostgreSQL or SQLite | 2 - 3 days |

## Challenge: Recruitment Webapp with AI Code Assistance

Recreate a responsive recruitment web application, a candidate registration form (name, email, phone, age, country, city, English level dropdown and a mandatory PDF CV) and an admin panel, by working with an AI code assistant as your pair-programmer.

Start with a specification document, then guide the assistant through prompts to build the backend (REST API and database), the frontend form, and the admin table featuring filters and a traffic-light status system for English Level (B2+ in green, B1 in yellow, lower levels in red).

The admin panel should allow you to view a candidate's profile and mark them as "Accepted," "Rejected," or "In Review".

Maintain a "prompt log" file to document the prompts used for each feature and any manual edits you made.

## Deliverables

A repository containing at least the following:

- The public registration form
- Data model
- Admin panel
- Prompt log
- Readme file

# Functional acceptance criteria

- The public registration form captures name, email, phone, age, country, city, English level (dropdown) and a mandatory PDF CV.
- Data is persisted in a database through an API.
- Admin panel shows the candidate list with filters by location and English level.
- Traffic-light rule highlights B2+ in green, B1 in yellow, lower levels in red.
- The form is responsive (mobile and desktop).
- The PDF CV can be opened from the admin table.
- The candidate's profile can be marked as accepted, rejected and in review.

# Technical acceptance criteria

- Spec documents exist before code (vision, user stories, data model).
- A /prompts folder collects the prompts used per feature.
- A planning file tracks the assistant's progress per task (todo / doing / done).
- The codebase has a clear separation of concerns (API, persistence, UI).
- Basic input validation, error handling and CV file-type/size checks are present.
- The repo has a README that lets a peer run the project locally.
