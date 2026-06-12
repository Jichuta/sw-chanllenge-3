CREATE TABLE admin_profiles (
  id TEXT PRIMARY KEY,
  auth_user_id TEXT UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Admin' CHECK (role IN ('Admin')),
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now'))
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
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%S.000Z', 'now')),
  FOREIGN KEY (status_updated_by) REFERENCES admin_profiles(id)
);

CREATE INDEX idx_candidates_location ON candidates (country, city);
CREATE INDEX idx_candidates_english_level ON candidates (english_level);
CREATE INDEX idx_candidates_status ON candidates (status);
CREATE INDEX idx_candidates_status_updated_by ON candidates (status_updated_by);
CREATE INDEX idx_admin_profiles_email ON admin_profiles (email);
