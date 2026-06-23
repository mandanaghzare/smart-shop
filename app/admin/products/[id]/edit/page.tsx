import { products } from "@/data/products";
import EditProductForm from "../../EditProductForm";

export default async function EditProductPage ({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;
    const item = products.find((product) => product.id === id)
    if(!item) {
        return (
            <div>Product not found</div>
        )
    }
  return (
        <EditProductForm product={item} />
    );
}