import type { Locator, Page } from '@playwright/test';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormACruiseManagerInfoSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly cruiseManagerDropdown: FormDropdown;
  public readonly deputyManagerDropdown: FormDropdown;
  public readonly yearDropdown: FormDropdown;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(formPage.page, '1. Kierownik zgłaszanego rejsu');
    this.cruiseManagerDropdown = new FormDropdown(
      this.sectionDiv.locator('button:below(:text("Kierownik rejsu"))').first()
    );
    this.deputyManagerDropdown = new FormDropdown(
      this.sectionDiv.locator('button:below(:text("Zastępca kierownika rejsu"))').first()
    );
    this.yearDropdown = new FormDropdown(this.sectionDiv.locator('button:below(:text("Rok"))').first());
  }

  public async defaultFill() {
    await this.deputyManagerDropdown.selectOption('kierownik@o2.com');
    await this.yearDropdown.selectOption('2025');
  }
}
