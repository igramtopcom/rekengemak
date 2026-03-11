# TASK-002 — Procenten Berekenen
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P1
**Branch:** `feature/TASK-002-procenten-berekenen`
**File:** `procenten-berekenen/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Procenten Berekenen tại `/procenten-berekenen/` — hỗ trợ 5 loại tính toán phần trăm thông dụng nhất trong 1 giao diện tab. Người dùng chọn đúng loại tính toán họ cần, nhập số và nhận kết quả ngay lập tức.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/procenten-berekenen/`
- **Title (60 ký tự):** `Procenten Berekenen Online Gratis -- 5 Berekeningen | RekenGemak`
- **Meta description (152 ký tự):** `Bereken percentages snel en gratis. Percentage van een getal, procentuele stijging, verschil in procenten en meer. Geen registratie, direct resultaat.`
- **H1:** `Procenten Berekenen`
- **Từ khóa chính:** `procenten berekenen` (10K–20K/tháng, KD 12–20)
- **Từ khóa dài:**
  - percentage van een getal berekenen
  - procentuele stijging berekenen
  - procent verschil berekenen
  - getal verhogen met procent
  - wat is x procent van y
  - procentuele afname berekenen

---

## Open Graph Tags

```html
<meta property="og:title"       content="Procenten Berekenen Online Gratis -- 5 Berekeningen | RekenGemak">
<meta property="og:description" content="Bereken percentages snel en gratis. Percentage van een getal, procentuele stijging, verschil in procenten en meer. Geen registratie, direct resultaat.">
<meta property="og:url"         content="https://rekengemak.nl/procenten-berekenen/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert de volledige CSS-architectuur van `btw-berekenen/index.html`. Geen nieuwe variabelen nodig — alle bestaande tokens zijn voldoende. Enige toevoeging: tab-panels zijn al gedefinieerd in Block 5 van T-001.

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
  [6] <style> CSS inline (8 blocks van T-001)
</head>
<body>
  [7]  <header>
  [8]  <div id="ad-top">
  <main>
    [9]  <div class="hero">
    [10] <section class="tool-card">  ← 5 tabs + 5 panels
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
    <a href="/">Thuis</a> &rsaquo; <span>Procenten Berekenen</span>
  </nav>
  <h1>Procenten Berekenen</h1>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Kies het type berekening, vul de getallen in en zie direct het resultaat.
  </p>
</div>
```

---

## Tool Card — 5 Tabs

### Tab bar

```html
<section class="tool-card" aria-label="Procenten Berekenen">
  <div class="tab-bar" role="tablist">
    <button class="tab-btn active" role="tab" id="tab-1"
            aria-selected="true" aria-controls="panel-1"
            onclick="switchTab(1)">% van getal</button>
    <button class="tab-btn" role="tab" id="tab-2"
            aria-selected="false" aria-controls="panel-2"
            onclick="switchTab(2)">Wat % is X van Y</button>
    <button class="tab-btn" role="tab" id="tab-3"
            aria-selected="false" aria-controls="panel-3"
            onclick="switchTab(3)">Stijging %</button>
    <button class="tab-btn" role="tab" id="tab-4"
            aria-selected="false" aria-controls="panel-4"
            onclick="switchTab(4)">Verhogen met %</button>
    <button class="tab-btn" role="tab" id="tab-5"
            aria-selected="false" aria-controls="panel-5"
            onclick="switchTab(5)">Verlagen met %</button>
  </div>
```

### Panel 1 — X% van Y (Wat is 15% van 200?)

**Berekening:** `resultaat = (percentage / 100) × getal`

```html
  <div id="panel-1" class="tab-panel active" role="tabpanel" aria-labelledby="tab-1">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Bereken hoeveel een bepaald percentage van een getal is. Bijvoorbeeld: wat is 15% van 200?
    </p>
    <div class="input-group">
      <label for="p1-pct">Percentage</label>
      <div class="input-wrap">
        <input id="p1-pct" type="text" inputmode="decimal"
               placeholder="bijv. 15" oninput="calc(1)">
        <span class="input-suffix">%</span>
      </div>
    </div>
    <div class="input-group">
      <label for="p1-getal">Van getal</label>
      <div class="input-wrap">
        <input id="p1-getal" type="text" inputmode="decimal"
               placeholder="bijv. 200" oninput="calc(1)">
      </div>
    </div>
    <div class="result-box">
      <div class="result-label">Resultaat</div>
      <div class="result-main" id="res-1">--</div>
      <div style="margin-top:8px;">
        <button class="btn-copy" onclick="copyVal('res-1')">Kopieer</button>
      </div>
    </div>
    <button class="btn-secondary" onclick="resetPanel(1)" style="margin-top:12px;">Wis alles</button>
  </div>
```

