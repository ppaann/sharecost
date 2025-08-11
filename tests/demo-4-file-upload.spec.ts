import { test, expect } from '@playwright/test';
import path from 'node:path';

test('test', async ({ page }) => {
  await test.step('Navigate to the file upload page', async () => {
    await page.goto(
      'http://127.0.0.1:5500/sharecost/tests-code/4-file-upload.html'
    );
    await expect(page).toHaveTitle(/PDF Upload & Verify/);
  });

  await test.step('Upload a PDF file', async () => {
    await page
      .getByTestId('file-input')
      .setInputFiles(path.join(__dirname, 'test.pdf'));
    expect(await page.getByTestId('file-input').inputValue()).toContain(
      'test.pdf'
    );
  });

  await test.step('Verify the uploaded file', async () => {
    await expect(page.getByTestId('attachment-name')).toHaveCount(1);
    await expect(page.getByTestId('attachment-name')).toHaveText('test.pdf');
  });

  await test.step('Remove the uploaded file', async () => {
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(1);
    await page.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByTestId('attachment-name')).toHaveCount(0);
  });
});
