import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import { Picture } from "apps/website/components/Picture.tsx";
import { SourceWithFit } from "../../components/PictureWithFit.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Section from "../../components/ui/Section.tsx";

interface Props {
  products: Product[] | null;
  bannerDesktop: ImageWidget;
  bannerMobile: ImageWidget;
}

export default function ProductHero(
  { products, bannerDesktop, bannerMobile }: Props,
) {
  if (!products?.length) return null;
  const product = products[0];

  return (
    <div class="container flex flex-col lg:flex-row justify-center mb-11 lg:h-[300px]">
      <ProductCard
        product={product}
        variant="product-hero"
        class="h-full flex-1"
      />

      <div class="lg:w-1/2">
        <Picture>
          <SourceWithFit
            src={bannerDesktop}
            media="(min-width: 640px)"
            width={1250}
            height={350}
            fit="contain"
          />
          <SourceWithFit
            src={bannerMobile}
            media="(max-width: 639px)"
            width={625}
            height={350}
            fit="contain"
          />
          <img
            src={bannerDesktop}
            alt="Banner"
            class="h-full mx-auto object-cover"
          />
        </Picture>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="300px" />;
