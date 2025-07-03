import { getLocation, getOrbit, getRocket } from "./space-x-api";
import { format } from "date-fns";

export async function getEntitiesLaunch(
  rocketIds: string[],
  launchpadIds: string[],
  payloadIds: string[]
) {
  const [rockets, launchpads, payloads] = await Promise.all([
    getRocket(rocketIds),
    getLocation(launchpadIds),
    getOrbit(payloadIds),
  ]);

  const rocketMap = new Map(rockets.map((r) => [r.id, r.name]));
  const launchpadMap = new Map(launchpads.map((p) => [p.id, p.name]));
  const payloadMap = new Map(payloads.map((p) => [p.id, p.orbit]));

  return { rocketMap, launchpadMap, payloadMap };
}

export function formatUtcDate(dateString: string) {
  const date = new Date(dateString);
  return format(date, "dd MMMM yyyy HH:mm");
}
