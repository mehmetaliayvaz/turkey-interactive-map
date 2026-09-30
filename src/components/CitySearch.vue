<template>
  <section class="rounded-2xl border border-slate-200/80 p-3.5">
    <label class="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
      İl Ara
    </label>
    <div class="relative">
      <input
        v-model="query"
        type="text"
        placeholder="İl adı veya plaka… (örn. 34)"
        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 pr-9 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
      />
      <button
        v-if="query"
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
        aria-label="Aramayı temizle"
        @click="query = ''"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
    </div>
    <ul v-if="query && matches.length" class="mt-2 max-h-56 overflow-auto rounded-xl border border-slate-100 bg-white shadow-lg">
      <li v-for="m in matches" :key="m.id">
        <button
          type="button"
          class="flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-indigo-50"
          @click="pick(m.id)"
        >
          <span class="inline-flex h-6 w-8 flex-none items-center justify-center rounded-md bg-slate-100 text-[11px] font-bold text-slate-600">{{ m.plate }}</span>
          <span class="truncate font-medium">{{ m.name }}</span>
          <span class="ml-auto shrink-0 text-[11px] font-semibold" :style="{ color: REGION_MAP[m.region].color }">{{ REGION_MAP[m.region].name }}</span>
        </button>
      </li>
    </ul>
    <p v-else-if="query && !matches.length" class="mt-2 text-sm text-slate-400">Sonuç bulunamadı.</p>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { CITY_INFO, REGION_MAP, focusCity } from "../composables/useMapStore.js";

const query = ref("");

const matches = computed(() => {
  const q = query.value.trim().toLocaleLowerCase("tr");
  if (!q) return [];
  return Object.entries(CITY_INFO)
    .map(([id, info]) => ({ id, ...info }))
    .filter((c) => c.name.toLocaleLowerCase("tr").includes(q) || c.plate.startsWith(q))
    .slice(0, 8);
});

function pick(id) {
  focusCity(id);
  query.value = "";
}
</script>