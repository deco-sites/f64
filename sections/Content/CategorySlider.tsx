import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

/**
 * @titleBy name
 */
interface Category {
  image: ImageWidget;
  name: string;
  link: string;
}

interface Props {
  title: string;
  categories: Category[];
}

export default function CategorySlider({ title, categories }: Props) {
  const id = useId();
  const isDesktop = useDevice() === "desktop";

  return (
    <div class="flex flex-col gap-9 container mb-11">
      <Section.Header title={title} />

      <div id={id} class="relative">
        <Slider class="carousel w-full">
          {categories.map(({ image, name, link }, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[33.3%] sm:w-[25%] lg:w-[12.5%]"
            >
              <a
                href={link}
                class="h-48 flex flex-col items-center justify-center gap-5 bg-white w-full"
              >
                <img src={image} alt="" />
                <span class="text-[13px] text-[#33343b] text-center">
                  {name}
                </span>
              </a>
            </Slider.Item>
          ))}
        </Slider>

        {isDesktop && (
          <div class="absolute left-0 top-1/2 -translate-y-1/2 flex justify-between w-full pointer-events-none">
            <Slider.PrevButton class="size-[50px] rounded-full bg-[#f6c38b] hover:bg-[#f68e1e] -translate-x-1/2 flex justify-center items-center pointer-events-auto">
              <Icon
                id="chevron-right"
                size={24}
                class="rotate-180 text-white shrink-0"
              />
            </Slider.PrevButton>
            <Slider.NextButton class="size-[50px] rounded-full bg-[#f6c38b] hover:bg-[#f68e1e] translate-x-1/2 flex justify-center items-center pointer-events-auto">
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
