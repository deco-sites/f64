import type { LoadingFallbackProps } from "@deco/deco";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Print from "../../sdk/Print.tsx";

export interface Props extends SectionHeaderProps {
  products: Product[] | null;
}

export default function ProductShelf({ products, title }: Props) {
  if (!products?.length) {
    return null;
  }

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        item_list_name: title,
        items: products.map((product, index) =>
          mapProductToAnalyticsItem({
            index,
            product,
            ...useOffer(product.offers),
          })
        ),
      },
    },
  });
  return (
    <div {...viewItemListEvent} class="mb-11 container flex flex-col gap-1">
      <Print data={products} />
      <Section.Header title={title} />

      <div class="px-5">
        <ProductSlider products={products} itemListName={title} />
      </div>
    </div>
  );
}
export const LoadingFallback = ({ title }: LoadingFallbackProps<Props>) => (
  <div class="mb-11 container flex flex-col gap-1">
    <Section.Header title={title} />
    <Section.Placeholder height="471px" />
  </div>
);
