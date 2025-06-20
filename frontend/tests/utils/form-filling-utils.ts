import { expect, type Locator, type Page } from '@playwright/test';

export async function locateSectionDiv(page: Page, title: string) {
  title = title.replace(/"/g, '\\"'); // escape double quotes
  return page.locator(`main div:below(:text("${title}"))`).first();
}

export async function selectDropdownOption(dropdownElement: Locator, itemText: string) {
  const page = dropdownElement.page();

  await dropdownElement.click();
  await page.getByRole('menuitem', { name: itemText }).click();
  await expect(page.getByRole('menuitem')).toHaveCount(0);
}
