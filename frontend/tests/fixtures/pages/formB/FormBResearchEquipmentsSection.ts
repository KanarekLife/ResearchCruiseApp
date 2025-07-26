import type { Locator, Page } from '@playwright/test';
import { locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormBPage } from './formBPage';

export class FormBResearchEquipmentsSection {
  public readonly formPage: FormBPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;

  constructor(formPage: FormBPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(
      formPage.page,
      '14. Lista sprzętu i aparatury badawczej planowanej do użycia podczas rejsu'
    );
  }

  public async defaultFill() {}
}
