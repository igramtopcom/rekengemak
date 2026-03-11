# TASK-003 — Korting Berekenen
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P1
**Branch:** `feature/TASK-003-korting-berekenen`
**File:** `korting-berekenen/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Korting Berekenen tại `/korting-berekenen/` — 3 loại tính toán giảm giá trong 1 giao diện tab. Người dùng có thể tính giá sau giảm, tính phần trăm giảm giá, hoặc tính giá gốc từ giá đã giảm.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/korting-berekenen/`
- **Title (60 ký tự):** `Korting Berekenen Online Gratis -- Prijs na Korting | RekenGemak`
- **Meta description (153 ký tự):** `Bereken snel de prijs na korting, het kortingspercentage of de originele prijs. Gratis kortingscalculator voor winkelen, sale en zakelijke kortingen.`
- **H1:** `Korting Berekenen`
- **Từ khóa chính:** `korting berekenen` (8K–14K/tháng, KD 8–14)
- **Từ khóa dài:**
  - prijs na korting berekenen
  - kortingspercentage berekenen
  - originele prijs berekenen na korting
  - hoeveel korting krijg ik
  - 20 procent korting berekenen
  - kortingscalculator online gratis

---

## Open Graph Tags

```html
<meta property="og:title"       content="Korting Berekenen Online Gratis -- Prijs na Korting | RekenGemak">
<meta property="og:description" content="Bereken snel de prijs na korting, het kortingspercentage of de originele prijs. Gratis kortingscalculator voor winkelen, sale en zakelijke kortingen.">
<meta property="og:url"         content="https://rekengemak.nl/korting-berekenen/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert de volledige CSS van `btw-berekenen/index.html`. Geen nieuwe variabelen nodig. Enige toevoeging: `.input-suffix` uit T-002 overnemen.

---

## Cấu trúc HTML

```
<html lang="nl">
<head>
  [1] Script dark mode          ← EERSTE TAG
  [2] <meta charset>, viewport
  [3] <title>, <meta description>
  [4] <link rel="canonical">
  [5] Open Graph tags
  [6] <style> CSS inline (8 blocks)
</head>
<body>
  [7]  <header>
  [8]  <div id="ad-top">
  <main>
    [9]  <div class="hero">
    [10] <section class="tool-card">  ← 3 tabs + 3 panels
    [11] <div id="ad-middle">
    [12] <article class="content">
    [13] <div id="ad-bottom">
  </main>
  [14] <footer>
  [15] 3x JSON-LD schemas          ← CUỐI BODY
  [16] <script> JS inline
</body>
```

---

## Hero Section

```html
<div class="hero">
  <nav aria-label="Breadcrumb">
    <a href="/">Thuis</a> &rsaquo; <span>Korting Berekenen</span>
  </nav>
  <h1>Korting Berekenen</h1>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Bereken de prijs na korting, het kortingspercentage of de originele prijs. Kies het tabblad dat bij je vraag past.
  </p>
</div>
```

---

## Tool Card — 3 Tabs

### Tab bar

```html
<section class="tool-card" aria-label="Korting Berekenen">
  <div class="tab-bar" role="tablist">
    <button class="tab-btn active" role="tab" id="tab-1"
            aria-selected="true" aria-controls="panel-1"
            onclick="switchTab(1)">Prijs na korting</button>
    <button class="tab-btn" role="tab" id="tab-2"
            aria-selected="false" aria-controls="panel-2"
            onclick="switchTab(2)">Kortings&shy;percentage</button>
    <button class="tab-btn" role="tab" id="tab-3"
            aria-selected="false" aria-controls="panel-3"
            onclick="switchTab(3)">Originele prijs</button>
  </div>
