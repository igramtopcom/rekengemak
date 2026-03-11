# TASK-009 — Vakantiedagen Berekenen
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P1
**Branch:** `feature/TASK-009-vakantiedagen-berekenen`
**File:** `vakantiedagen-berekenen/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Vakantiedagen Berekenen tại `/vakantiedagen-berekenen/` — giúp werknemers tính số ngày nghỉ phép họ được hưởng theo luật (wettelijk minimum: 4x werkweek) cộng với bovenwettelijk nếu có, và tính pro-rata nếu làm chưa đủ năm. Kết quả hiển thị cả theo ngày lẫn theo giờ.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/vakantiedagen-berekenen/`
- **Title (61 ký tự):** `Vakantiedagen Berekenen 2026 -- Gratis Calculator | RekenGemak`
- **Meta description (155 ký tự):** `Bereken je wettelijke vakantiedagen op basis van je werkweek en dienstverband. Inclusief bovenwettelijke dagen en pro-rata berekening. Gratis en direct resultaat.`
- **H1:** `Vakantiedagen Berekenen 2026`
- **Từ khóa chính:** `vakantiedagen berekenen` (15K–22K/tháng, KD 15–22)
- **Từ khóa dài:**
  - hoeveel vakantiedagen heb ik recht op
  - wettelijk minimum vakantiedagen 2026
  - vakantiedagen berekenen deeltijd
  - vakantiedagen pro rata berekenen
  - vakantiedagen in uren berekenen
  - bovenwettelijke vakantiedagen

---

## Open Graph Tags

```html
<meta property="og:title"       content="Vakantiedagen Berekenen 2026 -- Gratis Calculator | RekenGemak">
<meta property="og:description" content="Bereken je wettelijke vakantiedagen op basis van je werkweek en dienstverband. Inclusief bovenwettelijke dagen en pro-rata berekening. Gratis en direct resultaat.">
<meta property="og:url"         content="https://rekengemak.nl/vakantiedagen-berekenen/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert CSS van `btw-berekenen/index.html` volledig. Aanvullende CSS voor slider (zelfde als T-008) en result grid hieronder.

### Aanvullende CSS

```css
/* Slider (zelfde als T-008) */
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

/* Result grid: 2 kolommen naast elkaar */
.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-top: var(--space-md);
}
@media (max-width: 480px) {
  .result-grid { grid-template-columns: 1fr; }
}
.result-grid-item {
  background: var(--result-bg);
  border-left: 4px solid var(--success);
  border-radius: var(--radius);
  padding: var(--space-md);
}
.result-grid-item .result-label {
  font-size: 0.75rem; color: var(--text-secondary);
  text-transform: uppercase; letter-spacing: 0.05em;
  margin-bottom: 4px;
}
.result-grid-item .result-num {
  font-size: 1.8rem; font-weight: 700;
  color: var(--success);
  font-variant-numeric: tabular-nums;
}
.result-grid-item .result-unit {
  font-size: 0.85rem; color: var(--text-secondary);
  margin-top: 2px;
}

/* Disclaimer */
.disclaimer {
  font-size: 0.8rem; font-style: italic;
  color: var(--text-secondary);
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border);
}
```

---

## Cấu trúc HTML

```
<html lang="nl">
<head>
  [1] Script dark mode     ← EERSTE TAG
  [2] meta charset, viewport
  [3] title, meta description
  [4] canonical
  [5] Open Graph tags
  [6] style CSS inline
</head>
<body>
  [7]  header
  [8]  div id="ad-top"
  <main>
    [9]  div class="hero"
    [10] section class="tool-card"
    [11] div id="ad-middle"
    [12] article class="content"
    [13] div id="ad-bottom"
  </main>
  [14] footer
  [15] 3x JSON-LD scripts  ← CUỐI BODY
  [16] script JS inline
</body>
```

---

## Hero Section

```html
<div class="hero">
  <nav aria-label="Breadcrumb">
    <a href="/">Thuis</a> &rsaquo; <span>Vakantiedagen Berekenen</span>
  </nav>
  <h1>Vakantiedagen Berekenen 2026</h1>
  <span class="badge-updated">Bijgewerkt: januari 2026</span>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Bereken je wettelijke vakantiedagen op basis van je werkweek. Inclusief pro-rata en bovenwettelijke dagen.
  </p>
