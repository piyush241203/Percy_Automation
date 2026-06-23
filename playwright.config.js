import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * Configures the test runner, browser environments, and preview servers.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.cjs',
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? 'github' : 'list',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4173',
    /* Collect trace when retrying a failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Capture screenshots on test failures */
    screenshot: 'only-on-failure',
    /* Captures video recording on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Mobile emulation projects for local functional testing */
    {
      name: 'mobile-chrome',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Run local dev server before starting the tests */
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
