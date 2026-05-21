import ProductsPage from "./products/page"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ProductsPage />
      <h3>Smart Shop </h3>
      <h4>Modern e-commerce platform</h4>
    </div>
  );
}
