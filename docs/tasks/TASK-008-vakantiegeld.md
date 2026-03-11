# TASK-008 — Vakantiegeld Berekenen
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P1 — KHẨN, live voor eind maart 2026
**Branch:** `feature/TASK-008-vakantiegeld-berekenen`
**File:** `vakantiegeld-berekenen/index.html`

---

## Mục tiêu

Xây dựng công cụ Vakantiegeld Berekenen tại `/vakantiegeld-berekenen/` — giúp người dùng tính nhanh số tiền vakantiegeld (8% bruto jaarsalaris) sẽ nhận vào tháng 5. Hỗ trợ cả người làm đủ năm lẫn người làm chưa đủ năm (pro-rata theo số tháng đã làm việc).

**Deadline cứng:** Live trước 31 tháng 3, 2026. Traffic spike bắt đầu tháng 4 khi người dùng bắt đầu tìm kiếm thông tin vakantiegeld trả vào tháng 5.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/vakantiegeld-berekenen/`
- **Title (58 ký tự):** `Vakantiegeld Berekenen 2026 -- Gratis Calculator | RekenGemak`
- **Meta description (154 ký tự):** `Bereken je vakantiegeld 2026 snel en gratis. Voer je bruto maandsalaris in en zie direct hoeveel vakantiegeld je in mei ontvangt. Voor heel en deeltijdwerk.`
- **H1:** `Vakantiegeld Berekenen 2026`
- **Từ khóa chính:** `vakantiegeld berekenen` (8K–15K/tháng, KD 8–15)
- **Từ khóa dài:**
  - hoeveel vakantiegeld krijg ik 2026
  - vakantiegeld berekenen deeltijd
  - vakantiegeld berekenen pro rata
  - 8 procent vakantiegeld berekenen
  - wanneer wordt vakantiegeld uitbetaald
  - vakantiegeld berekenen maandsalaris

---

## Cấu trúc HTML — Thứ tự block (giống T-001)

```
<html lang="nl">
<head>
  [1] Script dark mode          ← EERSTE TAG in <head>
  [2] <meta charset>, viewport
  [3] <title>, <meta description>
  [4] <link rel="canonical">
  [5] Open Graph tags (4 thẻ)
  [6] <style> CSS inline (8 blocks)
</head>
<body>
  [7]  <header>
  [8]  <div id="ad-top">
  <main>
    [9]  <div class="hero">    ← Breadcrumb + H1 + badge Bijgewerkt
    [10] <section class="tool-card">
    [11] <div id="ad-middle">
    [12] <article class="content">
    [13] <div id="ad-bottom">
  </main>
  [14] <footer>
  [15] 3x JSON-LD <script>     ← CUỐI BODY, na footer
  [16] <script> JS inline
</body>
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert de CSS-architectuur van `btw-berekenen/index.html` volledig. Alle CSS variables, reset, header, footer, layout, tool card, result box, buttons, tabs, article/FAQ — identiek. Alleen tool-specifieke toevoegingen hieronder.

### Aanvullende CSS voor deze tool

```css
/* Slider: aantal maanden gewerkt */
.slider-wrap {
  margin-bottom: var(--space-md);
}
.slider-wrap label {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 6px;
  font-size: 0.875rem; font-weight: 500; color: var(--text-secondary);
}
.slider-wrap .slider-value {
  font-weight: 700; color: var(--text-primary);
}
input[type="range"] {
  width: 100%; height: 6px;
  accent-color: var(--accent);
  cursor: pointer;
}

/* Result box uitbreiding: 4 rijen */
.result-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 8px;
}
.result-row:first-child { margin-top: 0; }

/* Badge disclaimer */
.disclaimer {
  font-size: 0.8rem; font-style: italic;
  color: var(--text-secondary);
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border);
}
```

---

## Hero Section

```html
<div class="hero">
  <nav aria-label="Breadcrumb">
    <a href="/">Thuis</a> &rsaquo; <span>Vakantiegeld Berekenen</span>
  </nav>
  <h1>Vakantiegeld Berekenen 2026</h1>
  <span class="badge-updated">Bijgewerkt: januari 2026</span>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Bereken snel hoeveel vakantiegeld je in mei 2026 ontvangt op basis van je bruto maandsalaris.
  </p>
</div>
```

