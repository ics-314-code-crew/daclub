import { test, expect } from '@playwright/test';

test('Save authentication state', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/signin', { waitUntil: 'networkidle' });

  // Log in
  await page.fill('input[name="email"]', 'john@hawaii.edu,');
  await page.fill('input[name="password"]', 'changeme');

  // Submit the form
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle' });
  // Save the authentication state
  await page.context().storageState({ path: 'john-auth.json' });

  // Verfify that user is logged in
  await expect(page.locator('body')).toContainText('Add Club');
});
