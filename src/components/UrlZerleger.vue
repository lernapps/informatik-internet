<script setup lang="ts">
// A URL taken apart: each part has three buttons, one per box (protocol, domain name, path); the learner presses the
// box each part belongs in, and the part then shows in that box below. Its logic is in UrlZerleger.ts. It is the input
// of the task: it emits the box of each part (-1 for none yet) with answer, and the explainer draws "Prüfen", checks,
// gives the feedback, the task number and "Neue Aufgabe". Made after EvaSortierer of lernapps/informatik-computer
// (#490). Written for lernapps/informatik-internet (#502).
import { computed, ref } from "vue";
import { generate } from "./UrlZerleger.ts";

type Url = {
  /** @verbatim The parts of the URL, in order. */
  teile: string[];
  /** The box of each part: 0 protocol, 1 domain name, 2 path. */
  arten: number[];
};

const props = defineProps<{
  /** The task above the URL. */
  task: string;
  urls: Url[];
  /** The names of the three boxes: protocol, domain name, path. */
  boxes: string[];
  /** What each box holds, used in the message for a wrong answer. */
  rules: string[];
  /** The text in a box with no part yet. */
  empty: string;
  /** The label of the reset button. */
  reset: string;
  /** The message when a part is not placed yet. */
  unplaced: string;
  /** The message for a part in a wrong box, with {teil}, {box} and {regel}. */
  wrong: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer shown now. */
  checked?: boolean;
}>();
const emit = defineEmits<{ answer: [number[] | undefined] }>();

const current = computed(() => generate(props.seed, props));
const placed = ref<number[]>(current.value.url.teile.map(() => -1));

function place(part: number, box: number): void {
  placed.value[part] = box;
  emit("answer", [...placed.value]);
}

function clear(): void {
  placed.value = current.value.url.teile.map(() => -1);
  emit("answer", undefined);
}

const inBox = (box: number) => current.value.url.teile.filter((_, i) => placed.value[i] === box);
</script>

<template>
  <div class="url-zerleger">
    <p>{{ task }}</p>
    <p class="url-zerleger-url">
      <code>{{ current.url.teile.join("") }}</code>
    </p>
    <ul class="url-zerleger-teile">
      <li v-for="(teil, i) in current.url.teile" :key="i">
        <code class="url-zerleger-teil">{{ teil }}</code>
        <span class="url-zerleger-wahl" role="group" :aria-label="teil">
          <button
            v-for="(box, b) in boxes"
            :key="box"
            type="button"
            :class="`url-zerleger-box-${b}`"
            :aria-pressed="placed[i] === b"
            @click="place(i, b)"
          >
            {{ box }}
          </button>
        </span>
      </li>
    </ul>
    <div class="url-zerleger-kaesten" :class="{ 'url-zerleger-geprueft': checked }" aria-hidden="true">
      <div v-for="(box, b) in boxes" :key="box" :class="['url-zerleger-kasten', `url-zerleger-box-${b}`]">
        <strong>{{ box }}</strong>
        <code v-for="teil in inBox(b)" :key="teil" class="url-zerleger-chip">{{ teil }}</code>
        <span v-if="inBox(b).length === 0" class="url-zerleger-leer">{{ empty }}</span>
      </div>
    </div>
    <p>
      <button type="button" class="url-zerleger-reset" @click="clear">{{ reset }}</button>
    </p>
  </div>
</template>

<style scoped>
.url-zerleger-url code {
  font-size: 1.05em;
  overflow-wrap: anywhere;
}

.url-zerleger-teile {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.url-zerleger-teile li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--page-border);
}

.url-zerleger-teil {
  flex: 1 1 9rem;
  font-weight: bold;
  overflow-wrap: anywhere;
}

.url-zerleger-wahl {
  display: flex;
  flex: 1 1 16rem;
  gap: 0.25rem;
}

.url-zerleger button {
  min-height: 44px;
  padding: 0 0.5rem;
  border: 2px solid var(--box, var(--page-border));
  border-radius: 0.5rem;
  background: var(--page-surface);
  color: var(--page-text);
  font: inherit;
  cursor: pointer;
}

.url-zerleger-wahl button {
  flex: 1 1 auto;
  min-width: 0;
}

.url-zerleger-wahl button[aria-pressed="true"] {
  background: var(--box);
  color: #fff;
}

.url-zerleger button:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}

.url-zerleger-box-0 {
  --box: #7b4fb8;
}

.url-zerleger-box-1 {
  --box: #2f5fb3;
}

.url-zerleger-box-2 {
  --box: #a4500f;
}

.url-zerleger-kaesten {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.url-zerleger-kasten {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 5rem;
  padding: 0.5rem;
  border: 3px solid var(--box);
  border-radius: 0.5rem;
  background: var(--page-surface);
  overflow-wrap: anywhere;
}

.url-zerleger-chip {
  padding: 0.1rem 0.3rem;
  border: 1px solid var(--page-border);
  border-radius: 0.3rem;
  background: var(--page-background);
}

.url-zerleger-geprueft .url-zerleger-chip {
  border-style: dashed;
}

.url-zerleger-leer {
  color: var(--page-muted);
}

.url-zerleger-reset {
  --box: var(--page-border);
}

@media (max-width: 30rem) {
  .url-zerleger-kaesten {
    grid-template-columns: 1fr;
  }

  .url-zerleger-kasten {
    min-height: 3rem;
  }
}
</style>
