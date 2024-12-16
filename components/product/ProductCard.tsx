import { useDevice } from "@deco/deco/hooks";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import parsePrice from "../../sdk/parsePrice.ts";
import Print from "../../sdk/Print.tsx";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Icon from "../ui/Icon.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
  view?: "grid" | "list";
  variant?: "product-hero";
}

const GRID_WIDTH = 287;
const GRID_HEIGHT = 287;
const GRID_ASPECT_RATIO = `${GRID_WIDTH} / ${GRID_HEIGHT}`;

const LIST_WIDTH = 130;
const LIST_HEIGHT = 130;
const LIST_ASPECT_RATIO = `${LIST_WIDTH} / ${LIST_HEIGHT}`;

function ProductCard(
  {
    product,
    preload,
    itemListName,
    index,
    class: _class,
    view = "grid",
    variant,
  }: Props,
) {
  const { url, image: images, offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;
  const [front] = images ?? [];

  const { listPrice = 0, price = 0, availability, seller = "1" } = useOffer(
    offers,
  );
  const parsedPrice = parsePrice(price);
  const parsedListPrice = parsePrice(listPrice);

  const inStock = availability === "https://schema.org/InStock";
  const relativeUrl = relative(url);

  const isDesktop = useDevice() === "desktop";

  const properties = isVariantOf?.additionalProperty ?? [];
  const MIN_PROPERTIES = Math.min(5, properties.length);

  const randomPropertiesIndex = new Set<number>();

  while (randomPropertiesIndex.size < MIN_PROPERTIES) {
    randomPropertiesIndex.add(Math.floor(Math.random() * properties.length));
  }

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  /* GRID GRID GRID */
  /* GRID GRID GRID */
  /* GRID GRID GRID */
  if (view === "grid") {
    return (
      <div
        {...event}
        data-product
        class={clx(
          "flex gap-2.5 p-2.5 shadow-[0_10px_20px_0_rgb(51_52_59_/_5%)] bg-white",
          variant === "product-hero" ? "shrink-0" : "flex-col",
          _class,
        )}
      >
        <Print data={[...randomPropertiesIndex]} />
        <figure
          class={clx(
            "relative rounded shrink-0 flex items-center justify-center",
            variant === "product-hero" &&
              "max-[500px]:w-[100px] max-lg:w-[200px] flex-1",
          )}
          style={{
            aspectRatio: variant === "product-hero"
              ? undefined
              : GRID_ASPECT_RATIO,
          }}
        >
          {/* Product Images */}
          <a
            href={relativeUrl}
            aria-label="view product"
            class={clx(!inStock && "opacity-70")}
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={GRID_WIDTH}
              height={GRID_HEIGHT}
              style={{ aspectRatio: GRID_ASPECT_RATIO }}
              class="object-cover rounded"
              sizes="(max-width: 640px) 50vw, 20vw"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
          </a>
        </figure>

        <div
          class={clx(
            "flex flex-col justify-center gap-2.5 flex-1",
            variant === "product-hero" && "w-1/2",
          )}
        >
          <a href={relativeUrl} class="flex flex-col gap-2.5">
            <h2
              class={clx(
                "text-ellipsis text-[#33343b] lg:max-w-[300px]",
                variant === "product-hero"
                  ? "line-clamp-3 text-lg/6 font-medium"
                  : "line-clamp-4 text-sm/4",
              )}
            >
              {title}
            </h2>
            {variant === "product-hero" && (
              <div class="flex flex-col gap-1">
                {[...randomPropertiesIndex].map((i) => {
                  const property = properties[i];

                  return (
                    <span class="text-xs text-[#33343b] lg:max-w-[300px] truncate">
                      <span class="font-bold">{property.name}:</span>
                      {property.value}
                    </span>
                  );
                })}
              </div>
            )}
            {variant !== "product-hero" && <div class="flex-grow" />}
            <div class="flex flex-col items-start gap-1">
              {listPrice > price && (
                <div class="flex items-center gap-1 relative group">
                  <div class="size-3 bg-[#f68e1e] rounded-full text-white text-[8px] font-bold flex justify-center items-center">
                    i
                  </div>

                  <div class="min-w-32 absolute -left-[12%] text-white bg-[#333] -top-2 -translate-y-full p-5 text-sm transition-opacity shadow-[0_1px_8px_rgba(0,0,0,.5)] pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto z-10">
                    Pretul anterior
                  </div>

                  <span class="text-[#777] text-xs">
                    {parsedListPrice.int},
                    <span class="text-[10px] inline-block -translate-y-0.5">
                      {parsedListPrice.cents}
                    </span>{" "}
                    lei
                  </span>
                </div>
              )}
              <span
                class={clx(
                  "font-bold text-[#f68e1e]",
                  variant === "product-hero" && "max-lg:text-xl text-lg",
                )}
              >
                {parsedPrice.int},
                <span
                  class={clx(
                    "inline-block -translate-y-1",
                    variant === "product-hero" ? "max-lg:text-lg" : "text-sm",
                  )}
                >
                  {parsedPrice.cents}
                </span>{" "}
                lei
              </span>
            </div>
          </a>
          {variant === "product-hero" && (
            <div>
              <AddToCartButton
                item={item}
                seller={seller}
                product={product}
                class="bg-[#f68e1e] hover:bg-[#f0810b] disabled:bg-[#c36909] transition-colors w-full h-14 lg:h-10 rounded-md text-sm text-white flex justify-center items-center gap-2"
                disabled={false}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  /* LIST */
  /* LIST */
  /* LIST */
  return (
    <div
      {...event}
      data-product
      class={clx(
        "flex justify-between gap-4 p-4 shadow-[0_10px_20px_0_rgb(51_52_59_/_5%)] bg-white w-full",
        _class,
      )}
    >
      <div class="flex flex-col justify-between w-1/4">
        <Image
          src={front.url!}
          alt={front.alternateName}
          width={LIST_WIDTH}
          height={LIST_HEIGHT}
          style={{ aspectRatio: LIST_ASPECT_RATIO }}
          class="object-cover"
          sizes="(max-width: 640px) 50vw, 20vw"
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          decoding="async"
        />

        <div class="flex items-center gap-2">
          <Icon id="barcode" size={16} class="text-[#f68e1e]" />
          <span class="text-[#33343b] text-xs">125061237</span>
        </div>
      </div>

      <div class="flex flex-col gap-4 w-1/2">
        <h2 class="text-sm line-clamp-4 text-ellipsis text-[#33343b] font-bold">
          {title}
        </h2>

        <ul class="list-disc list-inside text-[#676976] leading-6 text-sm">
          <li>Senzor 35mm full-frame Exmor R CMOS</li>
          <li>Rezolutie: 24.2Mpx</li>
          <li>4D FOCUS™</li>
          <li>UHD 4K30p Video</li>
          <li>ISO 204800</li>
          <li>USB Type-C Port</li>
        </ul>
      </div>

      <div class="w-1/4 flex flex-col gap-1">
        {listPrice > price && (
          <div class="flex items-center gap-1 relative group">
            <div class="size-3 bg-[#f68e1e] rounded-full text-white text-[8px] font-bold flex justify-center items-center">
              i
            </div>

            <div class="min-w-32 absolute -left-[12%] text-white bg-[#333] -top-2 -translate-y-full p-5 text-sm transition-opacity shadow-[0_1px_8px_rgba(0,0,0,.5)] pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto z-10">
              Pretul anterior
            </div>

            <span class="text-[#777] text-xs">
              {parsedListPrice.int},
              <span class="text-[10px] inline-block -translate-y-0.5">
                {parsedListPrice.cents}
              </span>{" "}
              lei
            </span>
          </div>
        )}
        <span class="font-bold text-[#f68e1e]">
          {parsedPrice.int},<span class="text-sm inline-block -translate-y-1">
            {parsedPrice.cents}
          </span>{" "}
          lei
        </span>

        <div class="flex flex-col gap-2">
          {isDesktop && (
            <div class="flex flex-col gap-2.5 mt-2">
              <div class="flex items-center gap-1.5 text-[#28a745] text-xs font-bold">
                <Icon id="round-check" size={16} />
                In stoc magazin
              </div>
              <div class="flex items-center gap-1.5 text-[#33343b] text-xs">
                <Icon id="medal" size={16} />
                <span class="font-bold">13299</span> puncte de fidelitate
              </div>
              <div class="flex items-center gap-1.5 text-[#33343b] text-xs">
                <Icon id="delivery" size={16} />
                Pana la 2 zile lucratoare
              </div>
            </div>
          )}

          <AddToCartButton
            item={item}
            seller={seller}
            product={product}
            class="bg-[#f68e1e] hover:bg-[#f0810b] disabled:bg-[#c36909] transition-colors w-full h-14 lg:h-10 rounded-md text-sm text-white flex justify-center items-center gap-2"
            disabled={false}
          />
          <WishlistButton item={item} />

          {!isDesktop && (
            <div class="grid grid-cols-2 mt-8">
              <div class="flex flex-col gap-2.5">
                <div class="flex items-center gap-1.5 text-[#28a745] text-xs font-bold">
                  <Icon id="round-check" size={16} />
                  In stoc magazin
                </div>
                <div class="flex items-center gap-1.5 text-[#33343b] text-xs">
                  <Icon id="medal" size={16} />
                  <span class="font-bold">13299</span> puncte de fidelitate
                </div>

                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-1">
                    <Icon id="card" size={16} class="text-[#f68e1e]" />

                    <span class="text-xs font-bold">
                      Rate de la{" "}
                      <span class="text-[#f68e1e]">
                        554,
                        <span class="inline-block -translate-y-1 text-xs">
                          12
                        </span>{" "}
                        lei
                      </span>
                    </span>
                  </div>

                  <div class="flex items-center gap-1">
                    <Icon id="barcode" size={16} class="text-[#f68e1e]" />
                    <span class="text-[#33343b] text-xs">125061237</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col gap-2.5">
                <div class="flex items-center gap-1.5 text-[#33343b] text-xs">
                  <Icon id="delivery" size={16} />
                  Pana la 2 zile lucratoare
                </div>
                <div class="flex items-center gap-1.5 text-[#33343b] text-xs">
                  <Icon id="box" size={16} />
                  Deschidere la livrare
                </div>
                <div class="flex items-center gap-1.5 text-[#33343b] text-xs">
                  <Icon id="guarantee" size={16} />
                  Garantie inclusa:
                </div>

                <ul class="list-disc pl-12 marker:text-[#f68e1e] flex flex-col gap-1.5">
                  <li class="text-[#33343b] text-xs">
                    Persoane fizice: 24 luni
                  </li>
                  <li class="text-[#33343b] text-xs">
                    Persoane juridice: 24 luni
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