### Panel 2 — X is wat % van Y (20 is wat % van 80?)

**Berekening:** `percentage = (deel / geheel) × 100`

```html
  <div id="panel-2" class="tab-panel" role="tabpanel" aria-labelledby="tab-2">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Bereken welk percentage een getal is van een ander getal. Bijvoorbeeld: 20 is wat procent van 80?
    </p>
    <div class="input-group">
      <label for="p2-deel">Getal (deel)</label>
      <div class="input-wrap">
        <input id="p2-deel" type="text" inputmode="decimal"
               placeholder="bijv. 20" oninput="calc(2)">
      </div>
    </div>
    <div class="input-group">
      <label for="p2-geheel">Van getal (geheel)</label>
      <div class="input-wrap">
        <input id="p2-geheel" type="text" inputmode="decimal"
               placeholder="bijv. 80" oninput="calc(2)">
      </div>
    </div>
    <div class="result-box">
      <div class="result-label">Percentage</div>
      <div class="result-main" id="res-2">--</div>
      <div style="margin-top:8px;">
        <button class="btn-copy" onclick="copyVal('res-2')">Kopieer</button>
      </div>
    </div>
    <button class="btn-secondary" onclick="resetPanel(2)" style="margin-top:12px;">Wis alles</button>
  </div>
```

### Panel 3 — Procentuele stijging of daling (van 80 naar 100 = +25%)

**Berekening:** `verschil% = ((nieuw - oud) / |oud|) × 100`
Positief = stijging, negatief = daling. Resultaat toont teken expliciet: `+25%` of `-20%`.

```html
  <div id="panel-3" class="tab-panel" role="tabpanel" aria-labelledby="tab-3">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Bereken de procentuele stijging of daling tussen twee getallen. Bijvoorbeeld: van 80 naar 100 is een stijging van 25%.
    </p>
    <div class="input-group">
      <label for="p3-oud">Beginwaarde</label>
      <div class="input-wrap">
        <input id="p3-oud" type="text" inputmode="decimal"
               placeholder="bijv. 80" oninput="calc(3)">
      </div>
    </div>
    <div class="input-group">
      <label for="p3-nieuw">Eindwaarde</label>
      <div class="input-wrap">
        <input id="p3-nieuw" type="text" inputmode="decimal"
               placeholder="bijv. 100" oninput="calc(3)">
      </div>
    </div>
    <div class="result-box">
      <div class="result-label">Procentuele verandering</div>
      <div class="result-main" id="res-3">--</div>
      <div class="result-sub" style="margin-top:6px;">
        <span id="res-3-abs" style="color:var(--text-secondary);font-size:0.95rem;">Absoluut verschil: --</span>
      </div>
      <div style="margin-top:8px;">
        <button class="btn-copy" onclick="copyVal('res-3')">Kopieer</button>
      </div>
    </div>
    <button class="btn-secondary" onclick="resetPanel(3)" style="margin-top:12px;">Wis alles</button>
  </div>
```

### Panel 4 — Getal verhogen met % (100 + 21% = 121)

**Berekening:** `resultaat = getal × (1 + percentage / 100)`

