import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import ProductBar from "../product-bar/ProductBar";
import {LuStar} from "react-icons/lu"
interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  const imageUrl = product.image
    ? urlFor(product.image).url()
    : "/placeholder.png";
  const isStock = product?.stock !== 0;
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden group text-sm">
      <div className="border border-b-gray-300 overflow-hidden relative">
        <Link href={`/product/${product?.slug?.current}`}>
          <Image
            src={imageUrl}
            alt="productImage"
            width={500}
            height={500}
            loading="lazy"
            className={`w-full max-h-96 object-cover overflow-hidden transition-transform  duration-500 ${product?.stock !== 0 && "group-hover:scale-105"}`}
          />
        </Link>
        {product?.stock === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-lg font-bold text-white">Out of Stock</p>
          </div>
        )}
        {product?.status && product?.stock !== 0 && (
          <div className="absolute left-1 top-1 z-10 flex flex-col items-center space-y-1 group-hover:opacity-0 transition-opacity duration-300">
            {product?.status?.split("").map((char, index) => (
              <span key={index} className="uppercase font-semibold">
                {char}
              </span>
            ))}
          </div>
        )}
        {isStock && (
          <div className="absolute bottom-0 left-0 w-full translate-y-12 group-hover:-translate-y-4 hoverEffect">
            <ProductBar />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-500 font-medium">Snacks</p>
          <div className="flex items-center text-gray-500 gap-1">
            {Array.from({length:5}).map((_,index)=>{
              const isLastStar = index === 4
              return <LuStar fill={!isLastStar ? "#fca99b" : "transparent"} key={index}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
