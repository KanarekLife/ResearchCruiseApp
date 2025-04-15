import { test } from './fixtures';
import { expect } from '@playwright/test';

test('connection error when server is not available', async ({ page }) => {
  // Mock the server health check to simulate a connection error
  page.route('http://localhost:3000/health', (route) => {
    route.abort();
  });

  await page.goto('/');
  await expect(page.getByText('Brak połączenia z serwerem')).toBeVisible();
});

test('no error when server is available', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Brak połączenia z serwerem')).toBeHidden();
});
