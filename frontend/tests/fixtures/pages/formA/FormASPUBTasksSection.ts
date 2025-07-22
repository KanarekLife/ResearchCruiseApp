import type { Locator, Page } from '@playwright/test';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormASPUBTasksSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addNewTaskButton: Locator;
  public readonly addHistoricalTaskDropdown: FormDropdown;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(
      formPage.page,
      '10. Zadania SPUB, z którymi pokrywają się zadania planowane do realizacji na rejsie'
    );
    this.addNewTaskButton = this.sectionDiv.getByRole('button', { name: 'Dodaj' });
    this.addHistoricalTaskDropdown = new FormDropdown(
      this.sectionDiv.getByRole('button', { name: 'Dodaj historyczne zadanie SPUB' })
    );
  }

  public chooseStartYearButton(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('button:below(:text("Rok rozpoczęcia"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public chooseEndYearButton(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('button:below(:text("Rok zakończenia"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public taskNameInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Nazwa zadania"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public async defaultFill() {} // Optional section
}
