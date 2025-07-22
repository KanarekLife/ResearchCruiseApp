import { expect, type Locator, type Page } from '@playwright/test';

export function locateSectionDiv(page: Page, title: string) {
  title = title.replace(/"/g, '\\"'); // escape double quotes
  return page.locator(`main form div:below(:text("${title}"))`).first();
}

type FormDropdownVartiant = 'menuitems' | 'menu-with-buttons';
export class FormDropdown {
  public readonly page: Page;
  public readonly dropdown: Locator;
  public readonly variant: FormDropdownVartiant;

  constructor(dropdown: Locator, variant: FormDropdownVartiant = 'menuitems') {
    this.page = dropdown.page();
    this.dropdown = dropdown;
    this.variant = variant;
  }

  async selectOption(itemText: string) {
    await this.dropdown.click();
    if (this.variant === 'menuitems') {
      await this.page.getByRole('menuitem', { name: itemText }).click();
      await expect(this.page.getByRole('menuitem')).toHaveCount(0);
    } else if (this.variant === 'menu-with-buttons') {
      await this.page.getByRole('menu').getByRole('button', { name: itemText }).click();
      await expect(this.page.getByRole('menu')).toHaveCount(0);
    }
  }
}
