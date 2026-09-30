<template>
  <section class="rounded-2xl border border-slate-200/80 p-3.5">
    <h3 class="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m3 6 3-1 3 1 3-1 3 1 3-1 3 1" /><path d="M3 6v13" />
      </svg>
      Bölgeyi Boya
    </h3>
    <div class="grid grid-cols-2 gap-1.5">
      <button
        v-for="region in REGIONS"
        :key="region.id"
        type="button"
        :title="`${region.name} Bölgesi'ni boya`"
        class="flex items-center gap-1.5 truncate rounded-lg border border-slate-100 px-2 py-1.5 text-left text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
        @click="fillRegion(region.id)"
      >
        <span class="h-2.5 w-2.5 flex-none rounded-full" :style="{ backgroundColor: region.color }"></span>
        <span class="truncate">{{ region.name }}</span>
        <span class="ml-auto shrink-0 text-[10px] font-bold text-slate-400">{{ regionPainted(region.id) }}/{{ CITIES_BY_REGION[region.id].length }}</span>
      </button>
    </div>
    <button
      type="button"
      class="mt-2 w-full rounded-lg border border-dashed border-slate-300 py-1.5 text-[11px] font-semibold text-slate-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
      @click="fillAllRegions"
    >
      🗺️ Tüm bölgeleri kendi renkleriyle boya
    </button>
  </section>
</template>

<script setup>
import {
  state, REGIONS, CITIES_BY_REGION,
  fillRegion, fillAllRegions, regionPainted,
} from "../composables/useMapStore.js";
</script>