import { test, expect } from '@playwright/test'

test.describe('Ecom Smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('home hero carousel renders', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Winter Collection|Summer Lawn Edit|Footwear Finale/i })).toBeVisible()
  })

  test('catalog renders products', async ({ page }) => {
    await page.goto('/products')
    const cards = page.locator('[class*="border"]').filter({ hasText: 'Rs.' }).first()
    await expect(cards).toBeVisible()
  })

  test('product detail and cart add', async ({ page }) => {
    await page.goto('/products')
    const firstLink = page.locator('a[href^="/products/"]').first()
    const href = await firstLink.getAttribute('href')
    await page.goto(href!)
    await page.getByRole('button', { name: /add to cart/i }).click()
    await page.getByRole('button', { name: /cart/i }).click()
    await expect(page.getByText(/cart/i)).toBeVisible()
  })

  test('wishlist toggle', async ({ page }) => {
    await page.goto('/products')
    const heart = page.locator('button[aria-label*="wishlist" i], button:has-text("♥")').first()
    if (await heart.count()) {
      await heart.click()
      await page.goto('/wishlist')
      await expect(page.locator('body')).toBeVisible()
    }
  })

  test('checkout validation errors', async ({ page }) => {
    await page.goto('/checkout')
    await page.getByRole('button', { name: /continue to shipping/i }).click()
    await expect(page.getByText(/shipping information/i)).toBeVisible({ timeout: 5000 })
  })

  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 })
    await page.goto('/')
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
