import type { Locator, Page } from '@playwright/test';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormAPublicationsSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addPublicationDropdown: FormDropdown;
  public readonly addHistoricalPublicationDropdown: FormDropdown;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(formPage.page, '9. Publikacje');
    this.addPublicationDropdown = new FormDropdown(
      this.sectionDiv.getByRole('button', { name: 'Dodaj nową publikację' }),
      'menu-with-buttons'
    );
    this.addHistoricalPublicationDropdown = new FormDropdown(
      this.sectionDiv.getByRole('button', { name: 'Dodaj historyczną publikację' })
    );
  }

  public doiInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("DOI"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public titleInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Tytuł"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public AuthorsInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Autorzy"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public magazineInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Czasopismo"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public chooseYearDropdown(index: 'first' | 'last' | number) {
    const allLocator = this.sectionDiv.locator('button:below(:text("Rok"))');
    const singleLocator =
      index === 'first' ? allLocator.first() : index === 'last' ? allLocator.last() : allLocator.nth(index);
    return new FormDropdown(singleLocator, 'menu-with-buttons');
  }

  public pointsInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Punkty"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public async defaultFill() {
    await this.addPublicationDropdown.selectOption('Temat');
    await this.doiInput('first').fill('10.1234/example.doi');
    await this.titleInput('first').fill('Przykładowy tytuł publikacji');
    await this.AuthorsInput('first').fill('Jan Kowalski, Anna Nowak');
    await this.magazineInput('first').fill('Czasopismo Naukowe');
    await this.chooseYearDropdown('first').selectOption('2025');
    await this.pointsInput('first').fill('20');
  }
}
