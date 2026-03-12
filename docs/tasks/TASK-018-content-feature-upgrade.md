# TASK-018 — Content + Feature Upgrade (alle 12 tools)

**Branch:** `feature/TASK-018-content-feature-upgrade`
**Prioriteit:** P1
**Deadline:** Geen harde datum — maar afronden voor AdSense-aanvraag (april 2026)
**Status bij ontvangst:** TODO

---

## Wat gaat er gebeuren in deze task

Je gaat twee dingen tegelijk doen voor alle 12 bestaande tools.

**Deel 1 — Features (6 tools):**
Drie nieuwe interactieve functies toevoegen die geen enkele Nederlandse concurrent heeft. Dit zijn geen grote herstructureringen — het zijn gerichte toevoegingen bovenop de bestaande code.

**Deel 2 — Content (12 tools):**
De artikel-sectie van elke pagina uitbreiden van de huidige ~200 woorden naar ~600 woorden. Concrete formules, rekenvoorbeelden met echte getallen, en betere use-case beschrijvingen. Dit is nodig om te kunnen ranken op KD 5–22 zoekwoorden.

Lees dit document volledig voordat je begint. De volgorde van uitvoering staat aan het einde.

---

## Overzicht: welke tool krijgt wat

| Tool | Feature A Formule | Feature B Geschiedenis | Feature C Deeplink | Content |
|---|---|---|---|---|
| T-01 BTW Berekenen | ✅ | ✅ | ✅ | ✅ |
| T-02 Procenten Berekenen | ✅ | ✅ | ✅ | ✅ |
| T-03 Korting Berekenen | ✅ | ✅ | ✅ | ✅ |
| T-07 Uurloon Berekenen | ✅ | ✅ | ✅ | ✅ |
| T-08 Vakantiegeld Berekenen | ✅ | ✅ | ✅ | ✅ |
| T-09 Vakantiedagen Berekenen | ✅ | ✅ | ✅ | ✅ |
| T-10 Woorden Tellen | ❌ | ❌ | ❌ | ✅ |
| T-11 Tekens Tellen | ❌ | ❌ | ❌ | ✅ |
| T-12 Tekst Vergelijken | ❌ | ❌ | ❌ | ✅ |
| T-13 Minimumloon Berekenen | ❌ | ❌ | ❌ | ✅ |
| T-14 Willekeurig Getal | ❌ | al aanwezig | ❌ | ✅ |
| T-17 Wachtwoord Generator | ❌ | ❌ | ❌ | ✅ |

Waarom geen features op T-10/11/12: textarea-inhoud sla je nooit op in localStorage (privacy). T-13: statische overheidsdata, geen persoonlijke invoer. T-14: random heeft geen deterministische formule om te tonen, geschiedenis al aanwezig. T-17: wachtwoorden sla je nooit op, ook niet lokaal.

---

# DEEL 1 — FEATURE SPECS

## Feature A — "Zo wordt dit berekend"

### Wat het doet

Na elke berekening verschijnt er een klein blok onder het resultaat dat stap voor stap laat zien hoe het antwoord berekend is, met de getallen die de gebruiker zelf heeft ingevuld. Het blok is onzichtbaar bij pageload en verschijnt pas na de eerste berekening.

Waarom: geen enkele Nederlandse concurrent doet dit. Het bouwt vertrouwen bij de gebruiker ("ik begrijp hoe dit werkt"), en Google ziet het als educatieve meerwaarde.

### HTML — toevoegen DIRECT NA het result-card blok

Zoek in de bestaande HTML naar het element met de uitkomst (het groene resultaat-blok). Voeg dit er direct onder toe, nog steeds binnen `<main>`, voor `id="ad-middle"`:

```html
<div class="formula-blok" id="formula-blok" style="display:none;">
  <div class="formula-title">Zo wordt dit berekend</div>
  <div class="formula-stappen" id="formula-stappen"></div>
</div>
```

### CSS — toevoegen aan de bestaande `<style>` sectie

```css
.formula-blok {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  padding: var(--space-md);
  margin-top: var(--space-md);
  font-size: 0.875rem;
}

.formula-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
}

.formula-stap {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 4px 0;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  flex-wrap: wrap;
}

.formula-stap:last-child {
  border-bottom: none;
}

.formula-stap .fs-label {
  font-family: system-ui, sans-serif;
  font-size: 0.8rem;
  color: var(--text-secondary);
  min-width: 140px;
  flex-shrink: 0;
}

.formula-stap .fs-calc {
  color: var(--text-primary);
}

.formula-stap .fs-result {
  color: var(--success);
  font-weight: 700;
  margin-left: auto;
}
```

### JS — gedeelde functie, toevoegen aan de JS-sectie van elke pagina

```javascript
function toonFormula(stappen) {
  var blok = document.getElementById('formula-blok');
  var cont = document.getElementById('formula-stappen');
  if (!stappen || !stappen.length) {
    blok.style.display = 'none';
    return;
  }
  cont.innerHTML = stappen.map(function(s) {
    return '<div class="formula-stap">' +
      '<span class="fs-label">' + s.label + '</span>' +
      '<span class="fs-calc">' + s.calc + '</span>' +
      '<span class="fs-result">= ' + s.result + '</span>' +
    '</div>';
  }).join('');
  blok.style.display = 'block';
}
```

### Aanroep per tool — voeg toe aan het einde van elke bestaande `recalc()` functie

**T-01 BTW — modus excl (btw erbij):**
```javascript
toonFormula([
  { label: 'BTW bedrag',
    calc: fmtEUR(bedrag) + ' x ' + tarief + '%',
    result: fmtEUR(btwBedrag) },
  { label: 'Incl. BTW',
    calc: fmtEUR(bedrag) + ' + ' + fmtEUR(btwBedrag),
    result: fmtEUR(inclBedrag) }
]);
```

