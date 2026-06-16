INSERT INTO admin_profiles (id, email, name, role, password_hash, is_active)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'hr.admin@example.com',
  'HR Admin',
  'Admin',
  '$2b$10$B0sTMJ/d0574ZF3NLtcEOuPXxcb.TiW9SuZbsoq3iv8hijz.Lx8Lq',
  TRUE
) ON CONFLICT (id) DO NOTHING;

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
  )
ON CONFLICT (id) DO NOTHING;
