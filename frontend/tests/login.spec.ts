import { expect } from '@playwright/test';

import { API_URL, test } from './fixtures';

test('login page is accessible', async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByText('Logowanie')).toBeVisible();
});

test('login with valid credentials', async ({ page }) => {
  const userEmail = 'test.email@gmail.com';
  const userPassword = 'someP@ssword';

  const mockedLoginResponse = {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUxYjE1ZWYwLTY0MTUtNGRjNy1hNDIyLTFjMDI2MTc3ZTM0ZSIsImp0aSI6IjhmMmU4MDUwLTNkNmEtNDk1ZC05ODY2LTdmMDYxYWI4ZWZlOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJleHAiOjE3NDUzMTc2ODcsImlzcyI6Imh0dHBzOi8vcmVqc3kudWcuZWR1LnBsLyIsImF1ZCI6Imh0dHBzOi8vcmVqc3kudWcuZWR1LnBsLyJ9.ecKWoJFD5LsyTHQaFDc8Ei8CuV3kdCY1fuHIewzpgh4',
    expiresIn: '2025-04-22T10:28:07Z',
    refreshToken:
      'N9YXrMB7auGUGl51jAhn31FZznr1MlHpFZN3Ic0mffWUdNskD5dpJZ9iOqTWT70xvTYYGYlrhmyV7xwlGc1FT9BvXiGFxrOFINxJcqTDqZXs8wW6Jpupf+L78R2Wn1PktE2JARM5MMyp5fZIq6uaQuHqITicu6E5DErfI1KCJ2RxIPKwb2CdwxI2i+E1J4f6vzctwZVkNkusIyjx4+nJklp6nsSUByUbqc1NW+CQ6jjTyW2TjEddxXZRB6v7PmgWCiBGy6AujHjFzslw796zN+pB4SeQUmYAQZX5UMRXaHpFRvqK8Avo8EgGUn5rBtvYgm4sQOltQyvyzqVeIKh7gw93dO5ErzMSVhoZvEUnwTlQLsTEC18Uu/ygEoA1FsRDHnVEqe6p9kVmwOUAglx11ckwOljORhwZMSUzOB6HozUNrnMeAbnKmCAIWjE8WvQVzLu4wYHj9SO9kW8Ru4B+NoJErNct7ojGWKoTcJcmDzyYvrFGeaiFaZIP2I4fPrK7oFCukYpKnRwOIqZ6jcLDFjb2N3hZr0DFBEhrmNz3TMz1t7mHGfPiAdNavsVNYs2OA68PGMfBDEVZp5tfbRzhnLhDoHjBhEQTu+Wmw75KMiAJPO/LmafRUmdTskEZmkmW6WSrLwERbzaqLdQtgJhOLVGMZNj2XxqDsve6xBEfg0s=',
    expirationDate: '2025-04-22T10:28:07Z',
  };
  const mockedAccountResponse = {
    id: '51b15ef0-6415-4dc7-a422-1c026177e34e',
    userName: 'testuser',
    email: userEmail,
    firstName: 'Jan',
    lastName: 'Kowalski',
    roles: ['Administrator'],
    emailConfirmed: true,
    accepted: true,
  };

  page.route(`${API_URL}/account/login`, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockedLoginResponse),
      contentType: 'application/json',
    });
  });

  page.route(`${API_URL}/account`, (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockedAccountResponse),
    });
  });

  await page.goto('/login');

  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(userEmail);
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill(userPassword);

  const loginRequestPromise = page.waitForRequest(`${API_URL}/account/login`);
  await page.getByRole('button', { name: 'Zaloguj' }).click();
  const loginRequest = await loginRequestPromise;
  expect(loginRequest.postDataJSON()).toEqual({
    email: userEmail,
    password: userPassword,
  });

  await expect(page).toHaveURL('/');
});

test('login with invalid credentials', async ({ page }) => {
  const userEmail = 'test.email@gmail.com';
  const userPassword = 'someP@ssword';

  // Mock the login API to return an error
  page.route(`${API_URL}/account/login`, (route) => {
    route.fulfill({ status: 401 });
  });

  await page.goto('/login');

  await page.getByRole('textbox', { name: 'E-mail' }).click();
  await page.getByRole('textbox', { name: 'E-mail' }).fill(userEmail);
  await page.getByRole('textbox', { name: 'Hasło' }).click();
  await page.getByRole('textbox', { name: 'Hasło' }).fill(userPassword);

  await page.getByRole('button', { name: 'Zaloguj' }).click();
  await expect(page.getByText('Podano błędne hasło lub użytkownik nie istnieje.')).toBeVisible();
});

test.describe('login form validation', () => {
  [
    { email: 'only-text' },
    { email: 'invalid@domain' },
    { email: 'invalid@domain.' },
    { email: 'invalid@domain..com' },
  ].forEach(({ email }) => {
    test(`enter invalid email [${email}]`, async ({ page }) => {
      await page.goto('/login');

      await page.getByRole('textbox', { name: 'E-mail' }).click();
      await page.getByRole('textbox', { name: 'E-mail' }).fill(email);

      await expect(page.getByText('Nieprawidłowy adres email')).toBeVisible();

      // Message should disappear after correcting the email
      await page.getByRole('textbox', { name: 'E-mail' }).click();
      await page.getByRole('textbox', { name: 'E-mail' }).fill('valid-email@gmail.com');

      await expect(page.getByText('Nieprawidłowy adres email')).toBeHidden();
    });
  });
});
