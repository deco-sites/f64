import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
import Section from "../../components/ui/Section.tsx";

/**
 * @titleBy text
 */
interface Benefit {
  image: ImageWidget;
  text: string;
  textHover: RichText;
}

interface Props {
  benefits: Benefit[];
}

export default function Benefits({ benefits }: Props) {
  const isDesktop = useDevice() === "desktop";

  if (!isDesktop) {
    return null;
  }

  return (
    <div class="flex items-center mb-11 container bg-white">
      {benefits.map((benefit) => (
        <div
          class="flex justify-center items-center gap-4 h-[88px] shrink-0 text-sm relative group"
          style={{ width: `${100 / benefits.length}%` }}
        >
          <img src={benefit.image} alt={benefit.text} />

          <span
            dangerouslySetInnerHTML={{ __html: benefit.text }}
            class="text-center"
          />

          <div class="flex flex-col items-center w-full absolute left-1/2 -translate-x-1/2 top-[65%] pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
            <div
              class="triangle shrink-0"
              style={{ "--triangle-color": "#333", "--triangle-size": "15px" }}
            />
            <div
              class="w-full min-h-[100px] bg-[#333] text-center text-white break-line [&_a]:text-[#f68e1e] [&_a:hover]:underline [&_p:empty]:h-3 p-5 text-[13px] leading-4"
              dangerouslySetInnerHTML={{ __html: benefit.textHover }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
