import { getProductsServerSide } from "@/api/products/products.api";
import { ProductListing } from "@/components/product-listing";

export default async function HomePage() {
  try {
    const products = await getProductsServerSide();
    return <ProductListing initialProducts={products} />;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Return empty array on error, component will handle it
    return <ProductListing initialProducts={[]} />;
  }
}
