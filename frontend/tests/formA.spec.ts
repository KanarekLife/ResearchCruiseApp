import { expect } from '@playwright/test';

import { formTest as test } from './fixtures/fixtures';

test.describe(() => {
  test('valid form A', async ({ formAPage }) => {
    await formAPage.fillForm(); // Fill the form with default values
    await formAPage.submitForm();
    await expect(formAPage.page.getByRole('heading', { name: 'Formularz przyjęty' })).toBeVisible(); // TODO: move to formAPage class
  });
});