```html
  <div id="panel-4" class="tab-panel" role="tabpanel" aria-labelledby="tab-4">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Verhoog een getal met een percentage. Handig voor prijsverhogingen, indexering of btw optellen.
    </p>
    <div class="input-group">
      <label for="p4-getal">Beginbedrag</label>
      <div class="input-wrap">
        <input id="p4-getal" type="text" inputmode="decimal"
               placeholder="bijv. 100" oninput="calc(4)">
      </div>
    </div>
    <div class="input-group">
      <label for="p4-pct">Verhoging</label>
      <div class="input-wrap">
        <input id="p4-pct" type="text" inputmode="decimal"
               placeholder="bijv. 21" oninput="calc(4)">
        <span class="input-suffix">%</span>
      </div>
    </div>
    <div class="result-box">
      <div class="result-label">Nieuw bedrag</div>
      <div class="result-main" id="res-4">--</div>
      <div class="result-sub" style="margin-top:6px;">
        <span id="res-4-toe" style="color:var(--text-secondary);font-size:0.95rem;">Toename: --</span>
      </div>
      <div style="margin-top:8px;">
        <button class="btn-copy" onclick="copyVal('res-4')">Kopieer</button>
      </div>
    </div>
    <button class="btn-secondary" onclick="resetPanel(4)" style="margin-top:12px;">Wis alles</button>
  </div>
```

### Panel 5 — Getal verlagen met % (200 - 25% = 150)

**Berekening:** `resultaat = getal × (1 - percentage / 100)`

```html
  <div id="panel-5" class="tab-panel" role="tabpanel" aria-labelledby="tab-5">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Verlaag een getal met een percentage. Handig voor kortingen, prijsdalingen of aftrekposten.
    </p>
    <div class="input-group">
      <label for="p5-getal">Beginbedrag</label>
      <div class="input-wrap">
        <input id="p5-getal" type="text" inputmode="decimal"
               placeholder="bijv. 200" oninput="calc(5)">
      </div>
    </div>
    <div class="input-group">
      <label for="p5-pct">Verlaging</label>
      <div class="input-wrap">
        <input id="p5-pct" type="text" inputmode="decimal"
               placeholder="bijv. 25" oninput="calc(5)">
        <span class="input-suffix">%</span>
      </div>
    </div>
    <div class="result-box">
      <div class="result-label">Nieuw bedrag</div>
      <div class="result-main" id="res-5">--</div>
      <div class="result-sub" style="margin-top:6px;">
        <span id="res-5-af" style="color:var(--text-secondary);font-size:0.95rem;">Afname: --</span>
      </div>
      <div style="margin-top:8px;">
        <button class="btn-copy" onclick="copyVal('res-5')">Kopieer</button>
      </div>
    </div>
    <button class="btn-secondary" onclick="resetPanel(5)" style="margin-top:12px;">Wis alles</button>
  </div>

</section>
```

### CSS aanvulling — input suffix (% teken rechts)

```css
.input-suffix {
  padding: 0 12px; color: var(--text-secondary);
  font-weight: 500; border-left: 1px solid var(--border);
  height: 48px; display: flex; align-items: center;
}
```

---

## Logic JavaScript

