import { useDevice, useScript } from "@deco/deco/hooks";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";
export type Props = Pick<ProductListingPage, "sortOptions"> & {
  url: string;
};
const getUrl = (href: string, value: string) => {
  const url = new URL(href);
  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);
  return url.href;
};
const labels: Record<string, string> = {
  "relevance:desc": "Relevanta",
  "price:desc": "Pret descrescator",
  "price:asc": "Pret crescator",
  "orders:desc": "Cele mai vandute",
  "name:desc": "Nume Z-A",
  "name:asc": "Nume A-Z",
  "release:desc": "Cele mai noi",
  "discount:desc": "Discount %",
};
function Sort({ sortOptions, url }: Props) {
  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));
  const currentLabel = options?.find(({ value }) => value === current)?.label ??
    "relevance:desc";
  const isDesktop = useDevice() === "desktop";

  return (
    <div
      class={clx(
        "flex items-center gap-2 relative",
        !isDesktop && "py-4 px-6 rounded-full border border-[#ccc]",
      )}
    >
      {isDesktop && (
        <label for="sort" class="text-[#676976] whitespace-nowrap">
          Ordoneaza dupa
        </label>
      )}

      <div
        tabIndex={-1}
        class="group flex items-center gap-4 whitespace-nowrap cursor-pointer"
      >
        <span class={isDesktop ? "font-bold text-[#33343b]" : "text-[#676976]"}>
          {labels[currentLabel]}
        </span>
        <Icon
          id="chevron-right-bold"
          size={12}
          class="text-[#f68e1e] rotate-90"
        />

        <div class="absolute -top-0.5 -left-0.5 hidden group-focus-within:flex w-[calc(100%+4px)] flex-col border border-[#e3e4e6] rounded-sm shadow-[4px_4px_8px_0_rgba(0,0,0,.2)] z-10 min-w-[180px]">
          {options.map(({ value, label }) => (
            <button
              type="button"
              class={clx(
                "py-3 px-4 text-[#333] text-left",
                value === current
                  ? "bg-[#e3e4e6]"
                  : "bg-[#f8f8f8] hover:bg-[#f2f4f5]",
              )}
              hx-on:mousedown={useScript((value) => {
                location.href = value;
              }, value)}
            >
              {labels[label]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Sort;
