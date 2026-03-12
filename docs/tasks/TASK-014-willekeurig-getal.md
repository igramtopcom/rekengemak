# TASK-014 — Willekeurig Getal
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P3
**Branch:** `feature/TASK-014-willekeurig-getal`
**File:** `willekeurig-getal/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Willekeurig Getal tại `/willekeurig-getal/` — genereer tot 100 willekeurige getallen tegelijk binnen een opgegeven bereik. Resultaat wordt groot weergegeven met een korte animatie. Bij meerdere getallen is een CSV-export beschikbaar. De 10 meest recente generaties worden bijgehouden als geschiedenis.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/willekeurig-getal/`
- **Title (60 ký tự):** `Willekeurig Getal Genereren Online Gratis | RekenGemak`
- **Meta description (154 ký tự):** `Genereer willekeurige getallen online. Kies je bereik en aantal, en krijg direct een willekeurig getal of een lijst. Gratis, snel en zonder registratie.`
- **H1:** `Willekeurig Getal Genereren`
- **Từ khóa chính:** `willekeurig getal` (5K–10K/tháng, KD 6–12)
- **Từ khóa dài:**
  - willekeurig getal genereren online
  - random getal generator
  - willekeurig getal tussen 1 en 100
  - willekeurige getallen lijst genereren
  - random number generator nederland
  - lot trekken online willekeurig

---

## Open Graph Tags

```html
<meta property="og:title"       content="Willekeurig Getal Genereren Online Gratis | RekenGemak">
<meta property="og:description" content="Genereer willekeurige getallen online. Kies je bereik en aantal, en krijg direct een willekeurig getal of een lijst. Gratis, snel en zonder registratie.">
<meta property="og:url"         content="https://rekengemak.nl/willekeurig-getal/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert CSS van `btw-berekenen/index.html` volledig. Aanvullende CSS hieronder.

### Aanvullende CSS

```css
/* ═══ GENEREER KNOP ════════════════════════════════════════════════════ */
.btn-genereer {
  width: 100%;
  padding: 18px;
  font-size: 1.25rem;
  font-weight: 700;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background var(--transition), transform 0.1s ease;
  margin-top: var(--space-md);
  letter-spacing: 0.02em;
}

.btn-genereer:hover {
  background: var(--accent-hover);
}

.btn-genereer:active {
  transform: scale(0.98);
}

/* ═══ RESULTAAT — 1 GETAL ══════════════════════════════════════════════ */
.result-single {
  display: none;
  text-align: center;
  padding: var(--space-xl) var(--space-md);
  background: var(--result-bg);
  border-radius: var(--radius);
  margin-top: var(--space-md);
}

.result-single.visible {
  display: block;
}

.result-single .result-num {
  font-size: 5rem;
  font-weight: 700;
  color: var(--success);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  display: block;
}

@media (max-width: 480px) {
  .result-single .result-num { font-size: 3.5rem; }
}

/* Animatie bij genereren */
@keyframes popIn {
  0%   { transform: scale(0.7); opacity: 0; }
  60%  { transform: scale(1.08); }
  100% { transform: scale(1);   opacity: 1; }
}

.result-num.pop {
  animation: popIn 0.3s ease forwards;
}

/* ═══ RESULTAAT — MEERDERE GETALLEN ═══════════════════════════════════ */
.result-multi {
  display: none;
  margin-top: var(--space-md);
}

.result-multi.visible {
  display: block;
}

.result-multi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
  flex-wrap: wrap;
  gap: 8px;
}

.result-multi-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.numbers-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background: var(--result-bg);
  border-radius: var(--radius);
  padding: var(--space-md);
}

.number-chip {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--success);
  font-variant-numeric: tabular-nums;
  animation: popIn 0.3s ease forwards;
}

/* ═══ GESCHIEDENIS ══════════════════════════════════════════════════════ */
.history-section {
  margin-top: var(--space-lg);
  border-top: 1px solid var(--border);
  padding-top: var(--space-md);
}

.history-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--space-sm);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: var(--bg-input);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  gap: 12px;
  flex-wrap: wrap;
}

