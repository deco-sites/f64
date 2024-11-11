import type { SectionProps } from "@deco/deco";
import { useDevice, useScript, useSection } from "@deco/deco/hooks";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Drawer from "../ui/Drawer.tsx";
import Sort from "./Sort.tsx";
import Print from "../../sdk/Print.tsx";
import { getCookies } from "jsr:@std/http";
import type { AppContext } from "../../apps/site.ts";
import ScrollToTop from "../ScrollToTop.tsx";

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;

  /**
   * @ignore
   */
  onlyProducts?: boolean;
  /**
   * @ignore
   */
  onlyFilters?: boolean;
  /**
   * @ignore
   */
  view?: "grid" | "list";
}

function NotFound() {
  return (
    <div class="container flex flex-col lg:flex-row justify-center items-center pt-16 pb-32 gap-10 lg:gap-24 text-[#cacbcc]">
      <span class="font-bold text-5xl">OOPS!</span>

      <div class="flex flex-col gap-4 text-[#979899]">
        <span class="text-black">Nu au fost găsite produse</span>
        <span>Ce să fac?</span>

        <ul class="list-disc pl-10">
          <li>Verifică termenii pe care i-ai introdus.</li>
          <li>Încearcă să folosești un singur cuvânt.</li>
          <li>Folosește termeni generici în căutare.</li>
          <li>Încearcă să cauți folosind sinonime alte termenului dorit.</li>
        </ul>
      </div>
    </div>
  );
}

function PageResult(props: SectionProps<typeof loader>) {
  const { startingPage = 0, url, onlyProducts, view = "grid" } = props;
  const page = props.page as ProductListingPage;

  const {
    products,
    pageInfo: { records = 0, recordPerPage = 0, currentPage },
  } = page;

  const perPage = recordPerPage || products.length;
  const total = records ?? 0;
  const zeroIndexedOffsetPage = currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const lastPage = Math.ceil(total / perPage);

  const nextPageUrl = new URL(url);
  nextPageUrl.searchParams.set("page", (currentPage + 1).toString());

  const partialNext = useSection({
    href: nextPageUrl.href,
    props: { onlyProducts: true },
  });

  const Products = (
    <>
      <Print data={{ products }} />
      {products?.map((product, index) => (
        <ProductCard
          key={`product-card-${product.productID}`}
          product={product}
          preload={index === 0}
          index={offset + index}
          class="h-full"
          view={view}
        />
      ))}
    </>
  );

  if (onlyProducts) return Products;

  return (
    <div class="flex flex-col">
      <div
        data-product-list
        class={clx(
          view === "grid"
            ? "grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] items-center gap-y-6 gap-x-2 sm:gap-6 lg:gap-x-4 lg:gap-y-8 w-full"
            : "flex flex-col gap-8",
        )}
      >
        {Products}
      </div>

      {currentPage !== lastPage && (
        <div class="flex justify-center pt-2 mt-20 w-full [&_section]:contents cursor-pointer">
          <button
            id="load-more"
            type="button"
            rel="next"
            data-current-page={currentPage}
            class={clx(
              "bg-[#333] py-3 px-6 rounded text-white flex items-center gap-4 text-sm",
              !nextPageUrl && "hidden",
            )}
            hx-trigger="click"
            hx-target="[data-product-list]"
            hx-swap="beforeend"
            hx-select="section > *"
            hx-get={partialNext}
            hx-on--after-request={useScript((lastPage: number) => {
              const element = document.getElementById(
                "load-more",
              ) as HTMLButtonElement;
              const currentPage = Number(element.dataset.currentPage) + 1;

              if (currentPage === lastPage) {
                element.remove();
              } else {
                element.dataset.currentPage = String(currentPage);
              }

              const url = new URL(location.href);
              url.searchParams.set("page", String(currentPage));
              history.replaceState("", "", url.href);
            }, lastPage)}
          >
            <Icon id="plus" size={24} class="inline [.htmx-request_&]:hidden" />
            <span class="inline [.htmx-request_&]:hidden">
              Vezi mai multe produse
            </span>
            <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
          </button>
        </div>
      )}
    </div>
  );
}

