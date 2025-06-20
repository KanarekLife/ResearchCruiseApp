import { expect, type Page } from '@playwright/test';
import path from 'path';

import { API_URL, ASSETS_DIR, test } from './fixtures';
import { locateSectionDiv, selectDropdownOption } from './utils/form-filling-utils';

const test_pdf_file = path.join(ASSETS_DIR, './test-pdf-file.pdf');

const formASectionTitles = {
  section1: '1. Kierownik zgłaszanego rejsu',
  section2: '2. Czas trwania zgłaszanego rejsu',
  section3: '3. Dodatkowe pozwolenia do planowanych podczas rejsu badań',
  section4: '4. Rejon prowadzenia badań',
  section5: '5. Cel rejsu',
  section6: '6. Zadania do zrealizowania w trakcie rejsu',
  section7: '7. Umowy regulujące współpracę, w ramach której miałyby być realizowane zadania badawcze',
  section8: '8. Zespoły badawcze, które miałyby uczestniczyć w rejsie',
  section9: '9. Publikacje',
  section10: '10. Zadania SPUB, z którymi pokrywają się zadania planowane do realizacji na rejsie',
  section11: '11. Dane kontaktowe przełożonego',
};
let formAFillSteps: Map<string, (page: Page) => Promise<void>>;

async function fillFormA(page: Page, formAFillSteps: Map<string, (page: Page) => Promise<void>>) {
  console.log(`Filling sections (${formAFillSteps.size})`);
  for (const [section, func] of formAFillSteps) {
    console.log(`Filling ${section}`);
    await func(page);
  }
}

