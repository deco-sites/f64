import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";

/**
 * @titleBy title
 */
interface Item {
  title: string;
  description: string;
  image: ImageWidget;
  link: string;
}

interface Props {
  title: string;
  items: Item[];
  blogPage: string;
}

export default function Blog({ title, items, blogPage }: Props) {
  return (
    <div class="mb-16 container flex flex-col items-start gap-8">
      <Section.Header title={title} />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-3 mb-2">
        {items.map(({ image, title, description, link }) => (
          <a
            href={link}
            class="flex flex-col gap-8 rounded-xl overflow-hidden group hover:bg-white hover:shadow-[0_10px_20px_0_rgb(51_52_59_/_5%)] transition-colors"
          >
            <Image
              src={image}
              alt=""
              width={300}
              height={300}
              class="w-full h-[300px] object-cover group-hover:scale-105 transition-all duration-[400ms]"
            />
            <div class="px-3 pb-9 flex flex-col gap-8">
              <h3 class="text-[#33343b] font-bold leading-tight">{title}</h3>
              <span class="text-[#676976] leading-normal text-sm">
                {description}
              </span>
            </div>

            <div class="flex-grow hidden sm:block" />
          </a>
        ))}
      </div>

      <a
        href={blogPage}
        target="_blank"
        rel="noreferrer"
        class="text-white bg-[#f68e1e] text-sm font-bold rounded py-2.5 px-12 mx-auto"
      >
        Vezi toate articolele
      </a>
    </div>
  );
}
export const LoadingFallback = () => {
  return <Section.Placeholder height="471px" />;
};
