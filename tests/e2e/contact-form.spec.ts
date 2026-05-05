import { test, expect } from '@playwright/test';

test('contact form: invalid → per-field error; valid → success state', async ({ page }) => {
  // Mock the API so the test never touches Resend.
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto('/');
  await page.locator('#contacto').scrollIntoViewIfNeeded();

  // 1) Invalid submit surfaces field errors.
  await page.getByLabel(/nombre/i).fill('A');
  await page.getByLabel(/email/i).fill('not-an-email');
  await page.getByLabel(/podemos ayudarte/i).fill('corto');
  await page.getByRole('button', { name: /enviar mensaje/i }).click();
  await expect(page.getByRole('alert').first()).toBeVisible();

  // 2) Fix the inputs and resubmit.
  await page.getByLabel(/nombre/i).fill('Marta Ribas');
  await page.getByLabel(/email/i).fill('marta@example.com');
  await page
    .getByLabel(/podemos ayudarte/i)
    .fill('Queremos automatizar la cualificación de leads.');
  await page.getByRole('button', { name: /enviar mensaje/i }).click();

  await expect(page.getByText(/mensaje enviado/i)).toBeVisible();
});
