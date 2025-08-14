import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});

test('snapshot example', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.goto('https://playwright.dev/');
  await expect(page.getByLabel('Main', { exact: true })).toMatchAriaSnapshot(`
    - link "Playwright logo Playwright":
      - /url: /
      - img "Playwright logo"
    - link "Docs":
      - /url: /docs/intro
    - link "API":
      - /url: /docs/api/class-playwright
    - button "Node.js"
    - link "Community":
      - /url: /community/welcome
    `);
});
