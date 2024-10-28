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

export interface Logo {
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
  tel: LabelLink;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  /**
   * @ignore
   */
  isHome: boolean;
}

const Desktop = (
  { navItems, logo, searchbar, categories, tel, banners, isHome }: Props,
) => {
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
        <div class="container mb-11">
          <div class="fixed left-0 top-0 w-full h-full bg-black/20 pointer-events-none opacity-0 group-hover:opacity-100 z-10 [&:has(+div_[data-hover]:hover)]:opacity-100" />

          <div class="flex flex-col relative py-4 bg-white">
            {categories.map(({ icon, name, items }) => {
              const chunks = chunk(items, 3);

              return (
                <div class="group">
                  <div
                    data-hover
                    class="flex items-center gap-2 group px-4 h-10 cursor-pointer bg-white relative hover:z-20 hover:pl-5 [&:has(+div:hover)]:z-20 [&:has(+div:hover)]:pl-5 w-[265px]"
                  >
                    <Image src={icon} alt="" width={20} height={20} />
                    <span class="text-[#333] text-sm group-hover:font-bold">
                      {name}
                    </span>
                  </div>

                  <div
                    data-hover
                    class="absolute w-[calc(100%-265px)] top-0 right-0 bg-white px-7 py-10 justify-between hidden group-hover:flex hover:flex z-20 h-full"
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

                  <div class="absolute w-[calc(100%-265px)] top-0 right-0 bg-white">
                    <Slider class="carousel w-full">
                      {banners.map(({ image, link }, index) => (
                        <Slider.Item index={index} class="carousel-item w-full">
                          <a href={link}>
                            <Image
                              src={image}
                              alt=""
                              width={1000}
                              height={500}
                            />
                          </a>
                        </Slider.Item>
                      ))}
                    </Slider>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
// const Mobile = ({ logo, searchbar, navItems }: Props) => (
//   <>
//     <Drawer
//       id={SEARCHBAR_DRAWER_ID}
//       aside={
//         <Drawer.Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
//           <div class="w-screen overflow-y-auto">
//             {loading === "lazy"
//               ? (
//                 <div class="h-full w-full flex items-center justify-center">
//                   <span class="loading loading-spinner" />
//                 </div>
//               )
//               : <Searchbar {...searchbar} />}
//           </div>
//         </Drawer.Aside>
//       }
//     />
//     <Drawer
//       id={SIDEMENU_DRAWER_ID}
//       aside={
//         <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
//           {loading === "lazy"
//             ? (
//               <div
//                 id={SIDEMENU_CONTAINER_ID}
//                 class="h-full flex items-center justify-center"
//                 style={{ minWidth: "100vw" }}
//               >
//                 <span class="loading loading-spinner" />
//               </div>
//             )
//             : <Menu navItems={navItems ?? []} />}
//         </Drawer.Aside>
//       }
//     />

//     <div
//       class="grid place-items-center w-screen px-5 gap-4"
//       style={{
//         height: NAVBAR_HEIGHT_MOBILE,
//         gridTemplateColumns:
//           "min-content auto min-content min-content min-content",
//       }}
//     >
//       <label
//         for={SIDEMENU_DRAWER_ID}
//         class="btn btn-square btn-sm btn-ghost"
//         aria-label="open menu"
//       >
//         <Icon id="menu" />
//       </label>

//       {logo && (
//         <a
//           href="/"
//           class="flex-grow inline-flex items-center justify-center"
//           style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
//           aria-label="Store logo"
//         >
//           <Image
//             src={logo.src}
//             alt={logo.alt}
//             width={logo.width || 100}
//             height={logo.height || 13}
//           />
//         </a>
//       )}

//       <label
//         for={SEARCHBAR_DRAWER_ID}
//         class="btn btn-square btn-sm btn-ghost"
//         aria-label="search icon button"
//       >
//         <Icon id="search" />
//       </label>
//       <Bag />
//     </div>
//   </>
// );
function Header(props: Props) {
  const isDesktop = useDevice() === "desktop";

  return (
    <header>
      {isDesktop ? <Desktop {...props} /> : <Desktop {...props} />}
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
