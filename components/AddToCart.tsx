"use client";
import { Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import useCartStore from "@/context/store";
import QuantityButton from "./QuantityButton";
import PriceFormatter from "./price-view/PriceFormatter";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;


  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div className="h-12">
      {itemCount ? (
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButton product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.name?.substring(0, 12)}... added successfully!`
            );
          }}
          disabled={isOutOfStock}
          className={twMerge(
            "bg-darkBlue/10 border text-black border-darkBlue w-full py-2 mt-2 rounded-md font-medium hover:bg-darkBlue hover:text-white hoverEffect disabled:hover:cursor-not-allowed disabled:hover:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-darkBlue/10",
            className
          )}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
