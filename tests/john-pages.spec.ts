import { test, expect } from '@playwright/test';

test.use({
  storageState: 'john-auth.json',
});

test.describe('About Page', () => {
  test('Page Content and Visibility', async ({ page }) => {
    await page.goto('http://localhost:3000/about');

    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(page.locator('text=Welcome to Da Club!')).toBeVisible();
  });

  test('Navigation Links', async ({ page }) => {
    await page.goto('http://localhost:3000/about');

    // Verify navigation links
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Club' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Club List' })).toBeVisible();

    // Navigate to About page
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();

    // Navigate to Add Club page
    await page.getByRole('link', { name: 'Add Club' }).click();
    await expect(page.getByRole('heading', { name: 'Add Club' })).toBeVisible();

    // Navigate to Club List page
    await page.getByRole('link', { name: 'Club List' }).click();
    await expect(page.getByRole('heading', { name: 'Club List' })).toBeVisible();
  });
});

test.describe('Club List Page', () => {
  test('Club List Content', async ({ page }) => {
    await page.goto('http://localhost:3000/list');

    // Verify page heading
    await expect(page.getByRole('heading', { name: 'Club List' })).toBeVisible();

    // Verify cards exist
    const clubCards = page.locator('.card');
    await expect(clubCards.first()).toBeVisible();

    const firstCard = clubCards.first();
    await expect(firstCard.locator('.club-image')).toBeVisible();
  });

  test('Edit Buttons', async ({ page }) => {
    await page.goto('http://localhost:3000/list');

    // Verify that each card has an edit button
    const editButtons = page.locator('button:has-text("Edit Club")');
    await expect(editButtons.first()).toBeVisible();
  });

  test('Navigation Links', async ({ page }) => {
    await page.goto('http://localhost:3000/list');

    // Verify navigation links
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Club' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Club List' })).toBeVisible();

    // Navigate to About page
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();

    // Navigate to Add Club page
    await page.getByRole('link', { name: 'Add Club' }).click();
    await expect(page.getByRole('heading', { name: 'Add Club' })).toBeVisible();

    // Navigate to Club List page
    await page.getByRole('link', { name: 'Club List' }).click();
    await expect(page.getByRole('heading', { name: 'Club List' })).toBeVisible();
  });
});

test.describe('Add Club Page', () => {
  test('Form Elements Visibility', async ({ page }) => {
    await page.goto('http://localhost:3000/add');
    await page.waitForSelector('text=Add Club', { timeout: 5000 });

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

  test('Form Submission', async ({ page }) => {
    await page.goto('http://localhost:3000/add');

    await page.locator('input[name="name"]').fill('Test Club');
    await page.locator('input[name="description"]').fill('A test description for the club.');
    await page.locator('input[name="meetingTime"]').fill('Every Monday at 6 PM');
    await page.locator('input[name="location"]').fill('Room 101');
    await page.locator('input[name="website"]').fill('https://testclub.com');
    await page.locator('input[name="contactEmail"]').fill('contact@testclub.com');
    await page.locator('input[name="logo"]').fill('https://testclub.com/logo.png');
    await page.locator('input[name="interestAreas"]').fill('Technology, Art');
    await page.locator('input[name="startDate"]').fill('2024-01-01');
    await page.locator('input[name="expirationDate"]').fill('2025-01-01');

    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('Form Reset', async ({ page }) => {
    await page.goto('http://localhost:3000/add');

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
    await page.goto('http://localhost:3000/add');

    // Verify redirection to login page
    await expect(page).toHaveURL('http://localhost:3000/auth/signin');
  });

  test('Navigation Links', async ({ page }) => {
    await page.goto('http://localhost:3000/add');

    // Verify navigation links
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Club' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Club List' })).toBeVisible();

    // Navigate to About page
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();

    // Navigate to Add Club page
    await page.getByRole('link', { name: 'Add Club' }).click();
    await expect(page.getByRole('heading', { name: 'Add Club' })).toBeVisible();

    // Navigate to Club List page
    await page.getByRole('link', { name: 'Club List' }).click();
    await expect(page.getByRole('heading', { name: 'Club List' })).toBeVisible();
  });
});
