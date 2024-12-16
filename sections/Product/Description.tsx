import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Section from "../../components/ui/Section.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";

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

  const id = useId();

  return (
    <div class="container py-7 !px-7 flex flex-col gap-6 mb-11 bg-white relative">
      <input type="checkbox" id={id} class="hidden peer" />

      <div class="absolute left-0 bottom-0 bg-gradient-to-t from-white w-full h-1/4 z-10 peer-checked:opacity-0 pointer-events-none" />

      <label
        for={id}
        class="cursor-pointer h-11 bg-[#333] text-white flex items-center justify-center gap-2 px-5 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded text-sm group"
      >
        <Icon
          id="plus"
          size={16}
          class="text-white peer-checked:group-[]:hidden"
        />
        <span class="peer-checked:group-[]:hidden">
          Arata descrierea completa
        </span>
        <Icon
          id="minus"
          size={16}
          class="text-white hidden peer-checked:group-[]:inline"
        />
        <span class="hidden peer-checked:group-[]:inline">Arata mai putin</span>
      </label>

      <span class="text-[#33343b] text-xl relative">
        <div class="h-2 w-8 bg-[#f68e1e] absolute -left-12 top-1/2 -translate-y-1/2" />
        <span class="font-bold">Descriere</span> {isVariantOf?.name}
      </span>
      <div class="max-h-[400px] peer-checked:max-h-[1000px] peer-checked:overflow-y-auto overflow-hidden transition-all duration-500">
        {description && (
          <div
            class="ml-2 mt-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
