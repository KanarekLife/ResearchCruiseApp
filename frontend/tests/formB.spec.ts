import { expect } from '@playwright/test';
import { formTest as test } from '@tests/fixtures/fixtures';

import { MOCK_PDF_FILEPATH } from './fixtures/consts';
import { touchInput } from './utils/form-filling-utils';

test('valid form B', async ({ formBPage }) => {
  await formBPage.fillForm(); // Fill the form with default values
  await formBPage.submitForm({ expectedResult: 'valid' });
});

test.describe('additional permissions section tests', () => {
  test.beforeEach(async ({ formBPage }) => {
    await formBPage.fillForm({ except: ['additionalPermissionsSection'] });
  });

  test('add permission', async ({ formBPage }) => {
    const additionalPermissionsSection = formBPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    await additionalPermissionsSection.descriptionInput('first').fill('Jakiś opis');
    await additionalPermissionsSection.executiveInput('first').fill('Jakiś organ');
    await additionalPermissionsSection.sendScan('first', MOCK_PDF_FILEPATH);
    await formBPage.submitForm({ expectedResult: 'valid' });
  });

  test('missing description and executive', async ({ formBPage }) => {
    const additionalPermissionsSection = formBPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    await additionalPermissionsSection.sendScan('first', MOCK_PDF_FILEPATH);
    await formBPage.submitForm({ expectedResult: 'invalid' });

    await expect(additionalPermissionsSection.descriptionRequiredMessage).toBeVisible();
    await expect(additionalPermissionsSection.executiveRequiredMessage).toBeVisible();

    await additionalPermissionsSection.descriptionInput('first').fill('Jakiś opis');
    await expect(additionalPermissionsSection.descriptionRequiredMessage).toBeHidden();
    await additionalPermissionsSection.executiveInput('first').fill('Jakiś organ');
    await expect(additionalPermissionsSection.executiveRequiredMessage).toBeHidden();

    await formBPage.submitForm({ expectedResult: 'valid' });
  });

  test('missing scan file', async ({ formBPage }) => {
    const additionalPermissionsSection = formBPage.sections.additionalPermissionsSection;
    await additionalPermissionsSection.addPermissionButton.click();
    await additionalPermissionsSection.descriptionInput('first').fill('Jakiś opis');
    await additionalPermissionsSection.executiveInput('first').fill('Jakiś organ');
    await formBPage.submitForm({ expectedResult: 'invalid' });

    await additionalPermissionsSection.sendScan('first', MOCK_PDF_FILEPATH);
    await formBPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('members section tests', () => {
  test.beforeEach(async ({ formBPage }) => {
    await formBPage.fillForm({ except: ['membersSection'] });
  });

  test('guest team input', async ({ formBPage }) => {
    const membersSection = formBPage.sections.membersSection;
    await membersSection.addNewGuestTeamButton.click();

    // for the 'empty' message to appear, the field must be detected as touched, so it is filled with some value at first
    await touchInput(membersSection.guestTeamRow('first').teamNameInput);
    await expect(membersSection.emptyGuestTeamNameMessage).toBeVisible();

    await membersSection.guestTeamRow('first').teamNameInput.fill('Jakiś zespół');
    await expect(membersSection.emptyGuestTeamNameMessage).toBeHidden();

    await formBPage.submitForm({ expectedResult: 'invalid' });
    await expect(membersSection.invalidGuestTeamCountMessage).toBeVisible();

    await membersSection.guestTeamRow('first').noOfPeopleInput.fill('1');
    await expect(membersSection.invalidGuestTeamCountMessage).toBeHidden();
    await formBPage.submitForm({ expectedResult: 'valid' });
  });

  test('permission inputs', async ({ formBPage }) => {
    const membersSection = formBPage.sections.membersSection;
    await membersSection.addPermissionButton.click();

    const permissionRow = membersSection.permissionRow('first');
    const inputFields = [
      permissionRow.titleInput,
      permissionRow.namesInput,
      permissionRow.surnameInput,
      permissionRow.birthplaceInput,
      permissionRow.documentIdInput,
      permissionRow.unitNameInput,
    ];
    for (const inputField of inputFields) {
      await touchInput(inputField);
      await expect(inputField.errors.required).toBeVisible();
    }

    await formBPage.submitForm();
    await expect(formBPage.submissionApprovedMessage).toBeHidden();

    for (const inputField of inputFields) {
      await inputField.fill('Wartość');
      await expect(inputField.errors.required).toBeHidden();
    }

    await formBPage.submitForm({ expectedResult: 'invalid' });

    await expect(permissionRow.birthdayDropdown.errors.required).toBeVisible();
    await expect(permissionRow.documentExpirationDateDropdown.errors.required).toBeVisible();

    await permissionRow.birthdayDropdown.selectOption('11');
    await expect(permissionRow.birthdayDropdown.errors.required).toBeHidden();
    await permissionRow.documentExpirationDateDropdown.selectOption('11');
    await expect(permissionRow.documentExpirationDateDropdown.errors.required).toBeHidden();

    await formBPage.submitForm({ expectedResult: 'valid' });
  });
});