.history-item .history-val {
  color: var(--text-primary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.history-item .history-meta {
  font-size: 0.8rem;
  color: var(--text-secondary);
  flex-shrink: 0;
}
```

---

## Tool Card

```html
<section class="tool-card" aria-label="Willekeurig Getal Genereren">

  <!-- Input rij: Van / Tot / Aantal -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-md);">

    <div class="input-group" style="margin-bottom:0;">
      <label for="inp-van">Van</label>
      <div class="input-wrap">
        <input id="inp-van" type="text" inputmode="numeric"
               autocomplete="off" value="1"
               oninput="validateInputs()">
      </div>
    </div>

    <div class="input-group" style="margin-bottom:0;">
      <label for="inp-tot">Tot</label>
      <div class="input-wrap">
        <input id="inp-tot" type="text" inputmode="numeric"
               autocomplete="off" value="100"
               oninput="validateInputs()">
      </div>
    </div>

    <div class="input-group" style="margin-bottom:0;">
      <label for="inp-aantal">Aantal
        <span style="font-weight:400;font-size:0.8rem;">(max 100)</span>
      </label>
      <div class="input-wrap">
        <input id="inp-aantal" type="text" inputmode="numeric"
               autocomplete="off" value="1"
               oninput="validateInputs()">
      </div>
    </div>

  </div>

  <!-- Foutmelding -->
  <div id="error-msg" style="display:none;margin-top:10px;
       padding:10px 14px;background:rgba(224,82,82,0.12);
       border-left:3px solid #E05252;border-radius:6px;
       font-size:0.875rem;color:#E05252;"></div>

  <!-- Genereer knop -->
  <button class="btn-genereer" id="btn-genereer" onclick="genereer()">
    Genereer
  </button>

  <!-- Resultaat: 1 getal -->
  <div class="result-single" id="result-single">
    <span class="result-num" id="res-num">--</span>
    <div style="margin-top:var(--space-md);">
      <button class="btn-copy" onclick="copyEnkele()" id="btn-copy-single">
        Kopieer getal
      </button>
    </div>
  </div>

  <!-- Resultaat: meerdere getallen -->
  <div class="result-multi" id="result-multi">
    <div class="result-multi-header">
      <span class="result-multi-title" id="multi-title">Resultaten</span>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn-copy" onclick="copyLijst()" id="btn-copy-multi">
          Kopieer lijst
        </button>
        <button class="btn-secondary" onclick="exportCSV()" id="btn-csv"
                style="padding:6px 14px;font-size:0.85rem;">
          Download CSV
        </button>
      </div>
    </div>
    <div class="numbers-grid" id="numbers-grid"></div>
  </div>

  <!-- Geschiedenis -->
  <div class="history-section" id="history-section" style="display:none;">
    <div style="display:flex;justify-content:space-between;align-items:center;
                margin-bottom:var(--space-sm);">
      <span class="history-title">Recente generaties</span>
      <button class="btn-secondary" onclick="clearHistory()"
              style="padding:4px 10px;font-size:0.8rem;">Wis geschiedenis</button>
    </div>
    <div class="history-list" id="history-list"></div>
  </div>

</section>
```

---

## Logic JavaScript

```javascript
/* ═══ CONSTANTEN ════════════════════════════════════════════════════════ */
var MAX_AANTAL  = 100;
var MAX_HISTORY = 10;
var history     = [];

/* ═══ CRYPTO RANDOM — VERPLICHT ═════════════════════════════════════════
   NOOIT Math.random() gebruiken. Altijd crypto.getRandomValues().
════════════════════════════════════════════════════════════════════════ */
function randomInt(min, max) {
  var range = max - min + 1;
  var arr   = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return min + (arr[0] % range);
}

function randomInts(min, max, count) {
  var range = max - min + 1;
  var arr   = new Uint32Array(count);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(function(n) { return min + (n % range); });
}

/* ═══ VALIDATE INPUTS ═══════════════════════════════════════════════════ */
function parseIntField(id) {
  var val = document.getElementById(id).value.trim();
  return val === '' ? NaN : parseInt(val, 10);
}

function validateInputs() {
  var van   = parseIntField('inp-van');
  var tot   = parseIntField('inp-tot');
  var antal = parseIntField('inp-aantal');
  var err   = document.getElementById('error-msg');
  var btn   = document.getElementById('btn-genereer');

  if (isNaN(van) || isNaN(tot) || isNaN(antal)) {
    showError('Vul geldige gehele getallen in.'); btn.disabled = true; return false;
  }
  if (van >= tot) {
    showError('"Van" moet kleiner zijn dan "Tot".'); btn.disabled = true; return false;
  }
  if (antal < 1 || antal > MAX_AANTAL) {
    showError('Aantal moet tussen 1 en ' + MAX_AANTAL + ' liggen.'); btn.disabled = true; return false;
  }
  hideError(); btn.disabled = false; return true;
}

function showError(msg) {
  var el = document.getElementById('error-msg');
  el.textContent  = msg;
  el.style.display = 'block';
}

function hideError() {
  document.getElementById('error-msg').style.display = 'none';
}

/* ═══ GENEREER ══════════════════════════════════════════════════════════ */
function genereer() {
  if (!validateInputs()) return;

  var van   = parseIntField('inp-van');
  var tot   = parseIntField('inp-tot');
  var antal = parseIntField('inp-aantal');

  if (antal === 1) {
    /* Enkel getal */
    var getal = randomInt(van, tot);
    toonEnkel(getal);
    addHistory(van, tot, [getal]);
  } else {
    /* Meerdere getallen */
    var getallen = randomInts(van, tot, antal);
    toonMulti(getallen, van, tot);
    addHistory(van, tot, getallen);
  }
}

/* ═══ TOON ENKEL RESULTAAT ═══════════════════════════════════════════════ */
function toonEnkel(getal) {
  var single = document.getElementById('result-single');
  var multi  = document.getElementById('result-multi');
  var numEl  = document.getElementById('res-num');

  multi.classList.remove('visible');
  single.classList.add('visible');

  /* Animatie: verwijder en voeg class opnieuw toe */
  numEl.classList.remove('pop');
  numEl.textContent = getal.toLocaleString('nl-NL');
  void numEl.offsetWidth; /* reflow triggeren */
  numEl.classList.add('pop');
}

/* ═══ TOON MEERDERE RESULTATEN ═══════════════════════════════════════════ */
function toonMulti(getallen, van, tot) {
  var single = document.getElementById('result-single');
  var multi  = document.getElementById('result-multi');
  var grid   = document.getElementById('numbers-grid');
  var title  = document.getElementById('multi-title');

  single.classList.remove('visible');
  multi.classList.add('visible');

  title.textContent = getallen.length + ' willekeurige getallen (' + van + ' t/m ' + tot + ')';

  grid.innerHTML = '';
  getallen.forEach(function(n, i) {
    var chip = document.createElement('span');
    chip.className = 'number-chip';
    chip.textContent = n.toLocaleString('nl-NL');
    chip.style.animationDelay = Math.min(i * 20, 400) + 'ms';
    grid.appendChild(chip);
  });
}

/* ═══ COPY ══════════════════════════════════════════════════════════════ */
function copyEnkele() {
  var txt = document.getElementById('res-num').textContent;
  if (!txt || txt === '--') return;
  navigator.clipboard.writeText(txt).then(function() {
    feedbackBtn('btn-copy-single', 'Kopieer getal');
  });
}

function copyLijst() {
  var chips = document.querySelectorAll('#numbers-grid .number-chip');
  var txt   = Array.from(chips).map(function(c) { return c.textContent; }).join(', ');
  if (!txt) return;
  navigator.clipboard.writeText(txt).then(function() {
    feedbackBtn('btn-copy-multi', 'Kopieer lijst');
  });
}

function feedbackBtn(id, orig) {
  var btn = document.getElementById(id);
  if (!btn) return;
  btn.textContent = 'Gekopieerd!';
  btn.classList.add('copied');
  setTimeout(function() {
    btn.textContent = orig;
    btn.classList.remove('copied');
  }, 1500);
}

/* ═══ CSV EXPORT ════════════════════════════════════════════════════════ */
function exportCSV() {
  var chips  = document.querySelectorAll('#numbers-grid .number-chip');
  if (!chips.length) return;
  var van    = parseIntField('inp-van');
  var tot    = parseIntField('inp-tot');
  var lines  = ['index,getal'];
  Array.from(chips).forEach(function(c, i) {
    lines.push((i + 1) + ',' + c.textContent.replace(/\./g, ''));
  });
  var csv    = lines.join('\n');
  var blob   = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var url    = URL.createObjectURL(blob);
  var a      = document.createElement('a');
  a.href     = url;
  a.download = 'willekeurige-getallen-' + van + '-' + tot + '.csv';
  a.click();
  URL.revokeObjectURL(url);
}

/* ═══ GESCHIEDENIS ══════════════════════════════════════════════════════ */
function addHistory(van, tot, getallen) {
  var nu    = new Date();
  var tijd  = nu.getHours().toString().padStart(2,'0') + ':' +
              nu.getMinutes().toString().padStart(2,'0');
  history.unshift({ van: van, tot: tot, getallen: getallen, tijd: tijd });
  if (history.length > MAX_HISTORY) history.pop();
  renderHistory();
}

function renderHistory() {
  var section = document.getElementById('history-section');
  var list    = document.getElementById('history-list');

  if (!history.length) { section.style.display = 'none'; return; }
  section.style.display = 'block';

  list.innerHTML = '';
  history.forEach(function(h) {
    var li    = document.createElement('div');
    li.className = 'history-item';
    var preview = h.getallen.length === 1
      ? h.getallen[0].toLocaleString('nl-NL')
      : h.getallen.slice(0, 5).map(function(n) {
          return n.toLocaleString('nl-NL');
        }).join(', ') + (h.getallen.length > 5 ? ' ...' : '');
    li.innerHTML =
      '<span class="history-val">' + preview + '</span>' +
      '<span class="history-meta">' +
        h.getallen.length + 'x &nbsp;|&nbsp; ' + h.van + '&ndash;' + h.tot +
        ' &nbsp;|&nbsp; ' + h.tijd +
      '</span>';
    list.appendChild(li);
  });
}

function clearHistory() {
  history = [];
  document.getElementById('history-section').style.display = 'none';
}

/* ═══ DARK MODE TOGGLE ══════════════════════════════════════════════════ */
function toggleTheme() {
  var cur  = document.documentElement.getAttribute('data-theme');
  var next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('rekengemak-theme', next);
}

/* ═══ ENTER KEY ═════════════════════════════════════════════════════════ */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') genereer();
});
```

---

## 3 JSON-LD Schemas — Cuối body

### Schema 1: WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Willekeurig Getal Genereren — RekenGemak",
  "url": "https://rekengemak.nl/willekeurig-getal/",
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
      "name": "Hoe genereer je een willekeurig getal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vul het minimum en maximum in bij de velden 'Van' en 'Tot', kies het gewenste aantal en klik op 'Genereer'. De generator maakt direct een of meerdere willekeurige getallen aan binnen het opgegeven bereik. Standaard genereert de tool een getal tussen 1 en 100."
      }
    },
    {
      "@type": "Question",
      "name": "Waarvoor gebruik je een willekeurig getal generator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een willekeurig getal generator gebruik je voor het trekken van loten of het bepalen van een winnaar, het toewijzen van willekeurige nummers aan deelnemers, het bepalen van de volgorde van een presentatie of sportwedstrijd, simulaties en kansberekeningen, en spellen waarbij een dobbelsteenworp of vergelijkbare willekeur nodig is."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik meerdere willekeurige getallen tegelijk genereren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, met de veld 'Aantal' kun je tot 100 willekeurige getallen tegelijk genereren. De getallen worden als lijst weergegeven en zijn te kopiëren naar je klembord of te downloaden als CSV-bestand. Handig voor lotingen, steekproeven of statistische toepassingen."
      }
    },
    {
      "@type": "Question",
      "name": "Zijn de gegenereerde getallen echt willekeurig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De generator gebruikt de Web Cryptography API van je browser, specifiek crypto.getRandomValues(). Dit is een cryptografisch veilige bron van willekeurigheid en aanzienlijk betrouwbaarder dan de standaard Math.random()-functie. De getallen zijn niet voorspelbaar en geschikt voor toepassingen die echte willekeurigheid vereisen."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is een willekeurig getal tussen 1 en 6 (dobbelsteen)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stel 'Van' in op 1 en 'Tot' op 6 en klik op 'Genereer'. De tool gooit als het ware een virtuele dobbelsteen. Wil je met twee dobbelstenen gooien? Stel het aantal dan in op 2. Op die manier kun je ook andere dobbelstenen nabootsen, zoals een twintigvlak door het bereik 1 tot 20 te kiezen."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik de resultaten exporteren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, als je meer dan 1 getal genereert, verschijnt er een knop 'Download CSV'. Het CSV-bestand bevat een kolom met een volgnummer en een kolom met het willekeurige getal. Je kunt het bestand direct openen in Excel of Google Sheets."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is de geschiedenis functie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De generator houdt de 10 meest recente generaties bij in een geschiedenis onderaan de tool. Je ziet welke getallen zijn gegenereerd, het gebruikte bereik en het tijdstip. De geschiedenis wordt niet opgeslagen na het sluiten van de pagina."
      }
    },
    {
      "@type": "Question",
      "name": "Is de willekeurig getal generator gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de willekeurig getal generator van RekenGemak is volledig gratis. Je hoeft geen account aan te maken en er is geen limiet op het gebruik. De tool werkt direct in je browser, ook op je telefoon."
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
      "name": "Willekeurig Getal",
      "item": "https://rekengemak.nl/willekeurig-getal/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de willekeurig getal generator?"

Vul bij 'Van' en 'Tot' het gewenste bereik in. Standaard staat dit op 1 tot 100. Geef bij 'Aantal' aan hoeveel getallen je nodig hebt, van 1 tot maximaal 100. Klik daarna op 'Genereer' of druk op Enter.

Bij een enkel getal verschijnt het resultaat groot in beeld met een kleine animatie. Vraag je meerdere getallen op, dan zie je de volledige lijst en kun je die kopiëren of downloaden als CSV-bestand om in Excel of Google Sheets te openen.

Onderaan de tool staat een overzicht van de 10 meest recente generaties, zodat je eerdere resultaten nog kunt terugkijken.

### H2: "Voor wie is deze rekenhulp?"

- Organisatoren van verlotingen en loterijen die een eerlijke winnaar willen trekken
- Docenten en trainers die willekeurige groepen of volgorden willen bepalen
- Sporters en gamers die een neutrale beginvolgorde of dobbelsteen willen simuleren
- Onderzoekers die een willekeurige steekproef uit een lijst willen trekken
- Iedereen die snel een willekeurig getal nodig heeft zonder spreadsheet of app

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/procenten-berekenen/">Procenten berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/korting-berekenen/">Korting berekenen</a>
  <a href="/woorden-tellen/">Woorden tellen</a>
  <a href="/minimumloon-berekenen/">Minimumloon berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 hergebruiken** — aanvullende CSS van dit brief toevoegen
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`crypto.getRandomValues()` VERPLICHT** — NOOIT `Math.random()`. Zie JS spec hierboven
7. **`inputmode="numeric"`** op Van / Tot / Aantal — geen decimalen
8. **Enter-toets** triggert `genereer()` — `document.addEventListener('keydown', ...)`
9. **Validatie:** van >= tot → foutmelding rood. Aantal buiten 1–100 → foutmelding
10. **Enkel getal (aantal=1):** groot resultaat + pop-animatie. CSV-knop NIET tonen
11. **Meerdere getallen (aantal>1):** numbers-grid + CSV-knop tonen. Groot resultaat NIET tonen
12. **CSV-bestand:** komma als scheidingsteken, punten NIET in getalkolom (gebruik raw int)
13. **Animatie:** `popIn` keyframe via CSS, `animation-delay` gestaggerd per chip (max 400ms)
14. **Geschiedenis:** max 10 items, nieuwste bovenaan, verborgen bij pageload
15. **Geschiedenis NOT opgeslagen** in localStorage — verdwijnt bij refresh
16. **Footer trailing slash** — `/privacy/`, `/contact/`
17. **JSON-LD schemas** — onderaan body, na `</footer>`
18. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-014-willekeurig-getal

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-014-willekeurig-getal.md
git commit -m "docs: add brief TASK-014"

# Stap 3: code committen
git add willekeurig-getal/index.html
git commit -m "feat: TASK-014 willekeurig-getal tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-014-willekeurig-getal
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/willekeurig-getal/
```

