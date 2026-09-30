<template>
  <div class="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur">
    <div class="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
      <CitySearch />
      <ToolPanel />
      <ColorPalette />
      <RegionFiller />
      <StatsPanel />
    </div>
  </div>
</template>

<script setup>
import CitySearch from "./CitySearch.vue";
import ToolPanel from "./ToolPanel.vue";
import ColorPalette from "./ColorPalette.vue";
import RegionFiller from "./RegionFiller.vue";
import StatsPanel from "./StatsPanel.vue";
</script>