</div>
```

---

## Tool Card

```html
<section class="tool-card" aria-label="Vakantiedagen Berekenen">

  <!-- Input 1: Uren per week (slider) -->
  <div class="slider-wrap">
    <label for="uren">
      <span>Uren per week</span>
      <span class="slider-value" id="uren-value">40</span>
    </label>
    <input type="range" id="uren" min="8" max="40" step="1" value="40"
           oninput="updateSlider('uren'); recalc()">
  </div>

  <!-- Input 2: Bovenwettelijke dagen (optioneel) -->
  <div class="input-group">
    <label for="bovenwettelijk">
      Bovenwettelijke vakantiedagen
      <span style="font-weight:400;font-size:0.8rem;"> (optioneel, staat in je cao of contract)</span>
    </label>
    <div class="input-wrap">
      <input id="bovenwettelijk" type="text" inputmode="decimal"
             autocomplete="off" placeholder="bijv. 5 (of leeg laten)"
             oninput="recalc()">
    </div>
  </div>

  <!-- Input 3: Maanden in dienst (slider) -->
  <div class="slider-wrap">
    <label for="maanden">
      <span>Maanden in dienst dit jaar</span>
      <span class="slider-value" id="maanden-value">12</span>
    </label>
    <input type="range" id="maanden" min="1" max="12" step="1" value="12"
           oninput="updateSlider('maanden'); recalc()">
  </div>

  <!-- Result grid: 2x2 -->
  <div class="result-grid" id="result-grid">
    <div class="result-grid-item">
      <div class="result-label">Wettelijke dagen</div>
      <div class="result-num" id="res-wettelijk">--</div>
      <div class="result-unit">dagen per jaar</div>
    </div>
    <div class="result-grid-item">
      <div class="result-label">Totaal vakantiedagen</div>
      <div class="result-num" id="res-totaal">--</div>
      <div class="result-unit">dagen per jaar</div>
    </div>
    <div class="result-grid-item">
      <div class="result-label">Totaal in uren</div>
      <div class="result-num" id="res-uren">--</div>
      <div class="result-unit">uur per jaar</div>
    </div>
    <div class="result-grid-item">
      <div class="result-label">Pro-rata (jouw periode)</div>
      <div class="result-num" id="res-prorata">--</div>
      <div class="result-unit" id="res-prorata-unit">dagen</div>
    </div>
  </div>

  <!-- Copy + Reset -->
  <div style="display:flex;gap:var(--space-sm);margin-top:var(--space-md);flex-wrap:wrap;">
    <button class="btn-copy" onclick="copyResult()" id="btn-copy-main">Kopieer totaal</button>
    <button class="btn-secondary" onclick="resetTool()">Wis alles</button>
  </div>

  <!-- Disclaimer -->
  <p class="disclaimer">
    Dit is een indicatieve berekening op basis van het wettelijk minimum van 4 keer de werkweek.
    Je werkelijke recht op vakantiedagen kan hoger zijn door cao-afspraken of je arbeidscontract.
    Raadpleeg je werkgever of hr-afdeling voor het exacte aantal.
  </p>

</section>
```

---

## Logic JavaScript

```javascript
/* ═══ FORMAT HELPERS ═══════════════════════════════════════════════════ */
var fmtNum = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 1 });

function parseNL(str) {
  if (!str || str.trim() === '') return 0;
  return parseFloat(str.replace(/\./g, '').replace(',', '.')) || 0;
}

/* ═══ SLIDER UPDATE ════════════════════════════════════════════════════ */
function updateSlider(id) {
  var val = document.getElementById(id).value;
  document.getElementById(id + '-value').textContent = val;
}

/* ═══ VAKANTIEDAGEN FORMULE ═════════════════════════════════════════════
   Wettelijk minimum: 4 x werkweek in dagen
   werkdag = urenPerWeek / 5
   wettelijkDagen = 4 x (urenPerWeek / 8) als fulltimer 40u = 20 dagen
   CORRECTE formule: wettelijkDagen = 4 * (urenPerWeek / 8)
   Pro-rata = totaalDagen * (maanden / 12)
   Uren = totaalDagen * (urenPerWeek / 5)
════════════════════════════════════════════════════════════════════════ */
function calcVakantiedagen(urenPerWeek, extraDagen, maanden) {
  var wettelijk      = 4 * (urenPerWeek / 8);  /* 40u/w = 20 dagen */
  var bovenwettelijk = extraDagen || 0;
  var totaal         = wettelijk + bovenwettelijk;
  var uren           = totaal * (urenPerWeek / 5);
  var proRata        = totaal * (maanden / 12);

  return {
    wettelijk:      wettelijk,
    bovenwettelijk: bovenwettelijk,
    totaal:         totaal,
    uren:           uren,
    proRata:        proRata,
    maanden:        maanden
  };
}

