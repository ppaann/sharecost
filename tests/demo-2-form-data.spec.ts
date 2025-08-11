import { test, expect } from '@playwright/test';

const data = {
  FIELD1: 'abc',
  FIELD2: '123',
  DROPDOWN: 'option 2',
  RADIO: 'button 2',
  CHECKBOXES: ['1', '2', '3'],
};

test('submit a form with expected value and verified results', async ({
  page,
}) => {
  await test.step('Navigate to the form page', async () => {
    await page.goto('https://www.andrews.edu/~bidwell/examples/form.html');
    await expect(page).toHaveTitle(/Test web form/);
  });

  await test.step('Fill input fields', async () => {
    await page.locator('input[name="FIELD1"]').fill(data.FIELD1);
    await page.locator('input[name="FIELD2"]').fill(data.FIELD2);
    await expect(page.locator('input[name="FIELD1"]')).toHaveValue(data.FIELD1);
    await expect(page.locator('input[name="FIELD2"]')).toHaveValue(data.FIELD2);
  });

  await test.step('Dropdown', async () => {
    const select = page.locator('select[name="SELECT"]');
    const dropdown = data.DROPDOWN;
    await select.selectOption(dropdown);
    await expect(select).toHaveValue(dropdown);
  });

  await test.step('Radio buttons', async () => {
    const radio = page.locator(`input[type="radio"][value="${data.RADIO}"]`);
    await radio.click();
    await expect(radio).toBeChecked();
  });

  await test.step('Checkboxes', async () => {
    const allCheckboxes = page.locator(`p>input[type="checkbox"]`);

    await expect(allCheckboxes).toHaveCount(3);
    for (const checkbox of await allCheckboxes.all()) {
      await checkbox.uncheck();
    }
    const checkboxes = data.CHECKBOXES;
    for (const checkbox of checkboxes) {
      await page.locator(`input[name="C${checkbox}"]`).check();
    }
    for (const checkbox of checkboxes) {
      await expect(page.locator(`input[name="C${checkbox}"]`)).toBeChecked();
    }
  });

  await test.step('Submit the form', async () => {
    await page.getByRole('button', { name: 'submit' }).click();
    await expect(page).toHaveURL(/form\.cgi/);
  });

  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - paragraph: This is a test
    - paragraph: FIELD1 = ${data.FIELD1}
    - paragraph: FIELD2 = ${data.FIELD2}
    - paragraph: The option was ${data.DROPDOWN}
    - paragraph: The radio button selected was ${data.RADIO}
    - paragraph: Checkboxes are ${data.CHECKBOXES.map((c) => c + ':on').join(
      ' - '
    )}
    `);
});
