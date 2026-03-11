# TASK-001 — BTW Berekenen
**Status:** TODO → IN_PROGRESS  
**Branch:** `feature/TASK-001-btw-berekenen`  
**File:** `btw-berekenen/index.html`

---

## Mục tiêu

Xây dựng công cụ BTW Berekenen tại `/btw-berekenen/` — công cụ anh hùng của rekengemak.nl, hỗ trợ đồng thời Hà Lan (0%, 9%, 21%) và Bỉ (0%, 6%, 21%) trong một giao diện duy nhất.

**Quan trọng hơn:** file `btw-berekenen/index.html` là **design template chuẩn** cho toàn bộ 12 công cụ còn lại. Mọi quyết định về layout, màu sắc, component, dark mode, header, footer, ad slots — đều được thiết lập tại đây và tái sử dụng cho tất cả task tiếp theo. Dev phải xây dựng với tư duy "đây là component library của dự án."

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/btw-berekenen/` (có dấu `/` cuối)
- **Title (57 ký tự):** `BTW Berekenen Online Gratis -- Calculator NL en BE | RekenGemak`
- **Meta description (152 ký tự):** `Bereken btw voor Nederland (0%, 9%, 21%) en Belgie (0%, 6%, 21%). Voeg btw toe aan je prijs of reken btw terug. Gratis online btw-calculator, geen registratie nodig.`
- **H1:** `BTW Berekenen voor Nederland en Belgie`
- **Từ khóa chính:** `btw berekenen` (20K–35K/tháng, KD 15–22)
- **Từ khóa dài:**
  - hoeveel btw over bedrag
  - btw berekenen zonder btw
  - prijs exclusief btw berekenen
  - btw percentage nederland 2026
  - btw terugrekenen formule
  - btw berekenen belgie
  - 9 procent btw berekenen
  - 21 procent btw uitrekenen

---

## Cấu trúc HTML — Thứ tự block bắt buộc

Dev tuân theo đúng thứ tự sau. Đây là layout chuẩn cho toàn dự án:

```
<html lang="nl">
<head>
  [1] Script dark mode          ← PHẢI LÀ THẺ ĐẦU TIÊN TRONG <head>
  [2] <meta charset>, viewport
  [3] <title>, <meta description>
  [4] <link rel="canonical">
  [5] Open Graph tags (4 thẻ)
  [6] <style> toàn bộ CSS inline (viết đúng thứ tự 8 block)
</head>
<body>
  [7]  <header>                 ← Logo + toggle dark/light
  [8]  <div id="ad-top">        ← Ad slot #1
  <main>
    [9]  <div class="hero">     ← Breadcrumb + H1 + badge Bijgewerkt
    [10] <section class="tool-card"> ← Toàn bộ giao diện công cụ
    [11] <div id="ad-middle">   ← Ad slot #2
    [12] <article class="content">  ← H2s + FAQ
    [13] <div id="ad-bottom">   ← Ad slot #3
  </main>
  [14] <footer>                 ← Grid 4 cột + footer-bottom
  [15] 3x JSON-LD <script>      ← CUỐI BODY, sau footer
  [16] <script> JS logic inline ← Sau JSON-LD
</body>
```

---

## Dark Mode Script — Thẻ ĐẦU TIÊN trong `<head>`

```html
<script>
(function() {
  var t = localStorage.getItem('rekengemak-theme');
  document.documentElement.setAttribute('data-theme', t || 'dark');
})();
</script>
```

Đặt sai vị trí → trang nháy trắng khi load. Không chấp nhận.

---

## CSS — 8 Block theo thứ tự bắt buộc

### Block 1 — CSS Variables & Reset

```css
/* ═══ 1. CSS VARIABLES ═══════════════════════════════════════════════ */
:root, [data-theme="dark"] {
  --bg-primary:    #0D1117;
  --bg-card:       #161B22;
  --bg-input:      #21262D;
  --border:        #30363D;
  --result-bg:     #1C3A5A;
  --accent:        #1F5C99;
  --accent-hover:  #2272C3;
  --success:       #2EA043;
  --text-primary:  #E6EDF3;
  --text-secondary:#8B949E;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --radius:    10px;
  --transition:0.15s ease;
}

[data-theme="light"] {
  --bg-primary:    #F6F8FA;
  --bg-card:       #FFFFFF;
  --bg-input:      #F0F3F6;
  --border:        #D0D7DE;
  --result-bg:     #DDE8F5;
  --text-primary:  #1F2328;
  --text-secondary:#636C76;
  /* --accent en --success NIET wijzigen */
}

/* ═══ RESET ═══════════════════════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
ul { list-style: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }
input, select, textarea {
  font-family: inherit;
  font-size: 1rem; /* >=16px — iOS niet zoomen */
}
```

### Block 2 — Header & Footer

```css
/* ═══ 2. HEADER ═══════════════════════════════════════════════════════ */
header {
  position: sticky; top: 0; z-index: 100;
  height: 56px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 var(--space-lg);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
}
.logo { font-weight: 700; font-size: 1.1rem; color: var(--text-primary); }
.theme-btn {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.2rem;
  transition: background var(--transition);
}
.theme-btn:hover { background: var(--bg-input); }
[data-theme="dark"]  .icon-light { display: none; }
[data-theme="light"] .icon-dark  { display: none; }