/* ═══ RECALC ════════════════════════════════════════════════════════════ */
function recalc() {
  var urenPerWeek = parseInt(document.getElementById('uren').value);
  var extraRaw    = document.getElementById('bovenwettelijk').value.trim();
  var extraDagen  = extraRaw === '' ? 0 : parseNL(extraRaw);
  var maanden     = parseInt(document.getElementById('maanden').value);

  if (urenPerWeek < 1) { setResults(null); return; }

  var r = calcVakantiedagen(urenPerWeek, extraDagen, maanden);
  setResults(r);
}

/* ═══ SET RESULTS ═══════════════════════════════════════════════════════ */
function setResults(r) {
  var ids = ['res-wettelijk', 'res-totaal', 'res-uren', 'res-prorata'];

  if (!r) {
    ids.forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.textContent = '--';
        el.style.color = 'var(--text-secondary)';
      }
    });
    return;
  }

  function setNum(id, val) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = fmtNum.format(val);
    el.style.color = 'var(--success)';
  }

  setNum('res-wettelijk', r.wettelijk);
  setNum('res-totaal',    r.totaal);
  setNum('res-uren',      r.uren);
  setNum('res-prorata',   r.proRata);

  /* Pro-rata unit label */
  var unitEl = document.getElementById('res-prorata-unit');
  if (unitEl) {
    unitEl.textContent = r.maanden === 12
      ? 'dagen (volledig jaar)'
      : 'dagen (' + r.maanden + ' van 12 mnd)';
  }
}

