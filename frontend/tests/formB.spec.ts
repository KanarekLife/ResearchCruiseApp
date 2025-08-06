import { formTest as test } from '@tests/fixtures/fixtures';

test('valid form B', async ({ formBPage }) => {
  await formBPage.fillForm(); // Fill the form with default values
  await formBPage.submitForm({ expectedResult: 'valid' });
});
