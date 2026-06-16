import fs from "node:fs";
import path from "node:path";
import { query, closePool } from "@/src/lib/db/index";

const MIGRATIONS_TABLE = "_migrations";
const MIGRATIONS_DIR = path.resolve(process.cwd(), "scripts/db/init");

const ensureMigrationsTable = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
};

const getExecutedMigrations = async (): Promise<Set<string>> => {
  const result = await query(`SELECT name FROM ${MIGRATIONS_TABLE} ORDER BY id`);
  return new Set(result.rows.map((r) => r.name));
};

const getPendingMigrations = async (): Promise<string[]> => {
  await ensureMigrationsTable();
  const executed = await getExecutedMigrations();

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  return files.filter((f) => !executed.has(f));
};

const runMigration = async (name: string): Promise<void> => {
  const filePath = path.join(MIGRATIONS_DIR, name);
  const sql = fs.readFileSync(filePath, "utf-8");

  await query(sql);
  await query(`INSERT INTO ${MIGRATIONS_TABLE} (name) VALUES ($1)`, [name]);

  console.log(`  ✓ ${name}`);
};

export const migrate = async (): Promise<void> => {
  const pending = await getPendingMigrations();

  if (pending.length === 0) {
    console.log("All migrations already applied.");
    return;
  }

  console.log(`Running ${pending.length} migration(s)...`);

  for (const name of pending) {
    await runMigration(name);
  }

  console.log("Migrations complete.");
};

const main = async () => {
  try {
    await migrate();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await closePool();
  }
};

main();
