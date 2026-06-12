import { describe, expect, it } from "vitest";
import { getEnglishLevelLabel, getEnglishLevelTone } from "@/src/lib/constants";

describe("English level traffic-light rules", () => {
  it("marks B2 and above as green/success", () => {
    expect(getEnglishLevelTone("B2")).toBe("success");
    expect(getEnglishLevelTone("C1")).toBe("success");
    expect(getEnglishLevelTone("C2")).toBe("success");
  });

  it("marks B1 as yellow/warning", () => {
    expect(getEnglishLevelTone("B1")).toBe("warning");
    expect(getEnglishLevelLabel("B1")).toBe("Intermediate English");
  });

  it("marks lower levels as red/danger", () => {
    expect(getEnglishLevelTone("A1")).toBe("danger");
    expect(getEnglishLevelTone("A2")).toBe("danger");
  });
});
