import { mockDb, MOCK_LOCAL_USERS } from "@/src/lib/supabase/mock-data";

const MOCK_SESSION_COOKIE = "mock-session";

interface MockPostgrestError {
  message: string;
  details: string;
  hint: string;
  code: string;
}

type MockQueryResult<T = unknown> = {
  data: T;
  error: MockPostgrestError | null;
};

type QueryOp = "select" | "insert" | "update";

class MockQueryBuilder {
  private tableName: string;
  private filters: Record<string, unknown> = {};
  private orderColumn: string | null = null;
  private orderAscending = true;
  private returnSingle = false;
  private op: QueryOp | null = null;
  private insertRow: Record<string, unknown> | null = null;
  private updateValues: Record<string, unknown> | null = null;
  private shouldReturnRows = false;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  eq(column: string, value: unknown) {
    this.filters[column] = value;
    return this;
  }

  order(column: string, opts?: { ascending?: boolean }) {
    this.orderColumn = column;
    this.orderAscending = opts?.ascending ?? true;
    return this;
  }

  single() {
    this.returnSingle = true;
    return this;
  }

  select() {
    if (this.op === "insert" || this.op === "update") {
      this.shouldReturnRows = true;
    } else {
      this.op = "select";
    }
    return this;
  }

  insert(row: Record<string, unknown>) {
    this.op = "insert";
    this.insertRow = { ...row };
    return this;
  }

  update(updates: Record<string, unknown>) {
    this.op = "update";
    this.updateValues = { ...updates };
    return this;
  }

  then<TResult1 = MockQueryResult, TResult2 = never>(
    onfulfilled?: ((value: MockQueryResult) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): PromiseLike<TResult1 | TResult2> {
    return this.execute().then(
      onfulfilled ?? ((v) => v as unknown as TResult1),
      onrejected
    );
  }

  private async execute(): Promise<MockQueryResult> {
    switch (this.op) {
      case "insert":
        return this.executeInsert();
      case "update":
        return this.executeUpdate();
      default:
        return this.executeSelect();
    }
  }

  private executeSelect(): MockQueryResult {
    const rows = mockDb.getTable(this.tableName);
    let filtered = [...rows];

    for (const [col, val] of Object.entries(this.filters)) {
      filtered = filtered.filter((r) => r[col] === val);
    }

    if (this.orderColumn) {
      filtered.sort((a, b) => {
        const aVal = a[this.orderColumn!];
        const bVal = b[this.orderColumn!];
        const aStr = aVal == null ? "" : String(aVal);
        const bStr = bVal == null ? "" : String(bVal);
        return this.orderAscending ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      });
    }

    if (this.returnSingle) {
      const row = filtered[0] ?? null;
      return {
        data: row,
        error: row
          ? null
          : { code: "PGRST116", message: "Not found", details: "", hint: "" },
      };
    }

    return { data: filtered, error: null };
  }

  private executeInsert(): MockQueryResult {
    const rows = mockDb.getTable(this.tableName);
    rows.push(this.insertRow!);
    if (this.shouldReturnRows) {
      return { data: this.returnSingle ? this.insertRow : [this.insertRow], error: null };
    }
    return { data: null, error: null };
  }

  private executeUpdate(): MockQueryResult {
    const rows = mockDb.getTable(this.tableName);
    let updatedRow: Record<string, unknown> | null = null;
    for (const row of rows) {
      const matches = Object.entries(this.filters).every(([col, val]) => row[col] === val);
      if (matches) {
        Object.assign(row, this.updateValues!);
        updatedRow = row;
      }
    }
    if (this.shouldReturnRows) {
      return { data: this.returnSingle ? updatedRow : [updatedRow], error: null };
    }
    return { data: null, error: null };
  }
}

function buildMockUserSession(user: { id: string; email: string }) {
  const now = Math.floor(Date.now() / 1000);
  return {
    user: {
      id: user.id,
      email: user.email,
      aud: "authenticated",
      role: "authenticated",
      app_metadata: {},
      user_metadata: {},
      created_at: new Date().toISOString(),
    },
    access_token: "mock-token",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: now + 3600,
    refresh_token: "mock-refresh",
  };
}

function decodeMockCookie(value: string): { id: string; email: string } | null {
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}

function encodeMockCookie(user: { id: string; email: string }): string {
  return encodeURIComponent(JSON.stringify({ id: user.id, email: user.email }));
}

function createDataClient() {
  return {
    from: (tableName: string) => new MockQueryBuilder(tableName),
    storage: {
      from: () => ({
        upload: async () => ({ error: null }),
        createSignedUrl: async () => ({
          data: { signedUrl: "/mock-cv.pdf" },
          error: null,
        }),
      }),
    },
  };
}

export const createMockBrowserClient = () => {
  const auth = {
    getSession: async () => {
      const match = document.cookie
        .split("; ")
        .find((c) => c.startsWith(`${MOCK_SESSION_COOKIE}=`));
      if (!match) {
        return { data: { session: null }, error: null };
      }
      const raw = match.split("=")[1];
      const decoded = decodeMockCookie(raw);
      if (!decoded) {
        return { data: { session: null }, error: null };
      }
      return {
        data: { session: buildMockUserSession(decoded) },
        error: null,
      };
    },
    signInWithPassword: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const user = MOCK_LOCAL_USERS.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        return {
          data: { session: null, user: null },
          error: { message: "Invalid login credentials", status: 400 },
        };
      }
      const encoded = encodeMockCookie(user);
      document.cookie = `${MOCK_SESSION_COOKIE}=${encoded}; path=/; max-age=3600; SameSite=Lax`;
      const session = buildMockUserSession(user);
      return { data: { session, user: session.user }, error: null };
    },
    signOut: async () => {
      document.cookie = `${MOCK_SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
      return { error: null };
    },
  };

  return { ...createDataClient(), auth };
};

export const createMockServerClient = (
  getAllCookies: () => { name: string; value: string }[],
  setAllCookies?: (cookies: { name: string; value: string; options?: Record<string, unknown> }[]) => void
) => {
  const auth = {
    getSession: async () => {
      const mockCookie = getAllCookies().find(
        (c) => c.name === MOCK_SESSION_COOKIE
      );
      if (!mockCookie) {
        return { data: { session: null }, error: null };
      }
      const decoded = decodeMockCookie(mockCookie.value);
      if (!decoded) {
        return { data: { session: null }, error: null };
      }
      return {
        data: { session: buildMockUserSession(decoded) },
        error: null,
      };
    },
    signOut: async () => {
      if (setAllCookies) {
        setAllCookies([
          {
            name: MOCK_SESSION_COOKIE,
            value: "",
            options: { path: "/", maxAge: 0 },
          },
        ]);
      }
      return { error: null };
    },
    signInWithPassword: async () => ({
      data: { session: null, user: null },
      error: { message: "signInWithPassword is not available on the server client" },
    }),
  };

  return { ...createDataClient(), auth };
};

export const createMockDataClient = createDataClient;