/* ═══ FOOTER ══════════════════════════════════════════════════════════ */
footer {
  margin-top: var(--space-xl);
  padding: 40px var(--space-lg);
  background: var(--bg-card);
  border-top: 1px solid var(--border);
}
.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xl);
  max-width: 900px; margin: 0 auto var(--space-xl);
}
.footer-grid strong {
  font-size: 0.85rem; color: var(--text-secondary);
  text-transform: uppercase; letter-spacing: 0.05em;
}
.footer-grid ul  { margin-top: var(--space-sm); }
.footer-grid li + li { margin-top: 6px; }
.footer-grid a   { font-size: 0.9rem; color: var(--text-secondary); display: block; }
.footer-grid a:hover { color: var(--text-primary); text-decoration: none; }
.footer-bottom   { text-align: center; font-size: 0.8rem; color: var(--text-secondary); }
@media (max-width: 640px) {
  .footer-grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-lg); }
}
```

### Block 3 — Layout & Hero

```css
/* ═══ 3. LAYOUT & HERO ════════════════════════════════════════════════ */
main  { max-width: 900px; margin: 0 auto; padding: var(--space-lg); }
.hero { max-width: 860px; margin: var(--space-xl) auto var(--space-lg); }

nav[aria-label="Breadcrumb"] {
  font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-sm);
}
nav[aria-label="Breadcrumb"] a { color: var(--text-secondary); }
nav[aria-label="Breadcrumb"] a:hover { color: var(--accent); }

h1 { font-size: clamp(1.6rem, 4vw, 2rem); font-weight: 700; margin-bottom: var(--space-sm); }

.badge-updated {
  display: inline-block; margin-top: 6px;
  padding: 3px 10px; border-radius: 20px;
  font-size: 0.8rem; font-weight: 500;
  background: rgba(31, 92, 153, 0.15);
  color: var(--accent);
}
```

### Block 4 — Tool Card & Inputs

```css
/* ═══ 4. TOOL CARD ════════════════════════════════════════════════════ */
.tool-card {
  max-width: 700px; margin: 0 auto;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-lg);
}
@media (max-width: 640px) { .tool-card { padding: var(--space-md); } }

/* Input group */
.input-group { margin-bottom: var(--space-md); }
.input-group label {
  display: block; margin-bottom: 6px;
  font-size: 0.875rem; font-weight: 500; color: var(--text-secondary);
}
.input-wrap {
  display: flex; align-items: center;
  background: var(--bg-input); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden;
  transition: border-color var(--transition);
}
.input-wrap:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(31, 92, 153, 0.2);
}
.input-prefix {
  padding: 0 12px; color: var(--text-secondary);
  font-weight: 500; border-right: 1px solid var(--border);
  height: 48px; display: flex; align-items: center;
}
.input-wrap input,
.input-wrap select {
  flex: 1; height: 48px; padding: 0 14px;
  background: transparent; border: none; outline: none;
  font-size: 1.1rem; color: var(--text-primary);
}
.input-wrap select { appearance: none; cursor: pointer; }

/* Toggle row: Excl <-> Incl */
.toggle-row {
  display: flex; align-items: center; gap: var(--space-md);
  margin-bottom: var(--space-md); font-size: 0.9rem;
  color: var(--text-secondary);
}
.toggle-switch {
  position: relative; width: 44px; height: 24px;
  cursor: pointer; flex-shrink: 0;
}
.toggle-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
.toggle-track {
  position: absolute; inset: 0;
  background: var(--border); border-radius: 12px;
  transition: background var(--transition);
}
.toggle-switch input:checked + .toggle-track { background: var(--accent); }
.toggle-thumb {
  position: absolute; top: 3px; left: 3px;
  width: 18px; height: 18px; border-radius: 50%;
  background: white; transition: transform var(--transition);
  pointer-events: none;
}
.toggle-switch input:checked ~ .toggle-thumb { transform: translateX(20px); }
```

### Block 5 — Result Box, Buttons, Tabs

```css
/* ═══ 5. RESULT BOX ═══════════════════════════════════════════════════ */
.result-box {
  background: var(--result-bg);
  border-left: 4px solid var(--success);
  border-radius: var(--radius);
  padding: var(--space-md) var(--space-lg);
  margin-top: var(--space-md);
}
.result-label {
  font-size: 0.8rem; color: var(--text-secondary);
  text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;
}
.result-main {
  font-size: 2.25rem; font-weight: 700; color: var(--success);
  font-variant-numeric: tabular-nums; line-height: 1.2;
}
.result-sub {
  font-size: 1.1rem; color: var(--text-primary);
  margin-top: 6px; display: flex; align-items: center; gap: 8px;
}
.result-empty { color: var(--text-secondary); font-style: italic; }