**T-01 BTW — modus incl (btw eraf):**
```javascript
toonFormula([
  { label: 'Excl. BTW',
    calc: fmtEUR(bedrag) + ' / ' + (1 + tarief/100).toFixed(2),
    result: fmtEUR(exclBedrag) },
  { label: 'BTW bedrag',
    calc: fmtEUR(bedrag) + ' - ' + fmtEUR(exclBedrag),
    result: fmtEUR(btwBedrag) }
]);
```

**T-02 Procenten — tab 1 (% van getal):**
```javascript
toonFormula([
  { label: 'Berekening',
    calc: fmtGetal(getal) + ' x (' + pct + ' / 100)',
    result: fmtGetal(uitkomst) }
]);
```

**T-02 Procenten — tab 3 (stijging/daling):**
```javascript
toonFormula([
  { label: 'Verschil',
    calc: fmtGetal(nieuw) + ' - ' + fmtGetal(oud),
    result: fmtGetal(nieuw - oud) },
  { label: 'Percentage',
    calc: '(' + fmtGetal(nieuw - oud) + ' / ' + fmtGetal(oud) + ') x 100',
    result: pct.toFixed(2) + '%' }
]);
```

**T-02 Procenten — overige tabs:** bouw de stappen analoog op, 1 of 2 stappen per berekening.

**T-03 Korting — tab 1 (prijs na korting):**
```javascript
toonFormula([
  { label: 'Kortingsbedrag',
    calc: fmtEUR(prijs) + ' x ' + korting + '%',
    result: fmtEUR(kortingsBedrag) },
  { label: 'Prijs na korting',
    calc: fmtEUR(prijs) + ' - ' + fmtEUR(kortingsBedrag),
    result: fmtEUR(prijsNaKorting) }
]);
```

**T-03 Korting — tab 2 (kortingspercentage):**
```javascript
toonFormula([
  { label: 'Verschil',
    calc: fmtEUR(oud) + ' - ' + fmtEUR(nieuw),
    result: fmtEUR(oud - nieuw) },
  { label: 'Kortingspercentage',
    calc: '(' + fmtEUR(oud - nieuw) + ' / ' + fmtEUR(oud) + ') x 100',
    result: pct.toFixed(1) + '%' }
]);
```

**T-07 Uurloon — richting maand naar uur:**
```javascript
toonFormula([
  { label: 'Jaarsalaris',
    calc: fmtEUR(salaris) + ' x 12',
    result: fmtEUR(salaris * 12) },
  { label: 'Uren per jaar',
    calc: uren + ' x 52',
    result: (uren * 52) + ' uur' },
  { label: 'Uurloon',
    calc: fmtEUR(salaris * 12) + ' / ' + (uren * 52),
    result: fmtEUR(uurloon) }
]);
```

**T-08 Vakantiegeld:**
```javascript
toonFormula([
  { label: 'Jaarsalaris',
    calc: fmtEUR(salaris) + ' x ' + maanden,
    result: fmtEUR(salaris * maanden) },
  { label: 'Vakantiegeld (8%)',
    calc: fmtEUR(salaris * maanden) + ' x 0,08',
    result: fmtEUR(vakantiegeld) }
]);
```

**T-09 Vakantiedagen:**
```javascript
toonFormula([
  { label: 'Wettelijke dagen',
    calc: '4 x (' + uren + ' / 8)',
    result: wettelijk + ' dagen' },
  { label: 'Totaal vol jaar',
    calc: wettelijk + ' + ' + bovenwettelijk + ' (bovenwettelijk)',
    result: (wettelijk + bovenwettelijk) + ' dagen' },
  { label: 'Pro-rata (' + maanden + ' mnd)',
    calc: (wettelijk + bovenwettelijk) + ' x (' + maanden + ' / 12)',
    result: proRata.toFixed(1) + ' dagen' }
]);
```

---

## Feature B — Berekeningsgeschiedenis

### Wat het doet

Slaat de laatste 5 berekeningen op in localStorage. De gebruiker ziet ze direct onder de tool. Klikken op een item vult het formulier opnieuw in en herberekent. Handig voor wie meerdere scenario's vergelijkt.

Elke tool heeft een eigen localStorage-sleutel. De sleutels mogen NIET overlappen.

| Tool | localStorage sleutel |
|---|---|
| T-01 BTW | `rg-geschiedenis-btw` |
| T-02 Procenten | `rg-geschiedenis-procenten` |
| T-03 Korting | `rg-geschiedenis-korting` |
| T-07 Uurloon | `rg-geschiedenis-uurloon` |
| T-08 Vakantiegeld | `rg-geschiedenis-vakantiegeld` |
| T-09 Vakantiedagen | `rg-geschiedenis-vakantiedagen` |

### HTML — toevoegen DIRECT NA het formula-blok

```html
<div class="geschiedenis-wrap" id="geschiedenis-wrap" style="display:none;">
  <div class="geschiedenis-header">
    <span class="geschiedenis-title">Recente berekeningen</span>
    <button class="btn-secondary" onclick="wisGeschiedenis()"
            style="padding:3px 10px;font-size:0.8rem;">Wis</button>
  </div>
  <div class="geschiedenis-list" id="geschiedenis-list"></div>
</div>
```

### CSS

```css
.geschiedenis-wrap {
  margin-top: var(--space-md);
  border-top: 1px solid var(--border);
  padding-top: var(--space-md);
}

.geschiedenis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}

.geschiedenis-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

.geschiedenis-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  background: var(--bg-input);
  border-radius: 6px;
  margin-bottom: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background var(--transition);
  gap: 12px;
  flex-wrap: wrap;
}

.geschiedenis-item:hover {
  background: var(--result-bg);
}

.geschiedenis-item .gh-invoer {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.geschiedenis-item .gh-uitkomst {
  color: var(--success);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.geschiedenis-item .gh-tijd {
  font-size: 0.75rem;
  color: var(--text-secondary);
}
```