> **Belangrijk:** Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/willekeurig-getal/` — niet op localhost.

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/willekeurig-getal/`

## A. Kỹ thuật

- [ ] **PageSpeed mobile:** [score] — vereist >= 90
- [ ] **PageSpeed desktop:** [score] — vereist >= 95
- [ ] **Rich Results — WebApplication:** PASS / FAIL
- [ ] **Rich Results — FAQPage:** PASS / FAIL
- [ ] **Rich Results — BreadcrumbList:** PASS / FAIL
- [ ] **DevTools Network:** 0 externe requests
- [ ] **Source bevat `crypto.getRandomValues`:** PASS (geen `Math.random`)
- [ ] **Ctrl+F "Math.random":** niet gevonden
- [ ] **Ctrl+F "—" (em dash):** niet gevonden in body-tekst
- [ ] **Ctrl+F "--":** niet gevonden in body-tekst
- [ ] **Ctrl+F "...":** niet gevonden
- [ ] **Interne links:** [aantal] — minimaal 5
- [ ] **Sitemap:** willekeurig-getal/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Functionaliteit — Chạy trên live URL

### Basis genereren

| Van | Tot | Aantal | Verwacht gedrag | PASS/FAIL |
|---|---|---|---|---|
| 1 | 100 | 1 | Enkel groot getal, binnen 1–100 | |
| 1 | 6 | 1 | Getal 1, 2, 3, 4, 5 of 6 | |
| 1 | 100 | 10 | 10 chips in grid, CSV-knop zichtbaar | |
| 1 | 100 | 100 | 100 chips in grid | |
| 50 | 50 | 1 | Foutmelding: van >= tot | |
| 1 | 100 | 0 | Foutmelding: aantal buiten bereik | |
| 1 | 100 | 101 | Foutmelding: aantal buiten bereik | |
| (leeg) | 100 | 1 | Foutmelding: ongeldige invoer | |

