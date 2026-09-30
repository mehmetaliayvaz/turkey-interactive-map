# 🗺️ Interactive Turkey Map / İnteraktif Türkiye Haritası

---

## 🇬🇧 English

An interactive map application to explore, discover and export Turkey's 81 provinces.

Built with **Vue 3 + Vite + Tailwind CSS 4**.

### ✨ Features

- **Search** — Find a province by name or plate number; the result is zoomed into and highlighted on the map.
- **TR / EN Language Switch** — Toggle the interface language (Turkish / English) from the header.
- **Pan & Zoom** — Drag to move the map, use the scroll wheel or double-click to zoom in/out.
- **Color / Erase** — Click a province to color it with the selected color; switch to the eraser to remove the color.
- **Color Palette** — 16 preset colors plus a custom color picker. Selecting a color while a province is selected immediately applies it to that province.
- **Region Fill** — Color an entire region in one click, or auto-color every region with its own color.
- **Plate Labels** — Show province plate numbers on the map (toggleable).
- **Province Info Card** — Hover for a quick tooltip; click for plate, region, area and population details.
- **Undo / Redo** — History for every color action (Ctrl+Z / Ctrl+Y).
- **Auto-save** — Your colors persist in the browser via localStorage.
- **Export as PNG** — Download the map as a high-resolution PNG image.

### 🎮 Usage Tips

| Action | Result |
| --- | --- |
| Drag | Pan the map |
| Scroll wheel / Double-click | Zoom in/out |
| Click a province | Color it (or erase) |
| Click the selected province again with the same color | Deselect it |
| Click empty space | Deselect (anywhere off a province) |
| `Esc` | Clear the selection |
| `Ctrl+Z` / `Ctrl+Y` or `Ctrl+Shift+Z` | Undo / redo |

If you want to recolor a selected province, just pick a new color from the palette — it is applied immediately.

### 🚀 Setup & Run

```bash
npm install
npm run dev        # start the development server
npm run build      # create a production build
npm run preview    # preview the production build
```

### 📁 Project Structure

```
src/
├── composables/
│   ├── useMapStore.js      # central state & actions
│   └── useI18n.js          # TR / EN translations & language switch
├── data/
│   ├── cityPaths.js        # SVG path data for 81 provinces
│   └── cities.js           # city info: name, plate, region, area, population
├── components/
│   ├── SidebarPanel.vue    # scrollable left panel
│   ├── CitySearch.vue      # province search
│   ├── ToolPanel.vue       # color / erase tools & undo/redo
│   ├── ColorPalette.vue    # palette & custom color picker
│   ├── RegionFiller.vue    # region fill
│   ├── StatsPanel.vue      # stats, plate labels, PNG export, reset
│   ├── CityInfoPanel.vue   # selected province card (overlay on the map)
│   └── TurkeyMap.vue       # the SVG map: pan/zoom, tooltip, labels
├── pages/
│   └── HomePage.vue        # layout: sidebar + map
├── App.vue                 # header & app shell
└── css/app.css             # global styles
```

### 📚 Tech Stack

- **Vue 3** — `<script setup>` SFCs + a shared reactive store (composable)
- **Vite 6** — fast dev server & build tooling
- **Tailwind CSS 4** — utility-first styling
- **SVG** — embedded path data for all 81 provinces (enables pan/zoom and PNG export)

### 📝 Notes

- Population figures are approximate (ADNKS 2024).
- Your colors and painting state are saved automatically in the browser.

---

## 🇹🇷 Türkçe

Türkiye'nin 81 ilini keşfedebileceğin, inceleyebileceğin ve dışa aktarabileceğin interaktif harita uygulaması.

**Vue 3 + Vite + Tailwind CSS 4** ile hazırlandı.

### ✨ Özellikler

