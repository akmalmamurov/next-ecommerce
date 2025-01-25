import ProductCard from "@/components/card/ProductCard";
import { Container } from "@/components/container";
import { ProductGrid } from "@/components/grid";
import { searchProductByName } from "@/sanity/helpers";

interface Props {
  searchParams: {
    query: string;
  };
}
const SearchPage = async ({ searchParams }: Props) => {
  const { query } = await searchParams;
  const products = await searchProductByName(query);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100">
      {products?.length > 0 ? (
        <div>
          <Container className="p-8 bg-white rounded-lg shadow-md mt-3 ">
            <h1 className="text-3xl font-bold text-center">
              Search results for <span className="text-darkBlue">{query}</span>
            </h1>
            <ProductGrid className="mt-4">
              {products?.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))}
            </ProductGrid>
          </Container>
        </div>
      ) : (
        <div className="flex  justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md w-full md:max-w-4xl text-center h-40">
            <h1 className="text-3xl font-bold mb-3">
              No products found for{" "}
              <span className="text-darkBlue">{query}</span>
            </h1>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
