# TASK-007 — Uurloon Berekenen
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P1
**Branch:** `feature/TASK-007-uurloon-berekenen`
**File:** `uurloon-berekenen/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Uurloon Berekenen tại `/uurloon-berekenen/` — hỗ trợ 2 chiều tính trong 1 giao diện tab: (1) Maandsalaris naar uurloon, (2) Uurloon naar maandsalaris. Cả hai chiều đều có toggle vakantiegeld (8%) và slider uren per week. Thêm ZZP-mode toggle hiển thị uurloon inclusief vakantiegeld để zzp'er biết tarief tối thiểu cần charge.

**Disclaimer bắt buộc:** Tool tính bruto — netto phụ thuộc belastingschijf cá nhân. Phải hiển thị rõ dưới result box.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/uurloon-berekenen/`
- **Title (60 ký tự):** `Uurloon Berekenen Online Gratis -- Salaris naar Uurloon | RekenGemak`
- **Meta description (153 ký tự):** `Bereken je uurloon op basis van je maandsalaris of andersom. Met of zonder vakantiegeld, voor 32, 36 of 40 uur per week. Gratis en direct resultaat.`
- **H1:** `Uurloon Berekenen`
- **Từ khóa chính:** `uurloon berekenen` (15K–22K/tháng, KD 15–22)
- **Từ khóa dài:**
  - maandsalaris naar uurloon berekenen
  - uurloon berekenen inclusief vakantiegeld
  - uurloon naar maandsalaris berekenen
  - uurloon berekenen 40 uur per week
  - bruto uurloon berekenen
  - zzp uurtarief berekenen op basis van salaris

---

## Open Graph Tags

```html
<meta property="og:title"       content="Uurloon Berekenen Online Gratis -- Salaris naar Uurloon | RekenGemak">
<meta property="og:description" content="Bereken je uurloon op basis van je maandsalaris of andersom. Met of zonder vakantiegeld, voor 32, 36 of 40 uur per week. Gratis en direct resultaat.">
<meta property="og:url"         content="https://rekengemak.nl/uurloon-berekenen/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert de volledige CSS van `btw-berekenen/index.html`. Toevoegingen: `.input-suffix` uit T-002, `.slider-wrap` uit T-008, `.disclaimer` uit T-008.

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
    [10] <section class="tool-card">  ← 2 tabs + 2 panels
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
    <a href="/">Thuis</a> &rsaquo; <span>Uurloon Berekenen</span>
  </nav>
  <h1>Uurloon Berekenen</h1>
  <span class="badge-updated">Bijgewerkt: januari 2026</span>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Bereken je uurloon op basis van je maandsalaris, of reken andersom. Kies het aantal uren per week en stel in of vakantiegeld meegerekend wordt.
  </p>
</div>
```

---

## Tool Card — 2 Tabs

### Tab bar

```html
<section class="tool-card" aria-label="Uurloon Berekenen">
  <div class="tab-bar" role="tablist">
    <button class="tab-btn active" role="tab" id="tab-1"
            aria-selected="true" aria-controls="panel-1"
            onclick="switchTab(1)">Salaris naar uurloon</button>
    <button class="tab-btn" role="tab" id="tab-2"
            aria-selected="false" aria-controls="panel-2"
            onclick="switchTab(2)">Uurloon naar salaris</button>
  </div>
```

### Panel 1 — Maandsalaris naar uurloon

**Formule excl. vakantiegeld:** `uurloon = (maandsalaris × 12) / (urenPerWeek × 52)`
**Formule incl. vakantiegeld:** `uurloon = (maandsalaris × 12 × 1.08) / (urenPerWeek × 52)`

