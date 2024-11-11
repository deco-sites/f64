import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { clx } from "../../sdk/clx.ts";
import Print from "../../sdk/Print.tsx";
import PriceRange from "../PriceRange.tsx";
import Icon from "../ui/Icon.tsx";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";

interface Props {
  filters: ProductListingPage["filters"];
  url: string;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2 text-[#333]">
      <input
        type="checkbox"
        checked={selected}
        class="hidden peer accent-[#f68e1e] border border-[#e3e4e6]"
      />
      <div class="size-4 border border-[#e3e4e6] rounded-sm flex justify-center items-center peer-checked:bg-[#f68e1e] peer-checked:border-0 group">
        <Icon id="check" size={12} class="text-white" />
      </div>

      <span class="text-sm">
        {label} {quantity > 0 && `(${quantity})`}
      </span>
    </a>
  );
}

function FilterValues({ key, values, url }: FilterToggle & { url: string }) {
  const params = new URL(url).searchParams;
  const filterPriceParam = params.get("filter.price");
  const isDesktop = useDevice() === "desktop";

  let min = 0;
  let max = 0;
  const isPrice = key === "price";

  if (isPrice) {
    if (filterPriceParam) {
      const v = filterPriceParam.split(":").map((value) => Number(value));

      min = v[0];
      max = v[1];
    } else {
      const v = values
        .map(({ value }) => parseRange(value) || { from: 0, to: 0 })
        .reduce(
          (acc, curr) => {
            return [Math.min(acc[0], curr.from), Math.max(acc[1], curr.to)];
          },
          [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
        );

      min = v[0];
      max = v[1];
    }

    if (Math.round(min) === Math.round(max)) {
      return null;
    }
  }

  return (
    <ul
      class={clx(
        "flex flex-col gap-3 lg:gap-1.5 lg:max-h-[200px]",
        !isPrice && "overflow-y-auto",
        !isDesktop && "pb-4",
      )}
    >
      {isPrice ? <PriceRange min={min} max={max} params={values[0].url} /> : (
        values.map((item) => <ValueItem {...item} />)
      )}
    </ul>
  );
}

function Filters({ filters, url }: Props) {
  const isDesktop = useDevice() === "desktop";

  filters = filters.filter(isToggle).filter((filter) =>
    filter.label !== "Departament"
  );
  const selectedFilters = filters.filter(isToggle).flatMap((filter) =>
    filter.values.filter((item) => item.selected)
  );

  // Add selected filters to the top
  if (selectedFilters.length) {
    filters.unshift({
      "@type": "FilterToggle",
      key: "Filtre selectate",
      values: selectedFilters.flat(),
      label: "Filtre selectate",
      quantity: selectedFilters.length,
    });
  }

  const priceFilterIndex = filters.findIndex(({ key }) => key === "price");

  if (priceFilterIndex !== -1) {
    // move price filter to the end
    filters.push(filters.splice(priceFilterIndex, 1)[0]);
  }

  return (
    <ul class={clx("flex flex-col relative", isDesktop && "gap-8 py-4")}>
      <Print data={filters} />

      {filters.filter(isToggle).map((filter, index) => {
        if (isDesktop) {
          return (
            <li class="flex flex-col gap-4">
              <span class="text-[#33343b] font-bold text-[15px]">
                {filter.label}
              </span>
              <FilterValues {...filter} url={url} />
            </li>
          );
        }

        const id = useId();
        const selectedValues = filter.values.filter((item) =>
          item.selected
        ).length;

        return (
          <li>
            <input
              type="checkbox"
              id={id}
              class="hidden peer"
              checked={!!selectedFilters.length && !index}
            />

            <label
              for={id}
              class={clx(
                "flex items-center justify-between px-6 text-[#333] group",
                index ? "py-4" : "pb-3 pt-6",
              )}
            >
              <div class="flex items-center gap-2">
                <span class="text-[#333] text-lg">{filter.label}</span>

                {!!selectedValues && (
                  <>
                    <span class="text-white py-0.5 px-3 text-sm bg-[#979899] rounded-full">
                      {selectedValues}
                    </span>
                    <a
                      href={(() => {
                        const params = new URL(url);
                        params.searchParams.delete(`filter.${filter.key}`);

                        return params.href;
                      })()}
                      class="text-white py-0.5 px-3 text-sm bg-[#979899] rounded-full flex items-center gap-1"
                    >
                      Sterge filtre
                      <Icon id="close" size={12} />
                    </a>
                  </>
                )}
              </div>
              <Icon
                id="chevron-right-bold"
                size={12}
                class="rotate-90 peer-checked:group-[]:-rotate-90 transition-transform text-[#f68e1e]"
              />
            </label>

            <div class="grid grid-rows-[0fr] transition-all peer-checked:grid-rows-[1fr] pl-8 pr-6">
              <div class="overflow-hidden">
                <FilterValues {...filter} url={url} />
              </div>
            </div>
          </li>
        );
      })}

      <div
        class={clx(
          "flex items-center gap-4",
          !isDesktop && "fixed left-3 bottom-3 w-[calc(100%-24px)]",
        )}
      >
        <a
          href={(() => {
            const { origin, pathname } = new URL(url);

            return origin + pathname;
          })()}
          class="text-sm lg:text-white text-[#f68e1e] bg-white lg:bg-[#f68e1e] rounded px-6 h-10 flex justify-center items-center flex-1"
        >
          Sterge filtrele
        </a>
        {!isDesktop && (
          <label
            for="filters-drawer"
            class="text-sm text-white bg-[#f68e1e] rounded px-6 h-10 flex justify-center items-center flex-1"
          >
            Afiseaza
          </label>
        )}
      </div>
    </ul>
  );
}

export default Filters;
