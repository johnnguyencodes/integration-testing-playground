import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// creating a test screenshot
test('screenshot test', async ({ page }) => {
  await page.goto('http://localhost:3000/secret-menu');
  await page.getByRole('link', { name: 'Secret Menu' }).click();
  const restaurantSelect = page.getByRole('combobox', { name: 'Restaurant' });
  await restaurantSelect.selectOption('Jack In The Box');
  const table = page.getByText(
    'Secret Menu Items (Download) Minimum Rating: 1 Restaurant AllChick-fil-',
  );

  await expect(table).toHaveScreenshot({ maxDiffPixels: 100 });
});

// mocking APIs with playwright
test.use({
  recordHar: {
    mode: 'minimal',
    path: '/Users/johnnguyen/Projects/integration-testing-playground/network-requests.har',
    urlFilter: '**/api**',
  },
  serviceWorkers: 'block',
});

test('test with har', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Pokémon Search' }).click();
  await page.getByTestId('search').click();
  await page.getByTestId('search').fill('Bulbasaur');
  await page.goto('http://localhost:3000/pokemon-search?name=Bulbasaur');
  await page.getByTestId('1').click();
});
