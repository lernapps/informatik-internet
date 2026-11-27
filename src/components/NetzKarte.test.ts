import { expect, test } from "vite-plus/test";
import { cableKey, fill, joined, nameOf, neighbours, shortestWay, type Station } from "./Netz.ts";

const stations: Station[] = [
  { id: "mia", kind: "geraet", name: "Mias Tablet", x: 10, y: 40 },
  { id: "rs", kind: "router", name: "Router Schule", x: 30, y: 20 },
  { id: "jona", kind: "geraet", name: "Jonas Laptop", x: 10, y: 0 },
  { id: "rx", kind: "router", name: "Router X", x: 50, y: 0 },
  { id: "ry", kind: "router", name: "Router Y", x: 50, y: 40 },
  { id: "ben", kind: "geraet", name: "Bens Handy", x: 90, y: 20 },
];
const cables = [
  { from: "mia", to: "rs" },
  { from: "jona", to: "rs" },
  { from: "rs", to: "rx" },
  { from: "rs", to: "ry" },
  { from: "rx", to: "ben" },
  { from: "ry", to: "ben" },
];

test("a cable joins in both directions", () => {
  expect(cableKey("rs", "mia")).toBe(cableKey("mia", "rs"));
  expect(joined(cables, "ben", "rx")).toBe(true);
  expect(joined(cables, "mia", "ben")).toBe(false);
  expect(neighbours(stations, cables, "rs").map((s) => s.id)).toEqual(["mia", "jona", "rx", "ry"]);
});

test("the shortest way passes only routers", () => {
  expect(shortestWay(stations, cables, "mia", "ben")).toEqual(["rs", "rx", "ben"]);
  expect(shortestWay(stations, cables, "mia", "jona")).toEqual(["rs", "jona"]);
  expect(
    shortestWay(
      stations,
      [
        { from: "mia", to: "jona" },
        { from: "jona", to: "ben" },
      ],
      "mia",
      "ben",
    ),
  ).toBeUndefined();
});

test("names and texts are filled in", () => {
  expect(nameOf(stations, "rx")).toBe("Router X");
  expect(nameOf(stations, "zz")).toBe("zz");
  expect(fill("{start} an {goal} {x}", { start: "A", goal: "B" })).toBe("A an B {x}");
});
