import { test as base } from '@playwright/test';
import { API_URL } from '@tests/fixtures/consts';

import { FormAPage } from './pages/formA/formAPage';
import { LoginPage } from './pages/loginPage';
export { API_URL, ASSETS_DIR } from '@tests/fixtures/consts';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [
    async ({ page }, use) => {
      // By default raise an error if the API is not mocked
      page.route(`${API_URL}/**`, (route) => {
        throw new Error(`API call not mocked: ${route.request().url()}`);
      });

      // Health check api mock
      page.route(`${API_URL}/health`, (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ status: 'ok' }),
          contentType: 'application/json',
        });
      });

      await use();
    },
    { auto: true },
  ],
});

export const loginTest = test.extend<{ loginPage: LoginPage }>({
  loginPage: [
    async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await use(loginPage);
    },
    { auto: true },
  ],
});

export const formTest = test.extend<{ formAPage: FormAPage }>({
  formAPage: [
    async ({ page }, use) => {
      const formAPage = await FormAPage.create(page);
      await use(formAPage);
    },
    { auto: true },
  ],
});