### JS — gedeelde functies, aanpassen GESCHIEDENIS_KEY per pagina

```javascript
var GESCHIEDENIS_KEY = 'rg-geschiedenis-btw'; /* AANPASSEN per tool */
var MAX_GESCHIEDENIS  = 5;

function laadGeschiedenis() {
  try {
    return JSON.parse(localStorage.getItem(GESCHIEDENIS_KEY) || '[]');
  } catch(e) {
    return [];
  }
}

function slaGeschiedenisOp(labelTekst, uitkomstTekst, veldwaarden) {
  /*
   * labelTekst   = leesbare samenvatting van de invoer, bijv. "€ 100 (21%, excl)"
   * uitkomstTekst = leesbaar resultaat, bijv. "incl: € 121,00"
   * veldwaarden  = object met de ruwe veldwaarden voor herstel, bijv. { bedrag: 100, tarief: 21 }
   */
  var lijst = laadGeschiedenis();
  lijst.unshift({
    label: labelTekst,
    uitkomst: uitkomstTekst,
    velden: veldwaarden,
    tijd: new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
  });
  if (lijst.length > MAX_GESCHIEDENIS) {
    lijst = lijst.slice(0, MAX_GESCHIEDENIS);
  }
  localStorage.setItem(GESCHIEDENIS_KEY, JSON.stringify(lijst));
  renderGeschiedenis();
}

function renderGeschiedenis() {
  var lijst = laadGeschiedenis();
  var wrap  = document.getElementById('geschiedenis-wrap');
  var cont  = document.getElementById('geschiedenis-list');
  if (!lijst.length) {
    wrap.style.display = 'none';
    return;
  }
  wrap.style.display = 'block';
  cont.innerHTML = lijst.map(function(item) {
    return '<div class="geschiedenis-item" onclick="herstelBerekening(\'' +
      encodeURIComponent(JSON.stringify(item.velden)) + '\')">' +
      '<span class="gh-invoer">' + item.label + '</span>' +
      '<span class="gh-uitkomst">' + item.uitkomst + '</span>' +
      '<span class="gh-tijd">' + item.tijd + '</span>' +
    '</div>';
  }).join('');
}

function wisGeschiedenis() {
  localStorage.removeItem(GESCHIEDENIS_KEY);
  renderGeschiedenis();
}

/*
 * herstelBerekening() roept herstelFormulier() aan — die schrijf je
 * per tool, want elk formulier heeft andere velden.
 */
function herstelBerekening(veldwaardenEncoded) {
  var velden = JSON.parse(decodeURIComponent(veldwaardenEncoded));
  herstelFormulier(velden);
  recalc();
}
```

### herstelFormulier() — schrijf per tool

Per tool schrijf je een `herstelFormulier(velden)` functie die de veldwaarden terugzet. Voorbeeld voor T-01 BTW:

```javascript
function herstelFormulier(velden) {
  document.getElementById('bedrag').value   = velden.bedrag  || '';
  document.getElementById('tarief').value   = velden.tarief  || '21';
  /* toggle modus instellen als die bestaat */
  if (velden.modus === 'incl') {
    /* zet toggle op incl */
  }
}
```

### Aanroep slaGeschiedenisOp() in recalc() — voorbeeld T-01 BTW

```javascript
/* Roep aan NA toonFormula(), AAN HET EINDE van recalc() */
slaGeschiedenisOp(
  fmtEUR(bedrag) + ' (' + tarief + '%, ' + (modus === 'excl' ? 'excl' : 'incl') + ')',
  modus === 'excl' ? 'incl: ' + fmtEUR(inclBedrag) : 'excl: ' + fmtEUR(exclBedrag),
  { bedrag: bedrag, tarief: tarief, modus: modus }
);
```

### Init — aanroepen bij pageload

```javascript
/* Onderin de <script> sectie, buiten alle functies */
renderGeschiedenis();
```

---

## Feature C — URL Deeplink

### Wat het doet

Elke berekening schrijft de invoerwaarden naar de URL als query-parameters, zonder page reload. De URL blijft geldig als bookmark of gedeelde link. Bij pageload leest de tool die parameters en vult het formulier automatisch in.

Voorbeeld resultaat: `https://rekengemak.nl/btw-berekenen/?bedrag=100&tarief=21&modus=excl`

### URL-schema per tool

| Tool | Parameters |
|---|---|
| T-01 BTW | `?bedrag=100&tarief=21&modus=excl` |
| T-02 Procenten | `?tab=1&getal=200&pct=15` |
| T-03 Korting | `?tab=1&prijs=80&korting=25` |
| T-07 Uurloon | `?salaris=3000&uren=40&richting=naar-uur` |
| T-08 Vakantiegeld | `?salaris=2500&maanden=12` |
| T-09 Vakantiedagen | `?uren=40&maanden=12&bovenwettelijk=5` |

### JS — patroon (aanpassen per tool)

```javascript
function updateUrl() {
  /*
   * Schrijft de huidige staat terug naar de URL.
   * Aanroepen als EERSTE stap in recalc(), voor de berekening.
   */
  var params = new URLSearchParams();
  params.set('bedrag',  document.getElementById('bedrag').value  || '');
  params.set('tarief',  document.getElementById('tarief').value  || '21');
  params.set('modus',   modus); /* of wat de huidige toggle-stand is */
  history.replaceState(null, '', '?' + params.toString());
}

function leesUrlParams() {
  /*
   * Leest URL-parameters bij pageload en vult het formulier in.
   * Aanroepen eenmalig bij init, NA het aanmaken van event listeners.
   * Roep daarna recalc() aan als er parameters gevonden zijn.
   */
  var params = new URLSearchParams(window.location.search);
  var heeftParams = false;

  if (params.get('bedrag')) {
    document.getElementById('bedrag').value = params.get('bedrag');
    heeftParams = true;
  }
  if (params.get('tarief')) {
    document.getElementById('tarief').value = params.get('tarief');
    heeftParams = true;
  }
  if (params.get('modus')) {
    /* toggle instellen op basis van params.get('modus') */
    heeftParams = true;
  }

  if (heeftParams) {
    recalc();
  }
}
```

