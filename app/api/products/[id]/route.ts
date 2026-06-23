import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

export async function PATCH(
    request: Request,
        { params }: { params: Promise<{ id: string }> }
        ) {
    const { id } = await params;
    const updatedData = await request.json();

    const file = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(file);

    const productIndex = data.products.findIndex(
        (product: { id: string | number }) => String(product.id) === id
    );

    if (productIndex === -1) {
        return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
        );
    }

    data.products[productIndex] = {
        ...data.products[productIndex],
        ...updatedData,
    };

    await fs.writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        "utf-8"
    );

    return NextResponse.json({
        message: "Product updated successfully",
        product: data.products[productIndex],
    });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const file = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(file);

  const productIndex = data.products.findIndex(
    (product: { id: string | number }) => String(product.id) === id
  );

  if (productIndex === -1) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  data.products.splice(productIndex, 1);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

  return NextResponse.json({
    message: "Product deleted successfully",
  });
}