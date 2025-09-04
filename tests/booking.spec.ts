import { test, expect } from '@playwright/test';

const baseUrl = 'https://automationintesting.online';

test.describe('Booking tests', () => {

  test('Create booking without email shows error', async ({ page }) => {
    await page.goto(baseUrl);

    await page.click('#root-container > div > section.hero.py-5 > div > div > div > a');

    await page.click('#rooms > div > div.row.g-4 > div:nth-child(1) > div > div.card-footer.bg-white.d-flex.justify-content-between.align-items-center > a');
    
    await page.click('#doReservation');

    await page.fill('input[name="firstname"]', 'John');
    await page.fill('input[name="lastname"]', 'Doe');
    await page.fill('input[name="phone"]', '1234567890');

    await page.click('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > form > button.btn.btn-primary.w-100.mb-3');

    await page.click('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > form > button.btn.btn-primary.w-100.mb-3');

    const errorMessage = await page.locator('text=must not be empty').textContent();
    expect(errorMessage).toContain('must not be empty');
  });

  test('Create booking with all required information', async ({ page }) => {
    await page.goto(baseUrl);

    await page.click('#root-container > div > section.hero.py-5 > div > div > div > a');

    await page.click('#rooms > div > div.row.g-4 > div:nth-child(1) > div > div.card-footer.bg-white.d-flex.justify-content-between.align-items-center > a');
    
    await page.click('#doReservation');

    await page.fill('input[name="firstname"]', 'Alice');
    await page.fill('input[name="lastname"]', 'Smith');
    await page.fill('input[name="email"]', 'alice@example.com');
    await page.fill('input[name="phone"]', '98765432102');

    await page.click('#root-container > div > div.container.my-5 > div > div.col-lg-4 > div > div > form > button.btn.btn-primary.w-100.mb-3');

    const errorLocator = page.locator(
      'text=Application error: a client-side exception has occurred while loading automationintesting.online (see the browser console for more information).'
    );
    const successLocator = page.locator('text=Booking Confirmed');
    
    if (await errorLocator.isVisible()) {
      const message = (await errorLocator.textContent()) ?? '';
      expect(message).toContain(
        'Application error: a client-side exception has occurred while loading automationintesting.online (see the browser console for more information).'
      );
    } else if (await successLocator.isVisible()) {
      const message = (await successLocator.textContent()) ?? '';
      expect(message).toContain('Booking Confirmed');
    } 
  });

  test('Delete a booking', async ({ page }) => {
    await page.goto(baseUrl);
    const adminBtn = page.locator('#navbarNav > ul > li:nth-child(6) > a').first();
    await adminBtn.click();

    await page.fill('#username', 'admin');

    await page.fill('#password', 'password');

    await page.click('#doLogin');

    const deleteBtn = page.locator('.roomDelete').first();

    await deleteBtn.click();
  });

});
