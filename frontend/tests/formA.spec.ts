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

test.describe('cruise length section tests', () => {
  test.beforeEach(async ({ formAPage }) => {
    await formAPage.fillForm({except: ['cruiseLengthSection']});
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
          await formAPage.submitForm({expectedResult: 'valid'});
        } else {
          await expect(formAPage.sections.cruiseLengthSection.invalidCruiseDurationMessage).toBeVisible();
          await formAPage.submitForm({expectedResult: 'invalid'});
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
          await formAPage.submitForm({expectedResult: 'valid'});
        } else {
          await expect(formAPage.sections.cruiseLengthSection.invalidCruiseDurationMessage).toBeVisible();
          await formAPage.submitForm({expectedResult: 'invalid'});
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
    await formAPage.submitForm({expectedResult: 'valid'});
  })
});

