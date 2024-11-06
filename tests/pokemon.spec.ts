import { test, expect } from '@playwright/test';

test('it has an input for pokemon search', async ({ page }) => {
  await page.goto('/pokemon-search');
  const searchInput = page.getByPlaceholder('Search');
  await searchInput.type('pika');
  page.getByRole('link', { name: 'Pikachu' });
});
