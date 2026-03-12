# TASK-013 — Minimumloon Berekenen
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P2
**Branch:** `feature/TASK-013-minimumloon-berekenen`
**File:** `minimumloon-berekenen/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Minimumloon Berekenen tại `/minimumloon-berekenen/` — toont het wettelijk minimumloon 2026 per uur, dag, week en maand op basis van leeftijd en werkweek. Gebruiker kiest leeftijd en uren per week, ziet direct het minimumloon waar hij of zij recht op heeft.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/minimumloon-berekenen/`
- **Title (62 ký tự):** `Minimumloon Berekenen 2026 -- Gratis Calculator | RekenGemak`
- **Meta description (155 ký tự):** `Bereken het wettelijk minimumloon 2026 per uur, dag, week en maand. Inclusief leeftijdstabel voor jongeren van 15 tot 20 jaar. Bijgewerkt januari 2026.`
- **H1:** `Minimumloon Berekenen 2026`
- **Từ khóa chính:** `minimumloon berekenen` (5K–12K/tháng, KD 5–12)
- **Từ khóa dài:**
  - minimumloon 2026 per uur
  - wettelijk minimumloon nederland 2026
  - minimumloon jongeren 2026
  - minimumloon berekenen deeltijd
  - minimumloon per maand 2026
  - minimumloon 18 jaar 2026

---

## Open Graph Tags

```html
<meta property="og:title"       content="Minimumloon Berekenen 2026 -- Gratis Calculator | RekenGemak">
<meta property="og:description" content="Bereken het wettelijk minimumloon 2026 per uur, dag, week en maand. Inclusief leeftijdstabel voor jongeren van 15 tot 20 jaar. Bijgewerkt januari 2026.">
<meta property="og:url"         content="https://rekengemak.nl/minimumloon-berekenen/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert CSS van `btw-berekenen/index.html` volledig. Aanvullende CSS voor result grid (zelfde patroon als T-009) en leeftijdstabel hieronder.

### Aanvullende CSS

```css
/* Result grid 2x2 (zelfde als T-009) */
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
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.result-grid-item .result-num {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--success);
  font-variant-numeric: tabular-nums;
}

/* Leeftijdstabel */
.leeftijd-tabel {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-md);
  font-size: 0.9rem;
}

.leeftijd-tabel th {
  text-align: left;
  padding: 8px 12px;
  background: var(--bg-input);
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
}

.leeftijd-tabel td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
}

.leeftijd-tabel tr:last-child td {
  border-bottom: none;
}

.leeftijd-tabel tr.active-row td {
  background: var(--result-bg);
  color: var(--success);
  font-weight: 600;
}

/* Disclaimer */
.disclaimer {
  font-size: 0.8rem;
  font-style: italic;
  color: var(--text-secondary);
  margin-top: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border);
}

/* Slider (van T-008/T-009) */
.slider-wrap {
  margin-bottom: var(--space-md);
}

.slider-wrap label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.slider-wrap .slider-value {
  font-weight: 700;
  color: var(--text-primary);
}

