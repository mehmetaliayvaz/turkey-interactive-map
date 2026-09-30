// Hafif TR/EN dil desteği (harici bağımlılık yok).
// `t(key, vars)` hem component'lerde hem store'da kullanılır.
import { ref } from "vue";

const LANG_KEY = "tmc-lang";

const lang = ref((() => {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "tr" || stored === "en") return stored;
  } catch { /* yoksay */ }
  return "tr";
})());

const messages = {
  tr: {
    appTitle: "İnteraktif Türkiye Haritası",
    appSubtitle: "81 ili keşfet, bölgeleri incele, haritanı PNG olarak indir.",
    headerChip: "81 İl · 7 Bölge",
    mapAria: "Türkiye illeri haritası",
    searchLabel: "İl Ara",
    searchPlaceholder: "İl adı veya plaka… (örn. 34)",
    noResults: "Sonuç bulunamadı.",
    clearSearch: "Aramayı temizle",
    tools: "Araçlar",
    paint: "Boya",
    erase: "Silgi",
    undo: "Geri al",
    redo: "Yinele",
    palette: "Renk Paleti",
    customColor: "Özel renk",
    regionsTitle: "Bölgeyi Boya",
    regionsHint: "Bölgeye tıklayınca o bölgedeki tüm iller boyanır.",
    fillAllRegions: "🗺️ Tüm bölgeleri kendi renkleriyle boya",
    paintedLabel: "Boyanan il",
    plateLabels: "Plaka etiketleri",
    downloadPng: "PNG İndir",
    clearAll: "Temizle",
    area: "Yüzölçümü",
    population: "Nüfus*",
    collapse: "Küçült",
    emptyHint: "Bir ile tıklayınca bilgisi burada görünür",
    popNote: "*Nüfus değerleri yaklaşıktır.",
    hintDrag: "Sürükle",
    hintDragRes: "kaydır",
    hintWheel: "Tekerlek",
    hintWheelRes: "yakınlaştır",
    hintClick: "Tıkla",
    hintClickRes: "boya / sil",
    hintDbl: "Çift tık",
    hintDblRes: "yakınlaştır",
    hintSameColor: "Aynı renkle tekrar tıkla",
    hintDeselect: "seçimi kaldır",
    hintEmpty: "Boş alana tıkla",
    hintSaved: "Tarayıcına kaydedilir",
    zoomIn: "Yakınlaştır",
    zoomOut: "Uzaklaştır",
    resetView: "Görünümü sıfırla",
    plate: "Plaka",
    regionPainted: "{name} Bölgesi boyandı",
    allRegionsPainted: "Tüm bölgeler renklendirildi",
    mapCleared: "Harita temizlendi",
    cityFound: "{name} bulundu",
    pngDownloaded: "PNG indirildi 🎉",
    pngFailed: "Dışa aktarma başarısız",
    clearConfirm: "Tüm illerdeki renkler silinsin mi?",
  },
  en: {
    appTitle: "Interactive Turkey Map",
    appSubtitle: "Explore all 81 provinces, discover regions, and export your map as PNG.",
    headerChip: "81 Provinces · 7 Regions",
    mapAria: "Map of Turkey's provinces",
    searchLabel: "Find Province",
    searchPlaceholder: "Province name or plate… (e.g. 34)",
    noResults: "No results found.",
    clearSearch: "Clear search",
    tools: "Tools",
    paint: "Paint",
    erase: "Eraser",
    undo: "Undo",
    redo: "Redo",
    palette: "Color Palette",
    customColor: "Custom color",
    regionsTitle: "Color a Region",
    regionsHint: "Click a region to color all its provinces.",
    fillAllRegions: "🗺️ Color all regions with their own colors",
    paintedLabel: "Painted provinces",
    plateLabels: "Plate labels",
    downloadPng: "Download PNG",
    clearAll: "Clear",
    area: "Area",
    population: "Population*",
    collapse: "Minimize",
    emptyHint: "Click a province to see its info",
    popNote: "*Population figures are approximate.",
    hintDrag: "Drag",
    hintDragRes: "pan",
    hintWheel: "Scroll wheel",
    hintWheelRes: "zoom",
    hintClick: "Click",
    hintClickRes: "paint / erase",
    hintDbl: "Double-click",
    hintDblRes: "zoom in",
    hintSameColor: "Click again with same color",
    hintDeselect: "deselect",
    hintEmpty: "Click empty space",
    hintSaved: "Saved to your browser",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetView: "Reset view",
    plate: "Plate",
    regionPainted: "{name} region painted",
    allRegionsPainted: "All regions colored",
    mapCleared: "Map cleared",
    cityFound: "{name} found",
    pngDownloaded: "PNG downloaded 🎉",
    pngFailed: "Export failed",
    clearConfirm: "Remove all colors from every province?",
  },
};

export function t(key, vars = {}) {
  const msg = messages[lang.value]?.[key] ?? key;
  return msg.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

// Sekme başlığını seçili dile göre güncelle
export function applyTitle() {
  if (typeof document !== "undefined") {
    document.title = messages[lang.value]?.appTitle ?? "Interactive Turkey Map";
  }
}
applyTitle();

export function setLang(l) {
  if (l === "tr" || l === "en") {
    lang.value = l;
    try { localStorage.setItem(LANG_KEY, l); } catch { /* yoksay */ }
    applyTitle();
  }
}

export { lang };
export function useI18n() {
  return { lang, t, setLang };
}