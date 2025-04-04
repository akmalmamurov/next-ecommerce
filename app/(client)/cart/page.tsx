"use client";

import { Container } from "@/components/container";
import { EmptyCart } from "@/components/empty-cart";
import Loader from "@/components/loader/Loader";
import NoAcessToCart from "@/components/NoAcessToCart";
import PriceFormatter from "@/components/price-view/PriceFormatter";
import QuantityButtons from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/context/store";
import { urlFor } from "@/sanity/lib/image";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart,
  } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  const { user } = useUser();
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loader />;
  }
  const handleCheckout = () => {
    toast.success("Checkout will aply");
  };
  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully");
  };
  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      resetCart();
      toast.success("Cart cleared successfully");
    }
  };
  return (
    <div className="bg-gray-50 pb-10">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>SubTotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubTotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <PriceFormatter amount={getTotalPrice()} />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Button onClick={handleCheckout}>
                          Proceed to Checkout
                        </Button>
                        <Link
                          href={"/"}
                          className="text-center text-sm text-primary hover:underline hoverEffect hover:text-darkBlue"
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-base font-semibold">
                    <h2 className="col-span-2 md:col-span-3">Product</h2>
                    <h2>Price</h2>
                    <h2>Quantity</h2>
                    <h2>Total</h2>
                  </div>
                  <div className="bg-white border border-t-0 rounded-br-lg rounded-bl-lg">
                    {groupedItems?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0"
                        >
                          <div className="col-span-2 md:col-span-3 flex items-center">
                            <Trash2
                              onClick={() => handleDeleteProduct(product?._id)}
                              className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                            />
                            {product?.image && (
                              <Link
                                href={`/product/${product?.slug?.current}`}
                                className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                              >
                                <Image
                                  src={urlFor(product?.image).url()}
                                  alt="productImage"
                                  width={300}
                                  height={300}
                                  className="w-10 h-10 md:w-full md:h-14 object-cover group-hover:scale-110 overflow-hidden hoverEffect"
                                />
                              </Link>
                            )}
                            <h2 className="text-sm">{product?.name}</h2>
                          </div>
                          <div className="flex items-center">
                            <PriceFormatter amount={product?.price} />
                          </div>
                          <QuantityButtons
                            product={product}
                            className="text-sm gap-0 md:gap-1"
                          />
                          <div className="flex items-center">
                            <PriceFormatter
                              amount={
                                product?.price ? product?.price * itemCount : 0
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      variant={"destructive"}
                      className="m-5 font-semibold"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAcessToCart />
      )}
    </div>
  );
};

export default CartPage;
