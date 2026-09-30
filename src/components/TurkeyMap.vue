<template>
  <div ref="cardEl" class="relative h-full w-full min-h-0 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-xl shadow-slate-900/5">
    <!-- dekoratif arka plan -->
    <div class="pointer-events-none absolute inset-0 opacity-60" :style="dottedBg"></div>

    <!-- haritayı kart içine ortalayarak sığdır -->
    <div class="absolute inset-0 flex items-center justify-center" @click="onBackgroundClick">
      <svg
        ref="mapSvg"
        :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
        class="relative block touch-none"
        viewBox="0 0 1024 500"
        role="img"
        aria-label="Türkiye illeri haritası"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointerleave="onPointerLeaveCanvas"
        @wheel.prevent="onWheel"
        @mouseleave="onPathLeave"
        @dblclick.prevent="zoomIn"
      >
        <g :transform="viewTransform" data-map-group stroke-linejoin="round" stroke-miterlimit="2">
          <path
            v-for="item in CITY_PATHS"
            :key="item.id"
            :d="item.path"
            :data-id="item.id"
            class="tm-path"
            :class="{ 'focus-flash': state.focusId === item.id }"
            :fill="fillFor(item.id)"
            :stroke="strokeFor(item.id)"
            :stroke-width="strokeWidthFor(item.id)"
            @mouseenter="onPathEnter($event, item.id)"
            @mousemove="onPathMove($event)"
            @mouseleave="onPathLeave"
            @click.stop="onPathClickLocal(item.id)"
          />
          <g
            v-if="state.showLabels && labelsReady"
            font-size="10.5"
            font-weight="700"
            text-anchor="middle"
            fill="#334155"
            style="paint-order: stroke; stroke: #ffffff; stroke-width: 2.6px; stroke-linejoin: round;"
          >
            <text v-for="(c, id) in labelCenters" :key="'lbl-' + id" :x="c.x" :y="c.y">{{ cityLabel(id) }}</text>
          </g>
        </g>
      </svg>
    </div>

    <!-- yakınlaştırma seviyesi -->
    <div class="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
      %{{ Math.round(scale * 100) }}
    </div>

    <!-- yakınlaştırma kontrolleri -->
    <div class="absolute right-3 top-3 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white/90 shadow-lg backdrop-blur">
      <button type="button" class="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-100 active:scale-95" title="Yakınlaştır" @click="zoomStep(1.3)">+</button>
      <div class="h-px bg-slate-200"></div>
      <button type="button" class="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-100 active:scale-95" title="Uzaklaştır" @click="zoomStep(1 / 1.3)">−</button>
      <div class="h-px bg-slate-200"></div>
      <button type="button" class="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-100 active:scale-95" title="Görünümü sıfırla" @click="resetView">
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
        </svg>
      </button>
    </div>

    <!-- alt katman: seçilen il bilgisi vb. (HomePage slot ile verir) -->
    <div class="pointer-events-auto absolute bottom-3 left-3 z-10 w-[min(310px,calc(100%-1.5rem))]">
      <slot name="overlay" />
    </div>

    <!-- tooltip -->
    <div
      v-if="tooltip"
      class="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-xl bg-slate-900 px-3 py-1.5 text-center text-white shadow-xl"
      :style="{ left: tooltip.x + 'px', top: Math.max(tooltip.y - 12, 8) + 'px' }"
    >
      <p class="whitespace-nowrap text-sm font-bold leading-tight">{{ CITY_INFO[tooltip.id]?.name }}</p>
      <p class="whitespace-nowrap text-[11px] leading-tight text-slate-300">Plaka {{ CITY_INFO[tooltip.id]?.plate }}</p>
    </div>

    <!-- bildirim -->
    <transition name="toast">
      <div
        v-if="toastMessage"
        class="absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white shadow-xl backdrop-blur"
      >
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  state, CITY_PATHS, CITY_INFO, VB_W, VB_H,
  fillFor, strokeFor, strokeWidthFor, cityLabel,
  onPathClick, clearSelection, registerFocusHandler, registerSvg,
  toastMessage,
} from "../composables/useMapStore.js";

const cardEl = ref(null);
const mapSvg = ref(null);

/* ---------- pan / zoom ---------- */
const scale = ref(1);
const tx = ref(0);
const ty = ref(0);
const dragging = ref(false);
let dragStart = null;
let moved = false;
let suppressClick = false;

const viewTransform = computed(() => `translate(${tx.value} ${ty.value}) scale(${scale.value})`);

function clampZoom(s) { return Math.min(5, Math.max(0.5, s)); }

