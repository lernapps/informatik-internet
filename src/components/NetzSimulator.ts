// The logic of NetzSimulator.vue: where the packet is and which cables it has used after n steps. Pure functions.
// Written for lernapps/informatik-internet (#502).
import { cableKey } from "./Netz.ts";

/** One step: the packet goes over the cable from one station to the next. */
export interface Step {
  from: string;
  to: string;
  text: string;
  packet?: string;
}

/** The station the packet is at after `done` steps: the start of the first step before any. */
export function packetAt(steps: readonly Step[], done: number): string | undefined {
  return done <= 0 ? steps[0]?.from : steps[Math.min(done, steps.length) - 1]?.to;
}

/** The keys of the cables the first `done` steps used. */
export function usedCables(steps: readonly Step[], done: number): string[] {
  return [...new Set(steps.slice(0, Math.max(0, done)).map((step) => cableKey(step.from, step.to)))];
}

/** What the packet carries after `done` steps: the text of the last step done that has one, else that of the first. */
export function packetText(steps: readonly Step[], done: number): string | undefined {
  const written = steps.slice(0, Math.max(1, done)).filter((step) => step.packet !== undefined);
  return written.at(-1)?.packet;
}