### Volgorde in recalc()

```javascript
function recalc() {
  updateUrl();          /* 1. URL bijwerken */
  /* ... berekening ... */
  toonFormula([...]);   /* 2. Formule tonen */
  slaGeschiedenisOp(... /* 3. Geschiedenis opslaan */);
}
```

---

# DEEL 2 — CONTENT UPGRADE

## Schrijfregels — verplicht voor alle teksten

- Geen em dash (`—`), geen double dash (`--`), geen ellipsis (`...`)
- Geen: Furthermore, Moreover, Additionally, It is worth noting, In conclusion
- Zinnen zijn kort en direct. Schrijfstijl is conversatief, niet academisch
- Elk voorbeeld bevat echte getallen, geen placeholders zoals "X" of "bedrag"
- Doellengte artikel-sectie per pagina: 550 tot 700 woorden totaal
- Nieuwe H2-secties TOEVOEGEN, bestaande NIET verwijderen
- De sectie "Voor wie is deze tool?" VERVANGEN door de versie hieronder (niet uitbreiden)

---

## T-01 — BTW Berekenen

### Vervang "Voor wie is deze tool?"

```html
<ul>
  <li>Je koopt iets voor je bedrijf en de factuur staat inclusief btw.
      Je wilt weten hoeveel je terugkrijgt van de Belastingdienst.</li>
  <li>Je maakt een offerte en moet de prijs exclusief en inclusief btw
      apart vermelden voor je klant.</li>
  <li>Je werkt voor Belgische klanten en twijfelt of het 6% of 21%
      tarief van toepassing is.</li>
  <li>Je controleert een ontvangen factuur en wilt nagaan of het
      btw-bedrag klopt met het tarief dat vermeld staat.</li>
</ul>
```

### Toevoegen: H2 "Hoe bereken je btw?"

```html
<h2>Hoe bereken je btw?</h2>
<p>De formule hangt af van wat je weet: het bedrag inclusief of exclusief btw.</p>

<p><strong>Btw berekenen (erbij):</strong><br>
bedrag excl. btw x (1 + tarief) = bedrag incl. btw<br>
Voorbeeld: € 100 x 1,21 = € 121 bij 21% btw</p>

<p><strong>Btw terugrekenen (eraf):</strong><br>
bedrag incl. btw / (1 + tarief) = bedrag excl. btw<br>
Voorbeeld: € 121 / 1,21 = € 100 bij 21% btw</p>

<p>Het btw-bedrag zelf is het verschil: € 121 - € 100 = € 21.
Voor 9% btw werkt het op dezelfde manier. Een product van € 50 exclusief btw
kost dan € 50 x 1,09 = € 54,50 inclusief btw.</p>
```

### Toevoegen: H2 "Btw-tarieven Nederland en Belgie"

```html
<h2>Btw-tarieven Nederland en Belgie</h2>
<table class="tarief-tabel">
  <thead>
    <tr>
      <th>Land</th>
      <th>Tarief</th>
      <th>Van toepassing op</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nederland</td>
      <td>21% (hoog)</td>
      <td>Meeste producten en diensten</td>
    </tr>
    <tr>
      <td>Nederland</td>
      <td>9% (laag)</td>
      <td>Voedsel, boeken, geneesmiddelen, kapper</td>
    </tr>
    <tr>
      <td>Nederland</td>
      <td>0%</td>
      <td>Export, vrijgestelde diensten</td>
    </tr>
    <tr>
      <td>Belgie</td>
      <td>21% (normaal)</td>
      <td>Meeste producten en diensten</td>
    </tr>
    <tr>
      <td>Belgie</td>
      <td>6% (verlaagd)</td>
      <td>Voedsel, boeken, geneesmiddelen, renovatie</td>
    </tr>
    <tr>
      <td>Belgie</td>
      <td>0%</td>
      <td>Export, medische hulpmiddelen</td>
    </tr>
  </tbody>
</table>
```

### CSS tarief-tabel — toevoegen aan `<style>`

```css
.tarief-tabel {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  margin: var(--space-md) 0;
}
.tarief-tabel th {
  text-align: left;
  padding: 8px 12px;
  background: var(--bg-input);
  color: var(--text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid var(--border);
}
.tarief-tabel td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
}
.tarief-tabel tr:last-child td {
  border-bottom: none;
}
```

---

## T-02 — Procenten Berekenen

### Vervang "Voor wie is deze tool?"

```html
<ul>
  <li>Je salaris gaat met 4% omhoog en je wilt weten hoeveel dat in
      euro's is per maand.</li>
  <li>Je ziet twee aanbiedingen: 30% korting op € 89 of € 25 directe
      korting op € 79. Je wilt weten welke goedkoper uitkomt.</li>
  <li>Je rapporteert omzetcijfers en moet het procentuele verschil
      uitrekenen tussen dit kwartaal en vorig kwartaal.</li>
  <li>Je studeert en wilt weten welk percentage van de vragen je goed
      had op een toets van 40 vragen.</li>
</ul>
```

### Toevoegen: H2 "De 5 procentformules"

