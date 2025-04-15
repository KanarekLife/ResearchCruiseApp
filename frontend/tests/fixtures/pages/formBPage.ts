// import { type BrowserContext } from "@playwright/test";

// import { API_URL } from "@tests/fixtures/consts";
// import { TESTED_FORM_ID } from "@tests/fixtures/consts";
// import { getCruisePayload, getFormAPayload, getInitValuesBPayload } from "../mockPayloads";

// export const getFormBPage = async (context: BrowserContext) => {
//   // Initialize Form A page to ensure the user is logged in
//   const page = context.pages()[0];

//   page.route(`${API_URL}/forms/InitValues/B`, (route) => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify(getInitValuesBPayload()),
//     });
//   });

//   page.route(`${API_URL}/api/CruiseApplications/${TESTED_FORM_ID}/cruise`, (route) => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify(getCruisePayload()),
//     });
//   });

//   page.route(`${API_URL}/api/CruiseApplications/${TESTED_FORM_ID}/formA`, (route) => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify(getFormAPayload()),
//     });
//   });

//   // Form B is not yet created, so we mock a 404 response
//   page.route(`${API_URL}/api/CruiseApplications/${TESTED_FORM_ID}/formB`, (route) => {
//     route.fulfill({
//       status: 404,
//     });
//   });

//   page.route(`${API_URL}/api/CruiseApplications/${TESTED_FORM_ID}/FormB?isDraft=false`, (route) => {
//     route.fulfill({
//       status: 200,
//     });
//   });

//   page.route(`${API_URL}/api/CruiseApplications`, (route) => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify([]),
//     });
//   });

//   await page.goto(`/applications/${TESTED_FORM_ID}/formB?mode=edit`);

//   return page;
// }
