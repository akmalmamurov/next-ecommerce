import { DiscountBanner } from "@/components/banner";
import { Container } from "@/components/container";
import { ProductList } from "@/components/product-list";
import { getAllCategories, getAllProducts, getSale } from "@/sanity/helpers";

export default async function Home() {
  const products = await getAllProducts();
  const sales = await getSale();
  const categories = await getAllCategories();

  return (
    <div className="">
      <Container>
        <DiscountBanner sales={sales} />
        <ProductList products={products} title={true} categories={categories} />
      </Container>
    </div>
  );
}