```html
  <div id="panel-1" class="tab-panel active" role="tabpanel" aria-labelledby="tab-1">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Voer je bruto maandsalaris in en zie je uurloon direct. Handig om te vergelijken met een uurcontract of zzp-tarief.
    </p>

    <!-- Input: maandsalaris -->
    <div class="input-group">
      <label for="p1-salaris">Bruto maandsalaris</label>
      <div class="input-wrap">
        <span class="input-prefix">€</span>
        <input id="p1-salaris" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 3000" oninput="calc(1)">
      </div>
    </div>

    <!-- Slider: uren per week -->
    <div class="slider-wrap">
      <label for="p1-uren">
        <span>Uren per week</span>
        <span class="slider-value" id="p1-uren-value">40</span>
      </label>
      <input type="range" id="p1-uren" min="8" max="48" value="40" step="1"
             oninput="updateSlider('p1-uren','p1-uren-value'); calc(1)">
      <!-- Snelkoppelingen onder slider -->
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
        <button class="btn-preset" onclick="setSlider('p1-uren','p1-uren-value',32);calc(1)">32u</button>
        <button class="btn-preset" onclick="setSlider('p1-uren','p1-uren-value',36);calc(1)">36u</button>
        <button class="btn-preset" onclick="setSlider('p1-uren','p1-uren-value',38);calc(1)">38u</button>
        <button class="btn-preset" onclick="setSlider('p1-uren','p1-uren-value',40);calc(1)">40u</button>
      </div>
    </div>

    <!-- Toggle: vakantiegeld meenemen -->
    <div class="toggle-row" style="margin-bottom:var(--space-md);">
      <span style="color:var(--text-secondary);font-size:0.9rem;">Vakantiegeld (8%) meenemen</span>
      <label class="toggle-switch" aria-label="Vakantiegeld meenemen">
        <input type="checkbox" id="p1-vg" onchange="calc(1)">
        <span class="toggle-track"></span>
        <span class="toggle-thumb"></span>
      </label>
    </div>

    <!-- Result box -->
    <div class="result-box">
      <div class="result-label">Bruto uurloon</div>
      <div class="result-main" id="res-1">--</div>

      <div style="display:flex;gap:var(--space-lg);margin-top:12px;flex-wrap:wrap;">
        <div>
          <div class="result-label">Bruto jaarsalaris</div>
          <div id="res-1-jaar" style="font-size:1rem;color:var(--text-primary);">--</div>
        </div>
        <div>
          <div class="result-label">Uren per jaar</div>
          <div id="res-1-uren" style="font-size:1rem;color:var(--text-primary);">--</div>
        </div>
      </div>

      <div style="margin-top:12px;">
        <button class="btn-copy" onclick="copyVal('res-1')">Kopieer uurloon</button>
      </div>
    </div>

    <button class="btn-secondary" onclick="resetPanel(1)" style="margin-top:12px;">Wis alles</button>

    <!-- Disclaimer -->
    <p class="disclaimer">
      Dit is een indicatieve berekening op basis van bruto salaris. Het netto uurloon is afhankelijk van je persoonlijke belastingsituatie, toeslagen en aftrekposten. Raadpleeg een salarisadministrateur voor een exacte berekening.
    </p>
  </div>
```

### Panel 2 — Uurloon naar maandsalaris

**Formule excl. vakantiegeld:** `maandsalaris = (uurloon × urenPerWeek × 52) / 12`
**Formule incl. vakantiegeld:** `maandsalaris = (uurloon × urenPerWeek × 52) / (12 × 1.08)`

