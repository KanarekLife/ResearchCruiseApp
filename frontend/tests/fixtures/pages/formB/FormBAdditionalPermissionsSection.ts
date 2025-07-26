import type { Locator, Page } from '@playwright/test';
import { locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormBPage } from './formBPage';

export class FormBAdditionalPermissionsSection {
  public readonly formPage: FormBPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addPermissionButton: Locator;
  public readonly columnIndexByHeaderName = {
    'Treść pozwolenia': 0,
    'Organ wydający': 1,
    Skan: 2,
  };

  constructor(formPage: FormBPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(formPage.page, '4. Dodatkowe pozwolenia do planowanych podczas rejsu badań');
    this.addPermissionButton = this.sectionDiv.getByRole('button', { name: 'Dodaj pozwolenie' });
  }

  public permissionRow(index: 'first' | 'last' | number) {
    const rowsLocator = this.sectionDiv.getByRole('row');
    return index === 'first' ? rowsLocator.nth(1) : index === 'last' ? rowsLocator.last() : rowsLocator.nth(1 + index);
  }

  public async defaultFill() {}
}
