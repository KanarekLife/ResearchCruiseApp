import { formTest as test } from '@tests/fixtures/fixtures';
import { MOCK_PDF_FILEPATH } from './fixtures/consts';
import { expect } from '@playwright/test';

test('valid form B', async ({ formBPage }) => {
  await formBPage.fillForm(); // Fill the form with default values
  await formBPage.submitForm({ expectedResult: 'valid' });
});

test.describe('additional permissions section tests', () => {
  test.beforeEach(async ({formBPage}) => {
    await formBPage.fillForm({except: ['additionalPermissionsSection']})
  })

  test('add permission', async ({ formBPage }) => {
    const additionalPermissionsSection = formBPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    await additionalPermissionsSection.descriptionInput('first').fill('Jakiś opis');
    await additionalPermissionsSection.executiveInput('first').fill('Jakiś organ');
    await additionalPermissionsSection.sendScan('first', MOCK_PDF_FILEPATH);
    await formBPage.submitForm({expectedResult: 'valid'});
  });

  test('missing description and executive', async ({ formBPage }) => {
    const additionalPermissionsSection = formBPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    await additionalPermissionsSection.sendScan('first', MOCK_PDF_FILEPATH);
    await formBPage.submitForm({expectedResult: 'invalid'});

    await expect(additionalPermissionsSection.descriptionRequiredMessage).toBeVisible();
    await expect(additionalPermissionsSection.executiveRequiredMessage).toBeVisible();

    await additionalPermissionsSection.descriptionInput('first').fill('Jakiś opis');
    await expect(additionalPermissionsSection.descriptionRequiredMessage).toBeHidden();
    await additionalPermissionsSection.executiveInput('first').fill('Jakiś organ');
    await expect(additionalPermissionsSection.executiveRequiredMessage).toBeHidden();

    await formBPage.submitForm({expectedResult: 'valid'});
  });

  test('missing scan file', async ({ formBPage }) => {
    const additionalPermissionsSection = formBPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    await additionalPermissionsSection.descriptionInput('first').fill('Jakiś opis');
    await additionalPermissionsSection.executiveInput('first').fill('Jakiś organ');
    await formBPage.submitForm({expectedResult: 'invalid'});

    await additionalPermissionsSection.sendScan('first', MOCK_PDF_FILEPATH);
    await formBPage.submitForm({expectedResult: 'valid'});
  });
});