```html
  <div id="panel-2" class="tab-panel" role="tabpanel" aria-labelledby="tab-2">
    <p class="panel-desc" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:var(--space-md);">
      Weet je je uurloon en wil je weten wat dat is als maandsalaris? Handig bij vergelijken van een uurcontract met een vast contract.
    </p>

    <!-- Input: uurloon -->
    <div class="input-group">
      <label for="p2-uurloon">Bruto uurloon</label>
      <div class="input-wrap">
        <span class="input-prefix">€</span>
        <input id="p2-uurloon" type="text" inputmode="decimal"
               autocomplete="off" placeholder="bijv. 18,50" oninput="calc(2)">
      </div>
    </div>

    <!-- Slider: uren per week -->
    <div class="slider-wrap">
      <label for="p2-uren">
        <span>Uren per week</span>
        <span class="slider-value" id="p2-uren-value">40</span>
      </label>
      <input type="range" id="p2-uren" min="8" max="48" value="40" step="1"
             oninput="updateSlider('p2-uren','p2-uren-value'); calc(2)">
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
        <button class="btn-preset" onclick="setSlider('p2-uren','p2-uren-value',32);calc(2)">32u</button>
        <button class="btn-preset" onclick="setSlider('p2-uren','p2-uren-value',36);calc(2)">36u</button>
        <button class="btn-preset" onclick="setSlider('p2-uren','p2-uren-value',38);calc(2)">38u</button>
        <button class="btn-preset" onclick="setSlider('p2-uren','p2-uren-value',40);calc(2)">40u</button>
      </div>
    </div>

    <!-- Toggle: vakantiegeld meenemen -->
    <div class="toggle-row" style="margin-bottom:var(--space-md);">
      <span style="color:var(--text-secondary);font-size:0.9rem;">Vakantiegeld (8%) meenemen</span>
      <label class="toggle-switch" aria-label="Vakantiegeld meenemen">
        <input type="checkbox" id="p2-vg" onchange="calc(2)">
        <span class="toggle-track"></span>
        <span class="toggle-thumb"></span>
      </label>
    </div>

    <!-- Result box -->
    <div class="result-box">
      <div class="result-label">Bruto maandsalaris</div>
      <div class="result-main" id="res-2">--</div>

      <div style="display:flex;gap:var(--space-lg);margin-top:12px;flex-wrap:wrap;">
        <div>
          <div class="result-label">Bruto jaarsalaris</div>
          <div id="res-2-jaar" style="font-size:1rem;color:var(--text-primary);">--</div>
        </div>
        <div>
          <div class="result-label">Uren per jaar</div>
          <div id="res-2-uren" style="font-size:1rem;color:var(--text-primary);">--</div>
        </div>
      </div>

      <div style="margin-top:12px;">
        <button class="btn-copy" onclick="copyVal('res-2')">Kopieer maandsalaris</button>
      </div>
    </div>

    <button class="btn-secondary" onclick="resetPanel(2)" style="margin-top:12px;">Wis alles</button>

    <!-- Disclaimer -->
    <p class="disclaimer">
      Dit is een indicatieve berekening op basis van bruto uurloon. Het werkelijke maandsalaris kan afwijken door cao-schalen, toeslagen en aftrekposten. Raadpleeg je arbeidscontract of werkgever voor het exacte bedrag.
    </p>
  </div>

</section>
```

### CSS aanvulling — preset knoppen voor uren

```css
.btn-preset {
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  transition: all var(--transition);
}
.btn-preset:hover,
.btn-preset.active {
  border-color: var(--accent);
  color: var(--accent);
}
```

---

## Logic JavaScript