/* Nút sao chép */
.btn-copy {
  font-size: 0.8rem; padding: 3px 10px;
  border: 1px solid var(--border); border-radius: 6px;
  color: var(--text-secondary); transition: all var(--transition);
}
.btn-copy:hover { border-color: var(--accent); color: var(--accent); }
.btn-copy.copied { border-color: var(--success); color: var(--success); }

/* ═══ BUTTONS ══════════════════════════════════════════════════════════ */
.btn-primary {
  width: 100%; height: 48px; margin-top: var(--space-md);
  background: var(--accent); color: white;
  font-size: 1rem; font-weight: 600; border-radius: var(--radius);
  transition: background var(--transition);
}
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary {
  padding: 8px 16px; margin-top: var(--space-sm);
  border: 1px solid var(--border); color: var(--text-secondary);
  border-radius: var(--radius); font-size: 0.9rem;
  transition: all var(--transition);
}
.btn-secondary:hover { border-color: var(--text-secondary); color: var(--text-primary); }

/* ═══ TAB BAR ══════════════════════════════════════════════════════════ */
.tab-bar {
  display: flex; gap: 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--space-lg);
  overflow-x: auto;
}
.tab-btn {
  padding: 10px 18px; font-size: 0.95rem; font-weight: 500;
  color: var(--text-secondary); border-bottom: 2px solid transparent;
  white-space: nowrap; transition: all var(--transition);
}
.tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }
.tab-btn:hover:not(.active) { color: var(--text-primary); }
.tab-panel { display: none; }
.tab-panel.active { display: block; }
```

### Block 6 — Article & FAQ

```css
/* ═══ 6. ARTICLE & FAQ ════════════════════════════════════════════════ */
.content {
  max-width: 680px; margin: 0 auto;
  padding-top: var(--space-xl);
}
.content h2 {
  font-size: 1.3rem; font-weight: 600; color: var(--accent);
  margin-bottom: var(--space-sm); margin-top: var(--space-xl);
}
.content h2:first-child { margin-top: 0; }
.content p  { color: var(--text-secondary); margin-bottom: var(--space-md); }
.content ul { margin: var(--space-sm) 0 var(--space-md) var(--space-lg); }
.content ul li { list-style: disc; color: var(--text-secondary); margin-bottom: 6px; }

/* FAQ */
.faq { margin-top: var(--space-md); }
.faq-item {
  border-bottom: 1px solid var(--border);
  padding: var(--space-md) 0;
}
.faq-item:last-child { border-bottom: none; }
.faq-item h3 {
  font-size: 1rem; font-weight: 600; color: var(--text-primary);
  margin-bottom: var(--space-sm);
}
.faq-item p { color: var(--text-secondary); font-size: 0.95rem; }
```

### Block 7 — Gerelateerde tools

```css
/* ═══ 7. RELATED TOOLS ════════════════════════════════════════════════ */
.related-tools {
  display: flex; flex-wrap: wrap; gap: var(--space-sm);
  margin-top: var(--space-md);
}
.related-tools a {
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.875rem; color: var(--text-secondary);
  transition: all var(--transition);
  text-decoration: none;
}
.related-tools a:hover {
  border-color: var(--accent); color: var(--accent);
  text-decoration: none;
}
```

### Block 8 — Responsive

```css
/* ═══ 8. RESPONSIVE ═══════════════════════════════════════════════════ */
/* Mobile default (<640px) */
.result-main { font-size: 1.8rem; }
#ad-top      { min-height: 50px; text-align: center; margin-bottom: 24px; }
#ad-middle   { min-height: 250px; text-align: center; margin: 32px 0; }
#ad-bottom   { min-height: 250px; text-align: center; margin-top: 32px; }

@media (min-width: 640px) {
  .result-main { font-size: 2.25rem; }
  #ad-top      { min-height: 90px; }
}
@media (max-width: 480px) {
  .toggle-row { flex-direction: column; align-items: flex-start; gap: 8px; }
}
```

---

## HTML Body — Chi tiết từng block

### Header

```html
<header>
  <a href="/" class="logo">RekenGemak</a>
  <button onclick="toggleTheme()" aria-label="Thema wisselen" class="theme-btn">
    <span class="icon-dark">🌙</span>
    <span class="icon-light">☀️</span>
  </button>
</header>
```

### Ad Slot Top

```html
<div id="ad-top" style="min-height:90px;text-align:center;margin-bottom:24px;"></div>
```

### `<main>` — bắt đầu tại đây

```html
<main>
```

### Hero

```html
<div class="hero">
  <nav aria-label="Breadcrumb">
    <a href="/">Thuis</a> &rsaquo; <span>BTW Berekenen</span>
  </nav>
  <h1>BTW Berekenen voor Nederland en Belgie</h1>
  <span class="badge-updated">Bijgewerkt: januari 2026</span>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Gratis btw-calculator voor zowel het Nederlandse als het Belgische btw-tarief. Geen registratie nodig.
  </p>
