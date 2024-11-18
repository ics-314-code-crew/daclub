import { test, expect } from '@playwright/test';

test.use({
  storageState: 'admin-auth.json',
});

test('Admin Pages', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'Next.js Application Template' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Club' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Club List' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Friend List' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'admin@foo.com' })).toBeVisible();
  await page.getByRole('link', { name: 'Add Club' }).click();
  await expect(page.getByRole('heading', { name: 'Add Club' })).toBeVisible();
  await page.getByRole('link', { name: 'Club List' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
});
