import { sanityFetch } from "../lib/live";
import {
  CATEGORIES_QUERY,
  PRODUCT_BY_CATEGORY_QUERY,
  PRODUCT_QUERY,
  PRODUCT_SEARCH_QUERY,
  SALE_QUERY,
} from "./queries";
import { defineQuery } from "next-sanity";

export const getSale = async () => {
  try {
    const products = await sanityFetch({
      query: SALE_QUERY,
    });
    return products?.data || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAllProducts = async () => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_QUERY,
    });
    return products?.data || [];
  } catch (err) {
    console.error("All products error", err);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories?.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProduct = async (slug: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export const searchProductByName = async (searchParam: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParams: searchParam,
      },
    });
    return products?.data || [];
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export const getProductsByCategory = async (categorySlug: string) => {
  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: {
        categorySlug,
      },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Erroor fetching products by category:", error);
    return [];
  }
};
