import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "account_circle"
  | "call"
  | "check"
  | "cart"
  | "check-circle"
  | "plus"
  | "chevron-right"
  | "plp-list"
  | "plp-grid"
  | "close"
  | "settings"
  | "error"
  | "favorite"
  | "flower"
  | "heart"
  | "home_pin"
  | "local_shipping"
  | "menu"
  | "chevron-right-bold"
  | "card"
  | "x"
  | "barcode"
  | "menu-header"
  | "round-check"
  | "home"
  | "medal"
  | "delivery"
  | "box"
  | "guarantee"
  | "microphone"
  | "pan_zoom"
  | "search"
  | "sell"
  | "share"
  | "shopping_bag"
  | "phone"
  | "trash"
  | "minus"
  | "user";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="search" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon({ id, size = 24, width, height, ...otherProps }: Props) {
  return (
    <svg {...otherProps} width={width ?? size} height={height ?? size}>
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
