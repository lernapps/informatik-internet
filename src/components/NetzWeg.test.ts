import { expect, test } from "vite-plus/test";
import { check, describe, generate, mistakes, params, reason, show, solution, wrong, type Props } from "./NetzWeg.ts";

const props: Props = {
  task: "Schick ein Päckchen von {start} zu {goal}.",
  stations: [
    { id: "mia", kind: "geraet", name: "Mias Tablet", x: 8, y: 40 },
    { id: "jona", kind: "geraet", name: "Jonas Laptop", x: 8, y: 0 },
    { id: "rs", kind: "router", name: "Router Schule", x: 28, y: 20 },
    { id: "r1", kind: "router", name: "Router 1", x: 50, y: 0 },
    { id: "r2", kind: "router", name: "Router 2", x: 50, y: 40 },
    { id: "rb", kind: "router", name: "Router Ben", x: 72, y: 20 },
    { id: "ben", kind: "geraet", name: "Bens Handy", x: 92, y: 20 },
  ],
  cables: [
    { from: "mia", to: "rs" },
    { from: "jona", to: "rs" },
    { from: "rs", to: "r1" },
    { from: "rs", to: "r2" },
    { from: "r1", to: "rb" },
    { from: "r2", to: "rb" },
    { from: "rb", to: "ben" },
  ],
  trips: [
    { start: "mia", goal: "ben" },
    { start: "ben", goal: "jona" },
  ],
  empty: "Wähl die erste Station.",
  gap: "Zwischen {from} und {to} liegt kein Kabel.",
  noRouter: "{name} ist kein Router.",
  twice: "{name} kommt zweimal vor.",
  short: "Der Weg endet bei {name}. Wo ist {goal}?",
};

test("every way over cables and routers to the goal is right, the shortest and a longer one", () => {
  const task = { ...generate(1, props), start: "mia", goal: "ben" };
  expect(check(task, ["rs", "r1", "rb", "ben"])).toBe(true);
  expect(check(task, ["rs", "r2", "rb", "ben"])).toBe(true);
  expect(solution(task)).toEqual(["rs", "r1", "rb", "ben"]);
});

test("the typical mistakes are wrong and get their message", () => {
  const task = { ...generate(1, props), start: "mia", goal: "ben" };
  expect(reason(task, [], props)).toBe("Wähl die erste Station.");
  expect(reason(task, ["rs", "rb", "ben"], props)).toBe("Zwischen Router Schule und Router Ben liegt kein Kabel.");
  expect(reason(task, ["rs", "jona"], props)).toBe("Jonas Laptop ist kein Router.");
  expect(reason(task, ["rs", "r1", "rs"], props)).toBe("Router Schule kommt zweimal vor.");
  expect(reason(task, ["rs", "r1", "rb"], props)).toBe("Der Weg endet bei Router Ben. Wo ist Bens Handy?");
  expect(reason(task, solution(task), props)).toBeUndefined();
});

test("over 50 seeds: the solution passes, the wrong way and each mistake fail", () => {
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, props);
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    for (const answer of mistakes(task)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
    expect(Object.keys(params(task, props, "de"))).toEqual(["start", "goal"]);
  }
});

test("describe and show name the stations", () => {
  const task = { ...generate(1, props), start: "ben", goal: "jona" };
  expect(describe(task, props, "de")).toEqual({
    task: "Schick ein Päckchen von Bens Handy zu Jonas Laptop.",
    solution: "Ein möglicher Weg (es gibt mehrere): Bens Handy → Router Ben → Router 1 → Router Schule → Jonas Laptop",
  });
  expect(show(["rb"], task)).toBe("Bens Handy → Router Ben");
});

// Map 4 of the page netz/aufbau, as in its props.
const karte4: Props = {
  ...props,
  stations: [
    { id: "jona", kind: "geraet", name: "Jonas Laptop", x: 10, y: 4 },
    { id: "mia", kind: "geraet", name: "Mias Tablet", x: 10, y: 44 },
    { id: "rs", kind: "router", name: "Router Schule", x: 30, y: 24 },
    { id: "r1", kind: "router", name: "Router 1", x: 50, y: 4 },
    { id: "r2", kind: "router", name: "Router 2", x: 50, y: 44 },
    { id: "rb", kind: "router", name: "Router Ben", x: 70, y: 4 },
    { id: "rl", kind: "router", name: "Router Lea", x: 70, y: 44 },
    { id: "ben", kind: "geraet", name: "Bens Handy", x: 90, y: 4 },
    { id: "lea", kind: "geraet", name: "Leas Tablet", x: 90, y: 44 },
  ],
  cables: [
    { from: "jona", to: "rs" },
    { from: "mia", to: "rs" },
    { from: "rs", to: "r1" },
    { from: "rs", to: "r2" },
    { from: "r1", to: "rb" },
    { from: "r2", to: "rb" },
    { from: "r2", to: "rl" },
    { from: "rb", to: "ben" },
    { from: "rl", to: "lea" },
  ],
  trips: [
    { start: "mia", goal: "ben" },
    { start: "jona", goal: "lea" },
    { start: "lea", goal: "ben" },
    { start: "ben", goal: "mia" },
    { start: "lea", goal: "jona" },
  ],
};

/** Every list of up to `length` station ids (repeats allowed), the start excluded. */
function answers(ids: string[], length: number): string[][] {
  const all: string[][] = [[]];
  let level: string[][] = [[]];
  for (let n = 1; n <= length; n++) {
    level = level.flatMap((answer) => ids.map((id) => [...answer, id]));
    for (const answer of level) all.push(answer);
  }
  return all;
}

test("map 4: every answer up to six stations is checked like an independent rule, and every wrong one has a reason", () => {
  const cable = (a: string, b: string) =>
    karte4.cables.some((c) => (c.from === a && c.to === b) || (c.from === b && c.to === a));
  const router = (id: string) => karte4.stations.find((s) => s.id === id)?.kind === "router";
  for (let seed = 1; seed <= karte4.trips.length; seed++) {
    const task = generate(seed, karte4);
    const ids = karte4.stations.map((s) => s.id).filter((id) => id !== task.start);
    let right = 0;
    for (const answer of answers(ids, 6)) {
      const way = [task.start, ...answer];
      const expected =
        answer.length > 0 &&
        way.at(-1) === task.goal &&
        new Set(way).size === way.length &&
        way.every((id, i) => i === 0 || cable(way[i - 1] as string, id)) &&
        way.slice(1, -1).every(router);
      expect(check(task, answer), `${seed}: ${way.join(" ")}`).toBe(expected);
      if (expected) right++;
      else expect(reason(task, answer, karte4), `${seed}: ${way.join(" ")}`).toBeTruthy();
    }
    expect(right).toBeGreaterThanOrEqual(1);
  }
}, 120_000);
