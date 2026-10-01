import { beforeEach, describe, expect, it } from "vitest";

import { useCartStore } from "./cartStore";
import type { Product } from "@/types/product";

const product: Product = {
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

describe("cartStore", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    localStorage.clear();
  });

  it("adds a new product with quantity one", () => {
    useCartStore.getState().addToCart(product);

    expect(useCartStore.getState().cartItems).toEqual([
      { ...product, quantity: 1 },
    ]);
  });

  it("increments quantity when the same product is added again", () => {
    const { addToCart } = useCartStore.getState();

    addToCart(product);
    addToCart(product);

    expect(useCartStore.getState().cartItems).toHaveLength(1);
    expect(useCartStore.getState().cartItems[0].quantity).toBe(2);
  });

  it("increases an item's quantity", () => {
    useCartStore.getState().addToCart(product);
    useCartStore.getState().increaseQuantity(product.id);

    expect(useCartStore.getState().cartItems[0].quantity).toBe(2);
  });

  it("decreases quantity but never below one", () => {
    const store = useCartStore.getState();

    store.addToCart(product);
    store.increaseQuantity(product.id);
    useCartStore.getState().decreaseQuantity(product.id);
    useCartStore.getState().decreaseQuantity(product.id);

    expect(useCartStore.getState().cartItems[0].quantity).toBe(1);
  });

  it("removes an item from the cart", () => {
    useCartStore.getState().addToCart(product);
    useCartStore.getState().removeFromCart(product.id);

    expect(useCartStore.getState().cartItems).toEqual([]);
  });

  it("clears every item from the cart", () => {
    useCartStore.getState().addToCart(product);
    useCartStore.getState().addToCart({ ...product, id: "2" });

    useCartStore.getState().clearCart();

    expect(useCartStore.getState().cartItems).toEqual([]);
  });
});