```

### Panel 1 — Prijs na korting (Wat betaal ik na 20% korting op € 150?)

**Formule:** `prijs_na_korting = originele_prijs × (1 - korting / 100)`
**Besparing:** `besparing = originele_prijs × (korting / 100)`

```html
  <div id="panel-1" class="tab-panel active" role="tabpanel" aria-labelledby="tab-1">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Bereken hoeveel je betaalt na een kortingspercentage. Bijvoorbeeld: wat kost een artikel van € 150 met 20% korting?
    </p>

    <div class="input-group">
      <label for="p1-prijs">Originele prijs</label>
      <div class="input-wrap">
        <span class="input-prefix">€</span>
        <input id="p1-prijs" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 150" oninput="calc(1)">
      </div>
    </div>

    <div class="input-group">
      <label for="p1-korting">Kortingspercentage</label>
      <div class="input-wrap">
        <input id="p1-korting" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 20" oninput="calc(1)">
        <span class="input-suffix">%</span>
      </div>
    </div>

    <div class="result-box">
      <div class="result-label">Prijs na korting</div>
      <div class="result-main" id="res-1">--</div>
      <div style="display:flex;gap:var(--space-lg);margin-top:10px;flex-wrap:wrap;">
        <div>
          <div class="result-label">Je bespaart</div>
          <div id="res-1-besparing" style="font-size:1.1rem;color:var(--text-primary);">--</div>
        </div>
        <div>
          <div class="result-label">Korting</div>
          <div id="res-1-pct" style="font-size:1.1rem;color:var(--text-primary);">--</div>
        </div>
      </div>
      <div style="margin-top:12px;">
        <button class="btn-copy" onclick="copyVal('res-1')">Kopieer prijs</button>
      </div>
    </div>
    <button class="btn-secondary" onclick="resetPanel(1)" style="margin-top:12px;">Wis alles</button>
  </div>
```

### Panel 2 — Kortingspercentage berekenen (Ik betaal € 120 in plaats van € 150, wat is het %?)

**Formule:** `kortings_pct = ((origineel - nieuw) / origineel) × 100`

```html
  <div id="panel-2" class="tab-panel" role="tabpanel" aria-labelledby="tab-2">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Bereken welk kortingspercentage is toegepast. Bijvoorbeeld: een artikel kost normaal € 150 maar je betaalt € 120. Hoeveel procent korting is dat?
    </p>

    <div class="input-group">
      <label for="p2-origineel">Originele prijs</label>
      <div class="input-wrap">
        <span class="input-prefix">€</span>
        <input id="p2-origineel" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 150" oninput="calc(2)">
      </div>
    </div>

    <div class="input-group">
      <label for="p2-nieuw">Prijs na korting</label>
      <div class="input-wrap">
        <span class="input-prefix">€</span>
        <input id="p2-nieuw" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 120" oninput="calc(2)">
      </div>
    </div>

    <div class="result-box">
      <div class="result-label">Kortingspercentage</div>
      <div class="result-main" id="res-2">--</div>
      <div style="margin-top:8px;">
        <div class="result-label">Besparing</div>
        <div id="res-2-besparing" style="font-size:1.1rem;color:var(--text-primary);">--</div>
      </div>
      <div style="margin-top:12px;">
        <button class="btn-copy" onclick="copyVal('res-2')">Kopieer percentage</button>
      </div>
    </div>
    <button class="btn-secondary" onclick="resetPanel(2)" style="margin-top:12px;">Wis alles</button>
  </div>
```

### Panel 3 — Originele prijs berekenen (Ik betaal € 80 na 20% korting, wat was de originele prijs?)

**Formule:** `originele_prijs = prijs_na_korting / (1 - korting / 100)`

```html
  <div id="panel-3" class="tab-panel" role="tabpanel" aria-labelledby="tab-3">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Bereken de originele prijs als je de prijs na korting en het kortingspercentage weet. Bijvoorbeeld: je betaalt € 80 na 20% korting. Wat was de originele prijs?
    </p>

    <div class="input-group">
      <label for="p3-betaald">Prijs na korting</label>
      <div class="input-wrap">
        <span class="input-prefix">€</span>
        <input id="p3-betaald" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 80" oninput="calc(3)">
      </div>
    </div>

    <div class="input-group">
      <label for="p3-pct">Kortingspercentage</label>
      <div class="input-wrap">
        <input id="p3-pct" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 20" oninput="calc(3)">
        <span class="input-suffix">%</span>
      </div>
    </div>

    <div class="result-box">
      <div class="result-label">Originele prijs</div>
      <div class="result-main" id="res-3">--</div>
      <div style="margin-top:8px;">
        <div class="result-label">Je hebt bespaard</div>
        <div id="res-3-besparing" style="font-size:1.1rem;color:var(--text-primary);">--</div>
      </div>
      <div style="margin-top:12px;">
        <button class="btn-copy" onclick="copyVal('res-3')">Kopieer prijs</button>
      </div>
    </div>
    <button class="btn-secondary" onclick="resetPanel(3)" style="margin-top:12px;">Wis alles</button>
  </div>

</section>
```

---

## Logic JavaScript

```javascript
/* ═══ FORMAT HELPERS ═══════════════════════════════════════════════════ */
var fmtEUR = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
var fmtPct = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 2 });

