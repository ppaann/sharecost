import { test, expect } from '@playwright/test';

test('test popup window and message', async ({ page }) => {
  await test.step('navigate to the main page', async () => {
    await page.goto(
      'http://127.0.0.1:5500/sharecost/tests-code/5-popup-window-main.html'
    );
    await expect(page).toHaveTitle(/Popup Demo Help Doc/);
  });

  await test.step('click to open popup window', async () => {
    const page1Promise = page.waitForEvent('popup');
    await page.getByTestId('open-help-btn').click();

    const popupPage = await page1Promise;
    await expect(popupPage).toHaveTitle(/Popup/);
  });

  await test.step('handle alert popup message', async () => {
    await page.getByTestId('open-message').click();
    page.on('dialog', (dialog) => {
      expect(dialog.message()).toBe('Message');
      dialog.dismiss();
    });
  });
});