- **Arama** — İl adı veya plaka ile ara; sonuç haritada yakınlaştırılıp vurgulanır.
- **TR / EN Dil Seçimi** — Başlıktan arayüz dilini değiştir (Türkçe / İngilizce).
- **Pan & Zoom** — Sürükleyerek kaydır, tekerlekle ya da çift tıkla yakınlaştır/uzaklaştır.
- **Boyama / Silme** — Seçili renkle ile tıkla; silgi aracına geçip rengi kaldır.
- **Renk Paleti** — 16 hazır renk + özel renk seçici. Seçili bir il varken paletten renk seçersen renk anında o ile uygulanır.
- **Bölgeye Göre Boyama** — 7 coğrafi bölgeye tek tıkla renk ver veya tüm bölgeleri kendi renkleriyle otomatik boya.
- **Plaka Etiketleri** — Harita üzerinde il plakalarını göster (açıp kapatılabilir).
- **İl Bilgi Kartı** — Üzerine gelince hızlı ipucu; tıklayınca plaka, bölge, yüzölçümü ve nüfus detayı.
- **Geri Al / Yinele** — Tüm boyama işlemleri için geçmiş (Ctrl+Z / Ctrl+Y).
- **Otomatik Kayıt** — Renkler tarayıcıda (localStorage) saklanır.
- **PNG Dışa Aktarma** — Haritayı yüksek çözünürlüklü PNG olarak indir.

### 🎮 Kullanım İpuçları

| Eylem | Sonuç |
| --- | --- |
| Sürükle | Haritayı kaydır |
| Tekerlek / Çift tık | Yakınlaştır / uzaklaştır |
| Bir ile tıkla | Boya (veya silgiyle temizle) |
| Aynı renkle seçili ile tekrar tıkla | Seçimi kaldır |
| Boş alana tıkla | Seçimi kaldır (il dışı her yer) |
| `Esc` | Seçimi temizle |
| `Ctrl+Z` / `Ctrl+Y` veya `Ctrl+Shift+Z` | Geri al / yinele |

Seçili bir ilin rengini değiştirmek istersen paletten yeni renk seçmen yeterli; anında uygulanır.

### 🚀 Kurulum & Çalıştırma

```bash
npm install
npm run dev        # geliştirme sunucusunu başlat
npm run build      # üretim derlemesi oluştur
npm run preview    # derlenen sürümü önizle
```

### 📁 Proje Yapısı

```
src/
├── composables/
│   ├── useMapStore.js      # merkezi durum ve eylemler
│   └── useI18n.js          # TR / EN çevirileri ve dil seçimi
├── data/
│   ├── cityPaths.js        # 81 ilin SVG yol verileri
│   └── cities.js           # il bilgileri: ad, plaka, bölge, yüzölçümü, nüfus
├── components/
│   ├── SidebarPanel.vue    # sol menü kabı (kendi içinde kayar)
│   ├── CitySearch.vue      # il arama
│   ├── ToolPanel.vue       # boya/silgi araçları + geri al/yinele
│   ├── ColorPalette.vue    # renk paleti + özel renk seçici
│   ├── RegionFiller.vue    # bölgeye göre boyama
│   ├── StatsPanel.vue      # istatistik, plaka etiketi, PNG indir, temizle
│   ├── CityInfoPanel.vue   # seçilen il bilgisi (harita üzerinde kart)
│   └── TurkeyMap.vue       # SVG harita: pan/zoom, tooltip, etiketler
├── pages/
│   └── HomePage.vue        # düzen: sol menü + harita
├── App.vue                 # başlık ve uygulama kabuğu
└── css/app.css             # global stiller
```

### 📚 Teknolojiler

- **Vue 3** — `<script setup>` SFC'ler + paylaşılan reaktif store (composable)
- **Vite 6** — hızlı geliştirme sunucusu ve derleme
- **Tailwind CSS 4** — yardımcı sınıf tabanlı stiller
- **SVG** — 81 il için gömülü yol verisi (pan/zoom ve PNG dışa aktarma sağlar)

### 📝 Not

- Nüfus değerleri yaklaşık (ADNKS 2024) rakamlarıdır.
- Renklerin ve boyama durumun tarayıcıda otomatik olarak saklanır.