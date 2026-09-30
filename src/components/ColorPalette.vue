<template>
  <section class="rounded-2xl border border-slate-200/80 p-3.5">
    <h3 class="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </svg>
      {{ t("palette") }}
    </h3>
    <div class="grid grid-cols-8 gap-1.5">
      <button
        v-for="c in PALETTE"
        :key="c"
        type="button"
        :title="c"
        class="aspect-square rounded-lg border border-black/5 transition hover:scale-110"
        :class="state.activeColor === c ? 'ring-2 ring-slate-900 ring-offset-2' : ''"
        :style="{ backgroundColor: c }"
        @click="chooseColor(c)"
      ></button>
    </div>
    <div class="mt-2.5 flex items-center gap-2 rounded-xl bg-slate-50 p-2">
      <label class="relative h-9 w-9 flex-none cursor-pointer overflow-hidden rounded-lg border border-slate-200 shadow-inner" :style="{ backgroundColor: state.activeColor }">
        <input
          v-model="state.customColor"
          type="color"
          class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          :aria-label="t('customColor')"
        />
      </label>
      <div class="min-w-0">
        <p class="text-[11px] font-semibold text-slate-500">{{ t("customColor") }}</p>
        <p class="truncate font-mono text-xs text-slate-400">{{ state.activeColor }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { watch } from "vue";
import { state, PALETTE, chooseColor } from "../composables/useMapStore.js";
import { t } from "../composables/useI18n.js";

// özel renk seçiciden yapılan seçimi aktif renge yansıt
watch(() => state.customColor, (c) => {
  state.activeColor = c;
});
</script>