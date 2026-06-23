import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

export async function POST(request: Request) {
  const product = await request.json();

  if (!product.title || !product.category || !product.price) {
    return NextResponse.json(
      { message: "Title, category, and price are required" },
      { status: 400 }
    );
  }

  const file = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(file);

  const newProduct = {
    id: crypto.randomUUID(),
    title: product.title,
    brand: product.brand || "Unknown",
    category: product.category,
    price: product.price,
    stock: product.stock || 0,
    discount: product.discount || 0,
    description: product.description || "",
    rating: product.rating || 0,
    image: product.imageUrl || "",
    meta: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    reviews: [],
  };

  data.products.push(newProduct);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json(
    {
      message: "Product created successfully",
      product: newProduct,
    },
    { status: 201 }
  );
}