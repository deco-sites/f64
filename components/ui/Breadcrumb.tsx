import type { BreadcrumbList } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import Icon from "./Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="text-sm text-[#676976] max-lg:px-4 truncate">
      <li class="inline">
        <a href="/">
          <Icon id="home" size={18} class="text-[#f68e1e] inline" />
        </a>
        <Icon id="chevron-right" size={14} class="inline-block mx-2" />
      </li>

      {itemListElement
        .filter(({ name, item }) => name && item)
        .map(({ name, item }, index) => {
          const Component = index === itemListElement.length - 1 ? "span" : "a";
          const Props = index === itemListElement.length - 1
            ? { class: "text-[#aaa]" }
            : { href: relative(item), class: "hover:text-[#f68e1e]" };

          return (
            <li class="inline">
              <Component {...Props}>{name}</Component>
              {index < itemListElement.length - 1 && (
                <Icon id="chevron-right" size={14} class="inline-block mx-1" />
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default Breadcrumb;
