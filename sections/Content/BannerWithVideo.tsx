import { Picture } from "apps/website/components/Picture.tsx";
import { SourceWithFit } from "../../components/PictureWithFit.tsx";
import type { ImageWidget, VideoWidget } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
import Section from "../../components/ui/Section.tsx";

interface Props {
  desktopImage: ImageWidget;
  mobileImage: ImageWidget;
  videoDesktop: VideoWidget;
  videoMobile: VideoWidget;
}

export default function BannerWithVideo(
  { desktopImage, mobileImage, videoDesktop, videoMobile }: Props,
) {
  const isDesktop = useDevice() === "desktop";

  return (
    <div class="container flex flex-col lg:flex-row justify-center mb-11 lg:h-[400px]">
      <Picture>
        <SourceWithFit
          src={desktopImage}
          media="(min-width: 640px)"
          width={1250}
          height={350}
          fit="contain"
        />
        <SourceWithFit
          src={mobileImage}
          media="(max-width: 639px)"
          width={625}
          height={350}
          fit="contain"
        />
        <img src={desktopImage} alt="Banner" class="h-full mx-auto" />
      </Picture>

      {isDesktop
        ? (
          <div class="w-full h-full">
            <video
              src={videoDesktop}
              autoPlay
              loop
              muted
              playsInline
              class="w-full h-full object-cover"
            />
          </div>
        )
        : (
          <div class="w-full h-full">
            <video
              src={videoMobile}
              autoPlay
              loop
              muted
              playsInline
              class="w-full h-full object-cover"
            />
          </div>
        )}
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="400px" />;
