import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";
import { useDevice } from "@deco/deco/hooks";
import Section from "../../components/ui/Section.tsx";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy link
 */
interface Item {
  image: ImageWidget;
  /** @title Describe the image */
  alt: string;
  link: string;
}

interface Props {
  title: string;
  items: Item[];
}

export default function ImageSlider({ title, items }: Props) {
  const id = useId();
  const isDesktop = useDevice() === "desktop";

  return (
    <div class="flex flex-col gap-9 container mb-11">
      <Section.Header title={title} />

      <div id={id} class="relative">
        <Slider class="carousel w-full gap-4">
          {items.map(({ image, alt, link }, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[calc(33.3%-16px+(16px/3))] sm:w-[calc(25%-16px+(16px/4))] lg:w-[calc(14.3%-16px+(16px/7))]"
            >
              <a href={link}>
                <Image src={image} alt={alt} width={200} height={200} />
              </a>
            </Slider.Item>
          ))}
        </Slider>

        {isDesktop && (
          <div class="absolute left-0 top-1/2 -translate-y-1/2 flex justify-between w-full pointer-events-none">
            <Slider.PrevButton class="size-[50px] rounded-full bg-[#f6c38b] hover:bg-[#f68e1e] -translate-x-[60%] flex justify-center items-center pointer-events-auto">
              <Icon
                id="chevron-right"
                size={24}
                class="rotate-180 text-white shrink-0"
              />
            </Slider.PrevButton>
            <Slider.NextButton class="size-[50px] rounded-full bg-[#f6c38b] hover:bg-[#f68e1e] translate-x-[60%] flex justify-center items-center pointer-events-auto">
              <Icon id="chevron-right" size={24} class="text-white shrink-0" />
            </Slider.NextButton>
          </div>
        )}

        <Slider.JS rootId={id} infinite />
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
