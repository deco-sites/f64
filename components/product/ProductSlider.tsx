import type { Product } from "apps/commerce/types.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";

interface Props {
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ products, itemListName }: Props) {
  const id = useId();

  return (
    <>
      <div id={id} class="relative">
        <Slider class="carousel carousel-center gap-5 w-full">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item py-2 w-[calc(50%-20px+(20px/2))] lg:w-[calc(20%-20px+(20px/5))]"
            >
              <ProductCard
                index={index}
                product={product}
                itemListName={itemListName}
              />
            </Slider.Item>
          ))}
        </Slider>

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
      </div>

      <Slider.JS rootId={id} infinite />
    </>
  );
}

export default ProductSlider;