function zoomAt(screenX, screenY, factor) {
  const rect = mapSvg.value.getBoundingClientRect();
  const mx = screenX - rect.left;
  const my = screenY - rect.top;
  const rx = (mx / rect.width) * VB_W;
  const ry = (my / rect.height) * VB_H;
  const ns = clampZoom(scale.value * factor);
  const s = scale.value;
  tx.value += rx * (s - ns);
  ty.value += ry * (s - ns);
  scale.value = ns;
}
function zoomStep(factor) {
  const rect = mapSvg.value.getBoundingClientRect();
  zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
}
function zoomIn() { zoomStep(1.35); }
function resetView() { tx.value = 0; ty.value = 0; scale.value = 1; }
function zoomToCity(id) {
  const el = mapSvg.value?.querySelector(`path[data-id="${id}"]`);
  if (!el) return;
  const b = el.getBBox();
  const pad = Math.max(b.width, b.height) * 0.3 + 4;
  const s = clampZoom(Math.min(VB_W / (b.width + pad * 2), VB_H / (b.height + pad * 2)));
  tx.value = VB_W / 2 - (b.x + b.width / 2) * s;
  ty.value = VB_H / 2 - (b.y + b.height / 2) * s;
  scale.value = s;
}

function onPointerDown(e) {
  if (e.button !== 0) return;
  dragging.value = true;
  moved = false;
  suppressClick = false;
  dragStart = { x: e.clientX, y: e.clientY };
  e.target.setPointerCapture?.(e.pointerId);
}
function onPointerMove(e) {
  if (dragging.value && dragStart) {
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) {
      moved = true;
      suppressClick = true;
    }
    if (moved) {
      const rect = mapSvg.value.getBoundingClientRect();
      tx.value += (dx / rect.width) * VB_W;
      ty.value += (dy / rect.height) * VB_H;
      dragStart = { x: e.clientX, y: e.clientY };
    }
  }
}
function onPointerUp() {
  if (dragging.value) dragging.value = false;
  dragStart = null;
}
function onPointerLeaveCanvas() {
  dragging.value = false;
  dragStart = null;
}

// sürüklenip bırakıldıysa oluşabilecek click'i yut: pan yaparken boyama olmasın
function onPathClickLocal(id) {
  if (suppressClick) return;
  onPathClick(id);
}

// haritanın boş alanına (il sınırları dışına) tıklanınca seçimi kaldır
function onBackgroundClick() {
  if (suppressClick) return;
  clearSelection();
}

/* ---------- hover / tooltip ---------- */
const tooltip = ref(null);
function onPathEnter(e, id) {
  state.hoverId = id;
  updateTooltip(e);
}
function onPathMove(e) {
  updateTooltip(e);
}
function onPathLeave() {
  state.hoverId = null;
  tooltip.value = null;
}
function updateTooltip(e) {
  const rect = cardEl.value.getBoundingClientRect();
  tooltip.value = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: state.hoverId };
}

/* ---------- haritayı karta sığdır ---------- */
function fitMap() {
  const svg = mapSvg.value;
  const box = cardEl.value;
  if (!svg || !box) return;
  const cw = box.clientWidth;
  const ch = box.clientHeight;
  if (!cw || !ch) return;
  const ratio = VB_W / VB_H;
  let w = cw;
  let h = w / ratio;
  if (h > ch) { h = ch; w = h * ratio; }
  svg.style.width = Math.floor(w) + "px";
  svg.style.height = Math.floor(h) + "px";
}

let observer = null;
let unregisterFocus = null;

/* ---------- plaka etiketi merkezleri ---------- */
const labelCenters = ref({});
const labelsReady = ref(false);
function computeLabelCenters() {
  const next = {};
  const svg = mapSvg.value;
  if (!svg) return;
  CITY_PATHS.forEach((item) => {
    const el = svg.querySelector(`path[data-id="${item.id}"]`);
    if (el) {
      const b = el.getBBox();
      next[item.id] = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
    }
  });
  labelCenters.value = next;
  labelsReady.value = true;
}

const dottedBg = {
  backgroundImage: "radial-gradient(rgba(15,23,42,0.07) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
};

onMounted(() => {
  unregisterFocus = registerFocusHandler(zoomToCity);
  registerSvg(mapSvg.value);
  observer = new ResizeObserver(fitMap);
  observer.observe(cardEl.value);
  fitMap();
  computeLabelCenters();
});
onBeforeUnmount(() => {
  unregisterFocus?.();
  observer?.disconnect();
});
</script>