---

## Tool Card — Giao diện công cụ

```html
<section class="tool-card" aria-label="Vakantiegeld Berekenen">

  <!-- Input 1: Bruto maandsalaris -->
  <div class="input-group">
    <label for="salaris">Bruto maandsalaris</label>
    <div class="input-wrap">
      <span class="input-prefix">€</span>
      <input id="salaris" type="text" inputmode="decimal"
             autocomplete="off" placeholder="bijv. 3000"
             oninput="recalc()">
    </div>
  </div>

  <!-- Input 2: Aantal maanden gewerkt (slider + getal) -->
  <div class="slider-wrap">
    <label for="maanden">
      <span>Maanden gewerkt dit jaar</span>
      <span class="slider-value" id="maanden-value">12</span>
    </label>
    <input type="range" id="maanden" min="1" max="12" value="12"
           oninput="updateSlider(); recalc()">
  </div>

  <!-- Result box: 4 rijen -->
  <div class="result-box">
    <div class="result-label">Vakantiegeld te ontvangen</div>
    <div class="result-main" id="res-vakantiegeld">--</div>

    <div class="result-row" style="margin-top:12px;">
      <span style="font-size:0.875rem;color:var(--text-secondary);">Bruto jaarsalaris</span>
      <span id="res-jaarsalaris" style="font-size:0.95rem;color:var(--text-primary);">--</span>
    </div>
    <div class="result-row">
      <span style="font-size:0.875rem;color:var(--text-secondary);">Volledig vakantiegeld (8%)</span>
      <span id="res-volledig" style="font-size:0.95rem;color:var(--text-primary);">--</span>
    </div>
    <div class="result-row">
      <span style="font-size:0.875rem;color:var(--text-secondary);">Gewerkte periode</span>
      <span id="res-periode" style="font-size:0.95rem;color:var(--text-primary);">--</span>
    </div>

    <button class="btn-copy" onclick="copyVal('res-vakantiegeld')"
            aria-label="Kopieer vakantiegeld" style="margin-top:12px;">Kopieer</button>
  </div>

  <!-- Reset -->
  <button class="btn-secondary" onclick="resetTool()" style="margin-top:12px;">Wis alles</button>

  <!-- Disclaimer -->
  <p class="disclaimer">
    Dit is een indicatieve berekening op basis van 8% van het bruto jaarsalaris.
    Het werkelijke bedrag kan afwijken door toeslagen, variabele lonen of cao-afspraken.
    Raadpleeg je salarisstrook of werkgever voor het exacte bedrag.
  </p>

</section>
```

---

## Logic JavaScript

### Formule vakantiegeld