```javascript
/* ═══ FORMAT HELPERS ═══════════════════════════════════════════════════ */
var fmtEUR = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' });
var fmtNum = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 });

function parseNL(str) {
  if (!str) return NaN;
  return parseFloat(str.replace(/\./g, '').replace(',', '.'));
}

/* ═══ SLIDER HELPERS ════════════════════════════════════════════════════ */
function updateSlider(sliderId, valueId) {
  document.getElementById(valueId).textContent =
    document.getElementById(sliderId).value;
}

function setSlider(sliderId, valueId, val) {
  document.getElementById(sliderId).value = val;
  document.getElementById(valueId).textContent = val;
}

/* ═══ FORMULES ══════════════════════════════════════════════════════════
   Maandsalaris → Uurloon
   excl. VG: uurloon = (maand × 12) / (uren × 52)
   incl. VG: uurloon = (maand × 12 × 1.08) / (uren × 52)

   Uurloon → Maandsalaris
   excl. VG: maand = (uurloon × uren × 52) / 12
   incl. VG: maand = (uurloon × uren × 52) / (12 × 1.08)
════════════════════════════════════════════════════════════════════════ */
function calc(tab) {
  if (tab === 1) {
    var salaris = parseNL(document.getElementById('p1-salaris').value);
    var uren    = parseInt(document.getElementById('p1-uren').value);
    var vg      = document.getElementById('p1-vg').checked;

    if (isNaN(salaris) || salaris <= 0) { setResult(1, null); return; }

    var factor     = vg ? 1.08 : 1;
    var jaarSal    = salaris * 12 * factor;
    var jaarUren   = uren * 52;
    var uurloon    = jaarSal / jaarUren;

    setResult(1, fmtEUR.format(uurloon));
    document.getElementById('res-1-jaar').textContent  = fmtEUR.format(jaarSal);
    document.getElementById('res-1-uren').textContent  = fmtNum.format(jaarUren) + ' uur';
  }

  if (tab === 2) {
    var uurloon2 = parseNL(document.getElementById('p2-uurloon').value);
    var uren2    = parseInt(document.getElementById('p2-uren').value);
    var vg2      = document.getElementById('p2-vg').checked;

    if (isNaN(uurloon2) || uurloon2 <= 0) { setResult(2, null); return; }

    var factor2   = vg2 ? 1.08 : 1;
    var jaarUren2 = uren2 * 52;
    var jaarSal2  = uurloon2 * jaarUren2;
    var maand2    = jaarSal2 / (12 * factor2);

    setResult(2, fmtEUR.format(maand2));
    document.getElementById('res-2-jaar').textContent  = fmtEUR.format(jaarSal2 / factor2);
    document.getElementById('res-2-uren').textContent  = fmtNum.format(jaarUren2) + ' uur';
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
    var subs = ['res-1-jaar','res-1-uren','res-2-jaar','res-2-uren'];
    subs.forEach(function(id) {
      var s = document.getElementById(id);
      if (s) s.textContent = '--';
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
  panel.querySelectorAll('input[type="text"]').forEach(function(i) { i.value = ''; });
  /* Slider terug naar 40 */
  setSlider('p' + tab + '-uren', 'p' + tab + '-uren-value', 40);
  /* Toggle uit */
  document.getElementById('p' + tab + '-vg').checked = false;
  setResult(tab, null);
}

/* ═══ TAB SWITCH ════════════════════════════════════════════════════════ */
function switchTab(tab) {
  for (var i = 1; i <= 2; i++) {
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
  "name": "Uurloon Berekenen — RekenGemak",
  "url": "https://rekengemak.nl/uurloon-berekenen/",
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
      "name": "Hoe bereken je uurloon op basis van maandsalaris?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vermenigvuldig je bruto maandsalaris met 12 voor het jaarsalaris. Deel dat door het aantal uren per jaar (uren per week x 52). Bij 3.000 euro per maand en 40 uur per week is dat 36.000 / 2.080 = 17,31 euro per uur. De calculator doet dit automatisch."
      }
    },
    {
      "@type": "Question",
      "name": "Moet ik vakantiegeld meenemen in de uurloonberekening?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dat hangt af van je doel. Wil je je werkelijke kosten voor de werkgever berekenen of je tarief als zzp'er bepalen? Zet dan vakantiegeld aan. Wil je alleen het uurloon op basis van je reguliere salaris weten? Zet het dan uit. De toggle in de calculator past de berekening direct aan."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel uren per jaar werk je bij een 40-urige werkweek?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bij 40 uur per week en 52 weken per jaar werk je 2.080 uur per jaar. Dit is het standaard getal dat wordt gebruikt voor uurloonberekeningen in Nederland. Bij 36 uur per week zijn dat 1.872 uur, bij 32 uur per week 1.664 uur."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is een redelijk uurloon in Nederland in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Het wettelijk minimumloon bedraagt in 2026 13,68 euro per uur voor werknemers van 21 jaar en ouder. Een modaal salaris van circa 3.100 euro bruto per maand komt neer op ongeveer 17,88 euro per uur bij 40 uur per week. Uurlonen varieren sterk per sector en functieniveau."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe bereken je een zzp-uurtarief op basis van je gewenste salaris?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gebruik de tab 'Salaris naar uurloon' en zet vakantiegeld aan. Voeg daarnaast een opslag toe voor verzekeringen, pensioen en niet-declarabele uren. Als vuistregel hanteren veel zzp'ers een factor 1,5 tot 2 bovenop het bruto uurloon als loondienst-equivalent."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen bruto en netto uurloon?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bruto uurloon is je verdienste voor belastingen en premies. Netto uurloon is wat je daadwerkelijk ontvangt. Het verschil hangt af van je belastingschijf, toeslagen en persoonlijke aftrekposten. Deze calculator berekent alleen het bruto uurloon."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe werkt de uurloonberekening voor deeltijdwerkers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Voor deeltijdwerkers gebruik je het werkelijke aantal uren per week. Stel de schuifregelaar in op 24, 28 of 32 uur per week. De calculator past het jaarsalaris en het uurloon automatisch aan op basis van de ingevoerde uren."
      }
    },
    {
      "@type": "Question",
      "name": "Is deze uurlooncalculator gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de uurlooncalculator van RekenGemak is volledig gratis. Je hoeft geen account aan te maken en er is geen tijdslimiet. De calculator werkt direct in je browser, ook op je telefoon."
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
      "name": "Uurloon Berekenen",
      "item": "https://rekengemak.nl/uurloon-berekenen/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de uurlooncalculator?"

Kies het tabblad dat bij je situatie past. Met 'Salaris naar uurloon' bereken je wat je bruto maandsalaris is per uur. Vul het salaris in en stel het aantal uren per week in via de schuifregelaar. De preset-knoppen 32, 36, 38 en 40 uur maken het instellen makkelijker.

Wil je vakantiegeld meenemen? Zet de toggle aan. De calculator verhoogt het jaarsalaris dan met 8% voor de berekening. Handig als je je echte arbeidskosten wilt weten of een zzp-tarief wilt bepalen.

Met 'Uurloon naar salaris' doe je het andersom: vul een uurloon in en zie wat dat oplevert als maandsalaris. Nuttig bij het vergelijken van een uurcontract met een vast dienstverband.

Let op: alle bedragen zijn bruto. Je netto uurloon hangt af van je persoonlijke belastingsituatie.

### H2: "Voor wie is deze rekenhulp?"

- Werknemers die willen weten wat hun maandsalaris per uur is
- Zzp'ers die hun uurtarief willen baseren op een gewenst netto-inkomen
- HR-medewerkers en recruiters die salarissen en tarieven vergelijken
- Werkzoekenden die een jobaanbieding met uur- of maandloon willen vergelijken
- Deeltijdwerkers die het effect van hun werkuren op het uurloon willen zien

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/vakantiegeld-berekenen/">Vakantiegeld berekenen</a>
  <a href="/vakantiedagen-berekenen/">Vakantiedagen berekenen</a>
  <a href="/minimumloon-berekenen/">Minimumloon berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/procenten-berekenen/">Procenten berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 hergebruiken** — `.input-suffix` (T-002), `.slider-wrap` (T-008), `.disclaimer` (T-008), `.btn-preset` (nieuw, zie spec hierboven)
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`inputmode="decimal"`** — op alle tekst-invoervelden
7. **`Intl.NumberFormat('nl-NL', { style: 'currency' })`** — voor eurobedragen
8. **Slider default = 40 uur** — meest gebruikte werkweek
9. **Preset knoppen 32/36/38/40** — stellen slider en waarde tegelijk in
10. **Vakantiegeld toggle default = UIT** — gebruiker schakelt bewust in
11. **Disclaimer verplicht** onder elke result box — bruto, niet netto
12. **Badge "Bijgewerkt: januari 2026"** — verplicht bij H1
13. **Footer trailing slash** — `/privacy/`, `/contact/`
14. **JSON-LD schemas** — onderaan body, na `</footer>`
15. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-007-uurloon-berekenen

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-007-uurloon.md
git commit -m "docs: add brief TASK-007"

# Stap 3: code committen
git add uurloon-berekenen/index.html
git commit -m "feat: TASK-007 uurloon-berekenen tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-007-uurloon-berekenen
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/uurloon-berekenen/
```

