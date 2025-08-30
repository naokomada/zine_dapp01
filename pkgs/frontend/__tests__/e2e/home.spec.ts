import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Zine DApp/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  // Expect a heading to be present
  await expect(page.getByRole('heading', { name: 'Welcome to Zine DApp' })).toBeVisible();
});