```javascript
/* ═══ FORMAT HELPERS (zelfde als T-001) ════════════════════════════════ */
var fmtEUR = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });

function parseNL(str) {
  return parseFloat(str.replace(/\./g, '').replace(',', '.'));
}

/* ═══ SLIDER ═══════════════════════════════════════════════════════════ */
function updateSlider() {
  var val = document.getElementById('maanden').value;
  document.getElementById('maanden-value').textContent = val;
}

/* ═══ VAKANTIEGELD FORMULE ══════════════════════════════════════════════
   Vakantiegeld = 8% x bruto maandsalaris x 12 x (maanden / 12)
   Vereenvoudigd: 8% x bruto maandsalaris x maanden
════════════════════════════════════════════════════════════════════════ */
function calcVakantiegeld(maandSalaris, maandenGewerkt) {
  var jaarSalaris = maandSalaris * 12;
  var volledig    = jaarSalaris * 0.08;
  var proRata     = volledig * (maandenGewerkt / 12);
  return {
    vakantiegeld: proRata,
    jaarSalaris:  jaarSalaris,
    volledig:     volledig,
    maanden:      maandenGewerkt
  };
}

/* ═══ RECALC ════════════════════════════════════════════════════════════ */
function recalc() {
  var raw     = document.getElementById('salaris').value.trim();
  var maanden = parseInt(document.getElementById('maanden').value);
  var amt     = parseNL(raw);

  if (!raw || isNaN(amt) || amt <= 0) {
    setResults(null); return;
  }

  var r = calcVakantiegeld(amt, maanden);
  setResults(r);
}

function setResults(r) {
  var mainEl    = document.getElementById('res-vakantiegeld');
  var jaarEl    = document.getElementById('res-jaarsalaris');
  var vollEl    = document.getElementById('res-volledig');
  var periodeEl = document.getElementById('res-periode');

  if (!r) {
    mainEl.textContent    = '--';
    mainEl.style.color    = 'var(--text-secondary)';
    mainEl.style.fontSize = '1.2rem';
    mainEl.style.fontWeight = '400';
    jaarEl.textContent    = '--';
    vollEl.textContent    = '--';
    periodeEl.textContent = '--';
    return;
  }

  mainEl.textContent    = fmtEUR.format(r.vakantiegeld);
  mainEl.style.color    = 'var(--success)';
  mainEl.style.fontSize = '2.25rem';
  mainEl.style.fontWeight = '700';
  jaarEl.textContent    = fmtEUR.format(r.jaarSalaris);
  vollEl.textContent    = fmtEUR.format(r.volledig);
  periodeEl.textContent = r.maanden + (r.maanden === 1 ? ' maand' : ' maanden');
}

/* ═══ RESET ═════════════════════════════════════════════════════════════ */
function resetTool() {
  document.getElementById('salaris').value = '';
  document.getElementById('maanden').value = 12;
  updateSlider();
  setResults(null);
}

/* ═══ COPY ══════════════════════════════════════════════════════════════ */
function copyVal(id) {
  var el  = document.getElementById(id);
  var txt = el ? el.textContent.trim() : '';
  if (!txt || txt === '--') return;
  navigator.clipboard.writeText(txt).then(function() {
    var btn = document.querySelector('.btn-copy');
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

/* ═══ DARK MODE TOGGLE (zelfde als T-001) ═══════════════════════════════ */
function toggleTheme() {
  var cur  = document.documentElement.getAttribute('data-theme');
  var next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('rekengemak-theme', next);
}
```

---

## 3 JSON-LD Schemas — Cuối body

### Schema 1: WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Vakantiegeld Berekenen 2026 — RekenGemak",
  "url": "https://rekengemak.nl/vakantiegeld-berekenen/",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "inLanguage": "nl",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  }
}
```

### Schema 2: FAQPage (8 vragen)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hoeveel vakantiegeld krijg ik in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Je vakantiegeld bedraagt minimaal 8% van je bruto jaarsalaris. Bij een bruto maandsalaris van € 3.000 is dat € 2.880 per jaar, ofwel € 2.880 vakantiegeld als je het hele jaar hebt gewerkt. De meeste werkgevers betalen vakantiegeld uit in mei."
      }
    },
    {
      "@type": "Question",
      "name": "Wanneer wordt vakantiegeld uitbetaald?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De meeste werkgevers betalen vakantiegeld uit in mei. De exacte datum staat in je arbeidscontract of cao. Sommige werkgevers betalen vakantiegeld maandelijks uit samen met het salaris, maar de meerderheid doet dit eenmalig in mei."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe wordt vakantiegeld berekend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vakantiegeld is minimaal 8% van je bruto jaarsalaris. Je berekent dit door je bruto maandsalaris te vermenigvuldigen met 12 en daarna met 0,08. Bij een salaris van € 2.500 per maand is dat € 2.500 x 12 x 0,08 = € 2.400 vakantiegeld."
      }
    },
    {
      "@type": "Question",
      "name": "Krijg ik vakantiegeld als ik pas halverwege het jaar ben begonnen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, vakantiegeld bouw je op over de maanden dat je hebt gewerkt. Ben je in juli begonnen, dan heb je aan het einde van het jaar 6 maanden opgebouwd. Je vakantiegeld is dan de helft van het volledige jaarbedrag. De calculator houdt hier automatisch rekening mee via de schuifregelaar."
      }
    },
    {
      "@type": "Question",
      "name": "Is vakantiegeld hetzelfde als vakantiedagen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, vakantiegeld en vakantiedagen zijn twee aparte dingen. Vakantiegeld is een geldbedrag van 8% van je jaarsalaris dat je extra ontvangt. Vakantiedagen zijn de vrije dagen waar je recht op hebt, wettelijk minimaal 4 keer de werkweek per jaar."
      }
    },
    {
      "@type": "Question",
      "name": "Krijg ik vakantiegeld als zzp'er?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als zzp'er heb je geen wettelijk recht op vakantiegeld. Je bent zelf verantwoordelijk voor het apart zetten van geld voor vakantie. Sommige opdrachtgevers betalen wel een toeslag boven op het uurtarief voor vakantiegeld, maar dit is niet verplicht."
      }
    },
    {
      "@type": "Question",
      "name": "Betaal ik belasting over vakantiegeld?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, vakantiegeld is belast loon. Je werkgever houdt loonbelasting in volgens de tabel bijzondere beloningen. Daardoor lijkt het nettobedrag lager dan verwacht. Het exacte nettobedrag hangt af van je belastingschijf en persoonlijke situatie."
      }
    },
    {
      "@type": "Question",
      "name": "Kan mijn werkgever meer dan 8% vakantiegeld betalen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, 8% is het wettelijk minimum. Veel cao's en arbeidscontracten kennen een hoger percentage, bijvoorbeeld 8,33% of zelfs meer. Kijk in je cao of arbeidscontract voor het percentage dat voor jou van toepassing is."
      }
    }
  ]
}
```

