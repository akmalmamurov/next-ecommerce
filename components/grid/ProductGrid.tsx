import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    className?: string
}
const ProductGrid = ({ children, className }: Props) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8", className)}>
      {children}
    </div>
  );
};

export default ProductGrid;