function Result(props: SectionProps<typeof loader>) {
  const { startingPage = 0, url, onlyProducts, onlyFilters, view = "grid" } =
    props;

  const container = useId();
  const controls = "filters-drawer";
  const isDesktop = useDevice() === "desktop";

  const page = props.page as ProductListingPage;
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  const results = (
    <span class="text-sm text-[#33343b]">
      <span class={clx("font-bold", !isDesktop && "text-[#f68e1e]")}>
        {page.pageInfo.records}
      </span>{" "}
      de produse
    </span>
  );

  const sortBy = sortOptions.length > 0 && (
    <Sort sortOptions={sortOptions} url={url} />
  );

  if (onlyProducts) {
    return <PageResult {...props} />;
  }

  if (onlyFilters) {
    return (
      <Drawer
        id={controls}
        aside={
          <div class="bg-[#f8f8f8] flex flex-col h-full divide-y overflow-y-hidden w-full max-lg:pb-16">
            <div class="flex items-center justify-between p-4">
              <span class="text-lg text-[#333]">Filtre</span>

              <label for={controls}>
                <Icon id="close" class="text-[#333]" />
              </label>
            </div>

            <div class="flex-grow overflow-auto">
              <Filters filters={filters} url={url} />
            </div>
          </div>
        }
      >
        <div class="flex sm:hidden justify-between items-end">
          <div class="flex flex-col">
            {results}
            {sortBy}
          </div>

          <label class="btn btn-ghost" for={controls}>
            Filters
          </label>
        </div>
      </Drawer>
    );
  }

  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        // TODO: get category name from search or cms setting
        item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
        item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
        items: page.products?.map((product, index) =>
          mapProductToAnalyticsItem({
            ...useOffer(product.offers),
            index: offset + index,
            product,
            breadcrumbList: page.breadcrumb,
          })
        ),
      },
    },
  });

  return (
    <div id={container} {...viewItemListEvent} class="w-full mb-11">
      <ScrollToTop />

      <div class="container flex flex-col">
        <div class="flex gap-12">
          {isDesktop && (
            <aside class="flex flex-col gap-4 w-1/4 bg-white relative py-8">
              <div class="h-full w-screen bg-white top-0 bottom-0 right-full absolute" />

              <h1 class="text-2xl font-bold h-12 flex items-center">
                {breadcrumb.itemListElement?.at(-1)?.name}
              </h1>

              <Filters filters={filters} url={url} />
            </aside>
          )}

          <div class="flex flex-col gap-2 pt-8 flex-1">
            {isDesktop
              ? (
                <div class="flex items-center">
                  {results}
                  <div class="ml-auto">{sortBy}</div>
                  <div class="flex items-center gap-4 ml-8">
                    <button
                      type="button"
                      hx-trigger="click"
                      hx-get={useSection({ props: { view: "list" } })}
                      hx-swap="outerHTML"
                      hx-target="closest section"
                      hx-on--before-request={useScript(() => {
                        const year = 60 * 60 * 24 * 365;
                        const date = new Date();

                        date.setDate(date.getDate() + year);
                        document.cookie =
                          `view=list;Expires=${date.toUTCString()};Path=/`;
                      })}
                    >
                      <Icon
                        id="plp-list"
                        size={16}
                        class={view === "list"
                          ? "text-[#f68e1e]"
                          : "text-[#bababa]"}
                      />
                    </button>
                    <button
                      type="button"
                      hx-trigger="click"
                      hx-get={useSection({ props: { view: "grid" } })}
                      hx-swap="outerHTML"
                      hx-target="closest section"
                      hx-on--before-request={useScript(() => {
                        const year = 60 * 60 * 24 * 365;
                        const date = new Date();

                        date.setDate(date.getDate() + year);
                        document.cookie =
                          `view=grid;Expires=${date.toUTCString()};Path=/`;
                      })}
                    >
                      <Icon
                        id="plp-grid"
                        size={16}
                        class={view === "grid"
                          ? "text-[#f68e1e]"
                          : "text-[#bababa]"}
                      />
                    </button>
                  </div>
                </div>
              )
              : (
                <div class="flex flex-col items-center mb-4">
                  <h1 class="text-2xl font-bold h-12 flex items-center mb-2">
                    {breadcrumb.itemListElement?.at(-1)?.name}
                  </h1>

                  {results}

                  <div class="flex items-center justify-around w-full mt-8">
                    <label
                      for={controls}
                      hx-trigger={`click[!document.getElementById('${controls}')]`}
                      hx-get={useSection({ props: { onlyFilters: true } })}
                      hx-swap="beforeend"
                      hx-target="body"
                      hx-select="section > *"
                      hx-on--before-request={useScript((controls: string) => {
                        const ob = new MutationObserver(() => {
                          const input = document.getElementById(
                            controls,
                          ) as HTMLInputElement | null;

                          if (input) {
                            input.checked = true;
                            ob.disconnect();
                          }
                        });

                        ob.observe(document.body, { childList: true });
                      }, controls)}
                      class="flex items-center gap-2 text-[#676976] py-4 px-6 rounded-full border border-[#ccc]"
                    >
                      Filtreaza
                      <Icon id="settings" size={16} />
                    </label>
                    {sortBy}
                  </div>
                </div>
              )}

            <PageResult {...props} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchResult(
  { page, ...props }: SectionProps<typeof loader>,
) {
  return page?.products?.length
    ? <Result {...props} page={page} />
    : <NotFound />;
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const cookies = getCookies(req.headers);

  let view = cookies.view as "grid" | "list";
  if (view !== "grid" && view !== "list") view = "grid";

  if (ctx.device === "mobile") view = "grid";

  return {
    ...props,
    url: req.url,
    view,
  };
};
