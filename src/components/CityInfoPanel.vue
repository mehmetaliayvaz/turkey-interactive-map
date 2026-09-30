<template>
  <div
    class="pointer-events-auto overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur"
  >
    <!-- seçili yoksa küçük ipucu -->
    <button
      v-if="!selected"
      type="button"
      class="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-xs font-medium text-slate-500 transition hover:bg-slate-50"
      @click="open = !open"
    >
      <svg class="h-4 w-4 flex-none text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
      </svg>
      <span class="flex-1">{{ t("emptyHint") }}</span>
      <svg class="h-3.5 w-3.5 transition-transform" :class="open ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
    </button>

    <div v-else-if="!open">
      <button type="button" class="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left transition hover:bg-slate-50" @click="open = true">
        <span class="inline-flex h-8 w-11 flex-none items-center justify-center rounded-lg text-sm font-extrabold text-white shadow-sm" :style="{ backgroundColor: currentColorOf(selected.id) }">
          {{ selected.plate }}
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-extrabold text-slate-900">{{ selected.name }}</span>
          <span class="inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-bold text-white" :style="{ backgroundColor: REGION_MAP[selected.region].color }">
            {{ REGION_MAP[selected.region].name }}
          </span>
        </span>
        <svg class="h-3.5 w-3.5 flex-none text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>
    </div>

    <div v-else class="p-3">
      <div class="mb-2.5 flex items-center gap-2.5">
        <span class="inline-flex h-9 w-13 flex-none items-center justify-center rounded-lg text-sm font-extrabold text-white shadow-sm" :style="{ backgroundColor: currentColorOf(selected.id) }">
          {{ selected.plate }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-base font-extrabold text-slate-900">{{ selected.name }}</p>
          <span class="inline-flex items-center gap-1 rounded-full px-2 py-px text-[10px] font-bold text-white" :style="{ backgroundColor: REGION_MAP[selected.region].color }">
            {{ REGION_MAP[selected.region].name }}
          </span>
        </div>
        <button
          type="button"
          class="flex-none rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          :aria-label="t('collapse')"
          @click="open = false"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        </button>
      </div>
      <dl class="grid grid-cols-2 gap-1.5 text-xs">
        <div class="rounded-lg bg-slate-50 p-2">
          <dt class="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{{ t("area") }}</dt>
          <dd class="font-bold text-slate-800">{{ formatNum(selected.area) }} km²</dd>
        </div>
        <div class="rounded-lg bg-slate-50 p-2">
          <dt class="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{{ t("population") }}</dt>
          <dd class="font-bold text-slate-800">~{{ formatNum(selected.population) }}</dd>
        </div>
      </dl>
      <p class="mt-1.5 text-[10px] text-slate-400">{{ t("popNote") }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { state, CITY_INFO, REGION_MAP, currentColorOf, formatNum } from "../composables/useMapStore.js";
import { t } from "../composables/useI18n.js";

const open = ref(false);

const selected = computed(() => (state.selectedId ? CITY_INFO[state.selectedId] : null));

// Bir il seçildiğinde kartı otomatik aç (kullanıcı küçültse bile yeni seçimde açılır)
watch(() => state.selectedId, (id) => {
  if (id) open.value = true;
});
</script>