### Schema 3: BreadcrumbList

```json
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
      "name": "Vakantiegeld Berekenen",
      "item": "https://rekengemak.nl/vakantiegeld-berekenen/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de vakantiegeldcalculator?"

Vul je bruto maandsalaris in het invoerveld in. De calculator rekent direct uit hoeveel vakantiegeld je ontvangt op basis van 8% van je bruto jaarsalaris.

Ben je pas later in het jaar begonnen, of heb je een deel van het jaar niet gewerkt? Stel de schuifregelaar in op het aantal maanden dat je hebt gewerkt. De calculator past het bedrag automatisch aan op basis van je gewerkte periode.

Voorbeeld: je verdient € 3.000 bruto per maand en hebt 12 maanden gewerkt. Je bruto jaarsalaris is dan € 36.000. Het vakantiegeld bedraagt 8% daarvan, ofwel € 2.880. Ben je pas 6 maanden in dienst, dan ontvang je de helft: € 1.440.

Let op: dit is een indicatieve berekening. Het werkelijke bedrag kan afwijken door toeslagen of cao-afspraken.

### H2: "Voor wie is deze rekenhulp?"

- Werknemers in loondienst die willen weten hoeveel vakantiegeld ze in mei ontvangen
- Mensen die pas halverwege het jaar zijn begonnen en een pro-rata berekening willen
- Parttime medewerkers die vakantiegeld willen berekenen op hun maandsalaris
- HR-medewerkers die een snelle indicatie willen geven aan nieuwe collega's
- Iedereen die wil controleren of het uitbetaalde vakantiegeld klopt

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — identiek aan FAQPage schema hierboven.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/uurloon-berekenen/">Uurloon berekenen</a>
  <a href="/vakantiedagen-berekenen/">Vakantiedagen berekenen</a>
  <a href="/minimumloon-berekenen/">Minimumloon berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/procenten-berekenen/">Procenten berekenen</a>
</div>
```

---

## Acceptance Criteria

### A. Tính toán — Dev chạy từng case

| Maandsalaris | Maanden | Verwacht vakantiegeld | PASS/FAIL |
|---|---|---|---|
| € 3.000 | 12 | € 2.880,00 | |
| € 3.000 | 6 | € 1.440,00 | |
| € 2.500 | 12 | € 2.400,00 | |
| € 2.500 | 1 | € 200,00 | |
| € 5.000 | 12 | € 4.800,00 | |
| € 1.750 | 8 | € 1.120,00 | |
| (leeg) | 12 | -- overal | |
| € 3.000 slider→1 | 1 | € 240,00 | |

**Verificatie formule:** `maandsalaris × 12 × 0.08 × (maanden / 12)` = `maandsalaris × 0.08 × maanden`

### B. Technisch

