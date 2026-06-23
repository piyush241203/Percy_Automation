const { test, expect } = require('@playwright/test');
const percySnapshot = require('@percy/playwright');

test.describe('Evantech Visual Regression Demonstrations', () => {

  test('Simulated Visual Regression - Layout Break on Dashboard @dashboard', async ({ page }) => {
    await page.goto('/dashboard?regression=layout_break');
    await expect(page.locator('[data-testid="dashboard-grid"]')).toBeVisible();
    
    await percySnapshot(page, 'Dashboard - Regression - Layout Break');
  });

  test('Simulated Visual Regression - Button Color Shift on Login @login', async ({ page }) => {
    await page.goto('/login?regression=color_change');
    await expect(page.locator('[data-testid="button-primary-login"]')).toBeVisible();
    
    await percySnapshot(page, 'Login - Regression - Button Color Shift');
  });

  test('Simulated Visual Regression - Button Layout Displacement on Checkout @checkout', async ({ page }) => {
    await page.goto('/checkout?regression=button_shift');
    await expect(page.locator('[data-testid="checkout-submit-button"]')).toBeVisible();
    
    await percySnapshot(page, 'Checkout - Regression - Button Shift');
  });

  test('Simulated Visual Regression - Font Style Alteration Globally @home', async ({ page }) => {
    await page.goto('/?regression=font_change');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    
    await percySnapshot(page, 'Home - Regression - Typography Altered');
  });

  test('Simulated Visual Regression - Missing Product Avatar on Profile @profile', async ({ page }) => {
    await page.goto('/profile?regression=missing_image');
    await expect(page.locator('[data-testid="hero-avatar"]')).toBeVisible();
    
    await percySnapshot(page, 'Profile - Regression - Missing Avatar Image');
  });

  test('Simulated Visual Regression - Broken Mobile Responsiveness in Navigation @home', async ({ page }) => {
    await page.goto('/?regression=broken_responsive');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    
    await percySnapshot(page, 'Home - Regression - Broken Responsive Navigation');
  });
});
