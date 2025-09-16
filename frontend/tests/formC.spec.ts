import { expect } from '@playwright/test';
import { formTest as test } from '@tests/fixtures/fixtures';

import { MOCK_PDF_FILEPATH } from './fixtures/consts';
import { touchInput } from './utils/form-filling-utils';

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

test.describe('research tasks section tests', () => {
  test.beforeEach(async ({ formCPage }) => {
    await formCPage.fillForm({ except: ['researchTasksSection'] });
  });

  test('checkboxes available only after marked as done', async ({ formCPage }) => {
    const researchTasksSection = formCPage.sections.researchTasksSection;
    const taskRow = researchTasksSection.taskRow('first');

    await expect(taskRow.managerConditionMetCheckbox).toBeDisabled();
    await expect(taskRow.deputyConditionMetCheckbox).toBeDisabled();

    await taskRow.doneCheckbox.check();

    await expect(taskRow.managerConditionMetCheckbox).toBeEnabled();
    await expect(taskRow.deputyConditionMetCheckbox).toBeEnabled();

    await taskRow.managerConditionMetCheckbox.check();

    await taskRow.doneCheckbox.uncheck();

    await expect(taskRow.managerConditionMetCheckbox).toBeDisabled();
    await expect(taskRow.deputyConditionMetCheckbox).toBeDisabled();
    await expect(taskRow.managerConditionMetCheckbox).not.toBeChecked();
    await expect(taskRow.deputyConditionMetCheckbox).not.toBeChecked();
  });
});

test.describe('contracts section tests', () => {
  test.beforeEach(async ({ formCPage }) => {
    await formCPage.fillForm({ except: ['contractsSection'] });
  });

  test('no contracts', async ({ formCPage }) => {
    await formCPage.submitForm({ expectedResult: 'valid' });
  });

  test('missing data', async ({ formCPage }) => {
    const contractsSection = formCPage.sections.contractsSection;
    await contractsSection.addNewContractDropdown.selectOption('Międzynarodowa');
    const contractRow = contractsSection.contractRow('first');

    await formCPage.submitForm();
    await expect(formCPage.submissionApprovedMessage).toBeHidden();

    // for the 'empty' message to appear, the field must be detected as touched, so it is filled with some value at first
    const inputFields = [
      contractRow.institutionNameInput,
      contractRow.institutionUnitInput,
      contractRow.institutionLocationInput,
      contractRow.descriptionInput,
    ];
    for (const inputField of inputFields) {
      await touchInput(inputField);
      await expect(inputField.errors.required).toBeVisible();
    }

    for (const inputField of inputFields) {
      await expect(inputField.errors.required).toBeVisible();
      await inputField.fill('Wartość');
      await expect(inputField.errors.required).toBeHidden();
    }

    await formCPage.submitForm({ expectedResult: 'invalid' });

    await expect(contractRow.scanFileInput.errors.required).toBeVisible();

    await contractRow.scanFileInput.send(MOCK_PDF_FILEPATH);
    await expect(contractRow.scanFileInput.errors.required).toBeHidden();

    await formCPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('members section tests', () => {
  test.beforeEach(async ({ formCPage }) => {
    await formCPage.fillForm({ except: ['membersSection'] });
  });

  test('duplicate faculty', async ({ formCPage }) => {
    const membersSection = formCPage.sections.membersSection;
    await membersSection.addUGUnitDropdown.selectOption('Szkoły Doktorskie (0C00)');
    await membersSection.ugUnitRow('last').noOfEmployeesInput.fill('1');
    await membersSection.addUGUnitDropdown.selectOption('Szkoły Doktorskie (0C00)');
    await membersSection.ugUnitRow('last').noOfEmployeesInput.fill('2');
    await expect(membersSection.duplicateFacultyMessage).toBeVisible();

    await formCPage.submitForm({ expectedResult: 'invalid' });

    await membersSection.ugUnitRow('last').deleteButton.click();
    await expect(membersSection.duplicateFacultyMessage).toBeHidden();

    await formCPage.submitForm({ expectedResult: 'valid' });
  });

  test('guest team input', async ({ formCPage }) => {
    const membersSection = formCPage.sections.membersSection;
    await membersSection.addNewGuestTeamButton.click();
    const guestTeamRow = membersSection.guestTeamRow('first');

    // for the 'empty' message to appear, the field must be detected as touched, so it is filled with some value at first
    await touchInput(guestTeamRow.teamNameInput);
    await expect(guestTeamRow.teamNameInput.errors.required).toBeVisible();

    await guestTeamRow.teamNameInput.fill('Jakiś zespół');
    await expect(guestTeamRow.teamNameInput.errors.required).toBeHidden();

    await formCPage.submitForm({ expectedResult: 'invalid' });
    await expect(guestTeamRow.noOfPeopleInput.errors.invalidValue).toBeVisible();

    await guestTeamRow.noOfPeopleInput.fill('1');
    await expect(guestTeamRow.noOfPeopleInput.errors.invalidValue).toBeHidden();
    await formCPage.submitForm({ expectedResult: 'valid' });
  });
});

test.describe('SPUB tasks section tests', () => {
  test.beforeEach(async ({ formCPage }) => {
    await formCPage.fillForm({ except: ['spubTasksSection'] });
  });

  test('no SPUB tasks', async ({ formCPage }) => {
    await formCPage.submitForm({ expectedResult: 'valid' });
  });

  test('missing SPUB task data', async ({ formCPage }) => {
    const spubTasksSection = formCPage.sections.spubTasksSection;
    await spubTasksSection.addNewTaskButton.click();
    const taskRow = spubTasksSection.taskRow('first');

    await touchInput(taskRow.nameInput);
    await expect(taskRow.nameInput.errors.required).toBeVisible();

    await taskRow.nameInput.fill('Jakieś zadanie');
    await expect(taskRow.nameInput.errors.required).toBeHidden();

    await formCPage.submitForm({ expectedResult: 'invalid' });
    await expect(taskRow.startYearDropdown.errors.required).toBeVisible();
    await expect(taskRow.endYearDropdown.errors.required).toBeVisible();

    await taskRow.startYearDropdown.selectOption('2023');
    await expect(taskRow.startYearDropdown.errors.required).toBeHidden();

    await taskRow.endYearDropdown.selectOption('2025');
    await expect(taskRow.endYearDropdown.errors.required).toBeHidden();

    await formCPage.submitForm({ expectedResult: 'valid' });
  });
});
