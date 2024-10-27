import type { RichText } from "apps/admin/widgets.ts";
import Section from "../../components/ui/Section.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface Props {
  label: RichText;
  placeholder: string;
}

export default function Newsletter({ label, placeholder }: Props) {
  return (
    <div class="bg-[#f47300]">
      <div class="container flex flex-col lg:flex-row lg:items-center gap-y-6 justify-between !px-4 max-lg:py-6 lg:h-24 relative">
        <div
          dangerouslySetInnerHTML={{ __html: label }}
          class="text-sm text-white [&_strong]:text-xl lg:mb-0"
        />

        <form class="flex flex-col items-start lg:flex-row gap-x-4 gap-y-2.5 w-full max-w-[470px]">
          <input
            name="email"
            type="email"
            placeholder={placeholder}
            class="w-full rounded text-[#676976] text-sm outline-0 px-4 h-10"
          />

          <button
            class="font-medium bg-[#444] text-sm text-white rounded px-8 h-10 whitespace-nowrap"
            type="submit"
          >
            Abonează-te
          </button>
        </form>

        <Icon
          id="flower"
          width={82}
          height={86}
          class="self-end max-lg:absolute bottom-0 right-10"
        />
      </div>
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="412px" />;
