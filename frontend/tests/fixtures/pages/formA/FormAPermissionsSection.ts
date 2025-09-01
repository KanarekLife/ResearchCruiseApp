import type { Locator, Page } from '@playwright/test';
import { locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormAPermissionsSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addPermissionButton: Locator;
  public readonly columnIndexByHeaderName = {
    'Treść pozwolenia': 0,
    'Organ wydający': 1,
  };

  public readonly permissionDescriptionRequiredMessage: Locator;
  public readonly permissionExecutiveRequiredMessage: Locator;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(formPage.page, '3. Dodatkowe pozwolenia do planowanych podczas rejsu badań');
    this.addPermissionButton = this.sectionDiv.getByRole('button', { name: 'Dodaj pozwolenie' });
    this.permissionDescriptionRequiredMessage = this.sectionDiv.getByText('Treść pozwolenia jest wymagany').first();
    this.permissionExecutiveRequiredMessage = this.sectionDiv.getByText('Organ wydający jest wymagany').first();
  }

  public permissionRow(index: 'first' | 'last' | number) {
    const rowsLocator = this.sectionDiv.getByRole('row');
    return index === 'first' ? rowsLocator.nth(2) : index === 'last' ? rowsLocator.last() : rowsLocator.nth(2 + index);
  }

  public permissionDesctiptionInput(index: 'first' | 'last' | number) {
    const rowLocator = this.permissionRow(index);
    return rowLocator.getByRole('textbox').nth(this.columnIndexByHeaderName['Treść pozwolenia']);
  }

  public permissionExecutiveInput(index: 'first' | 'last' | number) {
    const rowLocator = this.permissionRow(index);
    return rowLocator.getByRole('textbox').nth(this.columnIndexByHeaderName['Organ wydający']);
  }

  public async addPermission(description: string, executive: string) {
    await this.addPermissionButton.click();
    await (await this.permissionDesctiptionInput('last')).fill(description);
    await (await this.permissionExecutiveInput('last')).fill(executive);
  }

  public async defaultFill() {
    await this.addPermission('Pozwolenie na badania w strefie ochronnej', 'Ministerstwo Środowiska');
    await this.addPermission('Pozwolenie na badania w obszarze Natura 2000', 'Regionalny Dyrektor Ochrony Środowiska');
  }
}