```html
<h2>De 5 procentformules</h2>

<p><strong>1. Percentage van een getal</strong><br>
Formule: getal x (percentage / 100)<br>
Voorbeeld: 15% van 200 = 200 x 0,15 = 30</p>

<p><strong>2. Wat percentage is X van Y?</strong><br>
Formule: (deel / geheel) x 100<br>
Voorbeeld: 30 van 200 = (30 / 200) x 100 = 15%</p>

<p><strong>3. Procentuele stijging of daling</strong><br>
Formule: ((nieuw - oud) / oud) x 100<br>
Voorbeeld: van 80 naar 100 = ((100 - 80) / 80) x 100 = 25% stijging</p>

<p><strong>4. Getal verhogen met een percentage</strong><br>
Formule: getal x (1 + percentage / 100)<br>
Voorbeeld: 200 + 15% = 200 x 1,15 = 230</p>

<p><strong>5. Getal verlagen met een percentage</strong><br>
Formule: getal x (1 - percentage / 100)<br>
Voorbeeld: 200 - 15% = 200 x 0,85 = 170</p>
```

---

## T-03 — Korting Berekenen

### Vervang "Voor wie is deze tool?"

```html
<ul>
  <li>Je ziet "40% korting" bij een jas van € 129 en wilt snel weten
      wat je werkelijk betaalt.</li>
  <li>Je verkoopt tweedehands spullen en wil de prijs met een percentage
      verlagen, maar weet niet hoeveel dat in euro's is.</li>
  <li>Je zag een product eerder voor € 95 en nu voor € 67. Je wilt
      weten hoeveel procent korting dat eigenlijk is.</li>
  <li>Je weet de kortingsprijs en het percentage, maar niet de originele
      prijs. Bijvoorbeeld: € 54 na 10% korting.</li>
</ul>
```

### Toevoegen: H2 "Drie manieren om korting te berekenen"

```html
<h2>Drie manieren om korting te berekenen</h2>

<p><strong>1. Prijs na korting berekenen</strong><br>
Je weet de originele prijs en het kortingspercentage.<br>
Formule: prijs x (1 - korting / 100)<br>
Voorbeeld: € 80 met 25% korting = € 80 x 0,75 = € 60</p>

<p><strong>2. Kortingspercentage berekenen</strong><br>
Je weet de oude en nieuwe prijs.<br>
Formule: ((oud - nieuw) / oud) x 100<br>
Voorbeeld: van € 80 naar € 60 = ((80 - 60) / 80) x 100 = 25%</p>

<p><strong>3. Originele prijs terugrekenen</strong><br>
Je kent de prijs na korting en het percentage.<br>
Formule: prijs na korting / (1 - korting / 100)<br>
Voorbeeld: € 60 bij 25% korting was € 60 / 0,75 = € 80</p>
```

---

## T-07 — Uurloon Berekenen

### Vervang "Voor wie is deze tool?"

```html
<ul>
  <li>Je vergelijkt twee jobaanbiedingen: de ene vermeldt een
      maandsalaris, de andere een uurloon. Je wilt ze op dezelfde
      basis vergelijken.</li>
  <li>Je gaat als zzp'er aan de slag en wilt weten welk uurtarief je
      minimaal moet rekenen om hetzelfde te verdienen als in loondienst.</li>
  <li>Je werkt parttime en je werkgever wil het uurtarief omrekenen
      naar een fulltime equivalent voor een salarisvoorstel.</li>
  <li>Je factureert uren en wilt controleren of je maandelijkse opbrengst
      overeenkomt met het gewenste jaarsalaris.</li>
</ul>
```

### Toevoegen: H2 "Hoe bereken je je uurloon?"

```html
<h2>Hoe bereken je je uurloon?</h2>
<p>Het uurloon bereken je vanuit je bruto maandsalaris en het aantal uren
per week. Nederland telt 52 weken per jaar.</p>

<p><strong>Maandsalaris naar uurloon:</strong><br>
uurloon = maandsalaris x 12 / (uren per week x 52)<br>
Voorbeeld: € 3.000 per maand bij 40 uur per week<br>
= € 3.000 x 12 / (40 x 52) = € 36.000 / 2.080 = € 17,31 per uur</p>

<p>Wil je vakantiegeld meenemen? Vermenigvuldig het uurloon met 1,08:<br>
€ 17,31 x 1,08 = € 18,69 per uur inclusief 8% vakantiegeld</p>

<p><strong>Uurloon naar maandsalaris:</strong><br>
maandsalaris = uurloon x uren per week x 52 / 12<br>
Voorbeeld: € 17,31 x 40 x 52 / 12 = € 3.000 per maand</p>

<p>Ben je zzp'er? Houd dan rekening met vakantiegeld (8%), vakantiedagen
(7,7%), pensioen (gemiddeld 15%) en arbeidsongeschiktheidsverzekering.
Dat maakt een opslag van 30 tot 40% boven op het loondienst-equivalent.</p>
```

---

## T-08 — Vakantiegeld Berekenen

### Vervang "Voor wie is deze tool?"

```html
<ul>
  <li>Je wilt weten hoeveel vakantiegeld je in mei krijgt en of je
      genoeg hebt voor de vakantie die je op het oog hebt.</li>
  <li>Je bent halverwege het jaar van baan gewisseld en wilt uitrekenen
      hoeveel vakantiegeld je bij je vorige werkgever nog tegoed had.</li>
  <li>Je bent flexwerker en ontvangt vakantiegeld maandelijks. Je wilt
      het jaarlijkse totaal overzien.</li>
  <li>Je werkgever vraagt of je akkoord gaat met maandelijkse uitbetaling
      in plaats van een jaarlijkse uitkering in mei. Je wilt het
      verschil doorrekenen.</li>
</ul>
```

### Toevoegen: H2 "Hoe wordt vakantiegeld berekend?"

