import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function Description({ page }: Props) {
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

  const {
    product: { description: _description, isVariantOf },
  } = page;
  const description = _description || isVariantOf?.description;

  return (
    <div class="container py-7 !px-7 flex flex-col gap-6 mb-8 bg-white">
      <span class="text-[#33343b] text-xl relative">
        <div class="h-2 w-8 bg-[#f68e1e] absolute -left-12 top-1/2 -translate-y-1/2" />
        <span class="font-bold">Descriere</span> {isVariantOf?.name}
      </span>
      {description && (
        <div
          class="ml-2 mt-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
