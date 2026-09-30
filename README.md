# 🗺️ İnteraktif Türkiye Haritası / Interactive Turkey Map

Türkiye'nin 81 ilini keşfedebileceğin, inceleyebileceğin ve dışa aktarabileceğin interaktif harita uygulaması.
— An interactive map app to explore, discover and export Turkey's 81 provinces.

Yapı: **Vue 3 + Vite + Tailwind CSS 4** · Built with **Vue 3 + Vite + Tailwind CSS 4**

---

## ✨ Özellikler / Features

| 🇹🇷 Türkçe | 🇬🇧 English |
| --- | --- |
| 🖌️ **Boyama / Silme** — Paletteki renkle ile tıkla; silgi aracıyla rengi kaldır. | **Paint / Erase** — Click a province with the selected color; use the eraser to remove it. |
| 🎨 **Renk Paleti** — 16 hazır renk + özel renk seçici. Seçili il varken paletten renk seçince renk anında o ile uygulanır. | **Color palette** — 16 preset colors + custom color picker. Selecting a color while a province is selected immediately applies it to that province. |
| 🗺️ **Bölgeye Göre Boyama** — 7 coğrafi bölgeye tek tıkla renk ver veya tüm bölgeleri kendi renkleriyle otomatik boya. | **Region fill** — Color an entire region in one click, or auto-color every region with its own color. |
| 🔍 **Arama** — İl adı veya plaka ile ara; sonuç haritada yakınlaştırılıp vurgulanır. | **Search** — Search by province name or plate number; the result is zoomed into and highlighted on the map. |
| 🔎 **Pan & Zoom** — Sürükleyerek kaydır, tekerlekle/çift tıkla yakınlaştır. | **Pan & zoom** — Drag to move, scroll or double-click to zoom. |
| 🏷️ **Plaka Etiketleri** — Harita üzerinde il plakalarını göster. | **Plate labels** — Show province plate numbers on the map. |
| ℹ️ **İl Bilgi Kartı** — Plaka, bölge, yüzölçümü ve nüfus bilgisi. | **Province info card** — Plate, region, area and population info. |
| ↩️ **Geri Al / Yinele** — Tüm boyama işlemleri için geçmiş (Ctrl+Z / Ctrl+Y). | **Undo / Redo** — History for every painting action (Ctrl+Z / Ctrl+Y). |
| 💾 **Otomatik Kayıt** — Renkler tarayıcıda (localStorage) saklanır. | **Auto-save** — Colors persist in the browser (localStorage). |
| 📥 **PNG Dışa Aktarma** — Boyadığın haritayı yüksek çözünürlüklü PNG olarak indir. | **Export as PNG** — Download your colored map as a high-resolution PNG. |

---

## 🎮 Kullanım İpuçları / Usage Tips

| 🖱️ Eylem / Action | 🇹🇷 Türkçe | 🇬🇧 English |
| --- | --- | --- |
| Sürükle / Drag | Haritayı kaydır. | Pan the map. |
| Tekerlek / Scroll wheel | Yakınlaştır-uzaklaştır. | Zoom in/out. |
| Tıkla / Click | Seçili renkle boya (veya silgiyle temizle). | Paint with the selected color (or erase). |
| Aynı ile tekrar tıkla / Click same province again | Seçimi kaldır. | Deselect the province. |
| Boş alana tıkla / Click empty space | Seçimi kaldır. | Deselect (clicking anywhere off a province). |
| Çift tık / Double-click | Yakınlaştır. | Zoom in. |
| `Esc` | Seçimi temizle. | Clear selection. |
| `Ctrl+Z` / `Ctrl+Y` (ya da `Ctrl+Shift+Z`) | Geri al / yinele. | Undo / redo. |

---

## 🚀 Kurulum & Çalıştırma / Setup & Run

```bash
npm install
npm run dev        # geliştirme sunucusu / development server
npm run build      # üretim derlemesi / production build
npm run preview    # derlenen sürümü önizle / preview the build
```

---

## 📁 Proje Yapısı / Project Structure

```
src/
├── composables/
│   └── useMapStore.js      # merkezi durum + eylemler / central state & actions
├── data/
│   ├── cityPaths.js        # 81 ilin SVG yol verileri / SVG path data for 81 provinces
│   └── cities.js           # il bilgileri: ad, plaka, bölge, yüzölçümü, nüfus
│                           # city info: name, plate, region, area, population
├── components/
│   ├── SidebarPanel.vue    # sol menü kabı (kendi içinde kayar) / scrollable left panel
│   ├── CitySearch.vue      # il arama / province search
│   ├── ToolPanel.vue       # boya/silgi + geri al/yinele / tools & undo/redo
│   ├── ColorPalette.vue    # renk paleti + özel renk / palette & custom color
│   ├── RegionFiller.vue    # bölgeye göre boyama / region fill
│   ├── StatsPanel.vue      # istatistik, plaka etiketi, PNG, temizle / stats, plates, PNG, reset
│   ├── CityInfoPanel.vue   # seçilen il bilgisi (harita üzerinde kart) / selected province card
│   └── TurkeyMap.vue       # SVG harita, pan/zoom, tooltip / the SVG map, pan/zoom, tooltip
├── pages/
│   └── HomePage.vue        # düzen: sol menü + harita / layout: sidebar + map
├── App.vue                 # başlık ve uygulama kabuğu / header & app shell
└── css/app.css             # global stiller / global styles
```

---

## 📚 Teknolojiler / Tech Stack

- **Vue 3** — `<script setup>` + reaktif store (composable)
- **Vite 6** — hızlı geliştirme sunucusu / dev server & build
- **Tailwind CSS 4** — yardımcı sınıflar ve özel stiller / utilities & custom styles
- **SVG** — 81 il için gömülü yol verisi (pan/zoom + PNG dışa aktarma) / built-in path data for 81 provinces (pan/zoom + PNG export)

---

## 📝 Not / Note

> Nüfus değerleri yaklaşık (ADNKS 2024) rakamlarıdır / Population figures are approximate (ADNKS 2024).
> Renk ve boyama durumun tarayıcıda saklanır / Your colors and painting state are saved in the browser.