function parseNL(str) {
  if (!str) return NaN;
  return parseFloat(str.replace(/\./g, '').replace(',', '.'));
}

/* ═══ BEREKEN PER TAB ══════════════════════════════════════════════════ */
function calc(tab) {
  switch (tab) {

    case 1: {
      var prijs   = parseNL(document.getElementById('p1-prijs').value);
      var korting = parseNL(document.getElementById('p1-korting').value);
      if (isNaN(prijs) || isNaN(korting) || prijs <= 0 || korting < 0 || korting > 100) {
        setResult(1, null); return;
      }
      var na        = prijs * (1 - korting / 100);
      var besparing = prijs * (korting / 100);
      setResult(1, fmtEUR.format(na));
      document.getElementById('res-1-besparing').textContent = fmtEUR.format(besparing);
      document.getElementById('res-1-pct').textContent = fmtPct.format(korting) + '%';
      break;
    }

    case 2: {
      var origineel = parseNL(document.getElementById('p2-origineel').value);
      var nieuw     = parseNL(document.getElementById('p2-nieuw').value);
      if (isNaN(origineel) || isNaN(nieuw) || origineel <= 0 || nieuw < 0 || nieuw > origineel) {
        setResult(2, null); return;
      }
      var pct       = ((origineel - nieuw) / origineel) * 100;
      var besparing2 = origineel - nieuw;
      setResult(2, fmtPct.format(pct) + '%');
      document.getElementById('res-2-besparing').textContent = fmtEUR.format(besparing2);
      break;
    }

    case 3: {
      var betaald = parseNL(document.getElementById('p3-betaald').value);
      var pct3    = parseNL(document.getElementById('p3-pct').value);
      if (isNaN(betaald) || isNaN(pct3) || betaald <= 0 || pct3 < 0 || pct3 >= 100) {
        setResult(3, null); return;
      }
      var orig      = betaald / (1 - pct3 / 100);
      var besparing3 = orig - betaald;
      setResult(3, fmtEUR.format(orig));
      document.getElementById('res-3-besparing').textContent = fmtEUR.format(besparing3);
      break;
    }
  }
}

/* ═══ SET RESULT ════════════════════════════════════════════════════════ */
function setResult(tab, val) {
  var el = document.getElementById('res-' + tab);
  if (!el) return;

  if (val === null) {
    el.textContent      = '--';
    el.style.color      = 'var(--text-secondary)';
    el.style.fontSize   = '1.2rem';
    el.style.fontWeight = '400';
    /* Reset sublines */
    ['res-1-besparing','res-1-pct',
     'res-2-besparing',
     'res-3-besparing'].forEach(function(id) {
      var sub = document.getElementById(id);
      if (sub) sub.textContent = '--';
    });
    return;
  }
  el.textContent      = val;
  el.style.color      = 'var(--success)';
  el.style.fontSize   = '2.25rem';
  el.style.fontWeight = '700';
}

/* ═══ RESET PANEL ═══════════════════════════════════════════════════════ */
function resetPanel(tab) {
  var panel = document.getElementById('panel-' + tab);
  panel.querySelectorAll('input').forEach(function(i) { i.value = ''; });
  setResult(tab, null);
}

/* ═══ TAB SWITCH ════════════════════════════════════════════════════════ */
function switchTab(tab) {
  for (var i = 1; i <= 3; i++) {
    document.getElementById('tab-'   + i).classList.toggle('active', i === tab);
    document.getElementById('tab-'   + i).setAttribute('aria-selected', i === tab);
    document.getElementById('panel-' + i).classList.toggle('active', i === tab);
  }
}