</div>
```

### Tool Card

```html
<section class="tool-card" aria-label="BTW Berekenen">

  <!-- Tab bar: NL / BE -->
  <div class="tab-bar" role="tablist">
    <button class="tab-btn active" role="tab" id="tab-nl"
            aria-selected="true" aria-controls="panel-nl"
            onclick="switchTab('nl')">🇳🇱 Nederland</button>
    <button class="tab-btn" role="tab" id="tab-be"
            aria-selected="false" aria-controls="panel-be"
            onclick="switchTab('be')">🇧🇪 Belgie</button>
  </div>

  <!-- Panel NL -->
  <div id="panel-nl" class="tab-panel active" role="tabpanel" aria-labelledby="tab-nl">

    <!-- Dropdown tarief NL -->
    <div class="input-group">
      <label for="rate-nl">BTW-tarief</label>
      <div class="input-wrap">
        <select id="rate-nl" oninput="recalc('nl')">
          <option value="0.21" selected>21% — Standaard</option>
          <option value="0.09">9% — Verlaagd</option>
          <option value="0.00">0% — Vrijgesteld</option>
        </select>
      </div>
    </div>

    <!-- Toggle richting -->
    <div class="toggle-row">
      <span id="lbl-excl-nl">Exclusief naar inclusief</span>
      <label class="toggle-switch" aria-label="Richting omzetten">
        <input type="checkbox" id="dir-nl" onchange="recalc('nl')">
        <span class="toggle-track"></span>
        <span class="toggle-thumb"></span>
      </label>
      <span id="lbl-incl-nl">Inclusief naar exclusief</span>
    </div>

    <!-- Bedrag input -->
    <div class="input-group">
      <label for="amount-nl" id="amount-label-nl">Bedrag exclusief btw</label>
      <div class="input-wrap">
        <span class="input-prefix">€</span>
        <input id="amount-nl" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 100"
               oninput="recalc('nl')">
      </div>
    </div>

    <!-- Result box NL -->
    <div class="result-box" id="result-nl">
      <div class="result-label">Totaal inclusief btw</div>
      <div class="result-main" id="res-incl-nl">--</div>

      <div class="result-sub">
        <span id="res-btw-nl" style="color:var(--text-secondary);">BTW: --</span>
        <button class="btn-copy" onclick="copyVal('res-incl-nl')" aria-label="Kopieer totaalbedrag">Kopieer</button>
      </div>
      <div class="result-sub" style="margin-top:4px;">
        <span id="res-excl-nl" style="color:var(--text-secondary);">Excl. btw: --</span>
      </div>
    </div>

    <!-- Reset -->
    <button class="btn-secondary" onclick="resetPanel('nl')" style="margin-top:12px;">Wis alles</button>
  </div>

  <!-- Panel BE -->
  <div id="panel-be" class="tab-panel" role="tabpanel" aria-labelledby="tab-be">

    <!-- Dropdown tarief BE -->
    <div class="input-group">
      <label for="rate-be">BTW-tarief</label>
      <div class="input-wrap">
        <select id="rate-be" oninput="recalc('be')">
          <option value="0.21" selected>21% — Standaard</option>
          <option value="0.06">6% — Verlaagd</option>
          <option value="0.00">0% — Vrijgesteld</option>
        </select>
      </div>
    </div>

    <!-- Toggle richting -->
    <div class="toggle-row">
      <span>Exclusief naar inclusief</span>
      <label class="toggle-switch" aria-label="Richting omzetten">
        <input type="checkbox" id="dir-be" onchange="recalc('be')">
        <span class="toggle-track"></span>
        <span class="toggle-thumb"></span>
      </label>
      <span>Inclusief naar exclusief</span>
    </div>

    <!-- Bedrag input -->
    <div class="input-group">
      <label for="amount-be" id="amount-label-be">Bedrag exclusief btw</label>
      <div class="input-wrap">
        <span class="input-prefix">€</span>
        <input id="amount-be" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 100"
               oninput="recalc('be')">
      </div>
    </div>

    <!-- Result box BE -->
    <div class="result-box" id="result-be">
      <div class="result-label">Totaal inclusief btw</div>
      <div class="result-main" id="res-incl-be">--</div>
      <div class="result-sub">
        <span id="res-btw-be" style="color:var(--text-secondary);">BTW: --</span>
        <button class="btn-copy" onclick="copyVal('res-incl-be')" aria-label="Kopieer totaalbedrag">Kopieer</button>
      </div>
      <div class="result-sub" style="margin-top:4px;">
        <span id="res-excl-be" style="color:var(--text-secondary);">Excl. btw: --</span>
      </div>
    </div>

    <!-- Reset -->
    <button class="btn-secondary" onclick="resetPanel('be')" style="margin-top:12px;">Wis alles</button>
  </div>

