import { Button } from "./ui/button";
import { HiMinus, HiPlus } from "react-icons/hi2";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const QuantityButton = () => {
  const handleRemoveProduct = () => {
    toast.success("Product removed from cart");
  };
  const handleAddProduct = () => {
    toast.success("Product added to cart");
  };
  const itemCount = 5;
  return (
    <div className={cn("flex items-center gap-1 pb-1 text-balance")}>
      <Button
        variant={"outline"}
        size={"icon"}
        className="w-6 h-6"
        onClick={handleRemoveProduct}
      >
        <HiMinus />
      </Button>
      <span className="font-semibold w-8 text-center text-darkBlue">
        {itemCount}
      </span>
      <Button
        variant={"outline"}
        size={"icon"}
        className="w-6 h-6"
        onClick={handleAddProduct}
      >
        <HiPlus />
      </Button>
    </div>
  );
};

export default QuantityButton;