/* ═══ COPY ══════════════════════════════════════════════════════════════ */
function copyVal(id) {
  var el  = document.getElementById(id);
  var txt = el ? el.textContent.trim() : '';
  if (!txt || txt === '--') return;
  navigator.clipboard.writeText(txt).then(function() {
    var panel = el.closest('.result-box');
    var btn   = panel ? panel.querySelector('.btn-copy') : null;
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

/* ═══ DARK MODE TOGGLE ══════════════════════════════════════════════════ */
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
  "name": "Korting Berekenen — RekenGemak",
  "url": "https://rekengemak.nl/korting-berekenen/",
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
      "name": "Hoe bereken je de prijs na korting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vermenigvuldig de originele prijs met (1 - kortingspercentage / 100). Bij een prijs van 150 euro en 20% korting is dat 150 x 0,80 = 120 euro. Je bespaart 30 euro. Met de tab 'Prijs na korting' in deze calculator zie je het resultaat direct."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe bereken je een kortingspercentage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trek de nieuwe prijs af van de originele prijs, deel door de originele prijs en vermenigvuldig met 100. Een artikel kost normaal 150 euro maar je betaalt 120 euro: (150 - 120) / 150 x 100 = 20% korting. Gebruik de tab 'Kortingspercentage' voor deze berekening."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe bereken je de originele prijs als je de korting weet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deel de prijs na korting door (1 - kortingspercentage / 100). Je betaalt 80 euro na 20% korting: 80 / 0,80 = 100 euro originele prijs. Gebruik de tab 'Originele prijs' in de calculator."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen korting en cashback?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bij korting betaal je direct minder aan de kassa. Bij cashback betaal je de volle prijs en ontvang je later een deel van het bedrag terug, vaak via een app of formulier. Beide vormen van voordeel kun je berekenen met het kortingspercentage dat van toepassing is."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe werkt een dubbele korting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bij een dubbele korting pas je twee kortingen na elkaar toe, niet bij elkaar op. Eerst 20% korting op 100 euro = 80 euro. Dan nog 10% op 80 euro = 72 euro. Het totale kortingspercentage is geen 30% maar 28%. Gebruik de calculator twee keer voor zo'n berekening."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik ook een kortingsbedrag in euro berekenen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Vul de originele prijs en het kortingspercentage in bij de tab 'Prijs na korting'. De calculator toont zowel de nieuwe prijs als het bespaarde bedrag in euro. Zo zie je direct hoeveel je uitgeeft en hoeveel je bespaart."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is een gebruikelijke korting bij uitverkoop?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bij de reguliere uitverkoop en sale liggen kortingen vaak tussen de 20% en 50%. Eindejaarsuitverkoop en opruiming gaan soms tot 70% of meer. Seizoensgebonden aanbiedingen starten veelal met 20% tot 30%, oplopend naarmate het seizoen vordert."
      }
    },
    {
      "@type": "Question",
      "name": "Is deze kortingscalculator gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de kortingscalculator van RekenGemak is volledig gratis. Je hoeft geen account aan te maken en er is geen tijdslimiet. De calculator werkt direct in je browser, ook op je telefoon."
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
      "name": "Korting Berekenen",
      "item": "https://rekengemak.nl/korting-berekenen/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de kortingscalculator?"

Deze calculator heeft drie tabbladen voor drie verschillende kortingsvragen. Kies het tabblad dat past bij wat je wilt weten.

Met 'Prijs na korting' bereken je wat je betaalt als een artikel een bepaald percentage goedkoper is. Vul de originele prijs en het kortingspercentage in en zie direct de nieuwe prijs en het bespaarde bedrag.

Met 'Kortingspercentage' achterhaal je welke korting is toegepast als je de originele en de nieuwe prijs weet. Handig om te controleren of een aanbieding klopt.

Met 'Originele prijs' reken je terug naar de oorspronkelijke prijs als je de kortingsprijs en het percentage kent.

### H2: "Voor wie is deze rekenhulp?"

- Shoppers die willen weten wat ze betalen bij sale of aanbiedingen
- Ondernemers die kortingen op facturen of offertes willen berekenen
- Inkopers die kortingspercentages van leveranciers willen controleren
- Consumenten die de originele prijs willen achterhalen uit een kortingsprijs
- Iedereen die snel een kortingsberekening wil doen zonder rekenwerk

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/procenten-berekenen/">Procenten berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/vakantiegeld-berekenen/">Vakantiegeld berekenen</a>
  <a href="/minimumloon-berekenen/">Minimumloon berekenen</a>
  <a href="/uurloon-berekenen/">Uurloon berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 hergebruiken** — `.input-suffix` uit T-002 meenemen
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`inputmode="decimal"`** — op alle invoervelden
7. **`Intl.NumberFormat('nl-NL', { style: 'currency' })`** — voor eurobedragen in result box
8. **Panel 2 validatie:** `nieuw` mag niet groter zijn dan `origineel` — toon `--` als dit het geval is
9. **Panel 3 validatie:** kortingspercentage mag niet >= 100 zijn — deling door 0 voorkomen
10. **Empty + filled state** — zelfde patroon als T-001/T-002
11. **`select option` dark mode fix** — geen select in deze tool maar patroon bewaren
12. **Footer trailing slash** — `/privacy/`, `/contact/`
13. **JSON-LD schemas** — onderaan body, na `</footer>`
14. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-003-korting-berekenen

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-003-korting.md
git commit -m "docs: add brief TASK-003"

# Stap 3: code committen
git add korting-berekenen/index.html
git commit -m "feat: TASK-003 korting-berekenen tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-003-korting-berekenen
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/korting-berekenen/
```

> **Belangrijk:** Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/korting-berekenen/` — niet op localhost.

---

# PHẦN 3: CHECKLIST TEST LIVE

> Dev vult dit formulier volledig in na merge naar main en stuurt het terug naar PM.
> **Live URL:** `https://rekengemak.nl/korting-berekenen/`

## A. Kỹ thuật

- [ ] **PageSpeed mobile:** [score] — vereist >= 90
- [ ] **PageSpeed desktop:** [score] — vereist >= 95
- [ ] **Rich Results — WebApplication:** PASS / FAIL
- [ ] **Rich Results — FAQPage:** PASS / FAIL
- [ ] **Rich Results — BreadcrumbList:** PASS / FAIL
- [ ] **DevTools Network:** 0 externe requests
- [ ] **Ctrl+F "—" (em dash)** in source: niet gevonden
- [ ] **Ctrl+F "--"** in body-tekst: niet gevonden
- [ ] **Ctrl+F "...":** niet gevonden
- [ ] **Ctrl+F "Furthermore/Moreover/Additionally":** niet gevonden
- [ ] **Interne links:** [aantal] — minimaal 5
- [ ] **Sitemap:** korting-berekenen/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Tính toán — Chạy trên live URL

### Tab 1: Prijs na korting
| Originele prijs | Korting % | Verwachte prijs | Besparing | PASS/FAIL |
|---|---|---|---|---|
| € 150 | 20% | € 120,00 | € 30,00 | |
| € 200 | 25% | € 150,00 | € 50,00 | |
| € 99 | 10% | € 89,10 | € 9,90 | |
| € 500 | 50% | € 250,00 | € 250,00 | |
| € 100 | 0% | € 100,00 | € 0,00 | |
| € 100 | 100% | € 0,00 | € 100,00 | |
| (leeg) | 20% | -- | -- | |

### Tab 2: Kortingspercentage
| Originele prijs | Prijs na korting | Verwacht % | Besparing | PASS/FAIL |
|---|---|---|---|---|
| € 150 | € 120 | 20% | € 30,00 | |
| € 200 | € 150 | 25% | € 50,00 | |
| € 80 | € 60 | 25% | € 20,00 | |
| € 100 | € 100 | 0% | € 0,00 | |
| € 100 | € 110 | -- (nieuw > origineel) | -- | |
| (leeg) | € 120 | -- | -- | |

### Tab 3: Originele prijs terugrekenen
| Prijs na korting | Korting % | Verwachte originele prijs | Besparing | PASS/FAIL |
|---|---|---|---|---|
| € 80 | 20% | € 100,00 | € 20,00 | |
| € 120 | 20% | € 150,00 | € 30,00 | |
| € 75 | 25% | € 100,00 | € 25,00 | |
| € 250 | 50% | € 500,00 | € 250,00 | |
| € 80 | 0% | € 80,00 | € 0,00 | |
| € 80 | 100% | -- (deling door 0) | -- | |
| (leeg) | 20% | -- | -- | |

## C. UX op apparaten

- [ ] **3 tabs switchen:** klikken → juiste panel zichtbaar
- [ ] **Tab switch:** ingevulde waarden in andere tabs blijven staan
- [ ] **iOS Safari:** numeriek toetsenbord, geen zoom
- [ ] **Mobiel 375px:** geen horizontale scroll
- [ ] **Knop "Kopieer prijs/percentage":** → "Gekopieerd!" 1,5 sec → terug
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage key `rekengemak-theme` correct
- [ ] **Empty state:** "--" muted, klein
- [ ] **Filled state:** resultaat groot groen 2.25rem
- [ ] **Validatie panel 2:** nieuw > origineel → toont "--", geen verkeerde berekening
- [ ] **Validatie panel 3:** korting = 100% → toont "--", geen deling door nul

## D. Inhoud

- [ ] **H1** = "Korting Berekenen"
- [ ] **Keyword "korting berekenen"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden** in body-tekst

## Samenvatting

```
Live URL getest: https://rekengemak.nl/korting-berekenen/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