```javascript
/* ═══ FORMAT HELPERS ═══════════════════════════════════════════════════ */
var fmtNum = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 4 });
var fmtPct = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 2 });

function parseNL(str) {
  if (!str) return NaN;
  return parseFloat(str.replace(/\./g, '').replace(',', '.'));
}

function fmtResult(n, isPct) {
  if (isPct) return fmtPct.format(n) + '%';
  return fmtNum.format(n);
}

/* ═══ BEREKEN PER TAB ══════════════════════════════════════════════════ */
function calc(tab) {
  var r;
  switch (tab) {

    case 1: {
      var pct   = parseNL(document.getElementById('p1-pct').value);
      var getal = parseNL(document.getElementById('p1-getal').value);
      if (isNaN(pct) || isNaN(getal)) { setResult(1, null); return; }
      r = (pct / 100) * getal;
      setResult(1, fmtResult(r, false));
      break;
    }

    case 2: {
      var deel   = parseNL(document.getElementById('p2-deel').value);
      var geheel = parseNL(document.getElementById('p2-geheel').value);
      if (isNaN(deel) || isNaN(geheel) || geheel === 0) { setResult(2, null); return; }
      r = (deel / geheel) * 100;
      setResult(2, fmtResult(r, true));
      break;
    }

    case 3: {
      var oud   = parseNL(document.getElementById('p3-oud').value);
      var nieuw = parseNL(document.getElementById('p3-nieuw').value);
      if (isNaN(oud) || isNaN(nieuw) || oud === 0) { setResult(3, null); return; }
      var pctVer = ((nieuw - oud) / Math.abs(oud)) * 100;
      var absVer = nieuw - oud;
      var prefix = pctVer >= 0 ? '+' : '';
      document.getElementById('res-3-abs').textContent =
        'Absoluut verschil: ' + (absVer >= 0 ? '+' : '') + fmtResult(absVer, false);
      setResult(3, prefix + fmtResult(pctVer, true));
      break;
    }

    case 4: {
      var getal4 = parseNL(document.getElementById('p4-getal').value);
      var pct4   = parseNL(document.getElementById('p4-pct').value);
      if (isNaN(getal4) || isNaN(pct4)) { setResult(4, null); return; }
      var nieuw4  = getal4 * (1 + pct4 / 100);
      var toename = nieuw4 - getal4;
      document.getElementById('res-4-toe').textContent =
        'Toename: +' + fmtResult(toename, false);
      setResult(4, fmtResult(nieuw4, false));
      break;
    }

    case 5: {
      var getal5 = parseNL(document.getElementById('p5-getal').value);
      var pct5   = parseNL(document.getElementById('p5-pct').value);
      if (isNaN(getal5) || isNaN(pct5)) { setResult(5, null); return; }
      var nieuw5 = getal5 * (1 - pct5 / 100);
      var afname = getal5 - nieuw5;
      document.getElementById('res-5-af').textContent =
        'Afname: -' + fmtResult(afname, false);
      setResult(5, fmtResult(nieuw5, false));
      break;
    }
  }
}

/* ═══ SET RESULT ════════════════════════════════════════════════════════ */
function setResult(tab, val) {
  var el = document.getElementById('res-' + tab);
  if (!el) return;
  if (val === null) {
    el.textContent  = '--';
    el.style.color  = 'var(--text-secondary)';
    el.style.fontSize   = '1.2rem';
    el.style.fontWeight = '400';
    /* Reset sublines */
    var sub3 = document.getElementById('res-3-abs');
    var sub4 = document.getElementById('res-4-toe');
    var sub5 = document.getElementById('res-5-af');
    if (sub3) sub3.textContent = 'Absoluut verschil: --';
    if (sub4) sub4.textContent = 'Toename: --';
    if (sub5) sub5.textContent = 'Afname: --';
    return;
  }
  el.textContent  = val;
  el.style.color  = 'var(--success)';
  el.style.fontSize   = '2.25rem';
  el.style.fontWeight = '700';
}

/* ═══ RESET PANEL ═══════════════════════════════════════════════════════ */
function resetPanel(tab) {
  /* Leeg alle inputs in het panel */
  var panel = document.getElementById('panel-' + tab);
  panel.querySelectorAll('input').forEach(function(i) { i.value = ''; });
  setResult(tab, null);
}

/* ═══ TAB SWITCH ════════════════════════════════════════════════════════ */
function switchTab(tab) {
  for (var i = 1; i <= 5; i++) {
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
    /* Vind dichtstbijzijnde btn-copy */
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
  "name": "Procenten Berekenen — RekenGemak",
  "url": "https://rekengemak.nl/procenten-berekenen/",
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
      "name": "Hoe bereken je een percentage van een getal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deel het percentage door 100 en vermenigvuldig met het getal. Wil je weten wat 15% van 200 is? Dat is 15 / 100 x 200 = 30. Met de tab '% van getal' in deze calculator vul je het percentage en het getal in en zie je het resultaat direct."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe bereken je welk percentage X is van Y?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deel X door Y en vermenigvuldig met 100. Voorbeeld: 20 is wat procent van 80? Dat is 20 / 80 x 100 = 25%. Gebruik de tab 'Wat % is X van Y' voor deze berekening."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe bereken je een procentuele stijging of daling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trek de beginwaarde af van de eindwaarde, deel door de beginwaarde en vermenigvuldig met 100. Van 80 naar 100 is (100 - 80) / 80 x 100 = 25% stijging. Van 100 naar 80 is -20% daling. De tab 'Stijging %' doet dit automatisch voor je."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe verhoog je een getal met een percentage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vermenigvuldig het getal met (1 + percentage / 100). Wil je 100 verhogen met 21%? Dat is 100 x 1,21 = 121. Dit is ook de formule die gebruikt wordt voor btw optellen. Gebruik de tab 'Verhogen met %' voor snelle berekeningen."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe verlaag je een getal met een percentage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vermenigvuldig het getal met (1 - percentage / 100). Wil je 200 verlagen met 25%? Dat is 200 x 0,75 = 150. Handig voor kortingsberekeningen. Gebruik de tab 'Verlagen met %' in de calculator."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen procentpunt en procent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Procent geeft een verhouding aan, procentpunt geeft een absoluut verschil tussen twee percentages. Als de rente stijgt van 2% naar 3%, is dat 1 procentpunt stijging, maar 50% procentuele stijging. Dit verschil is belangrijk in economische en financiele berekeningen."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe reken je terug van een prijs inclusief percentage naar exclusief?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deel de totaalprijs door (1 + percentage / 100). Is een prijs inclusief 21% btw gelijk aan 121 euro, dan is de prijs exclusief btw 121 / 1,21 = 100 euro. Voor btw-berekeningen raden we de aparte BTW-calculator op deze site aan."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik ook negatieve getallen gebruiken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de calculator werkt ook met negatieve getallen en decimalen. Gebruik een komma als decimaalteken, zoals gebruikelijk in Nederland. Voer je een negatieve beginwaarde in bij de stijgingsberekening, dan geeft de calculator de juiste procentuele verandering terug."
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
      "name": "Procenten Berekenen",
      "item": "https://rekengemak.nl/procenten-berekenen/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de procentencalculator?"

Deze calculator heeft vijf tabbladen, elk voor een ander type procentberekening. Kies het tabblad dat past bij je vraag, vul de getallen in en je ziet direct het antwoord.

Gebruik '% van getal' als je wilt weten hoeveel een bepaald percentage van een bedrag is. Kies 'Wat % is X van Y' als je een deel wilt uitdrukken als percentage van een geheel. Met 'Stijging %' bereken je hoe groot een toe- of afname procentueel is. De laatste twee tabbladen verhogen of verlagen een bedrag direct met een opgegeven percentage.

Alle berekeningen werken met gehele getallen en decimalen. Gebruik een komma als decimaalteken.

### H2: "Voor wie is deze rekenhulp?"

- Ondernemers die prijzen willen verhogen of verlagen met een percentage
- Studenten en scholieren die werken met procentberekeningen
- Consumenten die willen uitrekenen hoeveel korting ze krijgen
- HR-medewerkers die salariswijzigingen in procenten willen berekenen
- Iedereen die snel een procentuele stijging of daling wil controleren

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/korting-berekenen/">Korting berekenen</a>
  <a href="/vakantiegeld-berekenen/">Vakantiegeld berekenen</a>
  <a href="/uurloon-berekenen/">Uurloon berekenen</a>
  <a href="/minimumloon-berekenen/">Minimumloon berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 hergebruiken** — enige toevoeging: `.input-suffix`
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`inputmode="decimal"`** — op alle invoervelden
7. **Geen `Intl.NumberFormat` met `style: currency`** — resultaten zijn getallen of percentages, geen eurobedragen. Gebruik `maximumFractionDigits: 4` voor getallen, `maximumFractionDigits: 2` voor percentages
8. **Tab 3 stijging/daling:** toon teken expliciet (`+25%` of `-20%`) — kleur: positief = `var(--success)`, negatief = `#E05252` (rood)
9. **Empty + filled state** — zelfde patroon als T-001/T-008
10. **`select option` dark mode fix** — `background-color: var(--bg-input)` (Fix 6 van T-001) — geen select in deze tool maar patroon bewaren voor consistentie
11. **Footer trailing slash** — `/privacy/`, `/contact/`
12. **JSON-LD schemas** — onderaan body, na `</footer>`
13. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-002-procenten-berekenen

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-002-procenten.md
git commit -m "docs: add brief TASK-002"

