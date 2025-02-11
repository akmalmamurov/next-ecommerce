import { Product } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  product: Product;
  quantity: number;
}
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  //   deleteCartProduct: (productId: Product) => void;
  //   resetCart: () => void;
  //   getTotalPrice: () => number;
  //   getSubTotalPrice: () => number;
  //   getItemCount: (productId: string) => number;
  //   getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((el) =>
                el.product._id === product._id
                  ? { ...el, quantity: el.quantity + 1 }
                  : el
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
    }),
    { name: "cart-store" }
  )
);

export default useCartStore;