- [ ] `<html lang="nl">` aanwezig
- [ ] Dark mode script = EERSTE tag in `<head>`
- [ ] `localStorage.getItem('rekengemak-theme')` — juiste key
- [ ] Title: 58 tekens, keyword vooraan
- [ ] Meta description: 154 tekens
- [ ] Canonical: `https://rekengemak.nl/vakantiegeld-berekenen/` (trailing slash)
- [ ] 4 Open Graph tags aanwezig
- [ ] 3 JSON-LD schemas onderaan body, na `</footer>`
- [ ] 3 schemas PASS op Rich Results Test
- [ ] PageSpeed mobile >= 90, desktop >= 95
- [ ] 0 externe requests
- [ ] `id="ad-top"`, `id="ad-middle"`, `id="ad-bottom"` op juiste positie
- [ ] `<main>` wrapper aanwezig

### C. UX & Devices

- [ ] Slider: sleepen → slider-value getal past realtime mee
- [ ] Slider default: 12 maanden
- [ ] iOS Safari: tik op invoerveld → numeriek toetsenbord, geen zoom
- [ ] Mobiel 375px: geen horizontale scroll
- [ ] Knop "Kopieer": "Gekopieerd!" 1,5 sec → terug
- [ ] Hard refresh: dark mode direct, geen witte flits
- [ ] Toggle light/dark: werkt, localStorage opgeslagen
- [ ] Empty state: "--" muted kleur, geen grote groene tekst
- [ ] Filled state: vakantiegeld groot groen, onderrijen kleiner

### D. Inhoud

- [ ] Ctrl+F "—" (em dash): niet gevonden in body-tekst
- [ ] Ctrl+F "--": niet gevonden in body-tekst
- [ ] Ctrl+F "...": niet gevonden
- [ ] Keyword "vakantiegeld berekenen" in H1 en eerste 100 woorden
- [ ] Badge "Bijgewerkt: januari 2026" zichtbaar
- [ ] Disclaimer aanwezig onder result box
- [ ] FAQ: 8 vragen, natuurlijk Nederlands
- [ ] Minimaal 5 interne links

---

## Open Graph Tags

```html
<meta property="og:title"       content="Vakantiegeld Berekenen 2026 -- Gratis Calculator | RekenGemak">
<meta property="og:description" content="Bereken je vakantiegeld 2026 snel en gratis. Voer je bruto maandsalaris in en zie direct hoeveel vakantiegeld je in mei ontvangt. Voor heel en deeltijdwerk.">
<meta property="og:url"         content="https://rekengemak.nl/vakantiegeld-berekenen/">
<meta property="og:type"        content="website">
```

---

## Git Workflow

```bash
git checkout -b feature/TASK-008-vakantiegeld-berekenen
git add docs/tasks/TASK-008-vakantiegeld.md
git commit -m "docs: add brief TASK-008"
git add vakantiegeld-berekenen/index.html
git commit -m "feat: TASK-008 vakantiegeld-berekenen tool"
git push origin feature/TASK-008-vakantiegeld-berekenen
# PR aanmaken — preview URL vermelden in rapport
```

---

## Prioriteit & Deadline

- **Prioriteit:** P1 — KHẨN
- **Deadline:** 31 maart 2026 — niet onderhandelbaar
- **Reden:** Vakantiegeld traffic spike start april, piek in mei

---

## Dev Rules — Không được bỏ qua

1. **CSS base van T-001 hergebruiken** — niet opnieuw schrijven, alleen tool-specifieke CSS toevoegen
2. **1 HTML-bestand** — alles inline in `vakantiegeld-berekenen/index.html`
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script in `<head>`** — absoluut eerste tag
6. **`inputmode="decimal"`** — op het salariservoerveld
7. **`Intl.NumberFormat('nl-NL')`** — voor alle euro-opmaak
8. **Slider default = 12** — volledig jaar is de meest gebruikte situatie
9. **Disclaimer verplicht** — onder result box, italic, klein
10. **Badge "Bijgewerkt: januari 2026"** — verplicht bij H1
11. **Footer: trailing slash, geen `.html`** — `/privacy/`, `/contact/`
12. **JSON-LD schemas** — onderaan body, NA `</footer>`
13. **FAQ** — `div.faq > div.faq-item > h3 + p` — geen `<details>`
14. **Dropdown select option kleur** — `select option { background-color: var(--bg-input); color: var(--text-primary); }` (Fix 6 van T-001)