# Stap 3: code committen
git add procenten-berekenen/index.html
git commit -m "feat: TASK-002 procenten-berekenen tool"

# Stap 4: push
git push origin feature/TASK-002-procenten-berekenen

# Stap 5: PR aanmaken → DIRECT MERGEN naar main
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/procenten-berekenen/
```

> **Belangrijk:** Merge PR naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/procenten-berekenen/` — niet op localhost of preview URL.

---

# PHẦN 3: CHECKLIST TEST LIVE

> Dev vult dit formulier in na merge naar main en stuurt het volledig ingevuld terug naar PM.
> **Live URL:** `https://rekengemak.nl/procenten-berekenen/`

## A. Kỹ thuật

- [ ] **PageSpeed mobile:** [score] — vereist >= 90
- [ ] **PageSpeed desktop:** [score] — vereist >= 95
  → `https://pagespeed.web.dev/`
- [ ] **Rich Results — WebApplication:** PASS / FAIL
- [ ] **Rich Results — FAQPage:** PASS / FAIL
- [ ] **Rich Results — BreadcrumbList:** PASS / FAIL
  → `https://search.google.com/test/rich-results`
- [ ] **DevTools Network:** 0 externe requests
- [ ] **Ctrl+F "—" (em dash)** in source: niet gevonden
- [ ] **Ctrl+F "--"** in body-tekst: niet gevonden
- [ ] **Ctrl+F "...":** niet gevonden
- [ ] **Ctrl+F "Furthermore/Moreover/Additionally":** niet gevonden
- [ ] **Interne links:** [aantal] — minimaal 5
- [ ] **Sitemap:** procenten-berekenen/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Tính toán — Chạy trên live URL