</section>
```

### Ad Slot Middle

```html
<div id="ad-middle" style="min-height:250px;text-align:center;margin:32px 0;"></div>
```

### Article — Nội dung tiếng Hà Lan

```html
<article class="content">

  <h2>Hoe werkt de btw-calculator?</h2>
  <p>Vul het bedrag in het invoerveld in en kies het btw-tarief dat van toepassing is: 21%, 9% of 0%. De calculator rekent direct uit hoeveel btw je betaalt en wat het totaal inclusief btw is.</p>
  <p>Wil je juist terugrekenen? Zet de toggle op 'inclusief naar exclusief' en voer het totaalbedrag in. Je ziet dan meteen hoeveel btw er in de prijs zit en wat de prijs zonder btw is.</p>
  <p>Bovenin kies je of je voor Nederland of Belgie wilt berekenen. Het verschil zit in het verlaagde tarief: in Nederland is dat 9%, in Belgie 6%. Het standaardtarief van 21% is in beide landen gelijk.</p>
  <p>Voorbeeld: je verkoopt een product voor € 100 exclusief btw met 21% btw. Het btw-bedrag is dan € 21 en de klant betaalt € 121 in totaal.</p>

  <h2>Voor wie is deze btw-calculator?</h2>
  <ul>
    <li>Zzp'ers en freelancers die snel btw op een factuur willen berekenen</li>
    <li>Ondernemers en mkb'ers die btw op inkoopprijzen willen controleren</li>
    <li>Consumenten die willen weten hoeveel btw er in een prijs zit</li>
    <li>Belgische gebruikers die btw willen berekenen met het tarief van 6%</li>
    <li>Boekhouders en administratiemedewerkers die regelmatig met btw-bedragen werken</li>
  </ul>

  <h2>Veelgestelde vragen</h2>
  <div class="faq">

    <div class="faq-item">
      <h3>Wat is het btw-tarief in Nederland in 2026?</h3>
      <p>Nederland kent drie btw-tarieven in 2026: 21% (standaard), 9% (verlaagd, voor onder meer voedsel, medicijnen en boeken) en 0% (vrijgesteld). De meeste producten en diensten vallen onder het tarief van 21%.</p>
    </div>

    <div class="faq-item">
      <h3>Hoe reken ik btw terug uit een totaalprijs?</h3>
      <p>Kies bij de calculator de optie 'inclusief naar exclusief' en voer het totaalbedrag inclusief btw in. De calculator berekent automatisch het btw-bedrag en de prijs exclusief btw. Bij 21% btw en een totaalprijs van € 121 is de prijs exclusief btw € 100 en het btw-bedrag € 21.</p>
    </div>

    <div class="faq-item">
      <h3>Wat is het verschil tussen btw in Nederland en Belgie?</h3>
      <p>In Nederland is het verlaagde btw-tarief 9%, in Belgie is dat 6%. Het standaardtarief van 21% is in beide landen gelijk. Met deze calculator bereken je btw voor zowel Nederland als Belgie door bovenin het juiste land te kiezen.</p>
    </div>

    <div class="faq-item">
      <h3>Welk btw-tarief geldt voor mijn product of dienst?</h3>
      <p>In Nederland geldt 9% btw voor voedsel, boeken, geneesmiddelen, kunst en bepaalde diensten zoals kappers. Het 0%-tarief geldt voor export buiten de EU en een aantal specifieke situaties. Voor alle overige producten en diensten geldt 21%.</p>
    </div>

    <div class="faq-item">
      <h3>Kan ik deze btw-calculator ook gebruiken voor Belgie?</h3>
      <p>Ja. Klik bovenin op 'Belgie' en kies het juiste Belgische btw-tarief: 21% (standaard), 6% (verlaagd) of 0% (vrijgesteld). De calculator past de berekening automatisch aan.</p>
    </div>

    <div class="faq-item">
      <h3>Wanneer gebruik je het 0%-tarief?</h3>
      <p>Het 0%-tarief geldt in Nederland voornamelijk voor goederen die je exporteert naar landen buiten de EU, voor intracommunautaire leveringen binnen de EU en voor bepaalde diensten aan buitenlandse ondernemers. Twijfel je? Raadpleeg belastingdienst.nl voor je specifieke situatie.</p>
    </div>

    <div class="faq-item">
      <h3>Wat is het verschil tussen btw optellen en btw aftrekken?</h3>
      <p>Btw optellen (exclusief naar inclusief) gebruik je als je een prijs hebt zonder btw en wilt weten wat de klant betaalt. Btw aftrekken (inclusief naar exclusief) gebruik je als je een totaalprijs hebt en wilt weten hoeveel btw erin zit. Beide berekeningen zijn beschikbaar via de toggle in de calculator.</p>
    </div>

    <div class="faq-item">
      <h3>Is deze btw-calculator gratis?</h3>
      <p>Ja, de btw-calculator van RekenGemak is volledig gratis. Je hoeft geen account aan te maken en er is geen tijdslimiet. De calculator werkt direct in je browser, ook op je telefoon.</p>
    </div>

  </div>

  <h2>Gerelateerde rekenhulpen</h2>
  <div class="related-tools">
    <a href="/procenten-berekenen/">Procenten berekenen</a>
    <a href="/korting-berekenen/">Korting berekenen</a>
    <a href="/uurloon-berekenen/">Uurloon berekenen</a>
    <a href="/vakantiegeld-berekenen/">Vakantiegeld berekenen</a>
    <a href="/minimumloon-berekenen/">Minimumloon berekenen</a>
  </div>