```html
<h2>Hoe wordt vakantiegeld berekend?</h2>
<p>Vakantiegeld is wettelijk vastgesteld op minimaal 8% van je bruto
jaarsalaris. De meeste werkgevers betalen het in mei of juni, na een
opbouwjaar van 1 juni tot en met 31 mei.</p>

<p><strong>Formule bruto vakantiegeld:</strong><br>
maandsalaris x aantal maanden x 8%<br>
Voorbeeld: € 2.500 per maand, heel jaar gewerkt<br>
= € 2.500 x 12 x 0,08 = € 2.400 bruto vakantiegeld</p>

<p>Heb je niet het hele jaar bij dezelfde werkgever gewerkt? Stel het
aantal maanden in op het werkelijke aantal. Bij 8 maanden in dienst:<br>
€ 2.500 x 8 x 0,08 = € 1.600 bruto vakantiegeld</p>

<p>De calculator toont het bruto bedrag. Na inhouding van loonbelasting
(het bijzonder tarief, meestal 37 tot 50% afhankelijk van je jaarinkomen)
houd je netto ruwweg 50 tot 65% over.</p>
```

---

## T-09 — Vakantiedagen Berekenen

### Vervang "Voor wie is deze tool?"

```html
<ul>
  <li>Je bent in april in dienst gekomen en wilt weten hoeveel
      vakantiedagen je pro-rata hebt opgebouwd voor eind mei.</li>
  <li>Je werkgever geeft 5 bovenwettelijke dagen. Je wilt het totaal
      per jaar overzien inclusief die extra dagen.</li>
  <li>Je werkt 32 uur per week en wilt weten hoeveel vakantiedagen
      dat in uren en in dagen is.</li>
  <li>Je neemt ontslag en wilt nagaan hoeveel openstaande vakantiedagen
      je werkgever nog moet uitbetalen.</li>
</ul>
```

### Toevoegen: H2 "Hoe worden vakantiedagen berekend?"

```html
<h2>Hoe worden vakantiedagen berekend?</h2>
<p>De wettelijke vakantiedagen zijn 4 keer het aantal uren per werkweek.
Werk je 40 uur per week, dan heb je recht op 4 x 40 = 160 vakantie-uren
per jaar, gelijk aan 20 dagen.</p>

<p><strong>Formule wettelijke vakantiedagen:</strong><br>
4 x (uren per week / 8)<br>
Voorbeeld bij 24 uur per week: 4 x (24 / 8) = 12 vakantiedagen</p>

<p><strong>Pro-rata berekening:</strong><br>
vakantiedagen = totaal x (gewerkte maanden / 12)<br>
Voorbeeld: 20 dagen bij 8 maanden in dienst = 20 x (8/12) = 13,3 dagen</p>

<p>Bovenwettelijke vakantiedagen zijn extra dagen bovenop het wettelijk
minimum. Veel cao's geven 5 tot 10 extra dagen. Gebruik het invoerveld
"Bovenwettelijk" om ze mee te tellen in de berekening.</p>
```

---

## T-10 — Woorden Tellen

### Toevoegen: H2 "Waarvoor gebruik je een woordenteller?"

```html
<h2>Waarvoor gebruik je een woordenteller?</h2>
<p>De meest gebruikte toepassingen zijn essays en scripties met een
minimale of maximale woordlimiet, SEO-teksten waarbij de aanbevolen
lengte voor Google tussen de 800 en 1.200 woorden ligt, en
sollicitatiebrieven waarbij werkgevers soms een maximaal aantal woorden
aangeven.</p>

<p>Leestijd wordt berekend op basis van een gemiddeld leestempo van
200 woorden per minuut. Dat is het tempo van een doorsnee volwassen
lezer. Een tekst van 800 woorden duurt dan 4 minuten om te lezen.</p>

<p>Zinnen telt de tool door te zoeken naar punten, uitroeptekens en
vraagtekens gevolgd door een spatie of het einde van de tekst.
Alineas worden geteld door lege regels. Plak de volledige tekst in
het vak en de tool werkt direct mee terwijl je typt.</p>
```

---

## T-11 — Tekens Tellen

### Toevoegen: H2 "Tekenlimieten per platform in 2026"

```html
<h2>Tekenlimieten per platform in 2026</h2>
<p>Elk platform hanteert eigen limieten. De balkjes in de tool kleuren
automatisch mee: groen onder 80%, oranje van 80 tot 100% en rood als
je de limiet overschrijdt.</p>

<p><strong>X (Twitter):</strong> 280 tekens per bericht. Bij langere
teksten maak je een thread waarbij elk bericht maximaal 280 tekens telt.</p>

<p><strong>Instagram:</strong> bijschriften mogen maximaal 2.200 tekens
bevatten. In de praktijk wordt na 125 tekens afgebroken met "meer lezen",
dus het begin van je tekst is het belangrijkst.</p>

<p><strong>LinkedIn:</strong> posts mogen 3.000 tekens bevatten.
Artikelen op LinkedIn kennen een hogere limiet van 125.000 tekens.</p>

<p><strong>SMS:</strong> een standaard-sms is 160 tekens. Gebruik je
emoji of letters met accenten, dan daalt de limiet naar 70 tekens per
bericht omdat een andere tekencodering wordt gebruikt.</p>

<p><strong>TikTok en Instagram Reels:</strong> beschrijvingen mogen
2.200 tekens bevatten. YouTube-beschrijvingen kennen een limiet van
5.000 tekens.</p>
```

---

## T-12 — Tekst Vergelijken

### Toevoegen: H2 "Hoe werkt de tekstvergelijker?"

```html
<h2>Hoe werkt de tekstvergelijker?</h2>
<p>Plak de originele tekst links en de aangepaste tekst rechts. Klik op
"Vergelijk" en de tool markeert woord voor woord wat er veranderd is.
Verwijderde woorden staan rood met een streep erdoorheen. Nieuwe woorden
staan groen met een onderlijn.</p>

<p>De vergelijking werkt op woordniveau, niet op tekenniveau. Een kleine
typfout in een lang woord markeert het hele woord als gewijzigd, niet
alleen het aangepaste teken. Dit geeft een overzichtelijker resultaat
dan een vergelijker die elk teken apart bekijkt.</p>

<p>De "Kopieer" knop maakt een platte-tekst versie met [DEL: woord]
en [ADD: woord] notatie, handig voor redactioneel commentaar in e-mails
of documentbeheer.</p>
```

