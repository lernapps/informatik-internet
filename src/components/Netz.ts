// Shared parts of the network map that NetzSimulator and NetzWeg draw: the stations (devices, routers, servers, the
// DNS server) with their place on the map, the cables between them, and small pure helpers. Every address in the
// app's maps comes from the documentation ranges of RFC 5737, every name from the reserved .example (RFC 2606).
// Written for lernapps/informatik-internet (#502).

/** What a station is: a device of a person, a router, a server, the DNS server. */
export type Kind = "geraet" | "router" | "server" | "dns";

/** A station of the network map; `x` from 0 to 100 and `y` from 0 to 60 are its place. */
export interface Station {
  id: string;
  kind: Kind;
  name: string;
  address?: string;
  x: number;
  y: number;
  above?: boolean;
}

/** A cable between two stations, by their ids. */
export interface Cable {
  from: string;
  to: string;
}

/** The key of a cable, the same in both directions. */
export const cableKey = (a: string, b: string): string => (a < b ? `${a}|${b}` : `${b}|${a}`);

/** Whether a cable joins the two stations. */
export function joined(cables: readonly Cable[], a: string, b: string): boolean {
  return cables.some((cable) => cableKey(cable.from, cable.to) === cableKey(a, b));
}

/** The station with this id. */
export function station(stations: readonly Station[], id: string): Station | undefined {
  return stations.find((candidate) => candidate.id === id);
}

/** The name of the station with this id, or the id itself. */
export const nameOf = (stations: readonly Station[], id: string): string => station(stations, id)?.name ?? id;

/** The stations joined to `id` by a cable. */
export function neighbours(stations: readonly Station[], cables: readonly Cable[], id: string): Station[] {
  return stations.filter((candidate) => candidate.id !== id && joined(cables, id, candidate.id));
}

/**
 * The shortest way from `start` to `goal` that passes only routers in between, as the ids after `start`; undefined
 * when there is none. Breadth first, neighbours in the order of `stations`, so the same map always gives the same way.
 */
export function shortestWay(
  stations: readonly Station[],
  cables: readonly Cable[],
  start: string,
  goal: string,
): string[] | undefined {
  const before = new Map<string, string>([[start, start]]);
  const queue = [start];
  while (queue.length > 0) {
    const here = queue.shift() as string;
    for (const next of neighbours(stations, cables, here)) {
      if (before.has(next.id)) continue;
      before.set(next.id, here);
      if (next.id === goal) {
        const way = [goal];
        let back = before.get(goal) as string;
        while (back !== start) {
          way.unshift(back);
          back = before.get(back) as string;
        }
        return way;
      }
      if (next.kind === "router") queue.push(next.id);
    }
  }
  return undefined;
}

/** A small seeded random generator (mulberry32), as in the template's ProzentFeld. */
export function random(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A text with each {key} replaced by its value; an unknown key stays as it is. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (all, key: string) => (key in values ? String(values[key]) : all));
}
