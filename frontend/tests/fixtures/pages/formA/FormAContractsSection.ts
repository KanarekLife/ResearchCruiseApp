import type { Locator, Page } from '@playwright/test';
import { MOCK_PDF_FILEPATH } from '@tests/fixtures/consts';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormAContractsSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addNewContractDropdown: FormDropdown;
  public readonly addHistoricalContractDropdown: FormDropdown;

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
  }

  public institutionNameInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Nazwa instytucji"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public institutionUnitInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Jednostka"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public institutionLocalizationInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Lokalizacja instytucji"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public descriptionInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Opis"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public async sendScan(index: 'first' | 'last' | number, filePath: string) {
    const locator = this.sectionDiv.getByText('Kliknij lub przeciągnij plik');
    const sendButton = index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);

    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await sendButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  public async defaultFill() {
    await this.addNewContractDropdown.selectOption('Krajowa');
    await this.institutionNameInput('first').fill('Instytut Badawczy');
    await this.institutionUnitInput('first').fill('Jednostka Badawcza');
    await this.institutionLocalizationInput('first').fill('Gdańsk, Polska');
    await this.descriptionInput('first').fill('Opis umowy badawczej');
    await this.sendScan('first', MOCK_PDF_FILEPATH);
  }
}
