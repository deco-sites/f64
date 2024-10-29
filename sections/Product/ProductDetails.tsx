import type { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div class="bg-white mb-8">
      <div class="container flex flex-col gap-8 w-full pt-4 pb-8 px-5 sm:px-0">
        <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />

        <div class="flex flex-col lg:flex-row max-lg:px-4">
          <div class="lg:w-1/2">
            <ImageGallerySlider page={page} />
          </div>
          <div class="lg:w-1/2">
            <ProductInfo page={page} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
