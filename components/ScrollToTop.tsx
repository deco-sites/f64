import { useScript } from "@deco/deco/hooks";
import Icon from "./ui/Icon.tsx";

export default function ScrollToTop() {
  return (
    <>
      <button
        id="scroll-to-top"
        type="button"
        class="fixed bottom-8 right-8 z-50 bg-[#f68e1e] px-6 rounded h-10 opacity-0 pointer-events-none transition-opacity"
      >
        <Icon id="chevron-right-bold" size={16} class="text-white -rotate-90" />
      </button>
      <script
        dangerouslySetInnerHTML={{
          __html: useScript(() => {
            const scrollBtn = document.getElementById(
              "scroll-to-top",
            ) as HTMLButtonElement;

            scrollBtn.onclick = () => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            };

            addEventListener(
              "scroll",
              () => {
                const scrollY = window.scrollY;
                const wh = window.innerHeight;

                const percentage = scrollY / (document.body.scrollHeight - wh);

                if (percentage > 0.3) {
                  scrollBtn.classList.remove(
                    "opacity-0",
                    "pointer-events-none",
                  );
                } else {
                  scrollBtn.classList.add("opacity-0", "pointer-events-none");
                }
              },
              { passive: true },
            );
          }),
        }}
      />
    </>
  );
}