### Bereik verificatie (100 keer genereren)

- [ ] Genereer 100x met Van=1, Tot=10, Aantal=1 → elk resultaat >= 1 en <= 10
- [ ] Genereer 1x met Van=1, Tot=100, Aantal=100 → alle 100 chips >= 1 en <= 100

### CSV export

| Scenario | Verwacht | PASS/FAIL |
|---|---|---|
| Aantal=1 | CSV-knop NIET zichtbaar | |
| Aantal=5 | CSV-knop zichtbaar | |
| Klik CSV bij aantal=5 | Download `willekeurige-getallen-1-100.csv` | |
| CSV inhoud | Eerste regel: `index,getal` — daarna 5 rijen | |
| CSV getallen | Geen punten als duizendscheidingsteken in CSV | |

### Geschiedenis

| Scenario | Verwacht | PASS/FAIL |
|---|---|---|
| Pageload | Geschiedenis verborgen | |
| Na 1e generatie | Geschiedenis zichtbaar met 1 item | |
| Na 11 generaties | Nog steeds max 10 items, oudste verdwenen | |
| Klik "Wis geschiedenis" | Sectie verdwijnt | |
| Pagina refresh | Geschiedenis leeg — niet opgeslagen | |

## C. UX op apparaten

- [ ] **Animatie enkel getal:** pop-animatie zichtbaar bij genereren
- [ ] **Animatie chips:** gestaggerd inpoppen bij meerdere getallen
- [ ] **Enter-toets:** triggert genereer
- [ ] **Foutmelding rood:** zichtbaar bij ongeldige invoer
- [ ] **Foutmelding verdwijnt:** zodra invoer geldig is
- [ ] **Knop "Kopieer getal":** → "Gekopieerd!" 1,5 sec → terug
- [ ] **Knop "Kopieer lijst":** klembord bevat kommagescheiden getallen
- [ ] **Mobiel 375px:** 3-koloms input grid leesbaar, geen scroll
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage `rekengemak-theme` correct

## D. Inhoud

- [ ] **H1** = "Willekeurig Getal Genereren"
- [ ] **Keyword "willekeurig getal"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden**
- [ ] **FAQ vermeldt crypto.getRandomValues** als bewijs van echte willekeurigheid

## Samenvatting

```
Live URL getest: https://rekengemak.nl/willekeurig-getal/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
