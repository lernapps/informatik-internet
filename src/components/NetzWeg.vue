<script setup lang="ts">
// An exercise on the network map: the learner sends a packet from the start to the goal by choosing the stations of
// its way one after the other with the buttons below the map; the map draws the cables of the way chosen so far. It is
// the input of the task: it emits the ids chosen with answer, and the explainer draws "Prüfen", checks, gives the
// feedback, the task number and "Neue Aufgabe". Its logic is in NetzWeg.ts. Written for lernapps/informatik-internet (#502).
import { computed, ref } from "vue";
import NetzKarte from "./NetzKarte.vue";
import { cableKey, fill, joined, nameOf } from "./Netz.ts";
import { check, generate, params } from "./NetzWeg.ts";

type Station = {
  /** @verbatim */
  id: string;
  kind: "geraet" | "router" | "server" | "dns";
  /** The name under the station. */
  name: string;
  /** @verbatim The IP address under the name, from RFC 5737. */
  address?: string;
  x: number;
  y: number;
  /** Labels above the station, for a station at the top that cables reach from below. */
  above?: boolean;
};
type Zone = {
  /** The name of the network in the zone's corner. */
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
};
type Cable = {
  /** @verbatim */
  from: string;
  /** @verbatim */
  to: string;
};
type Trip = {
  /** @verbatim */
  start: string;
  /** @verbatim */
  goal: string;
};

const props = defineProps<{
  /** The task, with {start} and {goal}. */
  task: string;
  /** The name of the map, shown above it, e.g. "Karte 3: drei Netze". */
  title: string;
  /** What the map shows, for screen readers. */
  label: string;
  /** Networks drawn as dashed boxes, with their names. */
  zones?: Zone[];
  stations: Station[];
  cables: Cable[];
  trips: Trip[];
  /** The words on the map above start and goal. */
  startMark: string;
  goalMark: string;
  /** The line before the way chosen so far, e.g. "Dein Weg:". */
  wayLabel: string;
  /** The line above the buttons of the stations, e.g. "Nächste Station:". */
  choose: string;
  /** The labels of the buttons that take back the last station and start again. */
  undo: string;
  restart: string;
  /** The messages for a wrong way, used by NetzWeg.ts. */
  empty: string;
  gap: string;
  noRouter: string;
  twice: string;
  short: string;
  /** The line shown once a right route is checked, e.g. that every route over joined routers counts. */
  anyWay: string;
  /** The task number, which the explainer gives. */
  seed: number;
  /** Whether the explainer checked the answer shown now. */
  checked?: boolean;
}>();
const emit = defineEmits<{ answer: [string[] | undefined] }>();

const current = computed(() => generate(props.seed, props));
const way = ref<string[]>([]);
const choices = computed(() => current.value.stations.filter((s) => s.id !== current.value.start));
const used = computed(() => {
  const all = [current.value.start, ...way.value];
  return way.value.flatMap((id, i) => {
    const before = all[i] as string;
    return joined(current.value.cables, before, id) ? [cableKey(before, id)] : [];
  });
});
const marks = computed(() => [
  { id: current.value.start, text: props.startMark },
  { id: current.value.goal, text: props.goalMark },
]);
const names = computed(() => [current.value.start, ...way.value].map((id) => nameOf(current.value.stations, id)));

function set(next: string[]): void {
  way.value = next;
  emit("answer", next.length === 0 ? undefined : [...next]);
}
</script>

<template>
  <div class="netz-weg">
    <p>{{ fill(task, params(current, props, "")) }}</p>
    <p class="netz-titel">{{ title }}</p>
    <NetzKarte
      :label="label"
      :zones="zones ?? []"
      :stations="current.stations"
      :cables="current.cables"
      :used="used"
      :marks="marks"
      :class="{ 'netz-weg-geprueft': checked }"
    />
    <p class="netz-weg-pfad" aria-live="polite">
      {{ wayLabel }} <strong>{{ names.join(" → ") }}</strong>
    </p>
    <p v-if="checked && way.length > 0 && check(current, way)" class="netz-weg-jeder">{{ anyWay }}</p>
    <p class="netz-weg-frage">{{ choose }}</p>
    <div class="netz-weg-stationen" role="group" :aria-label="choose">
      <button v-for="s in choices" :key="s.id" type="button" :class="`netz-weg-${s.kind}`" @click="set([...way, s.id])">
        {{ s.name }}
      </button>
    </div>
    <p class="netz-weg-knoepfe">
      <button type="button" :disabled="way.length === 0" @click="set(way.slice(0, -1))">{{ undo }}</button>
      <button type="button" :disabled="way.length === 0" @click="set([])">{{ restart }}</button>
    </p>
  </div>
</template>

<style scoped>
.netz-weg-stationen,
.netz-weg-knoepfe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.netz-weg button {
  min-height: 44px;
  padding: 0 0.75rem;
  border: 2px solid var(--page-border);
  border-left-width: 0.5rem;
  border-radius: 0.5rem;
  background: var(--page-surface);
  color: var(--page-text);
  font: inherit;
  cursor: pointer;
}

.netz-weg-geraet {
  border-left-color: #2f5fb3 !important;
}

.netz-weg-router {
  border-left-color: #23704a !important;
}

.netz-weg-server {
  border-left-color: #a4500f !important;
}

.netz-weg-dns {
  border-left-color: #7b4fb8 !important;
}

.netz-weg-knoepfe button {
  border-left-width: 2px;
}

.netz-weg button:disabled {
  color: var(--page-muted);
  cursor: default;
}

.netz-weg button:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}

.netz-titel {
  margin: 0.5rem 0 0.25rem;
  font-weight: bold;
}

.netz-weg-pfad {
  margin: 0.5rem 0;
}

.netz-weg-jeder {
  margin: 0.25rem 0;
  font-weight: bold;
}

.netz-weg-frage {
  margin: 0.5rem 0 0.25rem;
}
</style>
