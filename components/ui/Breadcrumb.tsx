import type { BreadcrumbList } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import Icon from "./Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="flex text-sm text-[#676976]">
      <li class="flex items-center">
        <a href="/">
          <Icon id="home" size={18} class="text-[#f68e1e]" />
        </a>
        <Icon id="chevron-right" size={14} class="block mx-2" />
      </li>

      {itemListElement
        .filter(({ name, item }) => name && item)
        .map(({ name, item }, index) => {
          const Component = index === itemListElement.length - 1 ? "span" : "a";
          const Props = index === itemListElement.length - 1
            ? { class: "text-[#aaa]" }
            : { href: relative(item), class: "hover:text-[#f68e1e]" };

          return (
            <li class="flex items-center">
              <Component {...Props}>{name}</Component>
              {index < itemListElement.length - 1 && (
                <Icon id="chevron-right" size={14} class="block mx-1" />
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default Breadcrumb;
