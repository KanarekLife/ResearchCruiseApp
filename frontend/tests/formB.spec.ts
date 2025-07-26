import { expect } from '@playwright/test';
import { formTest as test } from '@tests/fixtures/fixtures';

test('valid form B', async ({ formBPage }) => {
  await formBPage.fillForm(); // Fill the form with default values
  await formBPage.submitForm();
  await expect(formBPage.page.getByRole('heading', { name: 'Formularz wysłany pomyślnie' })).toBeVisible(); // TODO: move to the FormBPage class
});