### Toevoegen: H2 "Wanneer is tekst vergelijken nuttig?"

```html
<h2>Wanneer is tekst vergelijken nuttig?</h2>
<p>Redacteurs en copywriters gebruiken de tool om twee versies van een
tekst naast elkaar te leggen na revisie. Juridische en zakelijke teams
vergelijken conceptversies van contracten of offertes. Studenten
controleren of een bewerkte versie voldoende afwijkt van een eerder
ingeleverde versie. Vertalers vergelijken twee taalversies op structuur
en volledigheid.</p>
```

---

## T-13 — Minimumloon Berekenen

### Toevoegen: H2 "Hoe wordt het minimumloon berekend?"

```html
<h2>Hoe wordt het minimumloon berekend?</h2>
<p>Het wettelijk minimumloon is vastgesteld per uur: € 13,68 vanaf
1 januari 2026. Alle andere bedragen worden hiervan afgeleid.</p>

<p>Per dag bij 8 uur werken: € 13,68 x 8 = € 109,44<br>
Per week bij 40 uur per week: € 13,68 x 40 = € 547,20<br>
Per maand bij 40 uur per week: € 13,68 x 40 x 52 / 12 = € 2.371,20</p>

<p>Werk je minder uren? Het minimumloon geldt per uur. Bij 32 uur per week:<br>
€ 13,68 x 32 x 52 / 12 = € 1.896,96 per maand</p>

<p>Het minimumloon wordt elk jaar op 1 januari en 1 juli aangepast
aan de ontwikkeling van de contractlonen. De bedragen op deze pagina
zijn geldig vanaf 1 januari 2026. <span class="badge-updated">Bijgewerkt: januari 2026</span></p>
```

### Toevoegen: H2 "Minimumloon en leeftijd"

```html
<h2>Minimumloon en leeftijd</h2>
<p>Jongeren van 15 tot en met 20 jaar ontvangen een percentage van het
volwassen minimumloon. Zodra je 21 jaar wordt, heb je recht op het
volledige minimumloon van € 13,68 per uur. De percentages per leeftijd
staan in de tabel in de tool.</p>

<p>Controleer altijd of je de juiste cao-schaal krijgt als je minimumloon
de ondergrens vormt. Sommige cao's kennen een hoger minimum dan het
wettelijk minimumloon. Twijfel je? Controleer dan op de website van
je vakbond of via rijksoverheid.nl.</p>
```

---

## T-14 — Willekeurig Getal

### Toevoegen: H2 "Hoe willekeurig zijn de getallen?"

```html
<h2>Hoe willekeurig zijn de getallen?</h2>
<p>De generator gebruikt de Web Cryptography API van je browser via
<code>crypto.getRandomValues()</code>. Dit is cryptografisch veilig,
beter dan de standaard <code>Math.random()</code> die de meeste andere
online tools gebruiken.</p>

<p><code>Math.random()</code> is een pseudowillekeurige generator.
De reeks getallen is voorspelbaar als je het beginpunt kent. Dat is
prima voor spellen, maar onvoldoende voor loterijen of steekproeven.
<code>crypto.getRandomValues()</code> werkt op basis van echte entropie
vanuit het besturingssysteem en is voor praktische toepassingen
niet te voorspellen.</p>
```

### Toevoegen: H2 "Toepassingen"

```html
<h2>Toepassingen</h2>
<p>De generator wordt veel gebruikt voor het trekken van een willekeurige
winnaar uit een lijst deelnemers, het bepalen van de volgorde van
presentaties of wedstrijden, het simuleren van een dobbelsteen (bereik
1 tot 6) of een muntworp (bereik 1 tot 2), en het selecteren van een
willekeurige steekproef uit een grotere groep.</p>

<p>Heb je een lijst met namen en wil je een willekeurige volgorde bepalen?
Genereer dan voor elk deelnemer een willekeurig getal en sorteer op
die uitkomst. Bij 100 deelnemers kies je een bereik van 1 tot 10.000
om de kans op gelijke getallen klein te houden.</p>
```

---

## T-17 — Wachtwoord Generator

### Toevoegen: H2 "Wat maakt een wachtwoord veilig?"

```html
<h2>Wat maakt een wachtwoord veilig?</h2>
<p>De sterkte van een wachtwoord hangt af van twee factoren: de lengte
en de diversiteit van tekens. Een wachtwoord van 8 tekens met alleen
kleine letters heeft 26 tot de macht 8 mogelijke combinaties, ruim
200 miljard. Een moderne computer kraakt dat in enkele minuten.</p>

<p>Een wachtwoord van 16 tekens met hoofdletters, kleine letters,
cijfers en symbolen heeft meer dan 10 tot de macht 30 mogelijke
combinaties. Zelfs met de snelste computers ter wereld duurt het
kraken dan langer dan de leeftijd van het universum.</p>

<p>Gebruik voor elk account een ander wachtwoord en sla ze op in een
wachtwoordmanager zoals Bitwarden (gratis en open source) of 1Password.
Een wachtwoordmanager onthoudt alle wachtwoorden en vult ze automatisch
in op websites.</p>
```

### Toevoegen: H2 "Privacy: wat gebeurt er met je wachtwoord?"

