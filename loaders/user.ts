import type { Person } from "apps/commerce/types.ts";
import type { AppContext } from "../apps/site.ts";
import { usePlatform } from "../sdk/usePlatform.tsx";

import type { AppContext as AppContextVTEX } from "apps/vtex/mod.ts";

async function loader(
  _: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Person | null> {
  const platform = usePlatform();

  if (platform === "vtex") {
    const vtex = ctx as unknown as AppContextVTEX;

    return await vtex.invoke("vtex/loaders/user.ts");
  }
  if (platform === "shopify") {
    return null;
  }

  throw new Error(`Unsupported platform: ${platform}`);
}

export default loader;
