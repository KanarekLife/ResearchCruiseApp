import { expect } from '@playwright/test';
import path from 'path';

import { test, API_URL, ASSETS_DIR } from './fixtures';

test('valid form A', async ({ page }) => {
  const test_pdf_file = path.join(ASSETS_DIR, './test-pdf-file.pdf');

  // mock apis
  page.routeFromHAR(path.join(ASSETS_DIR, './api-mocks/api_forms_InitValues_A.har'), {
    url: `${API_URL}/forms/InitValues/A`,
    update: false,
  });

  const mockedAccount = {
    id: 'f77ae78e-420f-4e62-911a-728422718767',
    userName: 'admin@gmail.com',
    email: 'admin@gmail.com',
    firstName: 'Admin',
    lastName: 'Adminowy',
    roles: ['Administrator'],
    emailConfirmed: true,
    accepted: true,
  };
  page.route(`${API_URL}/account`, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockedAccount),
    });
  });

  page.route(`${API_URL}/api/CruiseApplications?isDraft=false`, (route) => {
    // TODO: add payload verification
    route.fulfill({
      status: 200,
    });
  });

  // mock local storage
  await page.goto('/');

  var deadlineDate = new Date();
  deadlineDate.setDate(deadlineDate.getDate() + 1); // add one day

  var authDetails = `{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUxYjE1ZWYwLTY0MTUtNGRjNy1hNDIyLTFjMDI2MTc3ZTM0ZSIsImp0aSI6ImI1MzczZDRlLTE1N2MtNDc1NC05ZmUxLTliMjliNjJiODk5NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJleHAiOjE3NDY1NTA0NjMsImlzcyI6Imh0dHBzOi8vcmVqc3kudWcuZWR1LnBsLyIsImF1ZCI6Imh0dHBzOi8vcmVqc3kudWcuZWR1LnBsLyJ9.-tutSS95sNSAu5nUHbbZMOYK1AX94Dv9ValEXvPtwWY","expiresIn":"${deadlineDate.toISOString()}","refreshToken":"a2zhzU2GKDw3W/0gdY7FCXSD1QuBbm0eKxzR758el5dMqq4kXPwyQ8qD12FXk1VRxzO7TF1qLKMD+LFwRATIGTsM8EG2AETGUvePNiy8Ig6At9m48xC/iJNnzx+XIxnR+1OJZwu5ZnKS4gt7YbQJ/pwJbK5F6PZspYuxerlfZ26YKtNLdtzxDc+EHvpryFzF4tWWXz7rXqrh1FZcnjihn+vYk/aEbidYg4OiEelAZ6sF0LVJAI60oJzw7r0GNj6LhELUMJ79HSpzXLpgOygORnZi6J+EMfUjhPqNXSb83FUqyBYn9+Crr0xCLUUKM6fCzCeKqk504Jt9TwXfPEOp7EqrrW0S2xNyhGtgZs4fh982m8auE4fyj/P/GKKfVWVYQQq43pFQ2opZZUDBdMhCrnAeVq1BS5STl8IV11xfJFzxHnh3ecW4OpWXRBQ2p+GYWHEDSWHAnqexrOxVUOlQosiGOp4P42P1omftRPbuvNzWk1O2EqeQnAA+YekBOlBIjucPB//cXSOGVyLiG9p3q9QEFmDax3XxEdv97tguqxu2Ny4Qm/2HkE4CYOHv6Pga86IE28e1A/kJbNqzhvFYTM6TC0KlpM4Uz23A/lYTCE3JQxVYuZZRuve/OrTcT2xkzhWsUSzrw85gIy2FEiTjuKu2TlKqmzZ67ZiQXEJCgI4=","expirationDate":"${deadlineDate.toISOString()}"}`;

  await page.evaluate((authDetails) => {
    console.log('setting storage');
    window.localStorage.setItem('authDetails', authDetails);
    console.log('storage set!');
  }, authDetails);

  await page.goto('/newcruise');

  // sekcja 1
  // await page.getByRole('button', { name: 'Wybierz kierownika rejsu' }).click();
  // await page.getByRole('menuitem', { name: 'Admin Adminowy admin@gmail.com' }).click();
  // await expect(page.getByRole('menuitem', { name: 'KK Kierownik Kierowniczy kierownik@o2.com' })).toBeHidden();
  await page.getByRole('button', { name: 'Wybierz zastępcę kierownika' }).click();
  await page.getByRole('menuitem', { name: 'KK Kierownik Kierowniczy kierownik@o2.com' }).click();
  await page.getByRole('button', { name: '2025' }).click();
  await page.getByRole('menuitem', { name: '2025' }).click();

  // sekcja 2
  await page.getByRole('slider').nth(1).click();
  await page.locator('span:nth-child(13)').first().click();
  await page.getByRole('slider').first().click();
  await page.locator('span:nth-child(7)').first().click();
  await page.locator('div:nth-child(2) > .relative > span:nth-child(6)').click();
  await page.locator('div:nth-child(2) > .relative > span:nth-child(13)').click();
  await page
    .locator('div')
    .filter({ hasText: /^Liczba planowanych dób rejsowych$/ })
    .getByRole('button')
    .nth(1)
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Liczba planowanych dób rejsowych$/ })
    .getByRole('button')
    .nth(1)
    .click();
  await page
    .locator('div')
    .filter({ hasText: /^Liczba planowanych dób rejsowych$/ })
    .getByRole('button')
    .nth(1)
    .click();
  await page.getByRole('textbox', { name: 'np. "Rejs w okresie' }).click();
  await page.getByRole('textbox', { name: 'np. "Rejs w okresie' }).fill('Rejs w okresie wakacyjnym');
  await page.getByRole('button', { name: 'Wybierz' }).first().click();
  await page.getByRole('menuitem', { name: 'jedynie w nocy (maks. 8–12 h)' }).click();

  // sekcja 3
  await page.getByRole('button', { name: 'Dodaj pozwolenie' }).click();
  await page.locator('input[name="permissions\\[0\\]\\.description"]').click();
  await page.locator('input[name="permissions\\[0\\]\\.description"]').fill('Pozwolenie jakieś');
  await page.locator('input[name="permissions\\[0\\]\\.executive"]').click();
  await page.locator('input[name="permissions\\[0\\]\\.executive"]').fill('Pozwalający organ');

  // sekcja 4
  await page
    .locator('div')
    .filter({ hasText: /^Rejon prowadzenia badańWybierz$/ })
    .getByRole('button')
    .click();
  await page.getByRole('menuitem', { name: 'Głębia Gdańska' }).click();
  await page.getByRole('textbox', { name: 'np. szczegóły dotyczące regionu' }).click();
  await page.getByRole('textbox', { name: 'np. szczegóły dotyczące regionu' }).fill('dodatkowe info');

  // sekcja 5
  await page.getByRole('button', { name: 'Wybierz' }).click();
  await page.getByRole('menuitem', { name: 'Komercyjny' }).click();
  await page.getByRole('textbox', { name: 'np. szczegóły dotyczące celu' }).click();
  await page.getByRole('textbox', { name: 'np. szczegóły dotyczące celu' }).fill('opis celu');

  // sekcja 6
  await page.getByRole('button', { name: 'Dodaj nowe zadanie' }).click();
  await page.getByRole('button', { name: 'Praca licencjacka' }).click();
  await page.getByRole('textbox', { name: 'Wprowadź autora' }).click();
  await page.getByRole('textbox', { name: 'Wprowadź autora' }).fill('Jan');
  await page.getByRole('textbox', { name: 'Wprowadź tytuł' }).click();
  await page.getByRole('textbox', { name: 'Wprowadź tytuł' }).fill('Fajna praca');

  // sekcja 7
  await page.getByRole('button', { name: 'Dodaj nowy kontrakt' }).click();
  await page.getByRole('button', { name: 'Krajowa' }).click();
  await page.getByRole('textbox', { name: 'np. "Uniwersytet Gdański"' }).click();
  await page.getByRole('textbox', { name: 'np. "Uniwersytet Gdański"' }).fill('Uniwersytet Gdański');
  await page.getByRole('textbox', { name: 'np. "Wydział Biologii"' }).click();
  await page.getByRole('textbox', { name: 'np. "Wydział Biologii"' }).fill('Wydział Biologii');
  await page.getByRole('textbox', { name: 'np. "Gdańsk"' }).click();
  await page.getByRole('textbox', { name: 'np. "Gdańsk"' }).fill('Gdańsk');
  await page.getByRole('textbox', { name: 'np. "Umowa o współpracy"' }).click();
  await page.getByRole('textbox', { name: 'np. "Umowa o współpracy"' }).fill('Umowa o współpracy');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.getByText('Kliknij lub przeciągnij plik').click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(test_pdf_file);

  // sekcja 8
  await page.getByRole('button', { name: 'Dodaj jednostkę UG' }).click();
  await page.getByRole('button', { name: 'Administracja Rektora i' }).click();
  await page.getByRole('row', { name: '1. Administracja Rektora i' }).getByRole('button').nth(1).click();
  await page.getByRole('row', { name: '1. Administracja Rektora i' }).getByRole('button').nth(1).click();
  await page.getByRole('cell', { name: '0' }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Dodaj nowy zespół' }).click();
  await page.locator('input[name="guestTeams\\[0\\]\\.name"]').click();
  await page.locator('input[name="guestTeams\\[0\\]\\.name"]').fill('Jakaś instytucja');
  await page.getByRole('cell', { name: '0' }).getByRole('button').nth(1).click();
  await page.getByRole('row', { name: 'Jakaś instytucja 1' }).getByRole('button').nth(1).click();
  await page.getByRole('row', { name: 'Jakaś instytucja 2' }).getByRole('button').nth(1).click();

  // sekcja 9
  await page.getByRole('button', { name: 'Dodaj nową publikację' }).click();
  await page.getByRole('button', { name: 'Temat' }).click();
  await page.getByRole('textbox', { name: 'np. "10.1016/j.jmarsys.2019.' }).click();
  await page.getByRole('textbox', { name: 'np. "10.1016/j.jmarsys.2019.' }).fill('przykładowe DOI');
  await page.getByRole('textbox', { name: 'np. "The impact of sea level' }).click();
  await page.getByRole('textbox', { name: 'np. "The impact of sea level' }).fill('Tytuł publikacji');
  await page.getByRole('textbox', { name: 'np. "Kowalski J., Nowak A."' }).click();
  await page.getByRole('textbox', { name: 'np. "Kowalski J., Nowak A."' }).fill('Smith J.');
  await page.getByRole('textbox', { name: 'np. "Journal of Marine' }).click();
  await page.getByRole('textbox', { name: 'np. "Journal of Marine' }).fill('Komputer świat');
  await page.getByRole('button', { name: 'Wybierz rok' }).click();
  await page.getByRole('button', { name: '2021' }).click();
  await page.getByRole('cell', { name: 'Punkty 0' }).click();
  await page.getByRole('cell', { name: 'Punkty 0' }).getByRole('button').nth(1).click();
  await page.getByRole('cell', { name: 'Punkty 10' }).getByRole('button').nth(1).click();

  // sekcja 10
  await page.getByRole('button', { name: 'Dodaj', exact: true }).click();
  await page.getByRole('button', { name: 'Wybierz rok' }).first().click();
  await page.getByRole('button', { name: '2020' }).click();
  await expect(page.getByRole('button', { name: '2022' })).toBeHidden();
  await page.getByRole('button', { name: 'Wybierz rok' }).click();
  await page.getByRole('button', { name: '2022' }).click();
  await page.locator('input[name="spubTasks\\[0\\]\\.name"]').click();
  await page.locator('input[name="spubTasks\\[0\\]\\.name"]').fill('Zadanie 1');

  // sekcja 11
  await page.getByRole('textbox', { name: 'Wprowadź adres e-mail przełoż' }).click();
  await page.getByRole('textbox', { name: 'Wprowadź adres e-mail przełoż' }).fill('abc@gmail.com');

  // send
  await page.getByRole('button', { name: 'Wyślij' }).click();
  await expect(page.getByRole('heading', { name: 'Formularz przyjęty' })).toBeVisible();
});
