<script setup lang="ts">
// The network map that NetzSimulator and NetzWeg draw: stations with a shape and a colour for each kind (device blue
// box, router green circle with arrows, server orange tower, DNS server purple book), their names and addresses below
// them, the cables, the cables used so far drawn thick, and the packet as an envelope beside the station where it is.
// No text but the props'. It is a picture: the components around it give the same in words.
// Written for lernapps/informatik-internet (#502).
import { computed } from "vue";
import { cableKey, station } from "./Netz.ts";

type Station = {
  /** @verbatim */
  id: string;
  kind: "geraet" | "router" | "server" | "dns";
  name: string;
  /** @verbatim */
  address?: string;
  x: number;
  y: number;
};
type Zone = {
  /** The name in the zone's top left corner, e.g. "Netz der Schule". */
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

const props = defineProps<{
  stations: Station[];
  cables: Cable[];
  /** The keys (cableKey) of the cables drawn thick. */
  /** @verbatim */
  used: string[];
  /** The station the packet is at, if one is shown. */
  /** @verbatim */
  at?: string;
  /** Stations with a ring and a short word above them, e.g. start and goal. */
  marks?: {
    /** @verbatim */
    id: string;
    text: string;
  }[];
  /** Networks drawn as dashed boxes behind the stations, with their names. */
  zones?: Zone[];
  /** What the map shows, for screen readers. */
  label: string;
}>();

const height = computed(() => Math.max(...props.stations.map((s) => s.y)) + 24);
const lines = computed(() =>
  props.cables.flatMap((cable) => {
    const a = station(props.stations, cable.from);
    const b = station(props.stations, cable.to);
    return a && b ? [{ key: cableKey(a.id, b.id), a, b, used: props.used.includes(cableKey(a.id, b.id)) }] : [];
  }),
);
const packet = computed(() => (!props.at ? undefined : station(props.stations, props.at)));
// a long name on two lines, so that neighbours do not overlap
const words = (name: string) => {
  const parts = name.split(" ");
  return name.length > 8 && parts.length > 1 ? [parts.slice(0, -1).join(" "), parts.at(-1) as string] : [name];
};
</script>

<template>
  <svg class="netz-karte" :viewBox="`0 -6 100 ${height + 6}`" role="img" :aria-label="label">
    <g v-for="zone in zones ?? []" :key="zone.name" class="netz-zone">
      <rect :x="zone.x" :y="zone.y" :width="zone.w" :height="zone.h" rx="2" />
      <text :x="zone.x + 1.2" :y="zone.y + 3.6">{{ zone.name }}</text>
    </g>
    <line
      v-for="line in lines"
      :key="line.key"
      :x1="line.a.x"
      :y1="line.a.y + 4"
      :x2="line.b.x"
      :y2="line.b.y + 4"
      :class="['netz-kabel', { 'netz-kabel-benutzt': line.used }]"
    />
    <g v-for="s in stations" :key="s.id" :transform="`translate(${s.x} ${s.y + 4})`" :class="`netz-${s.kind}`">
      <circle v-if="marks?.some((m) => m.id === s.id)" r="6.2" class="netz-ring" />
      <text v-for="m in marks?.filter((m) => m.id === s.id)" :key="m.text" y="-8.6" class="netz-mark">
        {{ m.text }}
      </text>
      <g v-if="s.kind === 'geraet'">
        <rect x="-6" y="-4" width="12" height="8" rx="1.5" class="netz-form" />
        <rect x="-4.5" y="-2.7" width="9" height="5.4" rx="0.6" class="netz-innen" />
      </g>
      <g v-else-if="s.kind === 'router'">
        <circle r="4.6" class="netz-form" />
        <path d="M-2.8 -1.2h5.2m-1.6 -1.4l1.6 1.4l-1.6 1.4M2.8 1.4h-5.2m1.6 -1.4l-1.6 1.4l1.6 1.4" class="netz-linie" />
      </g>
      <g v-else-if="s.kind === 'server'">
        <rect x="-3.8" y="-5.5" width="7.6" height="11" rx="0.8" class="netz-form" />
        <path d="M-2.4 -2.8h4.8M-2.4 0h4.8M-2.4 2.8h4.8" class="netz-linie" />
      </g>
      <g v-else>
        <rect x="-4.5" y="-5" width="9" height="10" rx="0.8" class="netz-form" />
        <path d="M-2.6 -5v10M-1 -2.5h3.6M-1 0h3.6M-1 2.5h3.6" class="netz-linie" />
      </g>
      <text v-for="(word, i) in words(s.name)" :key="i" :y="9.6 + i * 4" class="netz-name">{{ word }}</text>
      <text v-if="s.address" :y="9.6 + words(s.name).length * 4" class="netz-adresse">{{ s.address }}</text>
    </g>
    <g
      v-if="packet"
      class="netz-paeckchen"
      :style="{ transform: `translate(${packet.x + 4.5}px, ${packet.y - 3.5}px)` }"
      aria-hidden="true"
    >
      <rect x="0" y="0" width="7.4" height="5" rx="0.5" />
      <path d="M0.3 0.4l3.4 2.6l3.4 -2.6" />
    </g>
  </svg>
</template>

<style scoped>
.netz-karte {
  display: block;
  width: 100%;
  max-width: 40rem;
  height: auto;
  margin: 0 auto;
}

.netz-zone rect {
  fill: none;
  stroke: var(--page-muted);
  stroke-width: 0.4;
  stroke-dasharray: 1.5 1;
}

.netz-zone text {
  fill: var(--page-muted);
  font-size: 3.2px;
  font-style: italic;
}

.netz-kabel {
  stroke: var(--page-muted);
  stroke-width: 0.6;
}

.netz-kabel-benutzt {
  stroke: var(--page-accent);
  stroke-width: 1.6;
}

.netz-form {
  stroke: var(--page-text);
  stroke-width: 0.4;
}

.netz-geraet .netz-form {
  fill: #2f5fb3;
}

.netz-router .netz-form {
  fill: #23704a;
}

.netz-server .netz-form {
  fill: #a4500f;
}

.netz-dns .netz-form {
  fill: #7b4fb8;
}

.netz-innen {
  fill: #fff;
  opacity: 0.85;
}

.netz-linie {
  fill: none;
  stroke: #fff;
  stroke-width: 0.6;
  stroke-linecap: round;
}

.netz-ring {
  fill: none;
  stroke: var(--page-accent);
  stroke-width: 0.6;
  stroke-dasharray: 1.4 1;
}

.netz-name,
.netz-adresse,
.netz-mark {
  fill: var(--page-text);
  paint-order: stroke;
  stroke: var(--netz-grund, var(--page-background));
  stroke-width: 1.2px;
  stroke-linejoin: round;
  font-size: 3.8px;
  text-anchor: middle;
}

.netz-adresse {
  fill: var(--page-muted);
  font-size: 3.2px;
}

.netz-mark {
  font-weight: bold;
}

.netz-paeckchen {
  transition: transform 0.5s ease;
}

.netz-paeckchen rect {
  fill: #f2c14e;
  stroke: #333;
  stroke-width: 0.4;
}

.netz-paeckchen path {
  fill: none;
  stroke: #333;
  stroke-width: 0.4;
}

@media (prefers-reduced-motion: reduce) {
  .netz-paeckchen {
    transition: none;
  }
}
</style>
