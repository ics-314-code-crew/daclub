import { test, expect } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json',
});

test.describe('Content', () => {
  test('Page Content and Visibility', async ({ page }) => {
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(page.locator('text=Welcome to Da Club!')).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('Generic Navigation', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'About' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Da Club Logo' }).click();
    const heading = page.getByRole(
      'heading',
      {
        name: 'Clubs Offered at UH Manoa',
        exact: true,
      },
    );
    await expect(heading).toBeVisible();
  });

  test('Unauthenticated Redirect for Add', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('http://localhost:3000/add', { waitUntil: 'networkidle' });

    // Verify login redirection
    await expect(page).toHaveURL('http://localhost:3000/auth/signin');
  });

  test('Unauthenticated Redirect for List', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('http://localhost:3000/list', { waitUntil: 'networkidle' });

    // Verify login redirection
    await expect(page).toHaveURL('http://localhost:3000/auth/signin');
  });
});
