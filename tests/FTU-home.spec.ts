import { test, expect } from '@playwright/test';

test('FTU home page has welcome message', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const heading = page.getByRole('heading', {
    name: 'Welcome to ShuttleShare!',
  });
  await expect(heading).toBeVisible();
});

test('FTU continue local only works', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Continue Local Only' }).click();
  const heading = page.getByRole('heading', { name: 'ShuttleShare' });
  await expect(heading).toBeVisible();
});

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('heading', { name: 'Welcome to ShuttleShare!' }).click();
  await page.getByRole('button', { name: 'Continue Local Only' }).click();
  await page.getByText('abc').click();
  await page.getByRole('heading', { name: 'ShuttleShare' }).click();
  await page.getByText('Local Data').click();
  await page.getByRole('button', { name: 'New Game' }).click();
  await page.getByRole('heading', { name: 'Log a New Game' }).click();
  await page
    .getByRole('dialog')
    .getByRole('button')
    .filter({ hasText: /^$/ })
    .click();
});