function resetFormAFillSteps() {
  formAFillSteps = new Map<string, (page: Page) => Promise<void>>([
    [
      'section1',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section1);

        await expect(sectionDiv.locator('button:below(:text("Kierownik rejsu"))').first()).toHaveText(
          'Admin Adminowy (admin@gmail.com)'
        );
        await selectDropdownOption(
          sectionDiv.locator('button:below(:text("Zastępca kierownika rejsu"))').first(),
          'kierownik@o2.com'
        );
        await selectDropdownOption(sectionDiv.locator('button:below(:text("Rok"))').first(), '2025');
      },
    ],
    [
      'section2',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section2);

        const cruiseDaysInputDiv = sectionDiv.locator('div:below(:text("Liczba planowanych dób rejsowych"))').first();
        const cruiseDaysInput = cruiseDaysInputDiv.getByRole('textbox');
        await cruiseDaysInput.fill('1');

        const cruiseHoursInputDiv = sectionDiv
          .locator('div:below(:text("Liczba planowanych godzin rejsowych"))')
          .first();
        const cruiseHoursInput = cruiseHoursInputDiv.getByRole('textbox');
        await expect(cruiseHoursInput).toHaveValue('24');

        await sectionDiv
          .locator('input:below(:text("Uwagi dotyczące terminu"))')
          .first()
          .fill('Rejs w okresie wakacyjnym');

        await selectDropdownOption(
          sectionDiv.locator('button:below(:text("Statek na potrzeby badań będzie wykorzystywany"))').first(),
          'jedynie w nocy (maks. 8–12 h)'
        );
      },
    ],
    [
      'section3',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section3);

        await sectionDiv.getByRole('button', { name: 'Dodaj pozwolenie' }).click();
        await sectionDiv.locator('input:below(:text("Treść pozwolenia"))').first().fill('Pozwolenie jakieś');
        await sectionDiv.locator('input:below(:text("Organ wydający"))').first().fill('Pozwalający organ');
      },
    ],
    [
      'section4',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section4);

        await selectDropdownOption(
          sectionDiv.locator('button:below(:text("Rejon prowadzenia badań"))').first(),
          'Głębia Gdańska'
        );

        await sectionDiv.locator('input:below(:text("Informacje dodatkowe"))').first().fill('dodatkowe info');
      },
    ],
    [
      'section5',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section5);

        await selectDropdownOption(sectionDiv.locator('button:below(label:text("Cel rejsu"))').first(), 'Komercyjny');
        await sectionDiv.locator('input:below(:text("Opis"))').first().fill('opis celu');
      },
    ],
    [
      'section6',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section6);

        await sectionDiv.getByRole('button', { name: 'Dodaj nowe zadanie' }).click();
        await sectionDiv.getByRole('button', { name: 'Praca licencjacka' }).click();
        await sectionDiv.getByRole('textbox', { name: 'Wprowadź autora' }).fill('Jan');
        await sectionDiv.getByRole('textbox', { name: 'Wprowadź tytuł' }).fill('Fajna praca');
      },
    ],
    [
      'section7',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section7);

        await sectionDiv.getByRole('button', { name: 'Dodaj nowy kontrakt' }).click();
        await sectionDiv.getByRole('button', { name: 'Krajowa' }).click();

        await sectionDiv.locator('input:below(:text("Nazwa instytucji"))').first().fill('Uniwersytet Gdański');
        await sectionDiv.locator('input:below(:text("Jednostka"))').first().fill('Wydział Biologii');
        await sectionDiv.locator('input:below(:text("Lokalizacja instytucji"))').first().fill('Gdańsk');
        await sectionDiv.locator('input:below(:text("Opis"))').first().fill('Umowa o współpracy');

        const fileChooserPromise = page.waitForEvent('filechooser');
        await sectionDiv.getByText('Kliknij lub przeciągnij plik').click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(test_pdf_file);
      },
    ],
    [
      'section8',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section8);

        await sectionDiv.getByRole('button', { name: 'Dodaj jednostkę UG' }).click();
        await sectionDiv
          .getByRole('button', { name: 'Administracja Rektora i Jednostki Ogólnouniwersyteckie' })
          .click();

        await sectionDiv.locator('input:below(:text("Liczba pracowników"))').first().fill('1');
        await sectionDiv.locator('input:below(:text("Liczba studentów"))').first().fill('2');

        await sectionDiv.getByRole('button', { name: 'Dodaj nowy zespół' }).click();

        await sectionDiv.locator('input:below(:text("Instytucja"))').first().fill('Jakaś instytucja');
        await sectionDiv.locator('input:below(:text("Liczba osób"))').first().fill('3');
      },
    ],
    [
      'section9',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section9);

        await sectionDiv.getByRole('button', { name: 'Dodaj nową publikację' }).click();
        await sectionDiv.getByRole('button', { name: 'Temat' }).click();

        await sectionDiv.locator('input:below(:text("DOI"))').first().fill('przykładowe DOI');
        await sectionDiv.locator('input:below(:text("Tytuł"))').first().fill('Tytuł publikacji');
        await sectionDiv.locator('input:below(:text("Autorzy"))').first().fill('Smith J.');
        await sectionDiv.locator('input:below(:text("Czasopismo"))').first().fill('Komputer świat');

        await sectionDiv.getByRole('button', { name: 'Wybierz rok' }).click();
        await sectionDiv.getByRole('button', { name: '2021' }).click();

        await sectionDiv.locator('input:below(:text("Punkty"))').first().fill('50');
      },
    ],
    [
      'section10',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section10);

        await sectionDiv.getByRole('button', { name: 'Dodaj', exact: true }).click();

        await sectionDiv.locator('button:below(:text("Rok rozpoczęcia"))').first().click();
        await sectionDiv.getByRole('button', { name: '2020' }).click();
        await expect(sectionDiv.getByText('2020-2031')).toBeHidden();

        await sectionDiv.locator('button:below(:text("Rok zakończenia"))').first().click();
        await sectionDiv.getByRole('button', { name: '2022' }).click();
        await expect(sectionDiv.getByText('2020-2031')).toBeHidden();

        await sectionDiv.locator('input:below(:text("Nazwa zadania"))').fill('Zadanie 1');
      },
    ],
    [
      'section11',
      async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section11);
        await sectionDiv.locator('input:below(:text("Adres e-mail przełożonego"))').fill('abc@gmail.com');
      },
    ],
  ]);
}

