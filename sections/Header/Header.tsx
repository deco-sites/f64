import type { LoadingFallbackProps } from "@deco/deco";
import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { chunk } from "jsr:@std/collections";
import Bag from "../../components/header/Bag.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

export interface Logo {
  /**
   * @title Image
   */
  src: ImageWidget;
  width: number;
  height: number;
}

/**
 * @titleBy label
 */
interface LabelLink {
  label: string;
  link: string;
}

/**
 * @titleBy name
 */
interface CategoryItem {
  name: string;
  link: string;
  isPromo?: boolean;
}

/**
 * @titleBy name
 */
interface Category {
  icon: ImageWidget;
  name: string;
  items: CategoryItem[][];
}

/**
 * @titleBy link
 */
interface Banner {
  image: ImageWidget;
  link: string;
}

export interface Props {
  categories: Category[];
  banners: Banner[];
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems: LabelLink[];
  /**
   * @title Telephone number
   */
  tel: LabelLink;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  logoMobile: Logo;
  /**
   * @ignore
   */
  isHome: boolean;
}

const Desktop = (
  { navItems, logo, searchbar, categories, tel, banners, isHome }: Props,
) => {
  const id = useId();

  return (
    <>
      <div class="bg-[#444] relative z-20">
        <div class="container flex items-center justify-between py-3">
          <div class="flex gap-7 items-center flex-1">
            <a href="/">
              <Image
                src={logo.src}
                alt="f64 logo"
                width={logo.width}
                height={logo.height}
                style={{ height: logo.height }}
              />
            </a>

            <Searchbar {...searchbar} />
          </div>

          <div class="flex items-center gap-2">
            <a
              href="#/"
              class="flex items-center gap-1 text-white p-3 hover:bg-[#666] rounded-md"
            >
              <Icon id="user" size={24} />
              <span>Cont</span>
            </a>

            <a
              href="#/"
              class="flex items-center gap-1 text-white p-3 hover:bg-[#666] rounded-md relative"
            >
              <Icon id="heart" size={24} />
              <div class="bg-[#f68e1e] size-5 rounded-full flex justify-center items-center absolute top-0 right-0 text-white text-xs font-bold">
                0
              </div>
            </a>

            <Bag />
          </div>
        </div>
      </div>

      <div class="bg-[#4e4e51] h-10 relative z-20">
        <div class="container flex items-center h-full">
          <div class="px-4 bg-white text-[#333] flex items-center gap-2.5 h-full">
            <Icon id="menu" size={24} />
            <span class="text-sm font-bold">Produse</span>
          </div>

          {navItems.map(({ label, link }) => (
            <a
              href={link}
              class="px-4 hover:text-[#f68e1e] h-full flex items-center text-white transition-all text-sm relative after:w-full after:h-[3px] after:absolute after:left-0 after:bottom-0 after:bg-[#f68e1e] after:opacity-0 after:transition-opacity hover:after:opacity-100"
            >
              <span>{label}</span>
            </a>
          ))}

          <div class="flex items-center gap-2 ml-auto">
            <Icon id="phone" size={24} class="text-[#f68e1e]" />
            <a href={tel.link} class="text-[13px] text-white font-bold">
              {tel.label}
            </a>
          </div>
        </div>
      </div>

      {isHome && (
        <div>
          <div class="container mb-11">
            <div class="fixed left-0 top-0 w-full h-full bg-black/20 pointer-events-none opacity-0 z-10 [&:has(+div_[data-hover]:hover)]:opacity-100" />

            <div class="flex flex-col relative bg-white">
              {categories.map(({ icon, name, items }) => {
                const chunks = chunk(items, 3);

                return (
                  <div class="group w-fit">
                    <div
                      data-hover
                      class="flex items-center gap-2 group/inner px-4 h-10 cursor-pointer bg-white relative hover:z-20 hover:pl-5 [&:has(+div:hover)]:z-20 [&:has(+div:hover)]:pl-5 w-[265px] peer group-first:h-12 group-last:h-12 group-first:pt-3 group-last:pb-3"
                    >
                      <img
                        src={icon}
                        alt=""
                        width={20}
                        height={20}
                        class="object-contain"
                      />
                      <span class="text-[#333] text-sm group-hover/inner:font-bold">
                        {name}
                      </span>
                    </div>

                    <div
                      data-hover
                      class="absolute w-[calc(100%-265px)] top-0 right-0 bg-white px-7 py-10 justify-between hidden peer-hover:flex hover:flex z-20 h-full"
                    >
                      {chunks.map((chunk) => (
                        <div class="flex flex-col gap-4">
                          {chunk.map((innerItems) => (
                            <div class="flex flex-col items-start text-[#333] gap-0.5">
                              {innerItems.map((
                                { link, name, isPromo },
                                index,
                              ) => (
                                <a
                                  href={link}
                                  class={clx(
                                    "text-sm text-[#333] hover:text-[#f68e1e] flex items-center gap-2",
                                    index === 0 && "font-bold",
                                  )}
                                >
                                  {name}
                                  {isPromo && index === 0 && (
                                    <span class="bg-[#f68e1e] text-white text-[11px] px-1 rounded">
                                      Promo
                                    </span>
                                  )}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div
                      id={id}
                      class="absolute w-[calc(100%-265px)] top-0 right-0 bg-white"
                    >
                      <Slider class="carousel w-full">
                        {banners.map(({ image, link }, index) => (
                          <Slider.Item
                            index={index}
                            class="carousel-item w-full"
                          >
                            <a href={link}>
                              <Image
                                src={image}
                                alt=""
                                width={1000}
                                height={500}
                                loading={index === 0 ? "eager" : "lazy"}
                              />
                            </a>
                          </Slider.Item>
                        ))}
                      </Slider>

                      <div class="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-5">
                        {banners.map((_, index) => (
                          <Slider.Dot
                            index={index}
                            class="size-2.5 rounded-full bg-white disabled:bg-[#f68e1e] border border-[#d0d2de]"
                          />
                        ))}
                      </div>
                    </div>

                    <Slider.JS rootId={id} interval={5000} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Mobile = (
  { navItems, logoMobile, searchbar, banners, isHome }: Props,
) => {
  const id = useId();

  return (
    <>
      <div class="flex flex-col gap-2.5 bg-[#444] px-4 py-2.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <Icon id="menu-header" size={20} class="text-white" />

            <a href="/">
              <Image
                src={logoMobile.src}
                alt="f64 logo"
                width={logoMobile.width}
                height={logoMobile.height}
                style={{ height: logoMobile.height }}
              />
            </a>
          </div>

          <div class="flex items-center">
            <a
              href="#/"
              class="flex items-center gap-1 text-white p-3 hover:bg-[#666] rounded-md"
            >
              <Icon id="user" size={24} />
            </a>

            <a
              href="#/"
              class="flex items-center gap-1 text-white p-3 hover:bg-[#666] rounded-md relative"
            >
              <Icon id="heart" size={24} />
              <div class="bg-[#f68e1e] size-5 rounded-full flex justify-center items-center absolute top-0 right-0 text-white text-xs font-bold">
                0
              </div>
            </a>

            <Bag />
          </div>
        </div>

        <Searchbar {...searchbar} />
      </div>

      <div class="flex items-center gap-2 py-2.5 px-2 overflow-x-auto bg-[#edeff4] rounded">
        {navItems.map(({ label, link }) => (
          <a href={link} class="text-sm text-[#676976] py-2 px-2.5 bg-white">
            {label}
          </a>
        ))}
      </div>

      {isHome && (
        <>
          <div id={id} class="relative mb-8">
            <Slider class="carousel">
              {banners.map(({ image, link }, index) => (
                <Slider.Item index={index} class="carousel-item w-full">
                  <a href={link} class="w-full h-full">
                    <Image
                      src={image}
                      alt=""
                      width={650}
                      height={450}
                      class="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </a>
                </Slider.Item>
              ))}
            </Slider>

            <div class="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 bottom-5">
              {banners.map((_, index) => (
                <Slider.Dot
                  index={index}
                  class="size-2.5 rounded-full bg-white disabled:bg-[#f68e1e] border border-[#d0d2de]"
                />
              ))}
            </div>
          </div>

          <Slider.JS rootId={id} interval={5000} />
        </>
      )}
    </>
  );
};

function Header(props: Props) {
  const isDesktop = useDevice() === "desktop";

  return (
    <header>
      {isDesktop ? <Desktop {...props} /> : <Mobile {...props} />}
    </header>
  );
}

export function loader(props: Props, req: Request) {
  const isHome = new URL(req.url).pathname === "/";
  return { ...props, isHome };
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...(props as any)} loading="lazy" />
);
export default Header;
