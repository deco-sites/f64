import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import Icon from "../ui/Icon.tsx";
import { useDevice } from "@deco/deco/hooks";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductInfo({ page }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;

  const { price = 0, listPrice, seller = "1", availability } = useOffer(offers);
  const formattedPrice = formatPrice(price)?.replace(/,\d+/g, "");
  const cents = formatPrice(price)?.match(/\,\d+/g)?.[0].slice(1);

  const isDesktop = useDevice() === "desktop";

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  return (
    <div {...viewItemEvent} class="flex flex-col gap-10 max-lg:mt-5" id={id}>
      {/* Product Name */}
      <span class="text-lg font-bold leading-normal">{title}</span>

      <div class="flex justify-between">
        {isDesktop && (
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center gap-1">
              <Icon id="card" size={16} class="text-[#f68e1e]" />

              <span class="text-xs font-bold">
                Rate de la{" "}
                <span class="text-[#f68e1e]">
                  554,<span class="inline-block -translate-y-1 text-xs">
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
        )}

        {/* Add to Cart and Favorites button */}
        <div class="mt-4 sm:mt-0 flex flex-col w-[250px] bg-[#f8f8f8] lg:p-8 max-lg:w-full">
          {availability === "https://schema.org/InStock"
            ? (
              <div>
                <span class="text-[28px] font-bold text-[#f68e1e] mb-6 block">
                  {formattedPrice},<span class="-translate-y-1.5 inline-block text-2xl">
                    {cents}
                  </span>{" "}
                  lei
                </span>

                <div class="flex flex-col gap-2">
                  <AddToCartButton
                    item={item}
                    seller={seller}
                    product={product}
                    class="bg-[#f68e1e] hover:bg-[#f0810b] disabled:bg-[#c36909] transition-colors w-full h-14 lg:h-10 rounded-md text-sm text-white flex justify-center items-center gap-2"
                    disabled={false}
                  />
                  <WishlistButton item={item} />

                  {isDesktop && (
                    <div class="flex flex-col gap-2.5 mt-2">
                      <div class="flex items-center gap-1.5 text-[#28a745] text-xs font-bold">
                        <Icon id="round-check" size={16} />
                        In stoc magazin
                      </div>
                      <div class="flex items-center gap-1.5 text-[#33343b] text-xs">
                        <Icon id="medal" size={16} />
                        <span class="font-bold">13299</span>{" "}
                        puncte de fidelitate
                      </div>
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
                    </div>
                  )}

                  {!isDesktop && (
                    <div class="grid grid-cols-2 mt-8">
                      <div class="flex flex-col gap-2.5">
                        <div class="flex items-center gap-1.5 text-[#28a745] text-xs font-bold">
                          <Icon id="round-check" size={16} />
                          In stoc magazin
                        </div>
                        <div class="flex items-center gap-1.5 text-[#33343b] text-xs">
                          <Icon id="medal" size={16} />
                          <span class="font-bold">13299</span>{" "}
                          puncte de fidelitate
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
                            <Icon
                              id="barcode"
                              size={16}
                              class="text-[#f68e1e]"
                            />
                            <span class="text-[#33343b] text-xs">
                              125061237
                            </span>
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
            )
            : <OutOfStock productID={productID} />}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