</article>
```

### Ad Slot Bottom

```html
<div id="ad-bottom" style="min-height:250px;text-align:center;margin-top:32px;"></div>
```

### `</main>` — kết thúc tại đây

```html
</main>
```

### Footer

```html
<footer>
  <div class="footer-grid">
    <div>
      <strong>Financieel</strong>
      <ul>
        <li><a href="/btw-berekenen/">BTW Berekenen</a></li>
        <li><a href="/procenten-berekenen/">Procenten Berekenen</a></li>
        <li><a href="/korting-berekenen/">Korting Berekenen</a></li>
      </ul>
    </div>
    <div>
      <strong>Werk &amp; Salaris</strong>
      <ul>
        <li><a href="/uurloon-berekenen/">Uurloon Berekenen</a></li>
        <li><a href="/vakantiegeld-berekenen/">Vakantiegeld Berekenen</a></li>
        <li><a href="/vakantiedagen-berekenen/">Vakantiedagen Berekenen</a></li>
      </ul>
    </div>
    <div>
      <strong>Tekst</strong>
      <ul>
        <li><a href="/woorden-tellen/">Woorden Tellen</a></li>
        <li><a href="/tekens-tellen/">Tekens Tellen</a></li>
        <li><a href="/tekst-vergelijken/">Tekst Vergelijken</a></li>
      </ul>
    </div>
    <div>
      <strong>Dagelijks</strong>
      <ul>
        <li><a href="/minimumloon-berekenen/">Minimumloon Berekenen</a></li>
        <li><a href="/willekeurig-getal/">Willekeurig Getal</a></li>
        <li><a href="/wachtwoord-generator/">Wachtwoord Generator</a></li>
      </ul>
    </div>
  </div>
  <p class="footer-bottom">
    <a href="/privacy/">Privacybeleid</a> &middot;
    <a href="/contact/">Contact</a> &middot;
    &copy; 2026 RekenGemak
  </p>
</footer>
```

### 3x JSON-LD Schemas — CUỐI BODY, NA FOOTER

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "BTW Berekenen — RekenGemak",
  "url": "https://rekengemak.nl/btw-berekenen/",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "inLanguage": "nl",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wat is het btw-tarief in Nederland in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nederland kent drie btw-tarieven in 2026: 21% (standaard), 9% (verlaagd, voor onder meer voedsel, medicijnen en boeken) en 0% (vrijgesteld). De meeste producten en diensten vallen onder het tarief van 21%."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe reken ik btw terug uit een totaalprijs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kies bij de calculator de optie 'inclusief naar exclusief' en voer het totaalbedrag inclusief btw in. De calculator berekent automatisch het btw-bedrag en de prijs exclusief btw. Bij 21% btw en een totaalprijs van 121 euro is de prijs exclusief btw 100 euro en het btw-bedrag 21 euro."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen btw in Nederland en Belgie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Nederland is het verlaagde btw-tarief 9%, in Belgie is dat 6%. Het standaardtarief van 21% is in beide landen gelijk. Met deze calculator bereken je btw voor zowel Nederland als Belgie door bovenin het juiste land te kiezen."
      }
    },
    {
      "@type": "Question",
      "name": "Welk btw-tarief geldt voor mijn product of dienst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In Nederland geldt 9% btw voor voedsel, boeken, geneesmiddelen, kunst en bepaalde diensten zoals kappers. Het 0%-tarief geldt voor export buiten de EU en een aantal specifieke situaties. Voor alle overige producten en diensten geldt 21%."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik deze btw-calculator ook gebruiken voor Belgie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Klik bovenin op Belgie en kies het juiste Belgische btw-tarief: 21% (standaard), 6% (verlaagd) of 0% (vrijgesteld). De calculator past de berekening automatisch aan."
      }
    },
    {
      "@type": "Question",
      "name": "Wanneer gebruik je het 0%-tarief?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Het 0%-tarief geldt in Nederland voornamelijk voor goederen die je exporteert naar landen buiten de EU, voor intracommunautaire leveringen binnen de EU en voor bepaalde diensten aan buitenlandse ondernemers. Twijfel je? Raadpleeg belastingdienst.nl voor je specifieke situatie."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen btw optellen en btw aftrekken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Btw optellen (exclusief naar inclusief) gebruik je als je een prijs hebt zonder btw en wilt weten wat de klant betaalt. Btw aftrekken (inclusief naar exclusief) gebruik je als je een totaalprijs hebt en wilt weten hoeveel btw erin zit. Beide berekeningen zijn beschikbaar via de toggle in de calculator."
      }
    },
    {
      "@type": "Question",
      "name": "Is deze btw-calculator gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de btw-calculator van RekenGemak is volledig gratis. Je hoeft geen account aan te maken en er is geen tijdslimiet. De calculator werkt direct in je browser, ook op je telefoon."
      }
    }
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Thuis",
      "item": "https://rekengemak.nl/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "BTW Berekenen",
      "item": "https://rekengemak.nl/btw-berekenen/"
    }
  ]
}
</script>
```

### JavaScript Inline — Sau JSON-LD

