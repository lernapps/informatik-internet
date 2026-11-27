import { expect, test } from "vite-plus/test";
import { check, describe, generate, mistakes, reason, show, solution, wrong, type Props } from "./UrlZerleger.ts";

const props: Props = {
  task: "Leg jeden Teil in seinen Kasten:",
  urls: [
    { teile: ["https://", "www.schule.example", "/klasse-7b", "/ausflug.html"], arten: [0, 1, 2, 2] },
    { teile: ["http://", "wetter.example", "/heute.html"], arten: [0, 1, 2] },
  ],
  boxes: ["Protokoll", "Domain", "Pfad"],
  rules: ["steht vorn, vor ://", "ist der Name des Rechners", "beginnt mit / nach der Domain"],
  unplaced: "Leg zuerst jeden Teil in einen Kasten.",
  wrong: "„{teil}“ passt nicht zu {box}: Das {regel}.",
};

test("the URLs come in turn and the right boxes pass", () => {
  expect(generate(1, props).url.teile[1]).toBe("www.schule.example");
  expect(generate(2, props).url.teile[1]).toBe("wetter.example");
  expect(generate(3, props).url.teile[1]).toBe("www.schule.example");
  for (let seed = 1; seed <= 50; seed++) {
    const task = generate(seed, props);
    expect(check(task, solution(task))).toBe(true);
    expect(check(task, wrong(task))).toBe(false);
    for (const answer of mistakes(task)) if (answer !== undefined) expect(check(task, answer)).toBe(false);
  }
});

test("every answer of the first URL is checked, and every wrong one has a reason", () => {
  const task = generate(1, props);
  let right = 0;
  for (let code = 0; code < 4 ** 4; code++) {
    const answer = [0, 1, 2, 3].map((i) => (Math.floor(code / 4 ** i) % 4) - 1);
    const ok = answer.every((box, i) => box === task.url.arten[i]);
    expect(check(task, answer)).toBe(ok);
    if (ok) right++;
    else expect(reason(task, answer, props)).toBeTruthy();
  }
  expect(right).toBe(1);
});

test("messages name the part and the box chosen, never the right box", () => {
  const task = generate(1, props);
  expect(reason(task, [0, 1, -1, 2], props)).toBe("Leg zuerst jeden Teil in einen Kasten.");
  expect(reason(task, [0, 2, 1, 1], props)).toBe(
    "„www.schule.example“ passt nicht zu Pfad: Das beginnt mit / nach der Domain.",
  );
  expect(reason(task, solution(task), props)).toBeUndefined();
  expect(show([0, 1, 2, 2], task, props)).toBe(
    "https:// → Protokoll, www.schule.example → Domain, /klasse-7b → Pfad, /ausflug.html → Pfad",
  );
  expect(describe(task, props, "de").task).toBe(`${props.task} ${task.url.teile.join("")}`);
  expect(task.url.teile.join("")).toContain("www.schule.example/klasse-7b/ausflug.html");
});
