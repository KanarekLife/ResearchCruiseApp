import type { Locator, Page } from '@playwright/test';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormACruiseLengthSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly cruiseDaysInput: Locator;
  public readonly cruiseDaysDecreaseButton: Locator;
  public readonly cruiseDaysIncreaseButton: Locator;
  public readonly cruiseHoursInput: Locator;
  public readonly cruiseHoursDecreaseButton: Locator;
  public readonly cruiseHoursIncreaseButton: Locator;
  public readonly periodNotesInput: Locator;
  public readonly shipUsageDropdown: FormDropdown;
  public readonly alternativeShipUsageInput: Locator;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(formPage.page, '2. Czas trwania zgłaszanego rejsu');
    const cruiseDaysInputDiv = this.sectionDiv.locator('div:below(:text("Liczba planowanych dób rejsowych"))').first();
    this.cruiseDaysInput = cruiseDaysInputDiv.getByRole('textbox');
    this.cruiseDaysDecreaseButton = cruiseDaysInputDiv.getByRole('button').nth(0);
    this.cruiseDaysIncreaseButton = cruiseDaysInputDiv.getByRole('button').nth(1);
    const cruiseHoursInputDiv = this.sectionDiv
      .locator('div:below(:text("Liczba planowanych godzin rejsowych"))')
      .first();
    this.cruiseHoursInput = cruiseHoursInputDiv.getByRole('textbox');
    this.cruiseHoursDecreaseButton = cruiseHoursInputDiv.getByRole('button').nth(0);
    this.cruiseHoursIncreaseButton = cruiseHoursInputDiv.getByRole('button').nth(1);
    this.periodNotesInput = this.sectionDiv.locator('input:below(:text("Uwagi dotyczące terminu"))').first();
    this.shipUsageDropdown = new FormDropdown(
      this.sectionDiv.locator('button:below(:text("Statek na potrzeby badań będzie wykorzystywany"))').first()
    );
    this.alternativeShipUsageInput = this.sectionDiv.locator('input:below(:text("Inny sposób użycia"))').first();
  }

  public async defaultFill() {
    await this.cruiseDaysInput.fill('5');
    await this.cruiseDaysIncreaseButton.click();
    await this.periodNotesInput.fill('Rejs planowany na okres letni.');
    await this.shipUsageDropdown.selectOption('całą dobę');
  }
}
