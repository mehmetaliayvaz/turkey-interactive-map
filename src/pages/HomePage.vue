<template>
  <div class="mx-auto flex min-h-0 w-full max-w-[1700px] flex-1 flex-col gap-3 px-3 pb-3 pt-3 sm:px-5">
    <div class="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <!-- ====== SOL MENÜ (kendi içinde kayar, ekrana sığar) ====== -->
      <aside class="order-2 min-h-0 lg:order-1 lg:h-full">
        <SidebarPanel />
      </aside>

      <!-- ====== HARİTA ALANI ====== -->
      <section class="order-1 flex min-h-0 flex-col gap-2 lg:order-2 lg:h-full max-lg:h-[46vh]">
        <div class="relative min-h-0 flex-1">
          <TurkeyMap>
            <template #overlay>
              <CityInfoPanel />
            </template>
          </TurkeyMap>
        </div>

        <div class="flex flex-none flex-wrap items-center gap-x-5 gap-y-1.5 px-1 text-xs text-slate-400">
          <span class="inline-flex items-center gap-1.5"><span class="rounded bg-slate-200 px-1.5 py-0.5 font-bold text-slate-600">{{ t("hintDrag") }}</span> {{ t("hintDragRes") }}</span>
          <span class="inline-flex items-center gap-1.5"><span class="rounded bg-slate-200 px-1.5 py-0.5 font-bold text-slate-600">{{ t("hintWheel") }}</span> {{ t("hintWheelRes") }}</span>
          <span class="inline-flex items-center gap-1.5"><span class="rounded bg-slate-200 px-1.5 py-0.5 font-bold text-slate-600">{{ t("hintClick") }}</span> {{ t("hintClickRes") }}</span>
          <span class="inline-flex items-center gap-1.5"><span class="rounded bg-slate-200 px-1.5 py-0.5 font-bold text-slate-600">{{ t("hintDbl") }}</span> {{ t("hintDblRes") }}</span>
          <span class="inline-flex items-center gap-1.5"><span class="rounded bg-slate-200 px-1.5 py-0.5 font-bold text-slate-600">{{ t("hintSameColor") }}</span> {{ t("hintDeselect") }}</span>
          <span class="inline-flex items-center gap-1.5"><span class="rounded bg-slate-200 px-1.5 py-0.5 font-bold text-slate-600">{{ t("hintEmpty") }}</span> {{ t("hintDeselect") }}</span>
          <span class="ml-auto hidden items-center gap-2 sm:inline-flex">
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span> {{ t("hintSaved") }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import SidebarPanel from "../components/SidebarPanel.vue";
import TurkeyMap from "../components/TurkeyMap.vue";
import CityInfoPanel from "../components/CityInfoPanel.vue";
import { clearSelection, undo, redo } from "../composables/useMapStore.js";
import { t } from "../composables/useI18n.js";

function onKeydown(e) {
  if (e.key === "Escape") clearSelection();
  const mod = e.ctrlKey || e.metaKey;
  const k = e.key.toLowerCase();
  if (mod && k === "z" && !e.shiftKey) {
    e.preventDefault();
    undo();
  }
  if (mod && (k === "y" || (k === "z" && e.shiftKey))) {
    e.preventDefault();
    redo();
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>