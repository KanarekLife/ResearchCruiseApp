import { test as base } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const API_URL = 'http://localhost:3000';
export const ASSETS_DIR = path.join(dirname, './assets');

type MyFixtures = {
  
};

export const test = base.extend<{ forEachTest: void } & MyFixtures>({
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

      // Place for cleanup if needed
    },
    { auto: true },
  ],
});
