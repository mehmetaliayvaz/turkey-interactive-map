// Türkiye haritası için merkezi durum (store) ve eylemler.
// Tüm bileşenler bu modülü import ederek aynı state'i paylaşır.
import { reactive, ref, computed, watch } from "vue";
import cityPaths from "../data/cityPaths.js";
import { CITY_INFO, REGIONS, REGION_MAP, CITIES_BY_REGION } from "../data/cities.js";

export const VB_W = 1024;
export const VB_H = 500;
export const BASE_FILL = "#e2e8f0";
export const STORAGE_KEY = "tmc-map-colors-v2";

export const PALETTE = [
  "#ef4444", "#f97316", "#f59e0b", "#facc15",
  "#84cc16", "#22c55e", "#14b8a6", "#06b6d4",
  "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef",
  "#ec4899", "#f43f5e", "#78716c", "#334155",
];

export { cityPaths as CITY_PATHS };
export { CITY_INFO, REGIONS, REGION_MAP, CITIES_BY_REGION };

/* ---------- kalıcı renkleri yükle ---------- */
let stored = {};
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") stored = parsed;
  }
} catch { /* boş */ }

/* ---------- merkezi durum ---------- */
export const state = reactive({
  colors: stored,
  activeColor: PALETTE[0],
  customColor: PALETTE[0],
  tool: "paint", // 'paint' | 'erase'
  selectedId: null,
  hoverId: null,
  focusId: null,
  showLabels: false,
});

watch(() => state.colors, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state.colors }));
}, { deep: true });

/* ---------- bildirim (toast) ---------- */
export const toastMessage = ref(null);
let toastTimer = null;
export function showToast(msg) {
  toastMessage.value = msg;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { toastMessage.value = null; }, 1800);
}

/* ---------- geçmiş: geri al / yinele ---------- */
const history = ref([{ ...state.colors }]);
const historyIndex = ref(0);
export const canUndo = computed(() => historyIndex.value > 0);
export const canRedo = computed(() => historyIndex.value < history.value.length - 1);

function pushHistory() {
  history.value = history.value.slice(0, historyIndex.value + 1);
  history.value.push({ ...state.colors });
  if (history.value.length > 80) history.value.shift();
  historyIndex.value = history.value.length - 1;
}
function restore(snapshot) {
  Object.keys(state.colors).forEach((k) => delete state.colors[k]);
  Object.assign(state.colors, snapshot);
}
export function undo() {
  if (historyIndex.value > 0) { historyIndex.value--; restore(history.value[historyIndex.value]); }
}
export function redo() {
  if (historyIndex.value < history.value.length - 1) { historyIndex.value++; restore(history.value[historyIndex.value]); }
}

/* ---------- TurkeyMap tarafından kaydedilen üyeler ---------- */
let focusHandler = null;
export function registerFocusHandler(fn) {
  focusHandler = fn;
  return () => { focusHandler = null; };
}
let svgElement = null;
export function registerSvg(svg) {
  svgElement = svg;
  return () => { svgElement = null; };
}

/* ---------- seçim & odak ---------- */
export function selectCity(id) {
  state.selectedId = id;
}
export function focusCity(id) {
  state.selectedId = id;
  state.focusId = id;
  window.setTimeout(() => { state.focusId = null; }, 2400);
  if (focusHandler) focusHandler(id);
  const info = CITY_INFO[id];
  showToast(`${info.name} bulundu${state.colors[id] ? " ✓" : ""}`);
}
export function clearSelection() {
  state.selectedId = null;
}

