import { formTest as test } from '@tests/fixtures/fixtures';

test('valid form C', async ({ formCPage }) => {
  await formCPage.fillForm(); // Fill the form with default values
  await formCPage.submitForm({ expectedResult: 'valid' });
});
