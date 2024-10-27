import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";

export interface Props {
  mobile: ImageWidget;
  desktop: ImageWidget;
  /** @title Describe the image */
  alt: string;
  link: string;
}

function Banner({ mobile, desktop, link, alt }: Props) {
  return (
    <a href={link} class="container mb-11 flex justify-center">
      <Picture>
        <Source
          media="(max-width: 1024px)"
          src={mobile}
          width={625}
          height={300}
        />
        <Source
          media="(min-width: 1024px)"
          src={desktop}
          width={1250}
          height={150}
        />
        <img src={desktop} alt={alt} class="object-cover" />
      </Picture>
    </a>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;

export default Banner;
