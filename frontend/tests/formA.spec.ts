import { expect } from '@playwright/test';

import { MOCK_PDF_FILEPATH } from './fixtures/consts';
import { formTest as test } from './fixtures/fixtures';

test('valid form A', async ({ formAPage }) => {
  await formAPage.fillForm(); // Fill the form with default values
  await formAPage.submitForm({ expectedResult: 'valid' });
});

test.describe('cruise manager info section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({ except: ['cruiseManagerInfoSection'] });
  });

  test('cruise assistant not set', async ({ formAPage }) => {
    // when the assistant is not set, the form should be invalid
    await formAPage.submitForm({ expectedResult: 'invalid' });
    await expect(formAPage.sections.cruiseManagerInfoSection.missingDeputyManagerMessage).toBeVisible();

    // correctly select the assistant after failed verification
    await formAPage.sections.cruiseManagerInfoSection.deputyManagerDropdown.selectOption('Kierownik Kierowniczy');
    await formAPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('cruise length section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({ except: ['cruiseLengthSection'] });
  });

  // allowed cruise days count is in range (0-60] (right-side inclusive)
  test.describe('planned cruise days constrains', () => {
    [
      [false, 0],
      [false, 61],
      [false, 100],
      [true, 1],
      [true, 45],
      [true, 59],
      [true, 60],
    ].forEach(([isValid, val]) => {
      test(`${isValid ? 'valid' : 'invalid'}-${val}`, async ({ formAPage }) => {
        await formAPage.sections.cruiseLengthSection.defaultFill();
        await formAPage.sections.cruiseLengthSection.cruiseDaysInput.fill(val.toString());

        if (isValid) {
          await formAPage.submitForm({ expectedResult: 'valid' });
        } else {
          await expect(formAPage.sections.cruiseLengthSection.invalidCruiseDurationMessage).toBeVisible();
          await formAPage.submitForm({ expectedResult: 'invalid' });
        }
      });
    });
  });

  // allowed cruise hours count is in range (0-1440] (right-side inclusive)
  test.describe('planned cruise hours constrains', () => {
    [
      [false, 0],
      [false, 1441],
      [false, 1500],
      [true, 1],
      [true, 1000],
      [true, 1439],
      [true, 1440],
    ].forEach(([isValid, val]) => {
      test(`${isValid ? 'valid' : 'invalid'}-${val}`, async ({ formAPage }) => {
        await formAPage.sections.cruiseLengthSection.defaultFill();
        await formAPage.sections.cruiseLengthSection.cruiseHoursInput.fill(val.toString());

        if (isValid) {
          await formAPage.submitForm({ expectedResult: 'valid' });
        } else {
          await expect(formAPage.sections.cruiseLengthSection.invalidCruiseDurationMessage).toBeVisible();
          await formAPage.submitForm({ expectedResult: 'invalid' });
        }
      });
    });
  });

  test('alternative ship usage', async ({ formAPage }) => {
    await formAPage.sections.cruiseLengthSection.defaultFill();
    await formAPage.sections.cruiseLengthSection.shipUsageDropdown.selectOption('w inny sposób');

    // for the 'empty' message to appear, the field must be detected as touched, so it is filled with some value at first
    await formAPage.sections.cruiseLengthSection.alternativeShipUsageInput.fill('a');
    await formAPage.sections.cruiseLengthSection.alternativeShipUsageInput.fill('');
    await expect(formAPage.sections.cruiseLengthSection.emptyAlternativeShipUsageMessage).toBeVisible();

    await formAPage.submitForm();
    await expect(formAPage.submissionApprovedMessage, 'form should not be approved').toBeHidden();

    // correctly fill out different usage field
    await formAPage.sections.cruiseLengthSection.alternativeShipUsageInput.fill('jakieś inne użycie');
    await formAPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('permissions section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({ except: ['permissionsSection'] });
  });

  test('no permissions', async ({ formAPage }) => {
    await formAPage.submitForm({ expectedResult: 'valid' });
  });

  test('empty permission', async ({ formAPage }) => {
    const permissionsSection = formAPage.sections.permissionsSection;
    await permissionsSection.addPermission('', '');
    await formAPage.submitForm({ expectedResult: 'invalid' });
    await expect(permissionsSection.permissionDescriptionRequiredMessage).toBeVisible();
    await expect(permissionsSection.permissionExecutiveRequiredMessage).toBeVisible();

    await permissionsSection.permissionDesctiptionInput('first').fill('jakiś opis');
    await expect(permissionsSection.permissionDescriptionRequiredMessage).toBeHidden();
    await permissionsSection.permissionExecutiveInput('first').fill('jakiś organ');
    await expect(permissionsSection.permissionExecutiveRequiredMessage).toBeHidden();
    await formAPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('research area section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({ except: ['researchAreaSection'] });
  });

  test('no research area chosen', async ({ formAPage }) => {
    await formAPage.submitForm({ expectedResult: 'invalid' });
    await expect(formAPage.sections.researchAreaSection.noResearchAreaChosenMessage).toBeVisible();

    await formAPage.sections.researchAreaSection.researchAreaDropdown.selectOption('Ujście Wisły');
    await expect(formAPage.sections.researchAreaSection.noResearchAreaChosenMessage).toBeHidden();
    await formAPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('cruise goal section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({ except: ['cruiseGoalSection'] });
  });

  test('no cruise goal chosen', async ({ formAPage }) => {
    await formAPage.submitForm({ expectedResult: 'invalid' });
    await expect(formAPage.sections.cruiseGoalSection.noCruiseGoalChosenMessage).toBeVisible();

    await formAPage.sections.cruiseGoalSection.cruiseGoalDropdown.selectOption('Komercyjny');
    await expect(formAPage.sections.cruiseGoalSection.noCruiseGoalChosenMessage).toBeHidden();
  });

  test('empty goal description', async ({ formAPage }) => {
    const cruiseGoalSection = formAPage.sections.cruiseGoalSection;
    await cruiseGoalSection.cruiseGoalDropdown.selectOption('Komercyjny');

    // for the 'empty' message to appear, the field must be detected as touched, so it is filled with some value at first
    await cruiseGoalSection.cruiseGoalDescriptionInput.fill('a');
    await cruiseGoalSection.cruiseGoalDescriptionInput.fill('');
    await expect(cruiseGoalSection.noCruiseGoalDescriptionMessage).toBeVisible();

    await formAPage.submitForm();
    await expect(formAPage.submissionApprovedMessage, 'form should not be approved').toBeHidden();

    await cruiseGoalSection.cruiseGoalDescriptionInput.fill('Jakiś opis');
    await expect(cruiseGoalSection.noCruiseGoalDescriptionMessage).toBeHidden();
    await formAPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('research tasks section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({ except: ['researchTasksSection'] });
  });

  test('no research tasks', async ({ formAPage }) => {
    await formAPage.submitForm({ expectedResult: 'invalid' });
    await expect(formAPage.sections.researchTasksSection.noResearchTasksMessage).toBeVisible();

    await formAPage.sections.researchTasksSection.addNewTaskDropdown.selectOption('Praca magisterska');
    await expect(formAPage.sections.researchTasksSection.noResearchTasksMessage).toBeHidden();
  });

  test('no author and title', async ({ formAPage }) => {
    const researchTasksSection = formAPage.sections.researchTasksSection;
    await researchTasksSection.addNewTaskDropdown.selectOption('Praca doktorska');

    // for the 'empty' message to appear, the field must be detected as touched, so it is filled with some value at first
    await researchTasksSection.authorInput('first').fill('a');
    await researchTasksSection.authorInput('first').fill('');
    await researchTasksSection.titleInput('first').fill('a');
    await researchTasksSection.titleInput('first').fill('');

    await expect(researchTasksSection.emptyAuthorMessage).toBeVisible();
    await expect(researchTasksSection.emptyTitleMessage).toBeVisible();

    await formAPage.submitForm();
    await expect(formAPage.submissionApprovedMessage, 'form should not be approved').toBeHidden();

    await researchTasksSection.authorInput('first').fill('Jakiś autor');
    await expect(researchTasksSection.emptyAuthorMessage).toBeHidden();
    await researchTasksSection.titleInput('first').fill('Jakiś tytuł');
    await expect(researchTasksSection.emptyTitleMessage).toBeHidden();

    await formAPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('contracts section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({ except: ['contractsSection'] });
  });

  test('no contracts', async ({ formAPage }) => {
    await formAPage.submitForm({ expectedResult: 'valid' });
  });

  test('missing data', async ({ formAPage }) => {
    const contractsSection = formAPage.sections.contractsSection;
    await contractsSection.addNewContractDropdown.selectOption('Międzynarodowa');

    await formAPage.submitForm();
    await expect(formAPage.submissionApprovedMessage, 'form should not be approved').toBeHidden();

    // for the 'empty' message to appear, the field must be detected as touched, so it is filled with some value at first
    const inputFields = [
      contractsSection.institutionNameInput('first'),
      contractsSection.institutionUnitInput('first'),
      contractsSection.institutionLocationInput('first'),
      contractsSection.descriptionInput('first'),
    ];
    for (const inputField of inputFields) {
      await inputField.fill('a');
      await inputField.fill('');
    }

    await expect(contractsSection.emptyInstitutionNameMessage).toBeVisible();
    await expect(contractsSection.emptyInstitutionUnitMessage).toBeVisible();
    await expect(contractsSection.emptyInstitutionLocationMessage).toBeVisible();
    await expect(contractsSection.emptyDescriptionMessage).toBeVisible();

    await contractsSection.institutionNameInput('first').fill('Jakaś nazwa');
    await expect(contractsSection.emptyInstitutionNameMessage).toBeHidden();

    await contractsSection.institutionUnitInput('first').fill('Jakaś jednostka');
    await expect(contractsSection.emptyInstitutionUnitMessage).toBeHidden();

    await contractsSection.institutionLocationInput('first').fill('Jakaś lokalizacja');
    await expect(contractsSection.emptyInstitutionLocationMessage).toBeHidden();

    await contractsSection.descriptionInput('first').fill('Jakiś opis');
    await expect(contractsSection.emptyDescriptionMessage).toBeHidden();

    await formAPage.submitForm({ expectedResult: 'invalid' });

    await expect(contractsSection.missingFileMessage).toBeVisible();

    await contractsSection.sendScan('first', MOCK_PDF_FILEPATH);
    await expect(contractsSection.missingFileMessage).toBeHidden();

    await formAPage.submitForm({ expectedResult: 'valid' });
  });
});
