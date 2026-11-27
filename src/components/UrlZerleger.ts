// The logic of UrlZerleger.vue: the learner puts each part of a URL into one of three boxes: protocol, domain name,
// path. A task is one URL of the props, taken apart into its parts; an answer is the box chosen for each part, in the
// order shown, -1 for a part not yet placed. Pure functions, which the build tests over fixed seeds (the exercise
// contract). Made after EvaSortierer of lernapps/informatik-computer (#490), which sorts devices into the IPO boxes the
// same way. Written for lernapps/informatik-internet (#502).

/** A URL of the data file urls: its parts as shown, and the box of each (0 protocol, 1 domain name, 2 path). */
export interface Url {
  teile: string[];
  arten: number[];
}

/** The props the logic needs. */
export interface Props {
  /** The task above the URL. */
  task: string;
  urls: Url[];
  /** The names of the three boxes: protocol, domain name, path. */
  boxes: string[];
  /** What each box holds, by box: shown in the message when a part is in it but does not belong there. */
  rules: string[];
  /** The message when a part is not placed yet. */
  unplaced: string;
  /** The message for a part in a wrong box, with {teil}, {box} (the box chosen) and {regel} (what that box holds). */
  wrong: string;
}

/** The URL of a task. */
export interface Task {
  url: Url;
}

/** The box of each part in the order shown: 0, 1 or 2, -1 for none yet. */
export type Answer = number[];

/** The task of `seed`: the URLs in turn (task 1 the first …). */
export function generate(seed: number, props: Pick<Props, "urls">): Task {
  const count = props.urls.length;
  const url = props.urls[(((Math.floor(seed) - 1) % count) + count) % count] ?? { teile: [], arten: [] };
  return { url };
}

/** Whether every part lies in its box. */
export function check(task: Task, answer: Answer): boolean {
  return answer.length === task.url.arten.length && task.url.arten.every((art, i) => answer[i] === art);
}

/** The right answer: each part in its box. */
export function solution(task: Task): Answer {
  return [...task.url.arten];
}

/** A wrong answer: domain name and path swapped. */
export function wrong(task: Task): Answer {
  return task.url.arten.map((art) => (art === 0 ? 0 : 3 - art));
}

/** The answer of each typical mistake of about.mistakes: domain name and path swapped; the protocol taken for the domain name. */
export function mistakes(task: Task, _props?: Props): (Answer | undefined)[] {
  return [wrong(task), task.url.arten.map((art) => (art === 0 ? 1 : art))];
}

/** A text with {teil}, {box} and {regel} filled in. */
const fill = (text: string, values: Record<string, string>) =>
  text.replace(/\{(teil|box|regel)\}/g, (_, key: string) => values[key] ?? "");

/** The app's message for a wrong answer: a part not placed yet, or the first part in a wrong box with what that box holds. */
export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  if (task.url.teile.some((_, i) => (answer[i] ?? -1) < 0)) return props.unplaced;
  const i = task.url.arten.findIndex((art, k) => answer[k] !== art);
  if (i < 0) return undefined;
  const chosen = answer[i] ?? 0;
  return fill(props.wrong, {
    teil: task.url.teile[i] ?? "",
    box: props.boxes[chosen] ?? "",
    regel: props.rules[chosen] ?? "",
  });
}

/** An answer as text: each part with its box. */
export function show(answer: Answer, task: Task, props: Props, _lang?: string): string {
  return task.url.teile.map((teil, i) => `${teil} → ${props.boxes[answer[i] ?? -1] ?? "–"}`).join(", ");
}

/** The task as a learner reads it, and its solution. */
export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return { task: `${props.task} ${task.url.teile.join("")}`, solution: show(solution(task), task, props) };
}

/** The task once, with {URL}. */
export function template(props: Props, _lang: string): string {
  return `${props.task} {URL}`;
}

/** What sets a task: the URL. */
export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { URL: task.url.teile.join("") };
}

/** What the exercise is, for a tutor. */
export const about = {
  task: {
    de: "Eine URL ist in Teile zerlegt. Das Kind legt jeden Teil mit einem von drei Knöpfen in einen Kasten: Protokoll, Domain oder Pfad. Dann drückt es „Prüfen“.",
    en: "A URL is taken apart. The child puts each part into a box with one of three buttons: protocol, domain name or path. Then they press “Check”.",
  },
  answer: { de: "Für jeden Teil der gewählte Kasten.", en: "The box chosen for each part." },
  correct: {
    de: "Richtig, wenn der Teil vor :// im Kasten Protokoll liegt, der Name des Rechners (bis zum ersten / danach) im Kasten Domain und alles ab diesem / im Kasten Pfad.",
    en: "Right when the part before :// is in the protocol box, the name of the computer (up to the first / after it) in the domain name box and everything from that / on in the path box.",
  },
  mistakes: [
    { de: "Domain und Pfad vertauscht.", en: "Domain name and path swapped." },
    { de: "Das Protokoll für einen Teil der Domain gehalten.", en: "Took the protocol for part of the domain name." },
  ],
};