> **Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/uurloon-berekenen/`.**

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/uurloon-berekenen/`

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
- [ ] **Sitemap:** uurloon-berekenen/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Tính toán — Chạy trên live URL

### Tab 1: Maandsalaris naar uurloon (excl. vakantiegeld)

| Maandsalaris | Uren/week | VG | Verwacht uurloon | Actueel | PASS/FAIL |
|---|---|---|---|---|---|
| € 3.000 | 40 | Uit | € 17,31 | | |
| € 3.000 | 36 | Uit | € 19,23 | | |
| € 3.000 | 32 | Uit | € 21,63 | | |
| € 2.500 | 40 | Uit | € 14,42 | | |
| € 5.000 | 40 | Uit | € 28,85 | | |

### Tab 1: Maandsalaris naar uurloon (incl. vakantiegeld, toggle AAN)

| Maandsalaris | Uren/week | VG | Verwacht uurloon | Actueel | PASS/FAIL |
|---|---|---|---|---|---|
| € 3.000 | 40 | Aan | € 18,69 | | |
| € 3.000 | 36 | Aan | € 20,77 | | |
| € 2.500 | 40 | Aan | € 15,58 | | |
| (leeg) | 40 | Uit | -- | | |

### Tab 2: Uurloon naar maandsalaris (excl. vakantiegeld)

