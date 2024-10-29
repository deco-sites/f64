import { useScript } from "@deco/deco/hooks";
import type { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import Icon from "../ui/Icon.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};
export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}
const QUANTITY_MAX_VALUE = 100;
const removeItemHandler = () => {
  const itemID = (event?.currentTarget as HTMLButtonElement | null)?.closest(
    "fieldset",
  )?.getAttribute("data-item-id");
  if (typeof itemID === "string") {
    window.STOREFRONT.CART.setQuantity(itemID, 0);
  }
};
function CartItem({ item, index, locale, currency }: Props) {
  const { image, price = Number.POSITIVE_INFINITY, quantity } = item;
  const isGift = price < 0.01;
  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;
  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class="grid grid-rows-1 gap-4"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <Image
        alt={name}
        src={image}
        width={80}
        height={80}
        class="object-contain"
      />

      {/* Info */}
      <div class="flex flex-col gap-2">
        {/* Name and Remove button */}
        <div class="flex justify-between gap-4">
          <legend class="text-sm font-medium text-[#333]">{name}</legend>
          <button
            type="button"
            class={clx("size-4", isGift && "hidden")}
            hx-on:click={useScript(removeItemHandler)}
          >
            <Icon id="trash" size={16} class="text-[#727273]" />
          </button>
        </div>

        {/* Quantity Selector */}
        <div class={clx("my-4", isGift && "hidden")}>
          <QuantitySelector
            min={0}
            max={QUANTITY_MAX_VALUE}
            value={quantity}
            name={`item::${index}`}
          />
        </div>

        {/* Price Block */}
        <div class="flex items-center gap-2">
          <span class="text-sm text-black">
            {isGift
              ? <span class="text-[#28a745]">gratuit</span>
              : <>{formatPrice(price, currency, locale)} lei</>}
          </span>
        </div>
      </div>
    </fieldset>
  );
}
export default CartItem;
