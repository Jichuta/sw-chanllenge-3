-- Create the admin auth user manually in the Supabase dashboard:
--   Email: hr.admin@example.com
--   Password: ChangeMe123!
-- Then update the auth_user_id below with the actual user ID from auth.users.

INSERT INTO admin_profiles (id, auth_user_id, email, name, role, is_active)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  NULL,
  'hr.admin@example.com',
  'HR Admin',
  'Admin',
  1
);

INSERT INTO candidates (id, name, email, phone, age, country, city, english_level, status, cv_file_name, cv_file_path, cv_mime_type, cv_file_size)
VALUES
  (
    'c0000000-0000-0000-0000-000000000001',
    'Alice Johnson',
    'alice@example.com',
    '+1 555 0101',
    28,
    'United States',
    'Austin',
    'C1',
    'In Review',
    'alice-johnson-cv.pdf',
    'candidates/c0000000-0000-0000-0000-000000000001/cv.pdf',
    'application/pdf',
    245760
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    'Bob Martinez',
    'bob@example.com',
    '+1 555 0102',
    34,
    'Mexico',
    'Mexico City',
    'B1',
    'In Review',
    'bob-martinez-cv.pdf',
    'candidates/c0000000-0000-0000-0000-000000000002/cv.pdf',
    'application/pdf',
    312576
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    'Clara Schmidt',
    'clara@example.com',
    '+49 555 0103',
    22,
    'Germany',
    'Berlin',
    'A2',
    'Accepted',
    'clara-schmidt-cv.pdf',
    'candidates/c0000000-0000-0000-0000-000000000003/cv.pdf',
    'application/pdf',
    189440
  );
