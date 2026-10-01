import { test, expect } from "@playwright/test";

test("user can open a product and add it to cart", async ({ page }) => {
  await page.goto("/products");

  await expect(
    page.getByRole("heading", { name: "Discover Products" })
  ).toBeVisible();

  const firstProduct = page
    .getByRole("link", { name: "View Details" })
    .first();

  await expect(firstProduct).toBeVisible({ timeout: 10000 });
  await firstProduct.click();

  // صبر می‌کنیم navigation واقعاً تمام شود
  await expect(page).toHaveURL(/\/products\/.+/);

  const addToCartButton = page.getByRole("button", {
    name: /add to cart/i,
  });

  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  await expect(
    page.getByText(/added to cart/i)
  ).toBeVisible();
});