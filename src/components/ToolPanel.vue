<template>
  <section class="rounded-2xl border border-slate-200/80 p-3.5">
    <h3 class="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.2 15.9 20 14l-6 6 2 2 5.2-6.1z" /><path d="m12 8 1.5-1.5L12 5" /><path d="m5 10 2.5-2.5" /><path d="m2 17 3-3" />
      </svg>
      Araçlar
    </h3>
    <div class="mb-2.5 grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 p-1">
      <button
        type="button"
        :class="state.tool === 'paint' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'"
        class="flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-semibold transition"
        @click="state.tool = 'paint'"
      >
        <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: state.activeColor }"></span>
        Boya
      </button>
      <button
        type="button"
        :class="state.tool === 'erase' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'"
        class="flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-semibold transition"
        @click="state.tool = 'erase'"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
          <path d="M22 21H7" /><path d="m5 11 9 9" />
        </svg>
        Silgi
      </button>
    </div>
    <div class="flex items-center gap-2">
      <button
        type="button"
        :disabled="!canUndo"
        class="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        title="Geri al (Ctrl+Z)"
        @click="undo"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" /></svg>
        Geri al
      </button>
      <button
        type="button"
        :disabled="!canRedo"
        class="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        title="Yinele"
        @click="redo"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 14 5-5-5-5" /><path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" /></svg>
        Yinele
      </button>
      <span class="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-400">
        <span class="h-6 w-4 rounded-sm border border-slate-200" :style="{ backgroundColor: state.tool === 'erase' ? '#f1f5f9' : state.activeColor }"></span>
        <span class="text-slate-500">{{ state.tool === 'erase' ? 'silgi' : 'boya' }}</span>
      </span>
    </div>
  </section>
</template>

<script setup>
import { state, canUndo, canRedo, undo, redo } from "../composables/useMapStore.js";
</script>