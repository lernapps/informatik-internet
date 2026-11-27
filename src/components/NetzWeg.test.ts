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
    solution: "Bens Handy → Router Ben → Router 1 → Router Schule → Jonas Laptop",
  });
  expect(show(["rb"], task)).toBe("Bens Handy → Router Ben");
});