| Uurloon | Uren/week | VG | Verwacht maandsalaris | Actueel | PASS/FAIL |
|---|---|---|---|---|---|
| € 17,31 | 40 | Uit | € 3.000,40 (afronding OK) | | |
| € 20,00 | 40 | Uit | € 3.466,67 | | |
| € 15,00 | 36 | Uit | € 2.340,00 | | |
| € 13,68 | 40 | Uit | € 2.371,20 | | |

### Tab 2: Uurloon naar maandsalaris (incl. vakantiegeld, toggle AAN)

| Uurloon | Uren/week | VG | Verwacht maandsalaris | Actueel | PASS/FAIL |
|---|---|---|---|---|---|
| € 18,69 | 40 | Aan | € 3.000 (afronding OK) | | |
| € 20,00 | 40 | Aan | € 3.209,88 | | |
| (leeg) | 40 | Uit | -- | | |

**Verificatie formules:**
- Tab 1 excl. VG: `(maand × 12) / (uren × 52)`
- Tab 1 incl. VG: `(maand × 12 × 1.08) / (uren × 52)`
- Tab 2 excl. VG: `(uurloon × uren × 52) / 12`
- Tab 2 incl. VG: `(uurloon × uren × 52) / (12 × 1.08)`

## C. UX op apparaten

- [ ] **2 tabs switchen:** klikken → juist panel zichtbaar
- [ ] **Slider realtime:** slepen → waarde past mee, resultaat herberekent direct
- [ ] **Preset knoppen 32/36/38/40:** klikken → slider + waarde + resultaat updaten
- [ ] **Slider default = 40** bij laden pagina
- [ ] **VG toggle default = UIT** bij laden pagina
- [ ] **VG toggle AAN:** resultaat verhoogt met 8%
- [ ] **iOS Safari:** numeriek toetsenbord, geen zoom
- [ ] **Mobiel 375px:** geen horizontale scroll, preset knoppen wrappen correct
- [ ] **Knop "Kopieer":** → "Gekopieerd!" 1,5 sec → terug
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage `rekengemak-theme` correct
- [ ] **Empty state:** "--" muted, klein
- [ ] **Filled state:** uurloon/salaris groot groen 2.25rem
- [ ] **Disclaimer zichtbaar** onder result box in beide tabs
- [ ] **Badge "Bijgewerkt: januari 2026"** zichtbaar bij H1

## D. Inhoud

- [ ] **H1** = "Uurloon Berekenen"
- [ ] **Keyword "uurloon berekenen"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden** in body-tekst

## Samenvatting

```
Live URL getest: https://rekengemak.nl/uurloon-berekenen/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
