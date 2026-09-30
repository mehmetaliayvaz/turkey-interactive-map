<template>
  <div class="app-shell flex min-h-dvh flex-col max-lg:overflow-x-hidden">
    <!-- dekoratif arka plan blob'ları -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 overflow-hidden">
      <div class="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl"></div>
      <div class="absolute -right-24 top-24 h-80 w-80 rounded-full bg-rose-300/30 blur-3xl"></div>
      <div class="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl"></div>
    </div>

    <div class="relative flex min-h-0 flex-1 flex-col">
      <header class="flex-none border-b border-slate-200/60 bg-white/70 backdrop-blur-md">
        <div class="mx-auto flex w-full max-w-[1700px] items-center gap-3 px-3 py-2.5 sm:px-5">
          <div class="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-md shadow-rose-500/30 sm:h-10 sm:w-10">
            <svg class="h-5 w-5 text-white sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.5 13 6l3.5 1-3.5 1L12 11.5 11 8 7.5 7 11 6 12 2.5z" />
              <path d="M19 10.5 19.6 12.7l2 .6-2 .6-.6 2.2-.6-2.2-2-.6 2-.6.6-2.2z" />
              <path d="M5.5 13.5 6 15.5 8 16l-2 .5-.5 2L5 16.5 3 16l2-.5.5-2z" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="truncate text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
              {{ t("appTitle") }} <span class="font-semibold text-slate-400">· 81</span>
            </h1>
            <p class="truncate text-[11px] text-slate-500 sm:text-xs">{{ t("appSubtitle") }}</p>
          </div>
          <div class="ml-auto flex flex-none items-center gap-2">
            <!-- dil seçimi / language switch -->
            <div class="flex flex-none rounded-full border border-slate-200 bg-white p-0.5 shadow-sm">
              <button
                type="button"
                :class="lang === 'tr' ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-700'"
                class="rounded-full px-2.5 py-1 text-xs font-bold transition"
                @click="setLang('tr')"
              >
                TR
              </button>
              <button
                type="button"
                :class="lang === 'en' ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-700'"
                class="rounded-full px-2.5 py-1 text-xs font-bold transition"
                @click="setLang('en')"
              >
                EN
              </button>
            </div>
            <span class="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 sm:inline-flex sm:items-center sm:gap-2">
              <svg class="h-3.5 w-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
              </svg>
              {{ t("headerChip") }}
            </span>
          </div>
        </div>
      </header>

      <main class="flex min-h-0 flex-1 flex-col">
        <HomePage />
      </main>
    </div>
  </div>
</template>

<script setup>
import HomePage from './pages/HomePage.vue';
import { lang, setLang, t } from './composables/useI18n.js';
</script>