```javascript
<script>
/* ═══ FORMAT HELPERS ═══════════════════════════════════════════════════ */
var fmtEUR = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });

function parseNL(str) {
  return parseFloat(str.replace(/\./g, '').replace(',', '.'));
}

/* ═══ BTW FORMULAS ═════════════════════════════════════════════════════ */
function calcIncl(excl, pct) {
  var btw  = excl * pct;
  var incl = excl + btw;
  return { excl: excl, btw: btw, incl: incl };
}

function calcExcl(incl, pct) {
  var excl = incl / (1 + pct);
  var btw  = incl - excl;
  return { excl: excl, btw: btw, incl: incl };
}

/* ═══ RECALC ═══════════════════════════════════════════════════════════ */
function recalc(land) {
  var amountEl = document.getElementById('amount-' + land);
  var rateEl   = document.getElementById('rate-'   + land);
  var dirEl    = document.getElementById('dir-'    + land);

  var raw  = amountEl ? amountEl.value.trim() : '';
  var amt  = parseNL(raw);
  var pct  = parseFloat(rateEl.value);
  var incl = dirEl.checked; /* true = incl→excl */

  /* Label aanpassen */
  var lbl = document.getElementById('amount-label-' + land);
  if (lbl) lbl.textContent = incl ? 'Bedrag inclusief btw' : 'Bedrag exclusief btw';

  if (!raw || isNaN(amt) || amt <= 0) {
    setResults(land, null); return;
  }

  var r = incl ? calcExcl(amt, pct) : calcIncl(amt, pct);
  setResults(land, r);
}

function setResults(land, r) {
  var inclEl = document.getElementById('res-incl-' + land);
  var btwEl  = document.getElementById('res-btw-'  + land);
  var exclEl = document.getElementById('res-excl-' + land);

  if (!r) {
    inclEl.textContent = '--';
    btwEl.textContent  = 'BTW: --';
    exclEl.textContent = 'Excl. btw: --';
    return;
  }
  inclEl.textContent = fmtEUR.format(r.incl);
  btwEl.textContent  = 'BTW: ' + fmtEUR.format(r.btw);
  exclEl.textContent = 'Excl. btw: ' + fmtEUR.format(r.excl);
}

/* ═══ RESET ════════════════════════════════════════════════════════════ */
function resetPanel(land) {
  document.getElementById('amount-' + land).value = '';
  document.getElementById('rate-'   + land).selectedIndex = 0;
  document.getElementById('dir-'    + land).checked = false;
  setResults(land, null);
}

/* ═══ TAB SWITCH ═══════════════════════════════════════════════════════ */
function switchTab(land) {
  ['nl','be'].forEach(function(l) {
    document.getElementById('tab-'   + l).classList.toggle('active', l === land);
    document.getElementById('tab-'   + l).setAttribute('aria-selected', l === land);
    document.getElementById('panel-' + l).classList.toggle('active', l === land);
  });
}

/* ═══ COPY ═════════════════════════════════════════════════════════════ */
function copyVal(id) {
  var el  = document.getElementById(id);
  var txt = el ? el.textContent.trim() : '';
  if (!txt || txt === '--') return;
  navigator.clipboard.writeText(txt).then(function() {
    /* Vind de dichtstbijzijnde btn-copy */
    var btn = el.parentElement.querySelector('.btn-copy');
    if (!btn) return;
    var orig = btn.textContent;
    btn.textContent = 'Gekopieerd!';
    btn.classList.add('copied');
    setTimeout(function() {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 1500);
  });
}

/* ═══ DARK MODE TOGGLE ════════════════════════════════════════════════ */
function toggleTheme() {
  var cur  = document.documentElement.getAttribute('data-theme');
  var next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('rekengemak-theme', next);
}
</script>
```

---

## Open Graph Tags — Trong `<head>` sau canonical

```html
<meta property="og:title"       content="BTW Berekenen Online Gratis -- Calculator NL en BE | RekenGemak">
<meta property="og:description" content="Bereken btw voor Nederland (0%, 9%, 21%) en Belgie (0%, 6%, 21%). Voeg btw toe aan je prijs of reken btw terug. Gratis online btw-calculator, geen registratie nodig.">
<meta property="og:url"         content="https://rekengemak.nl/btw-berekenen/">
<meta property="og:type"        content="website">
```

---

## Acceptance Criteria

### A. Tính toán — Dev chạy từng case trước khi tạo PR

| Input | Tarief | Richting | Incl. | BTW | Excl. |
|---|---|---|---|---|---|
| 100 | NL 21% | Excl→Incl | € 121,00 | € 21,00 | € 100,00 |
| 200 | NL 9% | Excl→Incl | € 218,00 | € 18,00 | € 200,00 |
| 500 | NL 0% | Excl→Incl | € 500,00 | € 0,00 | € 500,00 |
| 121 | NL 21% | Incl→Excl | € 121,00 | € 21,00 | € 100,00 |
| 200 | BE 6% | Excl→Incl | € 212,00 | € 12,00 | € 200,00 |
| 242 | BE 21% | Incl→Excl | € 242,00 | € 42,00 | € 200,00 |
| (leeg) | — | — | -- | -- | -- |
| "100,50" | NL 21% | Excl→Incl | € 121,61 | € 21,11 | € 100,50 |

