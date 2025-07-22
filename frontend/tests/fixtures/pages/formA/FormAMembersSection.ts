import type { Locator, Page } from '@playwright/test';
import { FormDropdown, locateSectionDiv } from '@tests/utils/form-filling-utils';

import { FormAPage } from './formAPage';

export class FormAMembersSection {
  public readonly formPage: FormAPage;
  public readonly page: Page;
  public readonly sectionDiv: Locator;
  public readonly addUGUnitDropdown: FormDropdown;
  public readonly addNewGuestTeamButton: Locator;
  public readonly addHistoricalTeamDropdown: FormDropdown;

  constructor(formPage: FormAPage) {
    this.formPage = formPage;
    this.page = formPage.page;
    this.sectionDiv = locateSectionDiv(formPage.page, '8. Zespoły badawcze, które miałyby uczestniczyć w rejsie');
    this.addUGUnitDropdown = new FormDropdown(
      this.sectionDiv.getByRole('button', { name: 'Dodaj jednostkę UG' }),
      'menu-with-buttons'
    );
    this.addNewGuestTeamButton = this.sectionDiv.getByRole('button', { name: 'Dodaj nowy zespół' });
    this.addHistoricalTeamDropdown = new FormDropdown(
      this.sectionDiv.getByRole('button', { name: 'Dodaj historyczny zespół' })
    );
  }

  public noOfEmployeesInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Liczba pracowników"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public noOfStudentsInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Liczba studentów"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public guestTeamNameInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Instytucja"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public guestTeamNoOfPersonsInput(index: 'first' | 'last' | number) {
    const locator = this.sectionDiv.locator('input:below(:text("Liczba osób"))');
    return index === 'first' ? locator.first() : index === 'last' ? locator.last() : locator.nth(index);
  }

  public async defaultFill() {
    await this.addUGUnitDropdown.selectOption('Rektor (0000)');
    await this.noOfEmployeesInput('first').fill('5');
    await this.noOfStudentsInput('first').fill('3');
    await this.addNewGuestTeamButton.click();
    await this.guestTeamNameInput('first').fill('Instytut Badawczy');
    await this.guestTeamNoOfPersonsInput('first').fill('10');
  }
}
