import { test, expect } from '@playwright/test';

test('test async save', async ({ page }) => {
  await test.step('Navigate to the test page and interact', async () => {
    await page.goto(
      'http://127.0.0.1:5500/sharecost/tests-code/3-wait-sync.html'
    );
    await expect(page).toHaveTitle(/Mini Save Widget/);
  });

  const saveBtn = page.locator('button#saveBtn');
  const status = page.locator('#status');

  await test.step('Fill the form', async () => {
    await page.getByRole('textbox', { name: 'Note' }).fill('sn');
    await expect(page.getByRole('textbox', { name: 'Note' })).toHaveValue('sn');
  });
  await test.step('Click Save', async () => {
    await saveBtn.click();

    await expect(saveBtn).toHaveText('Saving...');
    await expect(saveBtn).toBeDisabled();
    await expect(saveBtn).toHaveAttribute('aria-busy', 'true');
    await expect(status).toHaveText('Saving...');
    await expect(page.getByRole('button', { name: 'Saved' })).toHaveCount(0);
  });

  await test.step('Verify Save Completed', async () => {
    // test.slow(); triple test timeout for this step
    await expect(saveBtn).toHaveText('Saved', { timeout: 60_000 });
    await expect(saveBtn).toBeEnabled();
    await expect(saveBtn).not.toHaveAttribute('aria-busy', /.+/);
    await expect(status).toHaveText('Saved');
  });
});