### B. Technisch

- [ ] `<html lang="nl">` aanwezig
- [ ] Dark mode script = EERSTE tag in `<head>` — voor alle CSS
- [ ] `localStorage.getItem('rekengemak-theme')` — juiste key
- [ ] Title: 57 tekens, keyword vooraan
- [ ] Meta description: 152 tekens
- [ ] Canonical: `https://rekengemak.nl/btw-berekenen/` (met trailing slash)
- [ ] 4 Open Graph tags aanwezig
- [ ] 3 JSON-LD schemas **onderaan body**, na `</footer>`
- [ ] WebApplication schema: PASS op Rich Results Test
- [ ] FAQPage schema: PASS op Rich Results Test (8 vragen)
- [ ] BreadcrumbList schema: PASS op Rich Results Test
- [ ] PageSpeed mobile >= 90, desktop >= 95
- [ ] 0 externe requests (geen Google Fonts, geen externe JS)
- [ ] `id="ad-top"`, `id="ad-middle"`, `id="ad-bottom"` op juiste positie
- [ ] `<main>` wrapping van ad-top t/m ad-bottom

### C. UX & Devices

- [ ] iOS Safari: tik op invoerveld → numeriek toetsenbord, geen zoom
- [ ] Mobiel 375px: geen horizontale scroll, tool card niet afgesneden
- [ ] Knop "Kopieer": klik → tekst "Gekopieerd!" (1,5 sec) → terug naar "Kopieer"
- [ ] Hard refresh (Ctrl+Shift+R): dark mode direct, geen witte flits
- [ ] Toggle light mode: werkt, localStorage slaat waarde op
- [ ] Wisselen NL tab → BE tab: resultaten resetten naar "--"
- [ ] Toggle richting: label "Bedrag exclusief/inclusief btw" past mee
- [ ] Alle 12 footer-links leiden naar juiste URL (trailing slash)
- [ ] Touch target alle buttons/inputs >= 48px hoogte

### D. Inhoud

- [ ] Ctrl+F "—" (em dash): niet gevonden
- [ ] Ctrl+F "--" (dubbel streepje) in body-tekst: niet gevonden
- [ ] Ctrl+F "...": niet gevonden
- [ ] Ctrl+F "Furthermore / Moreover / Additionally / worth noting": niet gevonden
- [ ] Totaal >= 400 woorden (exclusief tool interface)
- [ ] Keyword "btw berekenen" staat in H1 en in eerste 100 woorden artikel
- [ ] Badge "Bijgewerkt: januari 2026" zichtbaar bij H1
- [ ] Minimaal 5 interne links met keyword-ankertekst
- [ ] FAQ: 8 vragen in natuurlijk Nederlands, 40-80 woorden per antwoord

---

## Git Workflow voor deze task

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-001-btw-berekenen

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-001-btw.md
git commit -m "docs: add brief TASK-001"

# Stap 3: code committen
git add btw-berekenen/index.html
git commit -m "feat: TASK-001 btw-berekenen tool"

# Stap 4: push en PR aanmaken
git push origin feature/TASK-001-btw-berekenen
# PR beschrijving: wat gebouwd, test cases uitgevoerd, preview URL
```

Deploy via Cloudflare Pages preview URL — grapporteer URL in het rapport.

---

## Prioriteit & Deadline

- **Prioriteit:** P0 — eerst bouwen
- **Deadline:** geen harde deadline, maar afronden voor T-008 (Vakantiegeld, deadline eind maart)
- **Belang:** dit bestand is het design template voor alle 12 tools — kwaliteit boven snelheid

---

## Dev Rules — Niet overslaan

1. **1 HTML-bestand** — alles inline in `btw-berekenen/index.html`
2. **Geen framework, geen externe bibliotheken** — puur Vanilla JS
3. **Geen Google Fonts** — `system-ui`
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script in `<head>`** — absoluut eerste tag, voor alle CSS
6. **`inputmode="decimal"`** — op alle nummerieke invoervelden
7. **`Intl.NumberFormat('nl-NL')`** — voor alle euro-opmaak, geen eigen logica schrijven
8. **`parseNL()`** — komma als decimaalscheidingsteken correct verwerken
9. **3 ad slots** — `id="ad-top"`, `id="ad-middle"`, `id="ad-bottom"` op exact de juiste positie
10. **Touch target >= 48px** — invoer, knoppen, tabs
11. **Minimaal 5 interne links** — ankertekst = doelzoekwoord
12. **JSON-LD schemas** — onderaan body, NA `</footer>`
13. **FAQ** — `div.faq > div.faq-item > h3 + p` — geen `<details>` gebruiken
14. **Toggle** — `label.toggle-switch > input[type=checkbox] + span.toggle-track + span.toggle-thumb`
15. **Footer links** — trailing slash, geen `.html` extensie (`/privacy/` niet `/privacy.html`)