### Tab 1: % van getal
| % | Getal | Verwacht | Actueel | PASS/FAIL |
|---|---|---|---|---|
| 15 | 200 | 30 | | |
| 10 | 150 | 15 | | |
| 100 | 75 | 75 | | |
| 0 | 500 | 0 | | |
| 33,5 | 200 | 67 | | |
| (leeg) | 200 | -- | | |

### Tab 2: Wat % is X van Y
| Deel | Geheel | Verwacht | Actueel | PASS/FAIL |
|---|---|---|---|---|
| 20 | 80 | 25% | | |
| 1 | 4 | 25% | | |
| 50 | 200 | 25% | | |
| 3 | 9 | 33,33% | | |
| (leeg) | 80 | -- | | |

### Tab 3: Stijging %
| Oud | Nieuw | Verwacht % | Abs. verschil | PASS/FAIL |
|---|---|---|---|---|
| 80 | 100 | +25% | +20 | |
| 100 | 80 | -20% | -20 | |
| 200 | 250 | +25% | +50 | |
| 50 | 50 | +0% | 0 | |
| (leeg) | 100 | -- | | |

### Tab 4: Verhogen met %
| Getal | % | Verwacht | Toename | PASS/FAIL |
|---|---|---|---|---|
| 100 | 21 | 121 | +21 | |
| 200 | 10 | 220 | +20 | |
| 1000 | 5 | 1050 | +50 | |
| (leeg) | 10 | -- | | |

### Tab 5: Verlagen met %
| Getal | % | Verwacht | Afname | PASS/FAIL |
|---|---|---|---|---|
| 200 | 25 | 150 | -50 | |
| 100 | 10 | 90 | -10 | |
| 500 | 50 | 250 | -250 | |
| (leeg) | 25 | -- | | |

## C. UX op apparaten

- [ ] **5 tabs switchen:** klikken → juiste panel zichtbaar, andere verborgen
- [ ] **Tab switch reset:** bij wisselen tab blijven ingevulde waarden staan in de andere tabs
- [ ] **Tab 3 stijging positief:** resultaat kleur `var(--success)` groen
- [ ] **Tab 3 daling negatief:** resultaat kleur rood (`#E05252` of vergelijkbaar)
- [ ] **iOS Safari:** numeriek toetsenbord, geen zoom
- [ ] **Mobiel 375px:** geen horizontale scroll — tab bar scrollt horizontaal indien nodig
- [ ] **Knop "Kopieer":** → "Gekopieerd!" 1,5 sec → terug
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage key `rekengemak-theme` correct
- [ ] **Empty state:** "--" muted, klein
- [ ] **Filled state:** resultaat groot groen, 2.25rem

## D. Inhoud

- [ ] **H1** = "Procenten Berekenen"
- [ ] **Keyword "procenten berekenen"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden** in body-tekst

## Samenvatting

```
Live URL getest: https://rekengemak.nl/procenten-berekenen/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
