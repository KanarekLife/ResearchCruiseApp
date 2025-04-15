// import { type Page } from '@playwright/test';

// import { formTest as test } from '@tests/fixtures/fixtures';

// TODO: move to fixtures
// const formBSectionTitles = {
//   section1: '1. Informacje o rejsie',
//   section2: '2. Kierownik zgłaszanego rejsu',
//   section3: '3. Sposób wykorzystania statku',
//   section4: '4. Dodatkowe pozwolenia do planowanych podczas rejsu badań',
//   section5: '5. Rejon prowadzanego badań',
//   section6: '6. Cel rejsu',
//   section7: '7. Zadania do zrealizowania podczas rejsu',
//   section8: '8. Umowy regulujące współpracę, w ramach której miałyby być realizowane zadania badawcze',
//   section9: '9. Zespoły badawcze, które miałyby uczestniczyć w rejsie',
//   section10: '10. Publikacje',
//   section11: '11. Zadania SPUB, z którymi pokrywają się zadania planowane do realizacji na rejsie',
//   section12: '12. Szczegóły rejsu',
//   section13: '13. Szczegółowy plan zadań do realizacji podczas rejsu',
//   section14: '14. Lista sprzętu i aparatury badawczej planowanej do użycia podczas rejsu',
//   section15: '15. Elementy techniczne statku wykorzystywane podczas rejsu',
// } as const;
// type FormBSectionTitlesValues = typeof formBSectionTitles[keyof typeof formBSectionTitles];
//let formBFillSteps: Map<FormBSectionTitlesValues, (page: Page) => Promise<void>>;

// function resetFormBFillSteps() {
//   formBFillSteps = new Map<FormBSectionTitlesValues, (page: Page) => Promise<void>>([]);
// }

// test.describe(() => {
//   test.beforeEach(({}) => {
//     resetFormBFillSteps();
//   });

//   // test('valid form B', async ({ formBPage }) => {
//   //   await fillForm(formBPage, formBFillSteps);

//   //   // send
//   //   await formBPage.getByRole('button', { name: 'Wyślij' }).click();
//   //   await expect(formBPage.getByRole('heading', { name: 'Formularz wysłany pomyślnie' })).toBeVisible();
//   // });
// });
