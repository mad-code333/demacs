"use client";

import { NightSkyCanvas } from "./NightSkyCanvas";

/** Client island so the night-sky canvas can run in the root layout. */
export function SiteAtmosphere() {
  return <NightSkyCanvas />;
}
