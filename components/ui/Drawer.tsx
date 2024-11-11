import { useScript } from "@deco/deco/hooks";
import type { ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "./Icon.tsx";
export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
}

const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      return;
    }
    input.checked = false;
  };
  addEventListener("keydown", handler);
};

function Drawer(
  { children, aside, open, class: _class = "", id = useId() }: Props,
) {
  return (
    <>
      <div class={clx("drawer drawer-end", _class)}>
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="drawer-toggle"
          aria-label={open ? "open drawer" : "closed drawer"}
        />

        <div class="drawer-content">{children}</div>

        <aside
          data-aside
          class={clx(
            "drawer-side h-full z-40 overflow-hidden",
            "[[data-aside]&_section]:contents",
          )}
        >
          <label for={id} class="drawer-overlay" />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}
function Aside({
  drawer,
  children,
  title,
}: {
  drawer: string;
  children: ComponentChildren;
  title?: string;
}) {
  return (
    <div data-aside class="bg-base-100 flex flex-col h-full max-w-[100vw]">
      <div class="flex justify-between items-center pl-4 pr-6 pt-3">
        <label for={drawer}>
          <Icon id="x" size={32} />
        </label>
      </div>
      {title && (
        <span class="text-xl text-[#333] font-bold block mt-4 px-6">
          {title}
        </span>
      )}
      {children}
    </div>
  );
}
Drawer.Aside = Aside;
export default Drawer;
