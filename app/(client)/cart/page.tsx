"use client";

import { Container } from "@/components/container";
import Loader from "@/components/loader/Loader";
import NoAcessToCart from "@/components/NoAcessToCart";
import PriceFormatter from "@/components/price-view/PriceFormatter";
import { Separator } from "@/components/ui/separator";
import useCartStore from "@/context/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

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
                        <PriceFormatter
                          amount={getTotalPrice()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2">right</div>
              </div>
            </>
          ) : (
            <div>Empty cart</div>
          )}
        </Container>
      ) : (
        <NoAcessToCart />
      )}
    </div>
  );
};

export default CartPage;