test.describe(() => {
  test.beforeEach(async ({ page }) => {
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
      // add payload verification if needed
      route.fulfill({
        status: 200,
      });
    });

    // mock local storage
    await page.goto('/');

    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 1); // add one day

    const authDetails = `{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUxYjE1ZWYwLTY0MTUtNGRjNy1hNDIyLTFjMDI2MTc3ZTM0ZSIsImp0aSI6ImI1MzczZDRlLTE1N2MtNDc1NC05ZmUxLTliMjliNjJiODk5NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJleHAiOjE3NDY1NTA0NjMsImlzcyI6Imh0dHBzOi8vcmVqc3kudWcuZWR1LnBsLyIsImF1ZCI6Imh0dHBzOi8vcmVqc3kudWcuZWR1LnBsLyJ9.-tutSS95sNSAu5nUHbbZMOYK1AX94Dv9ValEXvPtwWY","expiresIn":"${deadlineDate.toISOString()}","refreshToken":"a2zhzU2GKDw3W/0gdY7FCXSD1QuBbm0eKxzR758el5dMqq4kXPwyQ8qD12FXk1VRxzO7TF1qLKMD+LFwRATIGTsM8EG2AETGUvePNiy8Ig6At9m48xC/iJNnzx+XIxnR+1OJZwu5ZnKS4gt7YbQJ/pwJbK5F6PZspYuxerlfZ26YKtNLdtzxDc+EHvpryFzF4tWWXz7rXqrh1FZcnjihn+vYk/aEbidYg4OiEelAZ6sF0LVJAI60oJzw7r0GNj6LhELUMJ79HSpzXLpgOygORnZi6J+EMfUjhPqNXSb83FUqyBYn9+Crr0xCLUUKM6fCzCeKqk504Jt9TwXfPEOp7EqrrW0S2xNyhGtgZs4fh982m8auE4fyj/P/GKKfVWVYQQq43pFQ2opZZUDBdMhCrnAeVq1BS5STl8IV11xfJFzxHnh3ecW4OpWXRBQ2p+GYWHEDSWHAnqexrOxVUOlQosiGOp4P42P1omftRPbuvNzWk1O2EqeQnAA+YekBOlBIjucPB//cXSOGVyLiG9p3q9QEFmDax3XxEdv97tguqxu2Ny4Qm/2HkE4CYOHv6Pga86IE28e1A/kJbNqzhvFYTM6TC0KlpM4Uz23A/lYTCE3JQxVYuZZRuve/OrTcT2xkzhWsUSzrw85gIy2FEiTjuKu2TlKqmzZ67ZiQXEJCgI4=","expirationDate":"${deadlineDate.toISOString()}"}`;

    await page.evaluate((authDetails) => {
      console.log('setting storage');
      window.localStorage.setItem('authDetails', authDetails);
      console.log('storage set!');
    }, authDetails);

    resetFormAFillSteps();
    await page.goto('/newcruise');
  });

  test('valid form A', async ({ page }) => {
    await fillFormA(page, formAFillSteps);

    // send
    await page.getByRole('button', { name: 'Wyślij' }).click();
    await expect(page.getByRole('heading', { name: 'Formularz przyjęty' })).toBeVisible();
  });

  test.describe('section 1 validation', () => {
    test('empty deputy manager', async ({ page }) => {
      formAFillSteps.set('section1', async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, '1. Kierownik zgłaszanego rejsu');

        await expect(sectionDiv.locator('button:below(:text("Kierownik rejsu"))').first()).toHaveText(
          'Admin Adminowy (admin@gmail.com)'
        );
        await selectDropdownOption(sectionDiv.locator('button:below(:text("Rok"))').first(), '2025');
      });

      await fillFormA(page, formAFillSteps);

      await page.getByRole('button', { name: 'Wyślij' }).click();
      await expect(page.getByRole('heading', { name: 'Wykryto błąd w formularzu' })).toBeVisible();
      // await page.mouse.click(100, 100);   // click anywhere to hide the notification

      const section1Div = await locateSectionDiv(page, formASectionTitles.section1);
      await expect(
        section1Div.getByText('Zastępca kierownika rejsu musi być jednym z dostępnych zastępców kierownika rejsu')
      ).toBeVisible();
    });

    test('deputy manager same as cruise manager', async ({ page }) => {
      await fillFormA(page, formAFillSteps);

      // set deputy manager to be the same as cruise manager
      const section1Div = await locateSectionDiv(page, formASectionTitles.section1);
      await selectDropdownOption(
        section1Div.locator('button:below(:text("Zastępca kierownika rejsu"))').first(),
        'admin@gmail.com'
      );

      await page.getByRole('button', { name: 'Wyślij' }).click();
      await expect(page.getByRole('heading', { name: 'Wykryto błąd w formularzu' })).toBeVisible();

      await expect(
        section1Div.getByText('Kierownik rejsu nie może być jednocześnie zastępcą kierownika rejsu')
      ).toBeVisible();
    });
  });

  test.describe('section 2 validation', () => {
    test.describe('invalid length of the cruise time period', () => {
      ['0', '61', 'hello', '8e1', '101'].forEach((value) =>
        test(`invalid length of the cruise time period (${value})`, async ({ page }) => {
          const section2Div = await locateSectionDiv(page, formASectionTitles.section2);
          const cruiseDaysInput = section2Div.locator('input:below(:text("Liczba planowanych dób rejsowych"))').first();
          await cruiseDaysInput.pressSequentially(value);
          await expect(
            section2Div.getByText('Rejs musi trwać co najmniej godzinę i nie dłużej niż 60 dni (1440 godzin)').first()
          ).toBeVisible();
        })
      );
    });

    test.describe('valid length of the cruise time period', () => {
      ['1', '12', '32', '59', '60'].forEach((value) =>
        test(`valid length of the cruise time period (${value})`, async ({ page }) => {
          const section2Div = await locateSectionDiv(page, formASectionTitles.section2);
          const cruiseDaysInput = section2Div.locator('input:below(:text("Liczba planowanych dób rejsowych"))').first();
          await cruiseDaysInput.fill(value);
          await expect(
            section2Div.getByText('Rejs musi trwać co najmniej godzinę i nie dłużej niż 60 dni (1440 godzin)')
          ).toHaveCount(0);
        })
      );
    });

    test('length of the cruise time period buttons', async ({ page }) => {
      const section2Div = await locateSectionDiv(page, formASectionTitles.section2);
      const cruiseDaysInputDiv = section2Div.locator('div:below(:text("Liczba planowanych dób rejsowych"))').first();
      const cruiseDaysInput = cruiseDaysInputDiv.getByRole('textbox');
      const cruiseDaysButtonSub = cruiseDaysInputDiv.getByRole('button').nth(0);
      const cruiseDaysButtonAdd = cruiseDaysInputDiv.getByRole('button').nth(1);
      const validationError = section2Div.getByText(
        'Rejs musi trwać co najmniej godzinę i nie dłużej niż 60 dni (1440 godzin)'
      );

      // random clicks
      await expect(cruiseDaysInput).toHaveValue('0'); // initial value should be 0
      await cruiseDaysButtonAdd.click();
      await expect(cruiseDaysInput).toHaveValue('1');
      for (let i = 0; i < 20; i++) {
        await cruiseDaysButtonAdd.click();
      }
      await expect(cruiseDaysInput).toHaveValue('21');
      for (let i = 0; i < 12; i++) {
        await cruiseDaysButtonSub.click();
      }
      await expect(cruiseDaysInput).toHaveValue('9');

      // try to go over 60
      cruiseDaysInput.fill('55');
      await expect(validationError).toHaveCount(0);
      await expect(cruiseDaysInput).toHaveValue('55');
      for (let i = 0; i < 5; i++) {
        await cruiseDaysButtonAdd.click();
      }
      await expect(cruiseDaysInput).toHaveValue('60');
      //await expect(validationError).toHaveCount(0);   // on reaching 60, warning should not be visible yet
      for (let i = 0; i < 5; i++) {
        await cruiseDaysButtonAdd.click();
      }
      await expect(cruiseDaysInput).toHaveValue('60'); // after more clicks, counter should still have value equal 60
      await expect(validationError.first()).toBeVisible(); // warning should be visible after trying to go over 60

      // try to go under 0
      cruiseDaysInput.fill('5');
      await expect(validationError).toHaveCount(0);
      for (let i = 0; i < 4; i++) {
        await cruiseDaysButtonSub.click();
      }
      await expect(cruiseDaysInput).toHaveValue('1');
      await expect(validationError).toHaveCount(0);
      await cruiseDaysButtonSub.click();
      await expect(cruiseDaysInput).toHaveValue('0');
      await expect(validationError.first()).toBeVisible();
    });

    test.describe('length of the cruise time period days to hours conversion', () => {
      [1, 12, 59, 60].forEach((days) =>
        test(`length of the cruise time period days to hours conversion (${days} days)`, async ({ page }) => {
          const section2Div = await locateSectionDiv(page, formASectionTitles.section2);
          const cruiseDaysInput = section2Div.locator('input:below(:text("Liczba planowanych dób rejsowych"))').first();
          const cruiseHoursInput = section2Div
            .locator('input:below(:text("Liczba planowanych godzin rejsowych"))')
            .first();

          // both initial values should be 0
          await expect(cruiseDaysInput).toHaveValue('0');
          await expect(cruiseHoursInput).toHaveValue('0');

          await cruiseDaysInput.fill(`${days}`);
          await expect(cruiseHoursInput).toHaveValue(`${days * 24}`);
        })
      );
    });

    test('empty period notes should be valid', async ({ page }) => {
      await fillFormA(page, formAFillSteps);
      const section2Div = await locateSectionDiv(page, formASectionTitles.section2);
      await section2Div.locator('input:below(:text("Uwagi dotyczące terminu"))').first().fill('');

      await page.getByRole('button', { name: 'Wyślij' }).click();
      await expect(page.getByRole('heading', { name: 'Formularz przyjęty' })).toBeVisible();
    });

    test('empty ship usage', async ({ page }) => {
      formAFillSteps.set('section2', async (page: Page) => {
        const sectionDiv = await locateSectionDiv(page, formASectionTitles.section2);

        const cruiseDaysInputDiv = sectionDiv.locator('div:below(:text("Liczba planowanych dób rejsowych"))').first();
        const cruiseDaysInput = cruiseDaysInputDiv.getByRole('textbox');
        await cruiseDaysInput.fill('1');

        const cruiseHoursInputDiv = sectionDiv
          .locator('div:below(:text("Liczba planowanych godzin rejsowych"))')
          .first();
        const cruiseHoursInput = cruiseHoursInputDiv.getByRole('textbox');
        await expect(cruiseHoursInput).toHaveValue('24');

        await sectionDiv
          .locator('input:below(:text("Uwagi dotyczące terminu"))')
          .first()
          .fill('Rejs w okresie wakacyjnym');
      });

      await fillFormA(page, formAFillSteps);

      await page.getByRole('button', { name: 'Wyślij' }).click();
      await expect(page.getByRole('heading', { name: 'Wykryto błąd w formularzu' })).toBeVisible();

      const section2Div = await locateSectionDiv(page, formASectionTitles.section2);
      await expect(section2Div.getByText('Wymagane jest wskazanie sposobu korzystania z statku')).toBeVisible();
    });

    test('alternative ship usage', async ({ page }) => {
      await fillFormA(page, formAFillSteps);
      const section2Div = await locateSectionDiv(page, formASectionTitles.section2);
      const alternativeShipUsageInput = section2Div.locator('input:below(:text("Inny sposób użycia"))').first();
      await expect(alternativeShipUsageInput).toBeHidden();

      await selectDropdownOption(
        section2Div.locator('button:below(:text("Statek na potrzeby badań będzie wykorzystywany"))').first(),
        'w inny sposób'
      );
      await expect(alternativeShipUsageInput).toBeVisible();

      await selectDropdownOption(
        section2Div.locator('button:below(:text("Statek na potrzeby badań będzie wykorzystywany"))').first(),
        'całą dobę'
      );
      await expect(alternativeShipUsageInput).toBeHidden(); // alternative ship usage should be hidden again

      await selectDropdownOption(
        section2Div.locator('button:below(:text("Statek na potrzeby badań będzie wykorzystywany"))').first(),
        'w inny sposób'
      );
      await alternativeShipUsageInput.fill('Alternatywne zastosowanie');

      await page.getByRole('button', { name: 'Wyślij' }).click();
      await expect(page.getByRole('heading', { name: 'Formularz przyjęty' })).toBeVisible();
    });
  });
});