input[type="range"] {
  width: 100%;
  height: 6px;
  accent-color: var(--accent);
  cursor: pointer;
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
    <a href="/">Thuis</a> &rsaquo; <span>Minimumloon Berekenen</span>
  </nav>
  <h1>Minimumloon Berekenen 2026</h1>
  <span class="badge-updated">Bijgewerkt: januari 2026</span>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Bereken het wettelijk minimumloon 2026 per uur, dag, week en maand op basis van je leeftijd en werkweek.
  </p>
</div>
```

---

## Tool Card

```html
<section class="tool-card" aria-label="Minimumloon Berekenen">

  <!-- Input 1: Leeftijd dropdown -->
  <div class="input-group">
    <label for="leeftijd">Leeftijd</label>
    <div class="input-wrap">
      <select id="leeftijd" onchange="recalc()">
        <option value="21">21 jaar of ouder</option>
        <option value="20">20 jaar</option>
        <option value="19">19 jaar</option>
        <option value="18">18 jaar</option>
        <option value="17">17 jaar</option>
        <option value="16">16 jaar</option>
        <option value="15">15 jaar</option>
      </select>
    </div>
  </div>

  <!-- Input 2: Uren per week (slider) -->
  <div class="slider-wrap">
    <label for="uren">
      <span>Uren per week</span>
      <span class="slider-value" id="uren-value">40</span>
    </label>
    <input type="range" id="uren" min="1" max="40" step="1" value="40"
           oninput="updateSlider(); recalc()">
  </div>

  <!-- Result grid: 4 vakken -->
  <div class="result-grid">
    <div class="result-grid-item">
      <div class="result-label">Per uur</div>
      <div class="result-num" id="res-uur">--</div>
    </div>
    <div class="result-grid-item">
      <div class="result-label">Per dag (8 uur)</div>
      <div class="result-num" id="res-dag">--</div>
    </div>
    <div class="result-grid-item">
      <div class="result-label">Per week</div>
      <div class="result-num" id="res-week">--</div>
    </div>
    <div class="result-grid-item">
      <div class="result-label">Per maand</div>
      <div class="result-num" id="res-maand">--</div>
    </div>
  </div>

  <!-- Leeftijdspercentage toelichting (alleen voor < 21) -->
  <div id="jeugd-toelichting" style="display:none;
       margin-top:var(--space-md);padding:12px var(--space-md);
       background:var(--bg-input);border-radius:var(--radius);
       font-size:0.9rem;color:var(--text-secondary);">
    <span id="jeugd-tekst"></span>
  </div>

  <!-- Leeftijdstabel -->
  <div style="margin-top:var(--space-lg);">
    <div style="font-size:0.875rem;font-weight:600;color:var(--text-secondary);
                text-transform:uppercase;letter-spacing:0.05em;
                margin-bottom:var(--space-sm);">
      Leeftijdstabel 2026
    </div>
    <table class="leeftijd-tabel" id="leeftijd-tabel">
      <thead>
        <tr>
          <th>Leeftijd</th>
          <th>% van minimum</th>
          <th>Per uur</th>
          <th>Per maand (40u/w)</th>
        </tr>
      </thead>
      <tbody id="tabel-body">
        <!-- Dynamisch gevuld door JS -->
      </tbody>
    </table>
  </div>

  <!-- Disclaimer -->
  <p class="disclaimer">
    Dit is een indicatieve berekening op basis van het wettelijk minimumloon per 1 januari 2026
    (€ 13,68 per uur). Het minimumloon wordt elk jaar per 1 januari en 1 juli aangepast.
    Raadpleeg de Rijksoverheid voor de meest actuele bedragen.
  </p>

</section>
```

---

## Logic JavaScript

```javascript
/* ═══ MINIMUMLOON DATA 2026 ══════════════════════════════════════════════
   Bijwerken: 1 januari en 1 juli elk jaar
   Bron: rijksoverheid.nl
════════════════════════════════════════════════════════════════════════ */
var MINIMUMLOON = {
  perUur: 13.68,  /* >= 21 jaar, per 1 januari 2026 */
  leeftijd: {
    15: 0.30,
    16: 0.34,
    17: 0.39,
    18: 0.47,
    19: 0.55,
    20: 0.625
  }
};

/* ═══ FORMAT ════════════════════════════════════════════════════════════ */
var fmtEUR = new Intl.NumberFormat('nl-NL', {
  style: 'currency', currency: 'EUR', minimumFractionDigits: 2
});

/* ═══ SLIDER ════════════════════════════════════════════════════════════ */
function updateSlider() {
  document.getElementById('uren-value').textContent =
    document.getElementById('uren').value;
}

/* ═══ RECALC ════════════════════════════════════════════════════════════ */
function recalc() {
  var leeftijd    = parseInt(document.getElementById('leeftijd').value);
  var urenPerWeek = parseInt(document.getElementById('uren').value);
  var factor      = leeftijd >= 21 ? 1 : (MINIMUMLOON.leeftijd[leeftijd] || 1);
  var uurloon     = MINIMUMLOON.perUur * factor;

  var perUur   = uurloon;
  var perDag   = uurloon * 8;
  var perWeek  = uurloon * urenPerWeek;
  var perMaand = uurloon * urenPerWeek * 52 / 12;

  /* Result grid */
  document.getElementById('res-uur').textContent   = fmtEUR.format(perUur);
  document.getElementById('res-dag').textContent   = fmtEUR.format(perDag);
  document.getElementById('res-week').textContent  = fmtEUR.format(perWeek);
  document.getElementById('res-maand').textContent = fmtEUR.format(perMaand);

  /* Jeugd toelichting */
  var toel = document.getElementById('jeugd-toelichting');
  var txt  = document.getElementById('jeugd-tekst');
  if (leeftijd < 21) {
    var pct = Math.round(factor * 100);
    txt.textContent = 'Jongeren van ' + leeftijd + ' jaar ontvangen ' + pct +
      '% van het wettelijk minimumloon. Dat is ' + fmtEUR.format(uurloon) +
      ' per uur (volwassen minimumloon: ' + fmtEUR.format(MINIMUMLOON.perUur) + ' per uur).';
    toel.style.display = 'block';
  } else {
    toel.style.display = 'none';
  }

  /* Markeer actieve rij in tabel */
  highlightRow(leeftijd);
}

/* ═══ LEEFTIJDSTABEL BOUWEN ═════════════════════════════════════════════ */
function buildTabel() {
  var tbody  = document.getElementById('tabel-body');
  var rijen  = [
    { leeftijd: '21+', factor: 1 },
    { leeftijd: '20',  factor: MINIMUMLOON.leeftijd[20] },
    { leeftijd: '19',  factor: MINIMUMLOON.leeftijd[19] },
    { leeftijd: '18',  factor: MINIMUMLOON.leeftijd[18] },
    { leeftijd: '17',  factor: MINIMUMLOON.leeftijd[17] },
    { leeftijd: '16',  factor: MINIMUMLOON.leeftijd[16] },
    { leeftijd: '15',  factor: MINIMUMLOON.leeftijd[15] }
  ];

  tbody.innerHTML = '';
  rijen.forEach(function(r) {
    var uurloon  = MINIMUMLOON.perUur * r.factor;
    var maandloon = uurloon * 40 * 52 / 12;
    var tr = document.createElement('tr');
    tr.dataset.leeftijd = r.leeftijd;
    tr.innerHTML =
      '<td>' + r.leeftijd + ' jaar</td>' +
      '<td>' + Math.round(r.factor * 100) + '%</td>' +
      '<td>' + fmtEUR.format(uurloon) + '</td>' +
      '<td>' + fmtEUR.format(maandloon) + '</td>';
    tbody.appendChild(tr);
  });
}

function highlightRow(leeftijd) {
  var rows = document.querySelectorAll('.leeftijd-tabel tbody tr');
  rows.forEach(function(row) {
    row.classList.remove('active-row');
    var key = row.dataset.leeftijd;
    if (leeftijd >= 21 && key === '21+') row.classList.add('active-row');
    if (leeftijd < 21  && key === String(leeftijd)) row.classList.add('active-row');
  });
}

/* ═══ DARK MODE TOGGLE ══════════════════════════════════════════════════ */
function toggleTheme() {
  var cur  = document.documentElement.getAttribute('data-theme');
  var next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('rekengemak-theme', next);
}

/* ═══ INIT ══════════════════════════════════════════════════════════════ */
buildTabel();
recalc();  /* Toon direct resultaat met defaults: 21 jaar, 40u/w */
```

---

## 3 JSON-LD Schemas — Cuối body

### Schema 1: WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Minimumloon Berekenen 2026 — RekenGemak",
  "url": "https://rekengemak.nl/minimumloon-berekenen/",
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
      "name": "Wat is het wettelijk minimumloon in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Het wettelijk minimumloon voor werknemers van 21 jaar en ouder is per 1 januari 2026 vastgesteld op EUR 13,68 per uur. Bij een werkweek van 40 uur komt dat neer op EUR 547,20 per week en circa EUR 2.371,20 per maand. Het minimumloon wordt elk jaar op 1 januari en 1 juli aangepast."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe werkt het minimumloon voor jongeren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jongeren van 15 tot en met 20 jaar hebben recht op een percentage van het volwassen minimumloon. In 2026 gelden de volgende percentages: 15 jaar = 30%, 16 jaar = 34%, 17 jaar = 39%, 18 jaar = 47%, 19 jaar = 55%, 20 jaar = 62,5%. Vanaf 21 jaar ontvang je het volledige minimumloon van EUR 13,68 per uur."
      }
    },
    {
      "@type": "Question",
      "name": "Wanneer wordt het minimumloon aangepast?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Het wettelijk minimumloon wordt twee keer per jaar aangepast: op 1 januari en op 1 juli. De aanpassing is gekoppeld aan de ontwikkeling van de contractlonen in Nederland. De bedragen op deze pagina zijn geldig vanaf 1 januari 2026."
      }
    },
    {
      "@type": "Question",
      "name": "Geldt het minimumloon ook voor deeltijdwerkers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, het minimumloon geldt per uur en is daarmee ook van toepassing op deeltijdwerkers. Je hebt recht op minimaal EUR 13,68 per gewerkt uur, ongeacht het aantal uren per week. Met de schuifregelaar in de calculator bereken je je minimumloon op basis van je eigen werkweek."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het minimumloon per maand bij 40 uur per week?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bij een werkweek van 40 uur en een uurtarief van EUR 13,68 bedraagt het minimumloon circa EUR 2.371,20 bruto per maand. Dit is berekend op basis van 52 weken per jaar gedeeld door 12 maanden. Werkgevers mogen niet minder betalen dan dit wettelijk vastgestelde bedrag."
      }
    },
    {
      "@type": "Question",
      "name": "Geldt het minimumloon ook voor zzp'ers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, het wettelijk minimumloon geldt alleen voor werknemers in loondienst. Zelfstandigen zonder personeel (zzp'ers) bepalen zelf hun uurtarief en vallen niet onder de minimumloonwetgeving. Voor zzp-tarieven kun je de Uurloon-calculator op deze site gebruiken."
      }
    },
    {
      "@type": "Question",
      "name": "Wat gebeurt er als een werkgever minder dan het minimumloon betaalt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een werkgever die minder betaalt dan het wettelijk minimumloon overtreedt de Wet minimumloon en minimumvakantiebijslag. De Nederlandse Arbeidsinspectie kan hiervoor een boete opleggen. Als werknemer heb je altijd recht op het verschil met het wettelijk minimumloon, ook achteraf."
      }
    },
    {
      "@type": "Question",
      "name": "Is de minimumloon calculator gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de minimumloon calculator van RekenGemak is volledig gratis. Je hoeft geen account aan te maken. De bedragen zijn bijgewerkt per 1 januari 2026 en de calculator werkt direct in je browser, ook op je telefoon."
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
      "name": "Minimumloon Berekenen",
      "item": "https://rekengemak.nl/minimumloon-berekenen/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de minimumloon calculator?"

Kies je leeftijd uit het dropdown-menu en stel het aantal uren per week in met de schuifregelaar. De calculator toont direct het wettelijk minimumloon per uur, dag, week en maand.

Ben je jonger dan 21 jaar? Dan zie je ook welk percentage van het volwassen minimumloon voor jouw leeftijd geldt. In de leeftijdstabel onderaan de tool staan alle bedragen voor 15 tot en met 21 jaar overzichtelijk naast elkaar.

De bedragen zijn bruto en gebaseerd op het minimumloon per 1 januari 2026 van EUR 13,68 per uur.

### H2: "Voor wie is deze rekenhulp?"

- Werknemers die willen controleren of ze het juiste loon ontvangen
- Jongeren die willen weten wat hun wettelijk minimumloon is
- Werkgevers die het minimumloon voor deeltijdwerkers willen berekenen
- HR-medewerkers die snel het minimumloon voor een nieuwe medewerker willen opzoeken
- Iedereen die wil weten wat het minimumloon per maand of jaar is

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/uurloon-berekenen/">Uurloon berekenen</a>
  <a href="/vakantiegeld-berekenen/">Vakantiegeld berekenen</a>
  <a href="/vakantiedagen-berekenen/">Vakantiedagen berekenen</a>
  <a href="/procenten-berekenen/">Procenten berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 + result-grid van T-009 + slider van T-008** — leeftijdstabel CSS toevoegen
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`select option { background-color: var(--bg-input); color: var(--text-primary); }`** — Fix 6 van T-001, verplicht
7. **`recalc()` en `buildTabel()` aanroepen bij pageload** — direct resultaat zichtbaar bij 21 jaar / 40u/w
8. **Leeftijdstabel dynamisch bouwen** via `buildTabel()` — niet hardcoden in HTML
9. **Actieve rij markeren** via `active-row` class op basis van geselecteerde leeftijd
10. **Jeugd-toelichting** — alleen zichtbaar bij leeftijd < 21, verborgen bij 21+
11. **`Intl.NumberFormat` met `style: 'currency'`** — alle bedragen in euro formaat
12. **Badge "Bijgewerkt: januari 2026"** — verplicht bij H1
13. **Disclaimer verplicht** — onder leeftijdstabel
14. **Data comment in JS:** `/* Bijwerken: 1 januari en 1 juli elk jaar */`
15. **Footer trailing slash** — `/privacy/`, `/contact/`
16. **JSON-LD schemas** — onderaan body, na `</footer>`
17. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-013-minimumloon-berekenen

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-013-minimumloon.md
git commit -m "docs: add brief TASK-013"

# Stap 3: code committen
git add minimumloon-berekenen/index.html
git commit -m "feat: TASK-013 minimumloon-berekenen tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-013-minimumloon-berekenen
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/minimumloon-berekenen/
```

> **Belangrijk:** Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/minimumloon-berekenen/` — niet op localhost.

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/minimumloon-berekenen/`

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
- [ ] **Sitemap:** minimumloon-berekenen/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Tính toán — Chạy trên live URL

### Minimumloon >= 21 jaar (factor 100%)

| Leeftijd | Uren/week | Per uur | Per dag | Per week | Per maand | PASS/FAIL |
|---|---|---|---|---|---|---|
| 21+ | 40 | € 13,68 | € 109,44 | € 547,20 | € 2.371,20 | |
| 21+ | 32 | € 13,68 | € 109,44 | € 437,76 | € 1.896,96 | |
| 21+ | 20 | € 13,68 | € 109,44 | € 273,60 | € 1.185,60 | |

### Minimumloon jongeren (leeftijdsfactoren)

| Leeftijd | Factor | Per uur verwacht | Per maand (40u/w) | PASS/FAIL |
|---|---|---|---|---|
| 20 jaar | 62,5% | € 8,55 | € 1.482,00 | |
| 19 jaar | 55% | € 7,52 | € 1.304,16 | |
| 18 jaar | 47% | € 6,43 | € 1.114,46 | |
| 17 jaar | 39% | € 5,34 | € 925,07 | |
| 16 jaar | 34% | € 4,65 | € 806,21 | |
| 15 jaar | 30% | € 4,10 | € 711,36 | |

### Pageload default

| Conditie | Verwacht | PASS/FAIL |
|---|---|---|
| Pagina geladen | Leeftijd 21+, 40u/w: per uur € 13,68, per maand € 2.371,20 | |

## C. UX op apparaten

- [ ] **Pageload:** resultaat direct zichtbaar — geen lege "--"
- [ ] **Dropdown leeftijd:** wijzigen → resultaten direct aangepast
- [ ] **Dropdown dark mode:** achtergrond `var(--bg-input)` — geen witte achtergrond
- [ ] **Slider uren realtime:** slepen → week + maand bedrag passen mee
- [ ] **Slider default = 40**
- [ ] **Jeugd-toelichting verborgen bij 21+**
- [ ] **Jeugd-toelichting zichtbaar bij 20 jaar:** vermeldt 62,5% en juist uurloon
- [ ] **Leeftijdstabel: 7 rijen aanwezig** (21+, 20, 19, 18, 17, 16, 15)
- [ ] **Actieve rij gemarkeerd:** 21+ geselecteerd → rij "21+ jaar" groen gemarkeerd
- [ ] **Actieve rij wisselt:** kies 18 jaar → rij "18 jaar" groen gemarkeerd
- [ ] **Result grid desktop:** 2 kolommen
- [ ] **Mobiel 375px:** geen horizontale scroll, result grid 1 kolom
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage `rekengemak-theme` correct
- [ ] **Badge "Bijgewerkt: januari 2026"** zichtbaar
- [ ] **Disclaimer** zichtbaar onder leeftijdstabel

## D. Inhoud

- [ ] **H1** = "Minimumloon Berekenen 2026"
- [ ] **Badge "Bijgewerkt: januari 2026"** aanwezig
- [ ] **Keyword "minimumloon"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden**
- [ ] **Disclaimer** aanwezig

## Samenvatting

```
Live URL getest: https://rekengemak.nl/minimumloon-berekenen/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