/* ---------- boyama ---------- */
export function paintCity(id) {
  const cur = state.colors[id];
  if (cur === state.activeColor) { state.selectedId = id; return; }
  pushHistory();
  state.colors[id] = state.activeColor;
  state.selectedId = id;
}
export function eraseCity(id) {
  if (!(id in state.colors)) { state.selectedId = id; return; }
  pushHistory();
  delete state.colors[id];
  state.selectedId = id;
}
export function onPathClick(id) {
  // Silgi aracı: her tıklamada rengi kaldır (seçili kalsın)
  if (state.tool === "erase") {
    eraseCity(id);
    return;
  }
  // Boya aracı:
  if (state.selectedId === id) {
    // Zaten seçili olan ile tekrar tıklandı:
    // - boyasız veya farklı renkte ise BOYA (seçili kalsın)
    // - aynı renkle zaten boyalıysa seçimi kaldır (toggle)
    if (!state.colors[id] || state.colors[id] !== state.activeColor) {
      paintCity(id);
    } else {
      state.selectedId = null;
    }
    return;
  }
  paintCity(id);
}
export function chooseColor(c) {
  state.activeColor = c;
  state.customColor = c;
  // seçili bir il varsa yeni rengi anında uygula
  if (state.selectedId && state.tool === "paint") {
    if (state.colors[state.selectedId] === c) return;
    pushHistory();
    state.colors[state.selectedId] = c;
  }
}

/* ---------- bölgesel boyama ---------- */
export function fillRegion(regionId) {
  pushHistory();
  const col = REGION_MAP[regionId].color;
  CITIES_BY_REGION[regionId].forEach((id) => { state.colors[id] = col; });
  showToast(`${REGION_MAP[regionId].name} Bölgesi boyandı`);
}
export function fillAllRegions() {
  pushHistory();
  REGIONS.forEach((region) => {
    CITIES_BY_REGION[region.id].forEach((id) => { state.colors[id] = region.color; });
  });
  showToast("Tüm bölgeler renklendirildi");
}
export function clearAll() {
  if (Object.keys(state.colors).length === 0) return;
  if (!window.confirm("Tüm illerdeki renkler silinsin mi?")) return;
  pushHistory();
  Object.keys(state.colors).forEach((k) => delete state.colors[k]);
  showToast("Harita temizlendi");
}

/* ---------- renk / stil yardımcıları ---------- */
export function lightenHex(hex, amt) {
  const m = String(hex).match(/^#?([0-9a-f]{6})$/i);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r = Math.round(r + (255 - r) * amt);
  g = Math.round(g + (255 - g) * amt);
  b = Math.round(b + (255 - b) * amt);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
export function fillFor(id) {
  const base = state.colors[id] || BASE_FILL;
  if (state.focusId === id) return lightenHex(base, 0.32);
  if (state.hoverId === id) return lightenHex(base, 0.22);
  return base;
}
export function strokeFor(id) {
  if (state.selectedId === id) return "#0f172a";
  if (state.hoverId === id) return "rgba(255,255,255,.95)";
  return "rgba(15,23,42,0.16)";
}
export function strokeWidthFor(id) {
  if (state.selectedId === id) return 1.6;
  if (state.hoverId === id) return 1.3;
  return 0.75;
}
export function currentColorOf(id) {
  return state.colors[id] || BASE_FILL;
}
export function cityLabel(id) {
  return CITY_INFO[id]?.plate ?? "";
}

/* ---------- istatistik ---------- */
export const paintedCount = computed(() => Object.keys(state.colors).length);
export const pct = computed(() => Math.round((paintedCount.value / cityPaths.length) * 100));
export function regionPainted(regionId) {
  return CITIES_BY_REGION[regionId].filter((id) => state.colors[id]).length;
}
export function formatNum(n) {
  return Number(n).toLocaleString("tr-TR");
}

/* ---------- PNG dışa aktarma ---------- */
export function savePNG() {
  const svg = svgElement;
  if (!svg) return;
  // Canlı SVG'yi değiştirmeden klonla; boyutları netleştir, stili ve harita
  // çevrimini (pan/zoom) temizle ki tüm harita dışa aktarılsın.
  const clone = svg.cloneNode(true);
  const mapGroup = clone.querySelector("g[data-map-group]");
  if (mapGroup) mapGroup.removeAttribute("transform");
  clone.removeAttribute("style");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", VB_W);
  clone.setAttribute("height", VB_H);
  const raw = new XMLSerializer().serializeToString(clone);

  const width = VB_W * 2;
  const height = VB_H * 2;
  const blob = new Blob([raw], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    }
    URL.revokeObjectURL(url);
    const a = document.createElement("a");
    a.download = "turkiye-haritasi.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
    showToast("PNG indirildi 🎉");
  };
  img.onerror = () => { URL.revokeObjectURL(url); showToast("Dışa aktarma başarısız"); };
  img.src = url;
}