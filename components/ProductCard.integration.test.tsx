import { beforeEach, describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ProductCard from "./ProductCard"
import { useCartStore } from "@/store/cartStore"

const product = {
  id: "1",
  title: "Test Product",
  description: "Test description",
  category: "electronics",
  price: 100,
  brand: "Test Brand",
  rating: 4.5,
  stock: 10,
  image: "/test.jpg",
  discount: 20,
  createdAt: "2026-08-31",
  reviews: [],
}

describe("ProductCard integration", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart()
  })

  it("renders product information and adds the product to the cart", async () => {
    const user = userEvent.setup()

    render(<ProductCard product={product} />)

    expect(
      screen.getByRole("heading", { name: "Test Product" })
    ).toBeInTheDocument()

    expect(screen.getByText("$80.00")).toBeInTheDocument()
    expect(screen.getByText("$100.00")).toBeInTheDocument()
    expect(screen.getByText("In stock")).toBeInTheDocument()

    expect(
      screen.getByRole("link", { name: /view details/i })
    ).toHaveAttribute("href", "/products/1")

    await user.click(
      screen.getByRole("button", { name: /add to cart/i })
    )

    const cartItems = useCartStore.getState().cartItems

    expect(cartItems).toHaveLength(1)
    expect(cartItems[0]).toMatchObject({
      id: "1",
      title: "Test Product",
      quantity: 1,
    })
  })
})