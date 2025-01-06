import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className }: Props) => (
  <div className={cn("max-w-screen-xl mx-auto px-4", className)}>
    {children}
  </div>
);
