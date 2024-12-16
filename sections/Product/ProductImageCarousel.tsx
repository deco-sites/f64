import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Section from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../../sdk/useId.ts";
import Print from "../../sdk/Print.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductImageCarousel({ page }: Props) {
  if (!page) return null;

  const { product } = page;
  const { isVariantOf } = product;
  const id = useId();
  const seeMoreDescriptionId = useId();

  const title = isVariantOf?.name ?? product.name;
  const images = page?.product?.image?.map((image) => image.url).filter((
    image,
  ): image is string => image !== undefined) ?? [];

  const excludePropertiesNames = new Set([
    "buletts txt listing",
    "style",
    "resealeds",
    "insurance",
    "state count",
    "cron",
    "sellerid",
  ]);
  const excludePropertiesIDs = new Set([
    "informatii producator",
    "product state",
  ]);

  const propertiesGroupBy = {} as Record<string, [string, string][]>;

  for (const i of isVariantOf?.additionalProperty ?? []) {
    const propertyID = i.propertyID ?? "";
    const name = i.name ?? "";

    if (excludePropertiesIDs.has(propertyID)) continue;
    if (excludePropertiesNames.has(name.toLowerCase())) continue;

    if (!propertiesGroupBy[propertyID]) {
      propertiesGroupBy[propertyID] = [];
    }

    propertiesGroupBy[propertyID].push([name, i.value ?? ""]);
  }

  return (
    <div class="container mb-11" id={id}>
      <input type="checkbox" id={seeMoreDescriptionId} class="hidden peer" />

      <h1 class="text-2xl font-bold mb-6">{title}</h1>
      <Print data={product} />

      <div class="relative">
        <Slider class="carousel gap-4">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item">
              <Image src={image} alt={title} width={400} height={400} />
            </Slider.Item>
          ))}
        </Slider>

        {images.length > 1 && (
          <div class="absolute left-0 top-1/2 -translate-y-1/2 flex justify-between w-full pointer-events-none">
            <Slider.PrevButton class="size-10 lg:size-[50px] rounded-full bg-[#f6c38b] hover:bg-[#f68e1e] -translate-x-1/2 flex justify-center items-center pointer-events-auto">
              <Icon
                id="chevron-right"
                size={24}
                class="rotate-180 text-white shrink-0"
              />
            </Slider.PrevButton>
            <Slider.NextButton class="size-10 lg:size-[50px] rounded-full bg-[#f6c38b] hover:bg-[#f68e1e] translate-x-1/2 flex justify-center items-center pointer-events-auto">
              <Icon id="chevron-right" size={24} class="text-white shrink-0" />
            </Slider.NextButton>
          </div>
        )}
      </div>

      <div class="p-7 flex flex-col gap-6 mb-8 bg-white group relative">
        <div class="absolute left-0 bottom-0 bg-gradient-to-t from-white w-full h-1/4 z-10 peer-checked:group-[]:opacity-0 pointer-events-none" />

        <label
          for={seeMoreDescriptionId}
          class="cursor-pointer h-11 bg-[#333] text-white flex items-center justify-center gap-2 px-5 absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded text-sm whitespace-nowrap"
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
          <span class="hidden peer-checked:group-[]:inline">
            Arata mai putin
          </span>
        </label>

        <span class="text-[#33343b] text-xl relative">
          <div class="h-2 w-8 bg-[#f68e1e] absolute -left-12 top-1/2 -translate-y-1/2" />
          <span class="font-bold">Specificatii</span> {isVariantOf?.name}
        </span>

        <div class="max-h-[400px] peer-checked:group-[]:max-h-[1000px] peer-checked:group-[]:overflow-y-auto overflow-hidden transition-all duration-500 flex flex-col gap-8">
          {Object.entries(propertiesGroupBy).map(([propertyID, props]) => (
            <div class="flex flex-col gap-2">
              <span class="text-[#33343b] font-bold">
                {propertyID.toUpperCase()}
              </span>

              <div class="flex flex-col text-[#676976] text-sm">
                {props.map(([name, value]) => (
                  <div class="flex flex-col gap-1 lg:flex-row lg:items-center even:bg-[#f8f8f8] py-2 px-3">
                    <span class="lg:w-1/4 max-lg:font-bold">{name}</span>
                    <span class="lg:flex-1">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Slider.JS rootId={id} infinite interval={5000} />
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
