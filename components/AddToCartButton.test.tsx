import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddToCartButton from "./AddToCartButton";
import { useCartStore } from "@/store/cartStore";

const product = {
  id: "1",
  title: "Test Product",
  description: "Test description",
  category: "test",
  price: 100,
  brand: "Test Brand",
  rating: 4.5,
  stock: 10,
  image: "/test.jpg",
  discount: 0,
  createdAt: "2026-08-31",
  reviews: [],
};

describe("AddToCartButton", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("adds a product to the cart when clicked", async () => {
    const user = userEvent.setup();

    render(<AddToCartButton product={product} />);

    await user.click(
      screen.getByRole("button", { name: /add to cart/i })
    );

    const cartItems = useCartStore.getState().cartItems;

    expect(cartItems).toHaveLength(1);
    expect(cartItems[0].title).toBe("Test Product");
    expect(cartItems[0].quantity).toBe(1);
  });
});