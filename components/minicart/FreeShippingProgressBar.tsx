import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const id = useId();
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="w-full shadow-[0_0_10px_rgba(0,0,0,.3)] flex justify-center">
      <div class="flex flex-col w-full gap-3 py-6 max-w-[328px]">
        <progress
          id={id}
          class="[&::-webkit-progress-value]:bg-[#f68e1e] [&::-webkit-progress-bar]:bg-[#979899] w-full h-2.5 rounded overflow-hidden"
          value={percent}
          max={100}
        />
        <span class="text-black text-sm font-bold text-center">
          {remaining > 0
            ? (
              <label for={id}>
                Just {formatPrice(remaining, currency, locale)}{" "}
                left to get free shipping!
              </label>
            )
            : <label for={id}>Beneficiezi de livrare gratuita!</label>}
        </span>
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
