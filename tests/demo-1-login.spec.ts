import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practicetestautomation.com/practice-test-login/';

type myFixtures = {
  login: () => Promise<void>;
};
const loginBeforeTest = test.extend<myFixtures>({
  login: async ({ page }, use) => {
    const loginAction = async () => {
      await page.goto(BASE_URL);
      await expect(
        page.getByRole('heading', { name: 'Test Login' })
      ).toBeVisible();

      await page.getByRole('textbox', { name: 'Username' }).fill('student');
      await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
      await page.getByRole('button', { name: 'Submit' }).click();

      await expect(
        page.getByRole('heading', { name: 'Logged In Successfully' })
      ).toBeVisible();
    };
    await use(loginAction);
  },
});

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    expect(
      await page.getByRole('heading', { name: 'Test Login ' }).isVisible()
    ).toBeTruthy();
  });
  test('Invalid Login Attempt', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('invalidUser');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#error')).toBeVisible();
  });

  loginBeforeTest('Successful Login', async ({ login }) => {
    await login();
  });

  loginBeforeTest('logout after Successful Login', async ({ page, login }) => {
    await login();

    await page.getByRole('link', { name: 'Log out' }).click();
    await expect(page).toHaveURL(/practice-test-login/);
    await expect(
      page.getByRole('heading', { name: 'Test login' })
    ).toBeVisible();
    await expect(page.getByLabel('Username')).toBeVisible();
  });
});
