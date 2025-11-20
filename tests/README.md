# Playwright E2E Tests

This directory contains end-to-end tests for the Passport Service application using Playwright.

## Test Files

### 1. `passport-application.spec.ts`
Comprehensive tests for the main application flow:
- ✅ Homepage display and navigation
- ✅ Multi-step form completion
- ✅ File upload functionality
- ✅ Form validation
- ✅ Navigation between form steps
- ✅ WhatsApp button functionality
- ✅ Admin login page

### 2. `ui-responsive.spec.ts`
UI and responsive design tests:
- ✅ Mobile viewport (375x667)
- ✅ Tablet viewport (768x1024)
- ✅ Desktop viewport (1920x1080)
- ✅ Accessibility checks
- ✅ Image loading
- ✅ Navigation links
- ✅ Heading hierarchy

## Prerequisites

Make sure you have Playwright installed:

```bash
npm install
npx playwright install
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in UI mode (recommended for development)
```bash
npx playwright test --ui
```

### Run a specific test file
```bash
npx playwright test tests/passport-application.spec.ts
```

### Run tests in headed mode (see the browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests on specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

The test configuration is in `playwright.config.ts`:
- **Base URL**: `http://localhost:3000`
- **Web Server**: Automatically starts `npm run dev` before tests
- **Timeout**: 120 seconds for server startup
- **Retries**: 2 retries on CI, 0 locally
- **Reporter**: HTML report

## Test Image

The tests use a test image for file upload functionality:
- Path: `/Users/e4gle/Desktop/Screenshot 2025-11-10 at 16.33.16.png`
- Used for: Passport photo, ID photo, and proof of residence uploads

**Note**: Make sure this image exists before running the full application tests.

## Viewing Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Screenshots and Videos

Playwright automatically captures:
- **Screenshots**: On test failure
- **Videos**: On test failure (if configured)
- **Traces**: On first retry (for debugging)

## Debugging Failed Tests

1. **View the HTML report**:
   ```bash
   npx playwright show-report
   ```

2. **Run in debug mode**:
   ```bash
   npx playwright test --debug
   ```

3. **Use trace viewer**:
   ```bash
   npx playwright show-trace trace.zip
   ```

## CI/CD Integration

The tests are configured to run in CI environments:
- Retries: 2 attempts on failure
- Workers: 1 (sequential execution)
- Server: Starts fresh (no reuse)

## Best Practices

1. **Use data-testid attributes** for more stable selectors
2. **Avoid hard-coded waits** - use Playwright's auto-waiting
3. **Keep tests independent** - each test should work in isolation
4. **Use Page Object Model** for complex applications
5. **Mock external APIs** when possible

## Common Issues

### Issue: "Target closed" error
**Solution**: Increase timeout in `playwright.config.ts`

### Issue: "Element not found"
**Solution**: Check if the element selector is correct or if the page has loaded

### Issue: "Server not starting"
**Solution**: Make sure port 3000 is available and `npm run dev` works

## Adding New Tests

1. Create a new `.spec.ts` file in the `tests` directory
2. Import test utilities:
   ```typescript
   import { test, expect } from '@playwright/test';
   ```
3. Write your tests using `test.describe()` and `test()`
4. Run and verify your tests

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
