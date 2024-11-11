import { formatPrice } from "./format.ts";

export default function parsePrice(price: number) {
  const m = [...formatPrice(price)!.matchAll(/(.+),(.+)/g)].flat().slice(1, 3);

  if (!m.length) throw new Error("Could not parse price");

  return {
    int: m[0],
    cents: m[1],
  };
}
