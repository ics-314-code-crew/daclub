import { test, expect } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json',
});

test.describe('Home', () => {
  test('Page Content and Visibility', async ({ page }) => {
    await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(page.locator('text=Welcome to Da Club!')).toBeVisible();
  });
});

test.describe('Add Club', () => {
  test('Form Elements Visibility', async ({ page }) => {
    await page.goto('http://localhost:3000/add', { waitUntil: 'networkidle' });
    await page.locator('.spinner-border').waitFor({ state: 'detached' });

    // Ensure form fields are visible
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="description"]')).toBeVisible();
    await expect(page.locator('input[name="meetingTime"]')).toBeVisible();
    await expect(page.locator('input[name="location"]')).toBeVisible();
    await expect(page.locator('input[name="website"]')).toBeVisible();
    await expect(page.locator('input[name="contactEmail"]')).toBeVisible();
    await expect(page.locator('input[name="logo"]')).toBeVisible();
    await expect(page.locator('input[name="interestAreas"]')).toBeVisible();
    await expect(page.locator('input[name="startDate"]')).toBeVisible();
    await expect(page.locator('input[name="expirationDate"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
  });

  test('Form Reset', async ({ page }) => {
    await page.goto('http://localhost:3000/add', { waitUntil: 'networkidle' });
    await page.locator('.spinner-border').waitFor({ state: 'detached' });

    // Fill in the form
    await page.locator('input[name="name"]').fill('Club');
    await page.locator('input[name="description"]').fill('Description.');

    // Reset the form
    await page.getByRole('button', { name: 'Reset' }).click();

    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="description"]')).toHaveValue('');
  });

  test('Unauthenticated Redirect', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('http://localhost:3000/add', { waitUntil: 'networkidle' });
    await page.locator('.spinner-border').waitFor({ state: 'detached' });

    // Verify login redirection
    await expect(page).toHaveURL('http://localhost:3000/auth/signin');
  });

  test('Navigation Links', async ({ page }) => {
    await page.goto('http://localhost:3000/add', { waitUntil: 'networkidle' });
    await page.locator('.spinner-border').waitFor({ state: 'detached' });

    // Verify navigation links
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Club' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Club List' })).toBeVisible();
  });
});
