const { test, expect } = require('@playwright/test');
const percySnapshot = require('@percy/playwright');

test.describe('Evantech Core Pages - Visual Snapshots', () => {
  
  test('Home Page - Visual Validation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Eliminate Visual Flaws');
    
    await percySnapshot(page, 'Home Page - Clean State');
  });

  test('Login Page - Visual Validation', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('[data-testid="button-primary-login"]')).toBeVisible();
    
    await percySnapshot(page, 'Login Page - Form Empty');
  });

  test('Signup Page - Visual Validation', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('[data-testid="button-primary-signup"]')).toBeVisible();
    
    await percySnapshot(page, 'Signup Page - Form Empty');
  });

  test('Dashboard Page - Visual Validation', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('[data-testid="dashboard-grid"]')).toBeVisible();
    await expect(page.locator('text=Workspace: Evantech Solutions')).toBeVisible();
    
    await percySnapshot(page, 'Dashboard Page - Overview');
  });

  test('Payment Page - Visual Validation', async ({ page }) => {
    await page.goto('/payment');
    await expect(page.locator('text=Saved Payment Methods')).toBeVisible();
    await expect(page.locator('text=VISA')).toBeVisible();
    
    await percySnapshot(page, 'Payment Page - Card Deck');
  });

  test('Checkout Page - Visual Validation', async ({ page }) => {
    await page.goto('/checkout');
    await expect(page.locator('[data-testid="checkout-submit-button"]')).toBeVisible();
    await expect(page.locator('text=Enterprise Visual Suite')).toBeVisible();
    
    await percySnapshot(page, 'Checkout Page - Pricing Summary');
  });

  test('Profile Page - Visual Validation', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('[data-testid="hero-avatar"]')).toBeVisible();
    await expect(page.locator('text=Developer Settings')).toBeVisible();
    
    await percySnapshot(page, 'Profile Page - Settings Panel');
  });
});
