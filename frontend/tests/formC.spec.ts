import { expect } from '@playwright/test';
import { formTest as test } from '@tests/fixtures/fixtures';

import { MOCK_PDF_FILEPATH } from './fixtures/consts';

test('valid form C', async ({ formCPage }) => {
  await formCPage.fillForm(); // Fill the form with default values
  await formCPage.submitForm({ expectedResult: 'valid' });
});

test.describe('additional permissions section tests', () => {
  test.beforeEach(async ({ formCPage }) => {
    await formCPage.fillForm({ except: ['additionalPermissionsSection'] });
  });

  test('no permissions added', async ({ formCPage }) => {
    await formCPage.submitForm({ expectedResult: 'valid' });
  });

  test('add permission', async ({ formCPage }) => {
    const additionalPermissionsSection = formCPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    const permissionRow = additionalPermissionsSection.permissionRow('last');
    await permissionRow.descriptionInput.fill('Jakiś opis');
    await permissionRow.executiveInput.fill('Jakiś organ');
    await permissionRow.scanFileInput.send(MOCK_PDF_FILEPATH);
    await formCPage.submitForm({ expectedResult: 'valid' });
  });

  test('missing description and executive', async ({ formCPage }) => {
    const additionalPermissionsSection = formCPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    const permissionRow = additionalPermissionsSection.permissionRow('last');
    await permissionRow.scanFileInput.send(MOCK_PDF_FILEPATH);
    await formCPage.submitForm({ expectedResult: 'invalid' });

    await expect(permissionRow.descriptionInput.errors.required).toBeVisible();
    await expect(permissionRow.executiveInput.errors.required).toBeVisible();

    await permissionRow.descriptionInput.fill('Jakiś opis');
    await expect(permissionRow.descriptionInput.errors.required).toBeHidden();
    await permissionRow.executiveInput.fill('Jakiś organ');
    await expect(permissionRow.executiveInput.errors.required).toBeHidden();

    await formCPage.submitForm({ expectedResult: 'valid' });
  });

  test('missing scan file', async ({ formCPage }) => {
    const additionalPermissionsSection = formCPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    const permissionRow = additionalPermissionsSection.permissionRow('last');
    await permissionRow.descriptionInput.fill('Jakiś opis');
    await permissionRow.executiveInput.fill('Jakiś organ');
    await formCPage.submitForm({ expectedResult: 'invalid' });

    await expect(permissionRow.scanFileInput.errors.required).toBeVisible();
    await formCPage.submitForm({ expectedResult: 'valid' });
  });
});
