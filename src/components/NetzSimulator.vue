<script setup lang="ts">
// The network simulator: a map of stations and cables (NetzKarte) and a packet that goes one cable further with each
// press of "next step". The list below the map writes every step as a sentence, so the map is never the only way to
// follow it; "from the start" puts the packet back. It sends nothing over a real network: the map, the addresses (RFC
// 5737) and the names (.example, RFC 2606) are props. Its logic is in NetzSimulator.ts.
// Written for lernapps/informatik-internet (#502).
import { computed, ref } from "vue";
import NetzKarte from "./NetzKarte.vue";
import { packetAt, packetText, usedCables } from "./NetzSimulator.ts";

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
type Step = {
  /** @verbatim */
  from: string;
  /** @verbatim */
  to: string;
  /** The step as a sentence, for the list. */
  text: string;
  /** What is written on the packet from this step on, e.g. its address. */
  packet?: string;
};

const props = defineProps<{
  /** The name of the map, shown above it, e.g. "Karte 3: drei Netze". */
  title: string;
  /** What the map shows, for screen readers. */
  label: string;
  /** Networks drawn as dashed boxes, with their names. */
  zones?: Zone[];
  stations: Station[];
  cables: Cable[];
  steps: Step[];
  /** The label of the button that sends the packet one step on. */
  next: string;
  /** The label of the button that puts the packet back. */
  restart: string;
  /** The line before the first step, e.g. what to press. */
  ready: string;
  /** The line after the last step. */
  arrived: string;
  /** The word before what the packet carries, e.g. "Auf dem Päckchen steht:". */
  packetLabel: string;
}>();

const done = ref(0);
const at = computed(() => packetAt(props.steps, done.value));
const used = computed(() => usedCables(props.steps, done.value));
const carries = computed(() => packetText(props.steps, done.value));
const finished = computed(() => done.value >= props.steps.length);
</script>

<template>
  <div class="netz-simulator">
    <p class="netz-titel">{{ title }}</p>
    <NetzKarte :label="label" :stations="stations" :cables="cables" :zones="zones ?? []" :used="used" :at="at ?? ''" />
    <p v-if="carries" class="netz-simulator-paeckchen">
      <span aria-hidden="true">✉</span> {{ packetLabel }} <strong>{{ carries }}</strong>
    </p>
    <p class="netz-simulator-knoepfe">
      <button type="button" :disabled="finished" @click="done++">{{ next }}</button>
      <button type="button" :disabled="done === 0" @click="done = 0">{{ restart }}</button>
    </p>
    <ol class="netz-simulator-liste" aria-live="polite">
      <li v-for="step in steps.slice(0, done)" :key="step.text">{{ step.text }}</li>
    </ol>
    <p class="netz-simulator-stand">{{ done === 0 ? ready : finished ? arrived : "" }}</p>
  </div>
</template>

<style scoped>
.netz-simulator {
  --netz-grund: var(--page-surface);
  margin: 1rem 0;
  padding: 0.75rem;
  border: 1px solid var(--page-border);
  border-radius: 0.5rem;
  background: var(--page-surface);
}

.netz-titel {
  margin: 0 0 0.25rem;
  font-weight: bold;
}

.netz-simulator-paeckchen {
  margin: 0.5rem 0;
}

.netz-simulator-paeckchen span {
  color: #a4500f;
}

.netz-simulator-knoepfe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.netz-simulator-knoepfe button {
  min-height: 44px;
  padding: 0 0.9rem;
  border: 2px solid var(--page-accent);
  border-radius: 0.5rem;
  background: var(--page-surface);
  color: var(--page-text);
  font: inherit;
  cursor: pointer;
}

.netz-simulator-knoepfe button:first-child:not(:disabled) {
  background: var(--page-accent);
  color: var(--page-on-accent);
}

.netz-simulator-knoepfe button:disabled {
  border-color: var(--page-border);
  color: var(--page-muted);
  cursor: default;
}

.netz-simulator button:focus-visible {
  outline: 3px solid var(--page-text);
  outline-offset: 2px;
}

.netz-simulator-liste {
  margin: 0.5rem 0 0;
}

.netz-simulator-stand {
  margin: 0.25rem 0 0;
  color: var(--page-muted);
}

.netz-simulator-stand:empty {
  display: none;
}
</style>
