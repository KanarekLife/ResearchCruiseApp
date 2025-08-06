import { expect } from '@playwright/test';
import { formTest as test } from './fixtures/fixtures';

test('valid form A', async ({ formAPage }) => {
  await formAPage.fillForm(); // Fill the form with default values
  await formAPage.submitForm({expectedResult: 'valid'});
});

test.describe('cruise manager info section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({except: ['cruiseManagerInfoSection']});
  });

  test('cruise assistant not set', async ({ formAPage }) => {
    // when the assistant is not set, the form should be invalid
    await formAPage.submitForm({expectedResult: 'invalid'});
    await expect(formAPage.sections.cruiseManagerInfoSection.missingDeputyManagerMessage).toBeVisible();
    
    // correctly select the assistant after failed verification
    await formAPage.sections.cruiseManagerInfoSection.deputyManagerDropdown.selectOption('Kierownik Kierowniczy');
    await formAPage.submitForm({expectedResult: 'valid'});
  });
});
