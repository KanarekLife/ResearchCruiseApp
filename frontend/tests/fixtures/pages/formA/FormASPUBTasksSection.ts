import type { Locator, Page } from '@playwright/test';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormASPUBTasksSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addNewTaskButton: Locator;
  public readonly addHistoricalTaskDropdown: FormDropdown;

  public readonly misingStartYearMessage: Locator;
  public readonly misingEndYearMessage: Locator;
  public readonly emptyTaskNameMessage: Locator;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(
      formPage.page,
      '10. Zadania SPUB, z którymi pokrywają się zadania planowane do realizacji na rejsie'
    );
    this.addNewTaskButton = this.sectionDiv.getByRole('button', { name: 'Dodaj' }).first();
    this.addHistoricalTaskDropdown = new FormDropdown(
      this.sectionDiv.getByRole('button', { name: 'Dodaj historyczne zadanie' })
    );
    this.misingStartYearMessage = this.sectionDiv.getByText('Rok rozpoczęcia jest wymagany');
    this.misingEndYearMessage = this.sectionDiv.getByText('Rok zakończenia jest wymagany');
    this.emptyTaskNameMessage = this.sectionDiv.getByText('Nazwa jest wymagana');
  }

  public chooseStartYearDropdown(index: 'first' | 'last' | number) {
    const allLocator = this.sectionDiv.locator('button:below(:text("Rok rozpoczęcia"))');
    const singleLocator =
      index === 'first' ? allLocator.first() : index === 'last' ? allLocator.last() : allLocator.nth(index);
    return new FormDropdown(singleLocator, { variant: 'menu-with-buttons' });
  }

  public chooseEndYearDropdown(index: 'first' | 'last' | number) {
    const allLocator = this.sectionDiv.locator('button:below(:text("Rok zakończenia"))');
    const singleLocator =
      index === 'first' ? allLocator.first() : index === 'last' ? allLocator.last() : allLocator.nth(index);
    return new FormDropdown(singleLocator, { variant: 'menu-with-buttons' });
  }

  public taskNameInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Nazwa zadania"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public async defaultFill() {} // Optional section
}
