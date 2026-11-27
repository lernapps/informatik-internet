import { expect, test } from "vite-plus/test";
import { packetAt, packetText, usedCables } from "./NetzSimulator.ts";

const steps = [
  { from: "mia", to: "rs", text: "1", packet: "an Ben" },
  { from: "rs", to: "rx", text: "2" },
  { from: "rx", to: "rs", text: "3", packet: "zurück" },
];

test("the packet starts at the first station and follows the steps", () => {
  expect(packetAt(steps, 0)).toBe("mia");
  expect(packetAt(steps, 1)).toBe("rs");
  expect(packetAt(steps, 3)).toBe("rs");
  expect(packetAt(steps, 9)).toBe("rs");
  expect(packetAt([], 0)).toBeUndefined();
});

test("a cable used twice counts once, in either direction", () => {
  expect(usedCables(steps, 0)).toEqual([]);
  expect(usedCables(steps, 3)).toEqual(["mia|rs", "rs|rx"]);
});

test("the packet keeps its text until a step writes a new one", () => {
  expect(packetText(steps, 0)).toBe("an Ben");
  expect(packetText(steps, 2)).toBe("an Ben");
  expect(packetText(steps, 3)).toBe("zurück");
});
