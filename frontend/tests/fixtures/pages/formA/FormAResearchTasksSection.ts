import type { Locator, Page } from '@playwright/test';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormAResearchTasksSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addNewTaskButton: Locator;
  public readonly addHistoricalTaskDropdown: FormDropdown;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(formPage.page, '6. Zadania do zrealizowania w trakcie rejsu');

    this.addNewTaskButton = this.sectionDiv.getByRole('button', { name: 'Dodaj nowe zadanie' });
    this.addHistoricalTaskDropdown = new FormDropdown(
      this.sectionDiv.getByRole('button', { name: 'Dodaj historyczne zadanie' })
    );
  }

  // TODO: There are many types of inputs in this section, this requires more complex handling.
  public authorInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(label:text("Autor"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public titleInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Tytuł"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public async defaultFill() {
    await this.addNewTaskButton.click();
    await this.page.getByRole('button', { name: 'Praca licencjacka' }).click();
    await this.authorInput('first').fill('Jan Kowalski');
    await this.titleInput('first').fill('Zadanie badawcze na morzu');
  }
}