/* ═══ COPY ══════════════════════════════════════════════════════════════ */
function copyResult() {
  var el  = document.getElementById('res-totaal');
  var txt = el ? el.textContent.trim() : '';
  if (!txt || txt === '--') return;
  navigator.clipboard.writeText(txt + ' vakantiedagen').then(function() {
    var btn = document.getElementById('btn-copy-main');
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

/* ═══ RESET ═════════════════════════════════════════════════════════════ */
function resetTool() {
  document.getElementById('uren').value        = 40;
  document.getElementById('maanden').value     = 12;
  document.getElementById('bovenwettelijk').value = '';
  updateSlider('uren');
  updateSlider('maanden');
  recalc();
}

/* ═══ DARK MODE TOGGLE ══════════════════════════════════════════════════ */
function toggleTheme() {
  var cur  = document.documentElement.getAttribute('data-theme');
  var next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('rekengemak-theme', next);
}

/* ═══ INIT ══════════════════════════════════════════════════════════════ */
recalc(); /* Toon direct resultaat bij pageload met defaults */
```

---

## 3 JSON-LD Schemas — Cuối body

### Schema 1: WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Vakantiedagen Berekenen 2026 — RekenGemak",
  "url": "https://rekengemak.nl/vakantiedagen-berekenen/",
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

### Schema 2: FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hoeveel vakantiedagen heb ik wettelijk recht op in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Het wettelijk minimum is 4 keer de overeengekomen werkweek per jaar. Werk je 5 dagen per week, dan heb je recht op minimaal 20 vakantiedagen. Werk je 4 dagen per week, dan is dat 16 dagen. Veel cao's kennen meer vakantiedagen dan dit wettelijk minimum."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe bereken je vakantiedagen bij deeltijdwerk?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bij deeltijdwerk bereken je vakantiedagen naar rato van je werkweek. Werk je 32 uur per week (4 dagen), dan is je wettelijk minimum 4 x 4 = 16 vakantiedagen. De calculator doet dit automatisch als je het aantal uren per week invult."
      }
    },
    {
      "@type": "Question",
      "name": "Wat zijn bovenwettelijke vakantiedagen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bovenwettelijke vakantiedagen zijn extra vakantiedagen bovenop het wettelijk minimum van 4 keer de werkweek. Ze zijn vastgelegd in je cao of arbeidscontract. Veel werkgevers bieden 25 of meer vakantiedagen per jaar bij een 5-daagse werkweek."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe werkt de pro-rata berekening van vakantiedagen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als je niet het hele jaar in dienst bent, bouw je vakantiedagen op naar rato. Ben je 6 maanden in dienst bij een recht op 20 vakantiedagen per jaar, dan heb je recht op 10 dagen. De calculator berekent dit automatisch met de schuifregelaar voor maanden in dienst."
      }
    },
    {
      "@type": "Question",
      "name": "Kun je vakantiedagen ook in uren uitdrukken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, sommige werkgevers registreren vakantie in uren in plaats van dagen. Je berekent dit door het aantal vakantiedagen te vermenigvuldigen met het aantal uur per werkdag. Bij 20 vakantiedagen en 8 uur per dag is dat 160 vakantie-uren. De calculator toont dit automatisch."
      }
    },
    {
      "@type": "Question",
      "name": "Vervallen vakantiedagen als je ze niet opneemt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wettelijke vakantiedagen vervallen 6 maanden na het einde van het kalenderjaar waarin je ze hebt opgebouwd. Dat betekent dat vakantiedagen van 2026 vervallen op 1 juli 2027. Bovenwettelijke vakantiedagen hebben meestal een verjaringstermijn van 5 jaar, maar check je cao."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel vakantiedagen krijg je bij een nulurencontract?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bij een nulurencontract bouw je vakantiedagen op over de uren die je daadwerkelijk hebt gewerkt. Het wettelijk minimum is ook hier 4 keer de feitelijke werkweek. Werkgevers mogen een toeslag van 1/12 deel van het loon uitbetalen als vakantie-equivalent per maand."
      }
    },
    {
      "@type": "Question",
      "name": "Is deze vakantiedagencalculator gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de vakantiedagencalculator van RekenGemak is volledig gratis. Je hoeft geen account aan te maken en er is geen tijdslimiet. De calculator werkt direct in je browser, ook op je telefoon."
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
      "name": "Vakantiedagen Berekenen",
      "item": "https://rekengemak.nl/vakantiedagen-berekenen/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de vakantiedagencalculator?"

Stel het aantal uren in dat je per week werkt met de eerste schuifregelaar. De calculator berekent direct je wettelijk minimum: 4 keer je werkweek in dagen. Werk je 40 uur per week, dan is dat 20 vakantiedagen. Werk je 32 uur, dan is dat 16 dagen.

Heb je via je cao of contract meer vakantiedagen dan het wettelijk minimum? Vul dan het aantal bovenwettelijke dagen in het invoerveld in.

Ben je pas later dit jaar in dienst gekomen of wil je weten hoeveel dagen je hebt opgebouwd? Stel de tweede schuifregelaar in op het aantal maanden dat je in dienst bent. De pro-rata berekening past het totaal automatisch aan.

De calculator toont ook het totaal in uren, handig als je werkgever vakantie in uren registreert.

### H2: "Voor wie is deze rekenhulp?"

- Werknemers die willen controleren of ze het juiste aantal vakantiedagen krijgen
- Nieuwe medewerkers die hun pro-rata vakantiedagen willen berekenen
- Deeltijdwerkers die hun vakantiedagenrecht naar rato willen weten
- HR-medewerkers die snel vakantiedagen voor nieuwe collega's willen bepalen
- Iedereen die zijn vakantiedagensaldo wil omzetten naar uren

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/vakantiegeld-berekenen/">Vakantiegeld berekenen</a>
  <a href="/uurloon-berekenen/">Uurloon berekenen</a>
  <a href="/minimumloon-berekenen/">Minimumloon berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/procenten-berekenen/">Procenten berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 hergebruiken** — slider CSS van T-008 + result-grid CSS hieronder toevoegen
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`inputmode="decimal"`** — op bovenwettelijk invoerveld
7. **Sliders default:** uren=40, maanden=12
8. **`recalc()` aanroepen bij pageload (na script)** — toon direct resultaat met default waarden, gebruiker ziet 20 dagen zonder te hoeven invoeren
9. **Result grid** — 2 kolommen op desktop, 1 kolom op mobile (<480px)
10. **Disclaimer verplicht** — onder result grid
11. **Badge "Bijgewerkt: januari 2026"** — verplicht bij H1
12. **Formule:** `wettelijkDagen = 4 * (urenPerWeek / 8)` — 40u/w = 20 dagen ✓
13. **Pro-rata unit label** past aan: "dagen (volledig jaar)" vs "dagen (X van 12 mnd)"
14. **Footer trailing slash** — `/privacy/`, `/contact/`
15. **JSON-LD schemas** — onderaan body, na `</footer>`
16. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-009-vakantiedagen-berekenen

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-009-vakantiedagen.md
git commit -m "docs: add brief TASK-009"

# Stap 3: code committen
git add vakantiedagen-berekenen/index.html
git commit -m "feat: TASK-009 vakantiedagen-berekenen tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-009-vakantiedagen-berekenen
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/vakantiedagen-berekenen/
```

> **Belangrijk:** Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/vakantiedagen-berekenen/` — niet op localhost.

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/vakantiedagen-berekenen/`

## A. Kỹ thuật

- [ ] **PageSpeed mobile:** [score] — vereist >= 90
- [ ] **PageSpeed desktop:** [score] — vereist >= 95
- [ ] **Rich Results — WebApplication:** PASS / FAIL
- [ ] **Rich Results — FAQPage:** PASS / FAIL
- [ ] **Rich Results — BreadcrumbList:** PASS / FAIL
- [ ] **DevTools Network:** 0 externe requests
- [ ] **Ctrl+F "—" (em dash):** niet gevonden in body-tekst
- [ ] **Ctrl+F "--":** niet gevonden in body-tekst
- [ ] **Ctrl+F "...":** niet gevonden
- [ ] **Ctrl+F "Furthermore/Moreover/Additionally":** niet gevonden
- [ ] **Interne links:** [aantal] — minimaal 5
- [ ] **Sitemap:** vakantiedagen-berekenen/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Tính toán — Chạy trên live URL

### Wettelijke dagen (formule: 4 × uren/8)

| Uren/week | Extra dagen | Maanden | Wettelijk | Totaal | In uren | Pro-rata | PASS/FAIL |
|---|---|---|---|---|---|---|---|
| 40 | 0 | 12 | 20 | 20 | 160 | 20 | |
| 40 | 5 | 12 | 20 | 25 | 200 | 25 | |
| 32 | 0 | 12 | 16 | 16 | 102,4 | 16 | |
| 24 | 0 | 12 | 12 | 12 | 57,6 | 12 | |
| 40 | 0 | 6 | 20 | 20 | 160 | 10 | |
| 40 | 5 | 6 | 20 | 25 | 200 | 12,5 | |
| 32 | 3 | 9 | 16 | 19 | 121,6 | 14,25 | |
| 40 | 0 | 1 | 20 | 20 | 160 | 1,67 | |

### Pageload default

| Conditie | Verwacht | PASS/FAIL |
|---|---|---|
| Pagina geladen zonder invoer | Wettelijk=20, Totaal=20, Uren=160, Pro-rata=20 (defaults: 40u, 12mnd) | |

## C. UX op apparaten

- [ ] **Pageload:** resultaat zichtbaar direct bij laden — geen lege "--" bij default waarden
- [ ] **Slider uren realtime:** slepen → getal + resultaten passen direct mee
- [ ] **Slider maanden realtime:** slepen → pro-rata past direct mee
- [ ] **Slider uren default = 40**
- [ ] **Slider maanden default = 12**
- [ ] **Bovenwettelijk leeg:** telt als 0, geen fout
- [ ] **iOS Safari:** numeriek toetsenbord op bovenwettelijk-veld, geen zoom
- [ ] **Mobiel 375px:** geen horizontale scroll, result grid 1 kolom
- [ ] **Result grid desktop:** 2 kolommen naast elkaar
- [ ] **Pro-rata label:** bij 12 maanden "dagen (volledig jaar)", bij minder "dagen (X van 12 mnd)"
- [ ] **Knop "Kopieer totaal":** → "Gekopieerd!" 1,5 sec → terug
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage `rekengemak-theme` correct
- [ ] **Disclaimer:** zichtbaar onder result grid, italic

## D. Inhoud

- [ ] **H1** = "Vakantiedagen Berekenen 2026"
- [ ] **Badge "Bijgewerkt: januari 2026"** aanwezig
- [ ] **Keyword "vakantiedagen berekenen"** in eerste 100 woorden
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden**
- [ ] **Disclaimer** aanwezig onder result grid

## Samenvatting

```
Live URL getest: https://rekengemak.nl/vakantiedagen-berekenen/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
