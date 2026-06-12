# Data Model

## Overview

The MVP uses two main application entities: `Candidate` and `AdminProfile`. Candidate records represent applications submitted from the public form. Admin profiles represent HR users allowed to access the protected review workflow.

The uploaded CV file is stored on disk or object storage, while the database stores file metadata and a path or URL.

This model works with SQLite for a simple local setup and can be moved to PostgreSQL or Supabase with minimal changes. When Supabase Auth is introduced, password storage should live in Supabase `auth.users`, while `admin_profiles.auth_user_id` links the authenticated user to app-level HR data.

For local development without Supabase, the app uses an in-memory `LocalUser` store with plain-text passwords (never use this pattern in production).

## Entities

### Candidate

Represents one recruitment application submitted through the public form.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string / uuid | yes | Primary key. |
| name | string | yes | Candidate full name. |
| email | string | yes | Candidate email. Should be unique for MVP simplicity. |
| phone | string | yes | Candidate phone number. |
| age | integer | yes | Candidate age. |
| country | string | yes | Candidate country. |
| city | string | yes | Candidate city. |
| english_level | enum | yes | One of A1, A2, B1, B2, C1, C2. |
| status | enum | yes | One of In Review, Accepted, Rejected. Defaults to In Review. |
| cv_file_name | string | yes | Original or generated PDF filename. |
| cv_file_path | string | yes | Server path or URL used to open the PDF. |
| cv_mime_type | string | yes | Must be application/pdf. |
| cv_file_size | integer | yes | Size in bytes. |
| status_updated_by | string / uuid | no | Admin profile id that last changed status. |
| status_updated_at | datetime | no | Timestamp for last status change. |
| created_at | datetime | yes | Submission timestamp. |
| updated_at | datetime | yes | Last update timestamp. |

### AdminProfile

Represents an HR team member who can access the admin panel.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string / uuid | yes | Primary key. |
| auth_user_id | string | no | External auth id, used later with Supabase Auth. |
| email | string | yes | Admin sign-in email. Must be unique. |
| name | string | yes | HR team member display name. |
| role | enum | yes | Defaults to Admin for the MVP. |
| is_active | boolean | yes | Controls whether the admin can access the panel. |
| created_at | datetime | yes | Profile creation timestamp. |
| updated_at | datetime | yes | Last update timestamp. |

## Enumerations

### EnglishLevel

- `A1`
- `A2`
- `B1`
- `B2`
- `C1`
- `C2`

### CandidateStatus

- `In Review`
- `Accepted`
- `Rejected`

### AdminRole

- `Admin`

## Traffic-Light Rule

| English Level | UI Color | Meaning |
| --- | --- | --- |
| B2, C1, C2 | Green | Strong English level. |
| B1 | Yellow | Intermediate English level. |
| A1, A2 | Red | Below target level. |

## Suggested SQL Schema

```sql
CREATE TABLE admin_profiles (
  id TEXT PRIMARY KEY,
  auth_user_id TEXT UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Admin' CHECK (role IN ('Admin')),
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 16 AND age <= 100),
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  english_level TEXT NOT NULL CHECK (english_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  status TEXT NOT NULL DEFAULT 'In Review' CHECK (status IN ('In Review', 'Accepted', 'Rejected')),
  cv_file_name TEXT NOT NULL,
  cv_file_path TEXT NOT NULL,
  cv_mime_type TEXT NOT NULL CHECK (cv_mime_type = 'application/pdf'),
  cv_file_size INTEGER NOT NULL,
  status_updated_by TEXT,
  status_updated_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (status_updated_by) REFERENCES admin_profiles(id)
);

CREATE INDEX idx_candidates_location ON candidates (country, city);
CREATE INDEX idx_candidates_english_level ON candidates (english_level);
CREATE INDEX idx_candidates_status ON candidates (status);
CREATE INDEX idx_candidates_status_updated_by ON candidates (status_updated_by);
CREATE INDEX idx_admin_profiles_email ON admin_profiles (email);
```

## API Resource Shape

```json
{
  "id": "candidate-id",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1 555 0100",
  "age": 28,
  "country": "United States",
  "city": "Austin",
  "englishLevel": "B2",
  "status": "In Review",
  "statusUpdatedBy": null,
  "statusUpdatedAt": null,
  "cv": {
    "fileName": "jane-doe-cv.pdf",
    "url": "/api/candidates/candidate-id/cv",
    "mimeType": "application/pdf",
    "fileSize": 245760
  },
  "createdAt": "2026-06-12T16:00:00.000Z",
  "updatedAt": "2026-06-12T16:00:00.000Z"
}
```

## Admin Profile Resource Shape

```json
{
  "id": "admin-id",
  "authUserId": "supabase-auth-user-id",
  "email": "hr.admin@example.com",
  "name": "HR Admin",
  "role": "Admin",
  "isActive": true,
  "createdAt": "2026-06-12T16:00:00.000Z",
  "updatedAt": "2026-06-12T16:00:00.000Z"
}
```

## LocalUser

Represents a local development user for mock authentication when Supabase Auth is not configured.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| id | string | yes | Maps to `admin_profiles.auth_user_id`. |
| email | string | yes | Sign-in email. Must match an `admin_profiles` record. |
| password | string | yes | Plain-text (local dev only — never use in production). |
| name | string | yes | Display name. |
| role | string | yes | Must be `Admin`. |

### Seed Data

| Email | Password | Name | Role |
| --- | --- | --- | --- |
| hr.admin@example.com | ChangeMe123! | HR Admin | Admin |

## Validation Rules

- `name`: required, 2 to 120 characters.
- `email`: required, valid email format, unique.
- `phone`: required, 7 to 30 characters.
- `age`: required, integer from 16 to 100.
- `country`: required, 2 to 80 characters.
- `city`: required, 2 to 80 characters.
- `english_level`: required, valid enum value.
- `cv`: required, PDF only.
- `cv_file_size`: enforce a maximum size in the API, recommended 5 MB for MVP.
- `status_updated_by`: must reference an active admin profile when status is changed by an authenticated admin.

### AdminProfile

- `email`: required, valid email format, unique.
- `name`: required, 2 to 120 characters.
- `role`: required, valid enum value.
- `is_active`: required boolean.

## Seed Data

Local development should include seed data that makes the HR workflow usable immediately.

### Admin Seed

Create one active HR admin account for local development:

| Email | Password | Name | Role |
| --- | --- | --- | --- |
| hr.admin@example.com | ChangeMe123! | HR Admin | Admin |

For a local-only implementation, the password can be stored as a hash in the auth layer. For Supabase, create the user in Supabase Auth and store only the linked profile in `admin_profiles`.

### Candidate Seeds

Create representative candidate records across:

- At least one green English level candidate: `B2`, `C1`, or `C2`.
- At least one yellow English level candidate: `B1`.
- At least one red English level candidate: `A1` or `A2`.
- At least two different locations.
- At least two different statuses.

Seed CV files can use small sample PDF fixtures stored outside production uploads.

## Candidate Lifecycle

```text
In Review -> Accepted
In Review -> Rejected
Accepted -> In Review
Rejected -> In Review
```

The MVP allows changing between any supported status to keep the admin workflow simple.
