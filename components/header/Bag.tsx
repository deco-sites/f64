import { useScript } from "@deco/deco/hooks";
import { MINICART_DRAWER_ID } from "../../constants.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;

    if (!counter) return;

    // Set minicart items count on header
    if (count === 0) {
      counter.classList.add("hidden");
    } else {
      counter.classList.remove("hidden");
    }
    counter.innerText = count > 9 ? "9+" : count.toString();
  });

function Bag() {
  const id = useId();

  return (
    <>
      <label
        class="indicator flex items-center gap-2 text-white p-3 hover:bg-[#666] rounded-md"
        for={MINICART_DRAWER_ID}
        aria-label="open cart"
      >
        <div class="relative">
          <Icon id="cart" size={24} />
          <div
            id={id}
            class="bg-[#f68e1e] size-5 rounded-full flex justify-center items-center absolute -top-3 -right-2.5 text-white text-xs font-bold"
          />
        </div>

        <span>Cos</span>
      </label>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}
export default Bag;