```html
<h2>Privacy: wat gebeurt er met je wachtwoord?</h2>
<p>Het wachtwoord dat je op deze pagina genereert verlaat nooit je browser.
Er wordt niets naar een server verzonden en niets opgeslagen. Sluit
je de pagina, dan is het wachtwoord weg. Kopieer het direct naar je
wachtwoordmanager zodra je tevreden bent met het resultaat.</p>

<p>Woorden uit het woordenboek zijn onveilig, ook als je letters
vervangt door cijfers. Persoonlijke informatie zoals verjaardagen of
namen maakt een wachtwoord kwetsbaar voor gerichte aanvallen. Hetzelfde
wachtwoord op meerdere sites gebruiken is riskant: een datalek bij
een webshop geeft dan toegang tot al je andere accounts.</p>
```

---

# DEEL 3 — VOLGORDE VAN UITVOERING

Werk de tools af in twee ronden. Niet alles door elkaar.

**Ronde 1 — De 6 calculator-tools (features + content):**
Doe T-01, T-02, T-03, T-07, T-08, T-09 elk volledig af voordat je naar de volgende gaat.
Per tool: features toevoegen, content uitbreiden, lokaal controleren in browser, dan door naar de volgende.

**Ronde 2 — De 6 content-only tools:**
T-10, T-11, T-12, T-13, T-14, T-17. Alleen content toevoegen, geen features.

**Git commits:**
```bash
git checkout -b feature/TASK-018-content-feature-upgrade

# Na ronde 1:
git add btw-berekenen/index.html procenten-berekenen/index.html korting-berekenen/index.html
git commit -m "feat: TASK-018 features + content T-01 T-02 T-03"

git add uurloon-berekenen/index.html vakantiegeld-berekenen/index.html vakantiedagen-berekenen/index.html
git commit -m "feat: TASK-018 features + content T-07 T-08 T-09"

# Na ronde 2:
git add minimumloon-berekenen/index.html woorden-tellen/index.html tekens-tellen/index.html
git commit -m "feat: TASK-018 content T-10 T-11 T-13"

git add tekst-vergelijken/index.html willekeurig-getal/index.html wachtwoord-generator/index.html
git commit -m "feat: TASK-018 content T-12 T-14 T-17"

git push origin feature/TASK-018-content-feature-upgrade
# PR aanmaken, direct mergen naar main
# Wacht op Cloudflare deploy (2-3 minuten)
# Test op live URL's — geen localhost
```

---

# DEEL 4 — RAPPORTAGE

Stuur na afronding een rapport met:

1. Bevestiging welke features geimplementeerd zijn op welke tools
2. Voor Feature B: bevestiging dat elke tool een unieke localStorage-sleutel heeft
3. Voor Feature C: een voorbeeld-URL per tool die werkt
4. Voor Content: bevestiging dat de "Voor wie" sectie vervangen is (niet uitgebreid) op de 6 calculator-tools
5. Screenshot of beschrijving van het formula-blok op T-01 BTW met invoer €100 / 21% excl
6. Eventuele afwijkingen van dit document en waarom

---

# CHECKLIST TEST LIVE (voor Dev)

Gebruik deze checklist na de live deploy. Vul elk item in met PASS of FAIL + eventuele opmerking.

## Feature A — Formula blok

- [ ] T-01 BTW: pageload, formula blok NIET zichtbaar
- [ ] T-01 BTW: invoer €100 / 21% / excl → blok zichtbaar, 2 stappen correct
- [ ] T-01 BTW: stap 1 toont "€ 100,00 x 21%" = "€ 21,00"
- [ ] T-01 BTW: stap 2 toont "€ 100,00 + € 21,00" = "€ 121,00"
- [ ] T-07 Uurloon: 3 stappen zichtbaar bij maand-naar-uur berekening
- [ ] T-09 Vakantiedagen: pro-rata stap klopt bij 8 maanden

## Feature B — Geschiedenis

- [ ] T-02 Procenten: pageload, geschiedenis NIET zichtbaar
- [ ] T-02 Procenten: na 1e berekening, 1 item zichtbaar
- [ ] T-02 Procenten: na 6e berekening, nog steeds maximaal 5 items
- [ ] T-02 Procenten: klik op item, formulier hersteld, recalc() draait
- [ ] T-02 Procenten: knop "Wis" verwijdert alle items
- [ ] T-02 Procenten: hard refresh, geschiedenis nog aanwezig
- [ ] T-01 en T-02 samen open: geschiedenissen interfereren niet

## Feature C — URL deeplink

- [ ] `/btw-berekenen/?bedrag=100&tarief=21&modus=excl` vult formulier in en berekent direct
- [ ] Na wijzigen invoer op T-01: URL update zichtbaar in adresbalk
- [ ] `/vakantiegeld-berekenen/?salaris=2500&maanden=12` werkt correct

## Content

- [ ] T-01 BTW: tarieftabel aanwezig (NL + BE, 3 rijen elk)
- [ ] T-01 BTW: formule "€ 100 x 1,21 = € 121" aanwezig in artikel
- [ ] T-02 Procenten: 5 formules uitgeschreven met voorbeelden
- [ ] T-07 Uurloon: formule met € 3.000 / 40u voorbeeld aanwezig
- [ ] T-08 Vakantiegeld: "bijzonder tarief" uitleg aanwezig
- [ ] T-11 Tekens: SMS 70-tekens limiet bij emoji vermeld
- [ ] T-17 Wachtwoord: vergelijking Math.random vs crypto aanwezig
- [ ] Ctrl+F "—" op elke gewijzigde pagina: 0 resultaten
- [ ] Ctrl+F "..." op elke gewijzigde pagina: 0 resultaten
- [ ] Ctrl+F "Furthermore" op elke gewijzigde pagina: 0 resultaten

## Technisch

- [ ] PageSpeed T-01 BTW mobile: score opgeven [   ]
- [ ] PageSpeed T-07 Uurloon mobile: score opgeven [   ]
- [ ] DevTools console op T-01, T-07, T-09: geen JS-errors
