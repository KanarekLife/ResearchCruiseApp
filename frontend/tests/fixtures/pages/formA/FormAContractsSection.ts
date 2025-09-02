import type { Locator, Page } from '@playwright/test';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormAContractsSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addNewContractDropdown: FormDropdown;
  public readonly addHistoricalContractDropdown: FormDropdown;

  public readonly emptyInstitutionNameMessage: Locator;
  public readonly emptyInstitutionUnitMessage: Locator;
  public readonly emptyInstitutionLocationMessage: Locator;
  public readonly emptyDescriptionMessage: Locator;
  public readonly missingFileMessage: Locator;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(
      formPage.page,
      '7. Umowy regulujące współpracę, w ramach której miałyby być realizowane zadania badawcze'
    );
    this.addNewContractDropdown = new FormDropdown(
      this.sectionDiv.locator('button', { hasText: 'Dodaj nowy kontrakt' }),
      'menu-with-buttons'
    );
    this.addHistoricalContractDropdown = new FormDropdown(
      this.sectionDiv.locator('button', { hasText: 'Dodaj historyczną umowę' })
    );
    this.emptyInstitutionNameMessage = this.sectionDiv.getByText('Nazwa instytucji jest wymagana');
    this.emptyInstitutionUnitMessage = this.sectionDiv.getByText('Jednostka jest wymagana');
    this.emptyInstitutionLocationMessage = this.sectionDiv.getByText('Lokalizacja instytucji jest wymagana');
    this.emptyDescriptionMessage = this.sectionDiv.getByText('Opis jest wymagany');
    this.missingFileMessage = this.sectionDiv.getByText('Plik jest wymagany');
  }

  public contractRow(index: 'first' | 'last' | number) {
    const rowsLocator = this.sectionDiv.getByRole('row');
    return index === 'first' ? rowsLocator.nth(2) : index === 'last' ? rowsLocator.last() : rowsLocator.nth(2 + index);
  }

  public institutionNameInput(index: 'first' | 'last' | number) {
    const rowLocator = this.contractRow(index);
    return rowLocator.locator('input:below(:text("Nazwa instytucji"))').first();
  }

  public institutionUnitInput(index: 'first' | 'last' | number) {
    const rowLocator = this.contractRow(index);
    return rowLocator.locator('input:below(:text("Jednostka"))').first();
  }

  public institutionLocationInput(index: 'first' | 'last' | number) {
    const rowLocator = this.contractRow(index);
    return rowLocator.locator('input:below(:text("Lokalizacja instytucji"))').first();
  }

  public descriptionInput(index: 'first' | 'last' | number) {
    const rowLocator = this.contractRow(index);
    return rowLocator.locator('input:below(:text("Opis"))').first();
  }

  public async sendScan(index: 'first' | 'last' | number, filePath: string) {
    const rowLocator = this.contractRow(index);
    const sendButton = rowLocator.locator(':below(:text("Skan"))').first();

    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await sendButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  public async defaultFill() {} // Optional section
}
