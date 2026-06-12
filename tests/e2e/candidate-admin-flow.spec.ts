import { test, expect } from "@playwright/test";

test.describe("Public pages", () => {
  test("homepage renders with apply link", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("Candidate application");
    await expect(page.locator('a[href="/apply"]')).toBeVisible();
  });

  test("apply page renders the form", async ({ page }) => {
    await page.goto("/apply");

    await expect(page.locator("h1")).toContainText("Submit your application");
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#phone")).toBeVisible();
    await expect(page.locator("#age")).toBeVisible();
    await expect(page.locator("#country")).toBeVisible();
    await expect(page.locator("#city")).toBeVisible();
    await expect(page.locator("#englishLevel")).toBeVisible();
    await expect(page.locator("#cv")).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("form shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/apply");

    await page.click('button[type="submit"]');

    await page.waitForTimeout(500);

    const errorMessages = page.locator("text=required");
    const count = await errorMessages.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Health check", () => {
  test("health endpoint returns ok", async ({ page }) => {
    const response = await page.request.get("/api/health");
    expect(response.ok()).toBe(true);

    const body = await response.json();
    expect(body.ok).toBe(true);
  });
});
