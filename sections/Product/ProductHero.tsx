import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import Section from "../../components/ui/Section.tsx";

interface Props {
  products: Product[] | null;
}

export default function ProductHero({ products }: Props) {
  if (!products?.length) return null;

  return (
    <div class="container flex flex-col lg:flex-row justify-center mb-11 lg:h-[300px]">
      {products.map((product) => (
        <ProductCard
          product={product}
          variant="product-hero"
          class="h-full flex-1"
        />
      ))}
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="300px" />;
