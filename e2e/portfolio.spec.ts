import { test, expect } from './fixtures.js';

test.describe('Portfolio Critical Journey & Accessibility', () => {
  test('should navigate through main sections and pass accessibility checks', async ({
    page,
    makeAxeBuilder,
  }) => {
    await page.goto('/');

    await expect(page.locator('#home')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Andrei Voicu' })).toBeVisible();

    let a11yResults = await makeAxeBuilder().analyze();
    expect(a11yResults.violations).toHaveLength(0);

    await page.getByRole('link', { name: 'Projects' }).click();

    await expect(page).toHaveURL(/#projects/);
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#home')).toBeHidden();

    a11yResults = await makeAxeBuilder().analyze();
    expect(a11yResults.violations).toHaveLength(0);

    a11yResults = await makeAxeBuilder().analyze();
    expect(a11yResults.violations).toHaveLength(0);
  });

  test('mobile menu interaction', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('#menu-toggle');
    const mainNav = page.locator('#main-nav');

    await expect(mainNav).toBeHidden();
    await menuToggle.click();

    await expect(mainNav).toBeVisible();
    await expect(page.locator('#main-nav:popover-open')).toBeVisible();

    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.locator('#about')).toBeVisible();

    await expect(mainNav).toBeHidden();
  });
});
