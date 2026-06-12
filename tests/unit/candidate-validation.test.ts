import { describe, expect, it } from "vitest";
import {
  candidateApplicationSchema,
  candidateStatusUpdateSchema,
  candidateFiltersSchema
} from "@/src/lib/validation/candidate.schema";

describe("candidateApplicationSchema", () => {
  const validData = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 555 0100",
    age: 28,
    country: "United States",
    city: "Austin",
    englishLevel: "B2" as const
  };

  it("accepts valid data", () => {
    const result = candidateApplicationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects missing name", () => {
    const result = candidateApplicationSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = candidateApplicationSchema.safeParse({ ...validData, name: "A" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = candidateApplicationSchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects age below 16", () => {
    const result = candidateApplicationSchema.safeParse({ ...validData, age: 15 });
    expect(result.success).toBe(false);
  });

  it("rejects age above 100", () => {
    const result = candidateApplicationSchema.safeParse({ ...validData, age: 101 });
    expect(result.success).toBe(false);
  });

  it("rejects invalid englishLevel", () => {
    const result = candidateApplicationSchema.safeParse({ ...validData, englishLevel: "Z9" });
    expect(result.success).toBe(false);
  });

  it("coerces string age to number", () => {
    const result = candidateApplicationSchema.safeParse({ ...validData, age: "28" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.age).toBe(28);
    }
  });
});

describe("candidateStatusUpdateSchema", () => {
  it("accepts valid statuses", () => {
    for (const status of ["In Review", "Accepted", "Rejected"] as const) {
      const result = candidateStatusUpdateSchema.safeParse({ status });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid status", () => {
    const result = candidateStatusUpdateSchema.safeParse({ status: "Invalid" });
    expect(result.success).toBe(false);
  });
});

describe("candidateFiltersSchema", () => {
  it("accepts empty filters", () => {
    const result = candidateFiltersSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("accepts valid filters", () => {
    const result = candidateFiltersSchema.safeParse({
      country: "United States",
      city: "Austin",
      englishLevel: "B2"
    });
    expect(result.success).toBe(true);
  });
});
