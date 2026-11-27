// The logic of NetzWeg.vue: on a network map the learner lays the way of a packet from a start to a goal by choosing
// one station after the other. Every way counts that follows the cables, passes only routers in between, uses no
// station twice and ends at the goal; there is often more than one. A task is a trip of the props (start and goal) with
// the map; an answer is the ids of the stations chosen after the start, in order. Pure functions, which the build tests
// over fixed seeds (the exercise contract). Written for lernapps/informatik-internet (#502).
import { fill, joined, nameOf, shortestWay, station, type Cable, type Station } from "./Netz.ts";

/** The props the logic needs. */
export interface Props {
  /** The task, with {start} and {goal} for the names of the two stations. */
  task: string;
  stations: Station[];
  cables: Cable[];
  /** The trips the tasks draw from: start and goal by station id; never two stations with a cable between them. */
  trips: { start: string; goal: string }[];
  /** The message when no station is chosen yet. */
  empty: string;
  /** The message for two stations without a cable between them, with {from} and {to}. */
  gap: string;
  /** The message for a station in between that is no router, with {name}. */
  noRouter: string;
  /** The message for a station chosen twice, with {name}. */
  twice: string;
  /** The message for a way that stops at a router before the goal, with {name} for the last router and {goal}. */
  short: string;
}

/** A task: the map, the start and the goal. */
export interface Task {
  stations: Station[];
  cables: Cable[];
  start: string;
  goal: string;
}

/** The stations chosen after the start, by id, in order. */
export type Answer = string[];

/** The task of `seed`: the trips in turn (task 1 the first trip, task 2 the second …), on the map of the props. */
export function generate(seed: number, props: Pick<Props, "stations" | "cables" | "trips">): Task {
  const count = props.trips.length;
  const trip = props.trips[(((Math.floor(seed) - 1) % count) + count) % count] ?? { start: "", goal: "" };
  return { stations: props.stations, cables: props.cables, start: trip.start, goal: trip.goal };
}

/** What is wrong with a way: the first fault from the start, or undefined when the way is right. */
export function fault(
  task: Task,
  answer: Answer,
): { kind: "empty" | "gap" | "noRouter" | "twice" | "short"; from?: string; to?: string } | undefined {
  if (answer.length === 0) return { kind: "empty" };
  const way = [task.start, ...answer];
  for (let i = 1; i < way.length; i++) {
    const here = way[i] as string;
    const before = way[i - 1] as string;
    if (!joined(task.cables, before, here)) return { kind: "gap", from: before, to: here };
    if (way.indexOf(here) < i) return { kind: "twice", to: here };
    const last = i === way.length - 1;
    if (here === task.goal && last) return undefined;
    // the goal in the middle of the way is a device too: it does not pass the packet on
    if (station(task.stations, here)?.kind !== "router") return { kind: "noRouter", to: here };
  }
  return { kind: "short", to: way.at(-1) as string };
}

/** Whether the way leads from the start to the goal over cables and routers only. */
export function check(task: Task, answer: Answer): boolean {
  return fault(task, answer) === undefined;
}

/** A right way: the shortest one. */
export function solution(task: Task): Answer {
  return shortestWay(task.stations, task.cables, task.start, task.goal) ?? [task.goal];
}

/** A wrong way: the right one without its first router, so that a cable is missing. */
export function wrong(task: Task): Answer {
  return solution(task).slice(1);
}

/**
 * The answer of each typical mistake of about.mistakes: a router left out (a gap); a way through a device or server
 * joined to the first router, where there is one; the way stopping at the last router before the goal.
 */
export function mistakes(task: Task, _props?: Props): (Answer | undefined)[] {
  const right = solution(task);
  const first = right[0] as string;
  const detour = task.stations.find(
    (s) => s.kind !== "router" && s.id !== task.start && s.id !== task.goal && joined(task.cables, first, s.id),
  );
  return [wrong(task), detour ? [first, detour.id] : undefined, right.slice(0, -1)];
}

/** The app's message for a wrong way: what does not fit, never the way itself. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const found = fault(task, answer);
  if (found === undefined) return undefined;
  const name = (id?: string) => (id === undefined ? "" : nameOf(task.stations, id));
  const values = { from: name(found.from), to: name(found.to), name: name(found.to), goal: name(task.goal) };
  return fill(props[found.kind], values);
}

/** An answer as text: the way with arrows, from the start. */
export function show(answer: Answer, task: Task, _props?: Props, _lang?: string): string {
  return [task.start, ...answer].map((id) => nameOf(task.stations, id)).join(" → ");
}

/** The task as a learner reads it, and a right way. */
export function describe(task: Task, props: Props, lang: string): { task: string; solution: string } {
  const lead = lang === "en" ? "One possible route (there are several): " : "Ein möglicher Weg (es gibt mehrere): ";
  return { task: fill(props.task, params(task, props, lang)), solution: lead + show(solution(task), task) };
}

/** The task once, with {start} and {goal}: the prop task. */
export function template(props: Props, _lang: string): string {
  return props.task;
}

/** What sets a task: the names of start and goal. */
export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { start: nameOf(task.stations, task.start), goal: nameOf(task.stations, task.goal) };
}

/** What the exercise is, for a tutor. */
export const about = {
  task: {
    de: "Eine Netzkarte mit Geräten, Routern und Kabeln. Das Kind soll ein Päckchen von einer Station zu einer anderen schicken: Es tippt Station für Station an, vom Start bis zum Ziel, und drückt dann „Prüfen“.",
    en: "A network map with devices, routers and cables. The child sends a packet from one station to another: they tap one station after the other, from the start to the goal, and then press “Check”.",
  },
  answer: {
    de: "Die angetippten Stationen nach dem Start, der Reihe nach.",
    en: "The stations tapped after the start, in order.",
  },
  correct: {
    de: "Richtig ist jeder Weg, bei dem zwischen zwei Stationen immer ein Kabel liegt, dazwischen nur Router sind, keine Station doppelt vorkommt und der Weg am Ziel endet. Es muss nicht der kürzeste sein.",
    en: "Any way is right where a cable joins each two stations in a row, only routers are in between, no station comes twice and the way ends at the goal. It need not be the shortest.",
  },
  mistakes: [
    {
      de: "Einen Router ausgelassen: Zwischen zwei Stationen des Wegs liegt kein Kabel.",
      en: "A router left out: no cable joins two stations of the way.",
    },
    {
      de: "Über ein Gerät oder einen Server gegangen: Nur Router reichen Päckchen weiter.",
      en: "Went through a device or a server: only routers pass packets on.",
    },
    {
      de: "Beim letzten Router aufgehört: Das Ziel fehlt am Ende.",
      en: "Stopped at the last router: the goal is missing at the end.",
    },
  ],
};
