<template>
  <section class="rounded-2xl border border-slate-200/80 p-3.5">
    <div class="mb-2 flex items-end justify-between">
      <div>
        <p class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Boyanan il</p>
        <p class="text-2xl font-extrabold leading-none text-slate-900">
          {{ paintedCount }}<span class="text-sm font-semibold text-slate-400"> / 81</span>
        </p>
      </div>
      <p class="text-sm font-bold text-indigo-600">{{ pct }}%</p>
    </div>
    <div class="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
      <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-500" :style="{ width: pct + '%' }"></div>
    </div>

    <div class="mb-2.5 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
      <span class="text-xs font-semibold text-slate-600">Plaka etiketleri</span>
      <button
        type="button"
        role="switch"
        :aria-checked="state.showLabels"
        class="relative h-5 w-9 flex-none rounded-full transition"
        :class="state.showLabels ? 'bg-indigo-500' : 'bg-slate-300'"
        @click="state.showLabels = !state.showLabels"
      >
        <span class="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all" :class="state.showLabels ? 'left-[18px]' : 'left-0.5'"></span>
      </button>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <button
        type="button"
        class="flex items-center justify-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 active:scale-[.98]"
        @click="savePNG"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        PNG İndir
      </button>
      <button
        type="button"
        class="flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 active:scale-[.98]"
        @click="clearAll"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        Temizle
      </button>
    </div>
  </section>
</template>

<script setup>
import { state, paintedCount, pct, savePNG, clearAll } from "../composables/useMapStore.js";
</script>