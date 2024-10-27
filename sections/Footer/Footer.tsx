import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";

/**
 * @titleBy text
 */
interface Left {
  icon: ImageWidget;
  text: RichText;
}

/**
 * @titleBy name
 */
interface FooterNavItem {
  name: string;
  link: string;
}

/**
 * @titleBy title
 */
interface FooterNav {
  title: string;
  items: FooterNavItem[];
}

/**
 * @titleBy link
 */
interface Social {
  icon: ImageWidget;
  link: string;
}

/**
 * @titleBy link
 */
interface ImageLink {
  image: ImageWidget;
  link: string;
}

interface Bottom {
  payments: ImageWidget[];
  others: ImageLink[];
  security: ImageLink[];
}

interface Right {
  socials: Social[];
  images: ImageLink[];
}

interface Props {
  footerNav: FooterNav[];
  left: Left[];
  right: Right;
  bottom: Bottom;
}

export default function Footer({ footerNav, left, right, bottom }: Props) {
  const isDesktop = useDevice() === "desktop";

  if (isDesktop) {
    return (
      <>
        <div class="bg-[#444] pt-12 pb-10 px-4">
          <div class="container flex justify-between">
            <div class="flex flex-col gap-5">
              {left.map(({ icon, text }) => (
                <div class="flex items-center gap-3">
                  <Image
                    src={icon}
                    alt=""
                    width={32}
                    height={48}
                    class="w-8 h-12"
                  />
                  <div
                    dangerouslySetInnerHTML={{ __html: text }}
                    class="text-sm [&_strong]:font-bold text-white space-y-0.5"
                  />
                </div>
              ))}
            </div>

            <div class="w-1/2 flex justify-between">
              {footerNav.map(({ title, items }) => (
                <ul class="flex flex-col gap-1">
                  <li class="text-sm font-bold text-white">{title}</li>

                  {items.map(({ name, link }) => (
                    <a href={link} class="text-sm text-[#d0d2de]">
                      {name}
                    </a>
                  ))}
                </ul>
              ))}
            </div>

            <div class="flex flex-col items-end gap-6">
              <div class="flex gap-4">
                {right.socials.map(({ icon, link }) => (
                  <a href={link}>
                    <Image src={icon} alt="" width={25} height={25} />
                  </a>
                ))}
              </div>

              <div class="flex flex-col gap-3">
                {right.images.map(({ image, link }) => (
                  <a href={link}>
                    <Image src={image} alt="" width={200} height={500} />
                  </a>
                ))}
              </div>

              <span class="text-white opacity-50 text-xs">
                Copyright F64.ro © 2001-{new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>

        <div class="container !p-4 flex justify-between">
          <div class="flex items-center gap-3">
            {bottom.payments.map((image) => (
              <img src={image} alt="" loading="lazy" class="object-contain" />
            ))}
          </div>

          <div class="flex items-center gap-3">
            {bottom.others.map(({ image, link }) => (
              <a href={link}>
                <img src={image} alt="" loading="lazy" class="object-contain" />
              </a>
            ))}
          </div>

          <div class="flex items-center gap-4">
            <span class="text-[13px] text-[#33343b] opacity-50">
              Securitate
            </span>

            {bottom.security.map(({ image, link }) => (
              <a href={link}>
                <img src={image} alt="" loading="lazy" class="object-contain" />
              </a>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div class="bg-[#444] px-4 py-7 flex flex-col gap-5">
        <div class="flex items-start justify-between gap-2">
          <div class="flex flex-col gap-5">
            {left.map(({ icon, text }) => (
              <div class="flex items-center gap-3">
                <Image
                  src={icon}
                  alt=""
                  width={32}
                  height={48}
                  class="w-8 h-12"
                />
                <div
                  dangerouslySetInnerHTML={{ __html: text }}
                  class="text-sm [&_strong]:font-bold text-white space-y-0.5"
                />
              </div>
            ))}
          </div>

          <div class="flex gap-x-5 gap-y-3 flex-wrap justify-end flex-1">
            {right.images.map(({ image, link }) => (
              <a href={link}>
                <Image src={image} alt="" width={200} height={500} />
              </a>
            ))}
          </div>
        </div>

        <div class="w-full h-px bg-[#696969]" />

        <div class="flex flex-col gap-2">
          {footerNav.map(({ title, items }) => {
            const id = useId();

            return (
              <div>
                <input type="checkbox" id={id} class="hidden peer" />

                <label
                  for={id}
                  class="font-bold text-lg text-[#d0d2de] group flex items-center justify-between"
                >
                  {title}
                  <Icon
                    id="chevron-right"
                    class="rotate-90 peer-checked:group-[]:-rotate-90 transition-all"
                  />
                </label>

                <div class="group grid transition-all grid-rows-[0fr] peer-checked:grid-rows-[1fr]">
                  <ul class="flex flex-col gap-1 overflow-hidden">
                    {items.map(({ name, link }) => (
                      <a
                        href={link}
                        class="text-sm text-[#d0d2de] pl-3 first:pt-1"
                      >
                        {name}
                      </a>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div class="flex gap-4 mx-auto">
          {right.socials.map(({ icon, link }) => (
            <a href={link}>
              <Image src={icon} alt="" width={25} height={25} />
            </a>
          ))}
        </div>

        <span class="text-white opacity-50 text-xs mx-auto">
          Copyright F64.ro © 2001-{new Date().getFullYear()}
        </span>
      </div>

      <div class="pt-4 pb-6 flex justify-center">
        <div class="flex items-center gap-3">
          {bottom.payments.map((image) => (
            <img src={image} alt="" loading="lazy" class="object-contain" />
          ))}
        </div>
      </div>
    </>
  );
}
