import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const WIDTH = 450;
const HEIGHT = 450;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: {
      product: { isVariantOf, image: pImages },
    },
  } = props;

  const images = isVariantOf?.image ?? pImages ?? [];

  return (
    <>
      <div id={id} class="flex justify-center gap-10">
        {/* Dots */}

        <ul class="hidden sm:carousel carousel-center carousel-vertical gap-2 max-w-full overflow-x-auto sm:overflow-y-auto max-h-[450px">
          {images.map((img, index) => (
            <li class="carousel-item size-[50px]">
              <Slider.Dot index={index}>
                <Image
                  class="rounded object-cover"
                  width={50}
                  height={50}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <div class="w-full max-w-[450px] relative">
          <Slider class="carousel carousel-center gap-6 w-full">
            {images.map((img, index) => (
              <Slider.Item index={index} class="carousel-item w-full">
                <Image
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio: ASPECT_RATIO }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  // Preload LCP image for better web vitals
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <div class="absolute left-0 top-1/2 -translate-y-1/2 flex justify-between w-full pointer-events-none">
            <Slider.PrevButton class="size-6 flex justify-center items-center pointer-events-auto group">
              <Icon
                id="chevron-right-bold"
                size={24}
                class="rotate-180 shrink-0 text-[#f68e1e] group-disabled:text-[#676976]"
              />
            </Slider.PrevButton>
            <Slider.NextButton class="size-6 flex justify-center items-center pointer-events-auto group">
              <Icon
                id="chevron-right-bold"
                size={24}
                class="shrink-0 text-[#f68e1e] group-disabled:text-[#676976]"
              />
            </Slider.NextButton>
          </div>
        </div>

        <Slider.JS rootId={id} />
      </div>
    </>
  );
}
