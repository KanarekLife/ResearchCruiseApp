import type { Locator, Page } from '@playwright/test';
import { locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormBPage } from './formBPage';

export class FormBAdditionalPermissionsSection {
  public readonly formPage: FormBPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addPermissionButton: Locator;

  public readonly descriptionRequiredMessage: Locator;
  public readonly executiveRequiredMessage: Locator;

  constructor(formPage: FormBPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(formPage.page, '4. Dodatkowe pozwolenia do planowanych podczas rejsu badań');
    this.addPermissionButton = this.sectionDiv.getByRole('button', { name: 'Dodaj pozwolenie' });
    this.descriptionRequiredMessage = this.sectionDiv.getByText('Treść pozwolenia jest wymagany').first();
    this.executiveRequiredMessage = this.sectionDiv.getByText('Organ wydający jest wymagany').first();
  }

  public permissionRow(index: 'first' | 'last' | number) {
    const rowsLocator = this.sectionDiv.getByRole('row');
    return index === 'first' ? rowsLocator.nth(2) : index === 'last' ? rowsLocator.last() : rowsLocator.nth(2 + index);
  }

  public descriptionInput(index: 'first' | 'last' | number) {
    const rowLocator = this.permissionRow(index);
    return rowLocator.getByRole('textbox').nth(0);
  }

  public executiveInput(index: 'first' | 'last' | number) {
    const rowLocator = this.permissionRow(index);
    return rowLocator.getByRole('textbox').nth(1);
  }

  public async sendScan(index: 'first' | 'last' | number, filePath: string) {
    const rowLocator = this.permissionRow(index);
    const sendButton = rowLocator.getByRole('cell', { name: 'Kliknij lub przeciągnij plik' });

    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await sendButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  public async defaultFill() {}
}
