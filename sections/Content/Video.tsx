import { useDevice } from "@deco/deco/hooks";
import type { VideoWidget } from "apps/admin/widgets.ts";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

interface Props {
  videoDesktop: VideoWidget;
  videoMobile: VideoWidget;
  fullWidth?: boolean;
}

export default function BannerWithVideo(
  { videoDesktop, videoMobile, fullWidth }: Props,
) {
  const isDesktop = useDevice() === "desktop";

  return (
    <div
      class={clx(
        "flex flex-col lg:flex-row justify-center mb-11 lg:h-[400px]",
        fullWidth ? "w-full" : "container",
      )}
    >
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
