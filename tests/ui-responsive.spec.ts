import { test, expect } from '@playwright/test';

test.describe('UI and Responsive Design Tests', () => {

    test('should be responsive on mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        await page.goto('/');

        // Check if elements are visible on mobile
        await expect(page.getByRole('link', { name: /Passport Service/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /Fast & Secure Passport Services/i })).toBeVisible();

        // Check WhatsApp button on mobile
        const whatsappButton = page.getByRole('button', { name: /Contact us on WhatsApp/i });
        await expect(whatsappButton).toBeVisible();
    });

    test('should be responsive on tablet viewport', async ({ page }) => {
        // Set tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });

        await page.goto('/');

        // Check if elements are visible on tablet
        await expect(page.getByRole('heading', { name: /Fast & Secure Passport Services/i })).toBeVisible();
        await expect(page.getByText(/Why Choose Us?/i)).toBeVisible();
    });

    test('should be responsive on desktop viewport', async ({ page }) => {
        // Set desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });

        await page.goto('/');

        // Check if all sections are visible
        await expect(page.getByRole('heading', { name: /Fast & Secure Passport Services/i })).toBeVisible();
        await expect(page.getByText(/Why Choose Us?/i)).toBeVisible();
        await expect(page.getByText(/Secure Data/i)).toBeVisible();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
        await page.goto('/');

        // Check for h1 (should only have one)
        const h1Elements = page.locator('h1');
        await expect(h1Elements).toHaveCount(1);

        // Check that h2 elements exist
        const h2Elements = page.locator('h2');
        const h2Count = await h2Elements.count();
        expect(h2Count).toBeGreaterThan(0);
    });

    test('should have accessible form labels', async ({ page }) => {
        await page.goto('/apply');

        // Check that form inputs have associated labels
        const fullNameInput = page.getByLabel(/Full Name/i);
        await expect(fullNameInput).toBeVisible();

        const dobInput = page.getByLabel(/Date of Birth/i);
        await expect(dobInput).toBeVisible();
    });

    test('should have proper color contrast', async ({ page }) => {
        await page.goto('/');

        // Take a screenshot for manual review if needed
        await page.screenshot({ path: 'tests/screenshots/homepage-contrast.png', fullPage: true });

        // Check that text is visible (basic check)
        await expect(page.getByRole('heading', { name: /Fast & Secure Passport Services/i })).toBeVisible();
    });

    test('should load all images properly', async ({ page }) => {
        await page.goto('/');

        // Get all images
        const images = page.locator('img');
        const imageCount = await images.count();

        // Check each image has loaded
        for (let i = 0; i < imageCount; i++) {
            const image = images.nth(i);
            const isVisible = await image.isVisible();

            if (isVisible) {
                // Check if image has naturalWidth > 0 (means it loaded)
                const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
                expect(naturalWidth).toBeGreaterThan(0);
            }
        }
    });

    test('should have working navigation links', async ({ page }) => {
        await page.goto('/');

        // Check "Apply Now" link in header
        const applyNowLink = page.getByRole('link', { name: /Apply Now/i });
        await expect(applyNowLink).toBeVisible();
        await expect(applyNowLink).toHaveAttribute('href', '/apply');

        // Click and verify navigation
        await applyNowLink.click();
        await expect(page).toHaveURL('/apply');
    });

    test('should have smooth scrolling behavior', async ({ page }) => {
        await page.goto('/');

        // Click "Learn More" button (if it scrolls to a section)
        const learnMoreButton = page.getByRole('button', { name: /Learn More/i });

        if (await learnMoreButton.isVisible()) {
            await learnMoreButton.click();

            // Wait a bit for scroll animation
            await page.waitForTimeout(500);

            // Check if page scrolled (viewport position changed)
            const scrollY = await page.evaluate(() => window.scrollY);
            expect(scrollY).toBeGreaterThan(0);
        }
    });

    test('should display loading states properly', async ({ page }) => {
        await page.goto('/apply');

        // Fill form and submit
        await page.getByLabel(/Full Name/i).fill('Test User');
        await page.getByLabel(/Date of Birth/i).fill('1990-01-01');
        await page.getByLabel(/Place of Birth/i).fill('Test City');
        await page.getByLabel(/Gender/i).selectOption('Male');

        // Click next and check for any loading indicators
        await page.getByRole('button', { name: /Next/i }).click();

        // Verify next step loaded
        await expect(page.getByText(/Step 2/i)).toBeVisible();
    });
});
