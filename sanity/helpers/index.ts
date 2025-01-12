import { sanityFetch } from "../lib/live";
import { CATEGORIES_QUERY, PRODUCT_QUERY, SALE_QUERY } from "./queries";

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
