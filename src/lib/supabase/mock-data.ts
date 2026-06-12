import type { CandidateRow, AdminProfileRow } from "@/src/types/database";

const MOCK_ADMIN_USER_ID = "mock-admin-id";

export type LocalUser = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
};

export const MOCK_LOCAL_USERS: LocalUser[] = [
  {
    id: MOCK_ADMIN_USER_ID,
    email: "hr.admin@example.com",
    password: "ChangeMe123!",
    name: "HR Admin",
    role: "Admin",
  },
];

type MockRow = Record<string, unknown>;

class MockDataStore {
  private tables: Record<string, MockRow[]> = {};

  constructor() {
    this.seed();
  }

  private seed() {
    const now = new Date().toISOString();

    this.tables.admin_profiles = [
      {
        id: "mock-admin-profile-id",
        auth_user_id: MOCK_ADMIN_USER_ID,
        email: "hr.admin@example.com",
        name: "HR Admin",
        role: "Admin",
        is_active: true,
        created_at: now,
        updated_at: now,
      },
    ] satisfies AdminProfileRow[];

    this.tables.candidates = [
      {
        id: "mock-candidate-1",
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+1-555-0101",
        age: 28,
        country: "United States",
        city: "New York",
        english_level: "C1",
        status: "In Review",
        cv_file_name: "alice-cv.pdf",
        cv_file_path: "candidates/mock-candidate-1/alice-cv.pdf",
        cv_mime_type: "application/pdf",
        cv_file_size: 245760,
        status_updated_by: null,
        status_updated_at: null,
        created_at: now,
        updated_at: now,
      },
      {
        id: "mock-candidate-2",
        name: "Bob Martinez",
        email: "bob@example.com",
        phone: "+1-555-0102",
        age: 32,
        country: "Mexico",
        city: "Mexico City",
        english_level: "B2",
        status: "Accepted",
        cv_file_name: "bob-cv.pdf",
        cv_file_path: "candidates/mock-candidate-2/bob-cv.pdf",
        cv_mime_type: "application/pdf",
        cv_file_size: 184320,
        status_updated_by: MOCK_ADMIN_USER_ID,
        status_updated_at: now,
        created_at: now,
        updated_at: now,
      },
      {
        id: "mock-candidate-3",
        name: "Clara Schmidt",
        email: "clara@example.com",
        phone: "+1-555-0103",
        age: 26,
        country: "Germany",
        city: "Berlin",
        english_level: "A2",
        status: "Rejected",
        cv_file_name: "clara-cv.pdf",
        cv_file_path: "candidates/mock-candidate-3/clara-cv.pdf",
        cv_mime_type: "application/pdf",
        cv_file_size: 102400,
        status_updated_by: MOCK_ADMIN_USER_ID,
        status_updated_at: now,
        created_at: now,
        updated_at: now,
      },
    ] satisfies CandidateRow[];
  }

  getTable(name: string): MockRow[] {
    if (!this.tables[name]) {
      this.tables[name] = [];
    }
    return this.tables[name];
  }
}

export const mockDb = new MockDataStore();
export { MOCK_ADMIN_USER_ID };
