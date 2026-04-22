# BTW Berekenen Flagship Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework `btw-berekenen` into an intent-first VAT workspace that improves first-screen clarity, keeps the page fast, and preserves existing deeplink/history behavior.

**Architecture:** Keep all production HTML, CSS, and JavaScript inside `btw-berekenen/index.html`, but add a no-dependency smoke test in `tests/` and a manual browser checklist in `docs/checklists/`. Deliver the upgrade in four vertical slices: workspace shell, normalized state/deeplink logic, result workspace/share actions, and support guidance blocks.

**Tech Stack:** HTML5, inline CSS, vanilla JavaScript, Node.js built-in `assert` and `fs` for smoke tests, Python `http.server` for manual local verification.

---

## File Map

- `btw-berekenen/index.html`
  Purpose: production page for the flagship VAT workspace. This file will absorb all HTML, CSS, and JavaScript changes for the new hero intents, mode bar, normalized mode state, result cards, share action, quick examples, invoice helper, and contextual links.

- `tests/btw-berekenen-flagship.spec.js`
  Purpose: no-dependency smoke test that reads `btw-berekenen/index.html` and asserts that required IDs, helper functions, deeplink compatibility markers, and flagship UI blocks exist.

- `docs/checklists/2026-04-22-btw-berekenen-flagship-manual.md`
  Purpose: browser verification checklist for the flagship page, covering the intent shortcuts, NL/BE switching, deeplink compatibility, share link behavior, quick examples, and contextual knowledge links.

## Task 1: Build The Flagship Shell

**Files:**
- Create: `tests/btw-berekenen-flagship.spec.js`
- Modify: `btw-berekenen/index.html:203-229`
- Modify: `btw-berekenen/index.html:689-875`
- Test: `tests/btw-berekenen-flagship.spec.js`

- [ ] **Step 1: Write the failing smoke test for the new workspace shell**

```js
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const html = fs.readFileSync(
  path.join(__dirname, '..', 'btw-berekenen', 'index.html'),
  'utf8'
);

function expectMatch(pattern, message) {
  assert.match(html, pattern, message);
}

expectMatch(/id="intent-add-vat"/, 'Missing hero quick intent button: intent-add-vat');
expectMatch(/id="intent-remove-vat"/, 'Missing hero quick intent button: intent-remove-vat');
expectMatch(/id="intent-invoice-check"/, 'Missing hero quick intent button: intent-invoice-check');
expectMatch(/id="intent-compare-rates"/, 'Missing hero quick intent button: intent-compare-rates');

expectMatch(/id="mode-excl-incl"/, 'Missing mode button: mode-excl-incl');
expectMatch(/id="mode-incl-excl"/, 'Missing mode button: mode-incl-excl');
expectMatch(/id="mode-vat-only"/, 'Missing mode button: mode-vat-only');
expectMatch(/id="mode-compare-rates"/, 'Missing mode button: mode-compare-rates');

expectMatch(/id="btn-share-link-nl"/, 'Missing NL share-link button');
expectMatch(/id="btn-share-link-be"/, 'Missing BE share-link button');

expectMatch(/function setMode\(mode\)/, 'Missing mode switch helper');
expectMatch(/function handleQuickIntent\(intent\)/, 'Missing hero intent handler');

console.log('task 1 smoke checks passed');
```

- [ ] **Step 2: Run the smoke test to confirm it fails on the current page**

Run: `node tests/btw-berekenen-flagship.spec.js`
Expected: FAIL with `Missing hero quick intent button: intent-add-vat`

- [ ] **Step 3: Add the hero quick intents, the mode bar shell, and the share button actions**

```html
<div class="hero">
  <nav aria-label="Breadcrumb">
    <a href="/">Thuis</a> &rsaquo; <span>BTW Berekenen</span>
  </nav>
  <h1>BTW Berekenen voor Nederland en Belgie</h1>
  <span class="badge-updated">Bijgewerkt: januari 2026</span>
  <p class="hero-summary">
    Bereken btw sneller met duidelijke modi voor toevoegen, terugrekenen,
    factuurcontrole en tariefvergelijking.
  </p>
  <div class="hero-intents" aria-label="Snelle acties">
    <button id="intent-add-vat" class="hero-intent" onclick="handleQuickIntent('add-vat')">BTW erbij rekenen</button>
    <button id="intent-remove-vat" class="hero-intent" onclick="handleQuickIntent('remove-vat')">BTW eruit rekenen</button>
    <button id="intent-invoice-check" class="hero-intent" onclick="handleQuickIntent('invoice-check')">Factuur checken</button>
    <button id="intent-compare-rates" class="hero-intent" onclick="handleQuickIntent('compare-rates')">NL of BE vergelijken</button>
  </div>
</div>

<section class="tool-card" aria-label="BTW Berekenen">
  <div class="mode-bar" role="tablist" aria-label="BTW-modus">
    <button id="mode-excl-incl" class="mode-btn active" data-mode="excl-incl" onclick="setMode('excl-incl')">Excl -&gt; Incl</button>
    <button id="mode-incl-excl" class="mode-btn" data-mode="incl-excl" onclick="setMode('incl-excl')">Incl -&gt; Excl</button>
    <button id="mode-vat-only" class="mode-btn" data-mode="vat-only" onclick="setMode('vat-only')">Alleen btw-bedrag</button>
    <button id="mode-compare-rates" class="mode-btn" data-mode="compare-rates" onclick="setMode('compare-rates')">Tarieven vergelijken</button>
  </div>
```

```html
<div class="result-actions" id="result-actions-nl">
  <button class="btn-copy" id="btn-copy-primary-nl" onclick="copyVal('res-incl-nl')">Kopieer resultaat</button>
  <button class="btn-share" id="btn-share-link-nl" hidden onclick="deelLink('nl')">Deel link</button>
  <button class="btn-kopieer-alles" id="btn-kopieer-alles-nl" hidden onclick="kopieerAlles('nl')">
    <span id="btn-kopieer-alles-tekst-nl">Kopieer alles</span>
  </button>
</div>

<div class="result-actions" id="result-actions-be">
  <button class="btn-copy" id="btn-copy-primary-be" onclick="copyVal('res-incl-be')">Kopieer resultaat</button>
  <button class="btn-share" id="btn-share-link-be" hidden onclick="deelLink('be')">Deel link</button>
  <button class="btn-kopieer-alles" id="btn-kopieer-alles-be" hidden onclick="kopieerAlles('be')">
    <span id="btn-kopieer-alles-tekst-be">Kopieer alles</span>
  </button>
</div>
```

```css
.hero-summary {
  color: var(--text-secondary);
  margin-top: 8px;
  font-size: 1rem;
}

.hero-intents {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: var(--space-md);
}

.hero-intent,
.mode-btn,
.btn-share {
  border: 1px solid var(--border);
  background: var(--bg-input);
  color: var(--text-primary);
  border-radius: 999px;
  padding: 9px 14px;
  font-size: 0.9rem;
  transition: border-color var(--transition), color var(--transition), background var(--transition);
}

.mode-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--space-md);
}

.mode-btn.active,
.hero-intent:hover,
.mode-btn:hover,
.btn-share:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

```javascript
var actieveLand = 'nl';
var actieveMode = 'excl-incl';

function applyModeUi(mode) {
  actieveMode = mode;
  document.querySelectorAll('.mode-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
  });
}

function syncShellModeToLegacyControls(land, mode) {
  var dir = document.getElementById('dir-' + land);
  if (!dir) return;
  dir.checked = mode === 'incl-excl';
}

function setMode(mode) {
  applyModeUi(mode);
  syncShellModeToLegacyControls(actieveLand, mode === 'vat-only' ? 'excl-incl' : mode === 'compare-rates' ? 'excl-incl' : mode);
  recalc(actieveLand);
  var amountEl = document.getElementById('amount-' + actieveLand);
  if (amountEl) amountEl.focus();
}

function handleQuickIntent(intent) {
  if (intent === 'add-vat') setMode('excl-incl');
  if (intent === 'remove-vat') setMode('incl-excl');
  if (intent === 'invoice-check') setMode('incl-excl');
  if (intent === 'compare-rates') setMode('compare-rates');
}

function switchTab(land) {
  actieveLand = land;
  ['nl', 'be'].forEach(function(l) {
    document.getElementById('tab-' + l).classList.toggle('active', l === land);
    document.getElementById('tab-' + l).setAttribute('aria-selected', l === land);
    document.getElementById('panel-' + l).classList.toggle('active', l === land);
  });
}

function deelLink(land) {
  navigator.clipboard.writeText(window.location.href).then(function() {
    var knop = document.getElementById('btn-share-link-' + land);
    if (!knop) return;
    var oudeTekst = knop.textContent;
    knop.textContent = 'Link gekopieerd';
    setTimeout(function() {
      knop.textContent = oudeTekst;
    }, 1800);
  });
}
```

- [ ] **Step 4: Run the smoke test again and confirm the shell passes**

Run: `node tests/btw-berekenen-flagship.spec.js`
Expected: PASS and print `task 1 smoke checks passed`

- [ ] **Step 5: Commit the shell slice**

```bash
git add btw-berekenen/index.html tests/btw-berekenen-flagship.spec.js
git commit -m "feat: add btw flagship workspace shell"
```

## Task 2: Normalize Mode State, NL/BE Sync, And Deeplinks

**Files:**
- Modify: `btw-berekenen/index.html:1169-1438`
- Modify: `tests/btw-berekenen-flagship.spec.js`
- Test: `tests/btw-berekenen-flagship.spec.js`

- [ ] **Step 1: Extend the smoke test so it fails until the new mode state and deeplink compatibility exist**

```js
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const html = fs.readFileSync(
  path.join(__dirname, '..', 'btw-berekenen', 'index.html'),
  'utf8'
);

function expectMatch(pattern, message) {
  assert.match(html, pattern, message);
}

expectMatch(/function getModeFromUi\(\)/, 'Missing getModeFromUi helper');
expectMatch(/function bepaalModeVanParams\(params\)/, 'Missing URL-to-mode compatibility helper');
expectMatch(/function syncLandState\(vanLand, naarLand\)/, 'Missing NL\/BE state sync helper');

expectMatch(/params\.get\('mode'\)/, 'Missing modern mode query reader');
expectMatch(/params\.get\('modus'\)/, 'Missing legacy modus query reader');
expectMatch(/params\.set\('mode', mode\)/, 'Missing modern mode query writer');
expectMatch(/params\.set\('modus',/, 'Missing legacy modus compatibility writer');

expectMatch(/velden\.mode \|\|/, 'Missing history restore fallback for old saved entries');

console.log('task 2 smoke checks passed');
```

- [ ] **Step 2: Run the smoke test to confirm it fails before the state refactor**

Run: `node tests/btw-berekenen-flagship.spec.js`
Expected: FAIL with `Missing getModeFromUi helper`

- [ ] **Step 3: Refactor the page state around `land`, `mode`, `rate`, and `amount`**

```javascript
function getModeFromUi() {
  var actieveKnop = document.querySelector('.mode-btn.active');
  return actieveKnop ? actieveKnop.getAttribute('data-mode') : 'excl-incl';
}

function modeNaarRichting(mode) {
  return mode === 'incl-excl';
}

function bepaalModeVanParams(params) {
  var mode = params.get('mode');
  if (mode) return mode;

  var legacyModus = params.get('modus');
  if (legacyModus === 'incl') return 'incl-excl';
  if (legacyModus === 'excl') return 'excl-incl';

  return 'excl-incl';
}

function syncLandState(vanLand, naarLand) {
  var bronAmount = document.getElementById('amount-' + vanLand).value;
  var bronRate = document.getElementById('rate-' + vanLand).value;
  var doelRate = document.getElementById('rate-' + naarLand);

  document.getElementById('amount-' + naarLand).value = bronAmount;

  var rateBestaat = Array.prototype.some.call(doelRate.options, function(option) {
    return option.value === bronRate;
  });

  if (rateBestaat) {
    doelRate.value = bronRate;
  }
}
```

```javascript
function switchTab(land) {
  var vorigLand = actieveLand;
  if (vorigLand && vorigLand !== land) {
    syncLandState(vorigLand, land);
  }

  actieveLand = land;

  ['nl', 'be'].forEach(function(l) {
    document.getElementById('tab-' + l).classList.toggle('active', l === land);
    document.getElementById('tab-' + l).setAttribute('aria-selected', l === land);
    document.getElementById('panel-' + l).classList.toggle('active', l === land);
  });

  applyModeUi(actieveMode);
  recalc(land);
}
```

```javascript
function recalc(land) {
  actieveLand = land;

  var amountEl = document.getElementById('amount-' + land);
  var rateEl = document.getElementById('rate-' + land);
  var raw = amountEl ? amountEl.value.trim() : '';
  var amt = parseNL(raw);
  var pct = parseFloat(rateEl.value);
  var mode = getModeFromUi();
  var incl = modeNaarRichting(mode);

  var lbl = document.getElementById('amount-label-' + land);
  if (lbl) lbl.textContent = incl ? 'Bedrag inclusief btw' : 'Bedrag exclusief btw';

  if (!raw || isNaN(amt) || amt <= 0) {
    setResults(land, null, mode);
    showActionButtons(land, false);
    if (land === 'nl') document.getElementById('vergelijk-blok').hidden = true;
    document.getElementById('formula-blok').style.display = 'none';
    return;
  }

  var r = incl ? calcExcl(amt, pct) : calcIncl(amt, pct);
  setResults(land, r, mode);
  updateUrl(land, raw, pct, mode);
  slaGeschiedenisOp(
    raw + ' (' + Math.round(pct * 100) + '%, ' + mode + ')',
    mode === 'incl-excl' ? 'excl: ' + fmtEUR.format(r.excl) : 'incl: ' + fmtEUR.format(r.incl),
    { bedrag: raw, tarief: rateEl.value, mode: mode, modus: incl ? 'incl' : 'excl', land: land }
  );
}
```

```javascript
function leesUrlParams() {
  var params = new URLSearchParams(window.location.search);
  var land = params.get('land') || 'nl';
  var mode = bepaalModeVanParams(params);

  applyModeUi(mode);
  if (land === 'be') switchTab('be');

  if (params.get('bedrag')) {
    document.getElementById('amount-' + land).value = params.get('bedrag');
  }

  if (params.get('tarief')) {
    var t = parseFloat(params.get('tarief')) / 100;
    var sel = document.getElementById('rate-' + land);
    for (var i = 0; i < sel.options.length; i++) {
      if (parseFloat(sel.options[i].value).toFixed(2) === t.toFixed(2)) {
        sel.selectedIndex = i;
        break;
      }
    }
  }

  if (params.get('bedrag')) recalc(land);
}

function updateUrl(land, bedrag, pct, mode) {
  var params = new URLSearchParams();
  params.set('bedrag', bedrag);
  params.set('tarief', Math.round(pct * 100));
  params.set('mode', mode);
  params.set('modus', mode === 'incl-excl' ? 'incl' : 'excl');
  if (land === 'be') params.set('land', 'be');
  history.replaceState(null, '', '?' + params.toString());
}

function herstelFormulier(velden) {
  var land = velden.land || 'nl';
  if (land === 'be') switchTab('be');
  document.getElementById('amount-' + land).value = velden.bedrag || '';
  document.getElementById('rate-' + land).value = velden.tarief || '0.21';
  applyModeUi(velden.mode || (velden.modus === 'incl' ? 'incl-excl' : 'excl-incl'));
  recalc(land);
}
```

- [ ] **Step 4: Run the smoke test again and confirm the state/deeplink slice passes**

Run: `node tests/btw-berekenen-flagship.spec.js`
Expected: PASS and print `task 2 smoke checks passed`

- [ ] **Step 5: Commit the state and deeplink slice**

```bash
git add btw-berekenen/index.html tests/btw-berekenen-flagship.spec.js
git commit -m "refactor: normalize btw flagship mode state"
```

## Task 3: Upgrade The Result Workspace And Share Flow

**Files:**
- Modify: `btw-berekenen/index.html:222-600`
- Modify: `btw-berekenen/index.html:749-855`
- Modify: `btw-berekenen/index.html:1226-1466`
- Modify: `tests/btw-berekenen-flagship.spec.js`
- Test: `tests/btw-berekenen-flagship.spec.js`

- [ ] **Step 1: Extend the smoke test so it fails until the new result workspace exists**

```js
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const html = fs.readFileSync(
  path.join(__dirname, '..', 'btw-berekenen', 'index.html'),
  'utf8'
);

function expectMatch(pattern, message) {
  assert.match(html, pattern, message);
}

expectMatch(/id="result-primary-nl"/, 'Missing NL primary result node');
expectMatch(/id="result-primary-be"/, 'Missing BE primary result node');
expectMatch(/id="card-excl-nl"/, 'Missing NL excl card');
expectMatch(/id="card-btw-nl"/, 'Missing NL btw card');
expectMatch(/id="card-incl-nl"/, 'Missing NL incl card');
expectMatch(/id="btn-share-link-nl"/, 'Missing NL share action');
expectMatch(/function deelLink\(land\)/, 'Missing share helper');
expectMatch(/function getPrimaryValueForMode\(mode, result\)/, 'Missing mode-aware primary result helper');

console.log('task 3 smoke checks passed');
```

- [ ] **Step 2: Run the smoke test to confirm it fails before the result refactor**

Run: `node tests/btw-berekenen-flagship.spec.js`
Expected: FAIL with `Missing NL primary result node`

- [ ] **Step 3: Replace the line-based result layout with a primary result and three breakdown cards**

```html
<div class="result-box" id="result-nl" data-tool-naam="BTW Berekenen">
  <div class="result-label" id="result-label-nl">Totaal inclusief btw</div>
  <div class="result-main empty" id="result-primary-nl">--</div>

  <div class="result-cards" id="result-cards-nl">
    <div class="result-card">
      <span class="result-card-label">Excl. btw</span>
      <strong class="result-card-value" id="card-excl-nl">--</strong>
    </div>
    <div class="result-card">
      <span class="result-card-label">BTW</span>
      <strong class="result-card-value" id="card-btw-nl">--</strong>
    </div>
    <div class="result-card">
      <span class="result-card-label">Incl. btw</span>
      <strong class="result-card-value" id="card-incl-nl">--</strong>
    </div>
  </div>

  <div class="result-actions" id="result-actions-nl">
    <button class="btn-copy" id="btn-copy-primary-nl" onclick="copyVal('result-primary-nl')">Kopieer resultaat</button>
    <button class="btn-share" id="btn-share-link-nl" hidden onclick="deelLink('nl')">Deel link</button>
    <button class="btn-kopieer-alles" id="btn-kopieer-alles-nl" hidden onclick="kopieerAlles('nl')">
      <span id="btn-kopieer-alles-tekst-nl">Kopieer alles</span>
    </button>
  </div>
</div>

<div class="result-box" id="result-be" data-tool-naam="BTW Berekenen">
  <div class="result-label" id="result-label-be">Totaal inclusief btw</div>
  <div class="result-main empty" id="result-primary-be">--</div>

  <div class="result-cards" id="result-cards-be">
    <div class="result-card">
      <span class="result-card-label">Excl. btw</span>
      <strong class="result-card-value" id="card-excl-be">--</strong>
    </div>
    <div class="result-card">
      <span class="result-card-label">BTW</span>
      <strong class="result-card-value" id="card-btw-be">--</strong>
    </div>
    <div class="result-card">
      <span class="result-card-label">Incl. btw</span>
      <strong class="result-card-value" id="card-incl-be">--</strong>
    </div>
  </div>

  <div class="result-actions" id="result-actions-be">
    <button class="btn-copy" id="btn-copy-primary-be" onclick="copyVal('result-primary-be')">Kopieer resultaat</button>
    <button class="btn-share" id="btn-share-link-be" hidden onclick="deelLink('be')">Deel link</button>
    <button class="btn-kopieer-alles" id="btn-kopieer-alles-be" hidden onclick="kopieerAlles('be')">
      <span id="btn-kopieer-alles-tekst-be">Kopieer alles</span>
    </button>
  </div>
</div>
```

```css
.result-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: var(--space-md);
}

.result-card {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
}

.result-card-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

.result-card-value {
  display: block;
  margin-top: 6px;
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-primary);
}

@media (max-width: 640px) {
  .result-cards {
    grid-template-columns: 1fr;
  }
}
```

```javascript
function getPrimaryValueForMode(mode, result) {
  if (mode === 'incl-excl') return result.excl;
  if (mode === 'vat-only') return result.btw;
  return result.incl;
}

function getPrimaryLabelForMode(mode) {
  if (mode === 'incl-excl') return 'Totaal exclusief btw';
  if (mode === 'vat-only') return 'BTW-bedrag';
  return 'Totaal inclusief btw';
}

function setResults(land, result, mode) {
  var labelEl = document.getElementById('result-label-' + land);
  var primaryEl = document.getElementById('result-primary-' + land);
  var exclEl = document.getElementById('card-excl-' + land);
  var btwEl = document.getElementById('card-btw-' + land);
  var inclEl = document.getElementById('card-incl-' + land);

  if (!result) {
    labelEl.textContent = getPrimaryLabelForMode(mode || getModeFromUi());
    primaryEl.textContent = '--';
    primaryEl.classList.add('empty');
    exclEl.textContent = '--';
    btwEl.textContent = '--';
    inclEl.textContent = '--';
    return;
  }

  labelEl.textContent = getPrimaryLabelForMode(mode);
  primaryEl.classList.remove('empty');
  primaryEl.textContent = fmtEUR.format(getPrimaryValueForMode(mode, result));
  exclEl.textContent = fmtEUR.format(result.excl);
  btwEl.textContent = fmtEUR.format(result.btw);
  inclEl.textContent = fmtEUR.format(result.incl);
}

function showActionButtons(land, show) {
  var share = document.getElementById('btn-share-link-' + land);
  var copy = document.getElementById('btn-kopieer-alles-' + land);
  if (share) share.hidden = !show;
  if (copy) copy.hidden = !show;
}
```

- [ ] **Step 4: Run the smoke test again and confirm the result workspace passes**

Run: `node tests/btw-berekenen-flagship.spec.js`
Expected: PASS and print `task 3 smoke checks passed`

- [ ] **Step 5: Commit the result workspace slice**

```bash
git add btw-berekenen/index.html tests/btw-berekenen-flagship.spec.js
git commit -m "feat: upgrade btw flagship result workspace"
```

## Task 4: Add Examples, Invoice Framing, Context Links, And Manual Verification

**Files:**
- Create: `docs/checklists/2026-04-22-btw-berekenen-flagship-manual.md`
- Modify: `btw-berekenen/index.html:689-940`
- Modify: `btw-berekenen/index.html:859-940`
- Modify: `btw-berekenen/index.html:1304-1469`
- Modify: `tests/btw-berekenen-flagship.spec.js`
- Test: `tests/btw-berekenen-flagship.spec.js`

- [ ] **Step 1: Extend the smoke test so it fails until the support blocks and knowledge links exist**

```js
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const html = fs.readFileSync(
  path.join(__dirname, '..', 'btw-berekenen', 'index.html'),
  'utf8'
);

function expectMatch(pattern, message) {
  assert.match(html, pattern, message);
}

expectMatch(/id="quick-example-100-21"/, 'Missing quick example: quick-example-100-21');
expectMatch(/id="quick-example-250-9"/, 'Missing quick example: quick-example-250-9');
expectMatch(/id="quick-example-100-incl-21"/, 'Missing quick example: quick-example-100-incl-21');
expectMatch(/id="quick-example-100-be-6"/, 'Missing quick example: quick-example-100-be-6');

expectMatch(/id="invoice-check-helper"/, 'Missing invoice check helper block');
expectMatch(/id="context-links"/, 'Missing contextual knowledge links block');

expectMatch(/function applyQuickExample\(example\)/, 'Missing quick example helper');
expectMatch(/function renderInvoiceHelper\(mode\)/, 'Missing invoice helper renderer');
expectMatch(/function renderContextLinks\(mode, land, pct\)/, 'Missing contextual links renderer');

expectMatch(/\/kennisbank\/wat-is-btw\//, 'Missing contextual link target: wat-is-btw');
expectMatch(/\/kennisbank\/factuur-zzp\//, 'Missing contextual link target: factuur-zzp');
expectMatch(/\/kennisbank\/btw-aangifte-zzp\//, 'Missing contextual link target: btw-aangifte-zzp');

console.log('task 4 smoke checks passed');
```

- [ ] **Step 2: Run the smoke test to confirm it fails before the support blocks are added**

Run: `node tests/btw-berekenen-flagship.spec.js`
Expected: FAIL with `Missing quick example: quick-example-100-21`

- [ ] **Step 3: Add quick examples, invoice helper, contextual links, and update the lead copy**

```html
<div class="quick-examples" id="quick-examples" aria-label="Veelgebruikte voorbeelden">
  <button id="quick-example-100-21" class="quick-example" onclick="applyQuickExample({ land: 'nl', mode: 'excl-incl', amount: '100', rate: '0.21' })">100 euro @ 21%</button>
  <button id="quick-example-250-9" class="quick-example" onclick="applyQuickExample({ land: 'nl', mode: 'excl-incl', amount: '250', rate: '0.09' })">250 euro @ 9%</button>
  <button id="quick-example-100-incl-21" class="quick-example" onclick="applyQuickExample({ land: 'nl', mode: 'incl-excl', amount: '100', rate: '0.21' })">100 euro incl. 21%</button>
  <button id="quick-example-100-be-6" class="quick-example" onclick="applyQuickExample({ land: 'be', mode: 'excl-incl', amount: '100', rate: '0.06' })">100 euro BE @ 6%</button>
</div>

<div class="invoice-check-helper" id="invoice-check-helper" hidden>
  <p class="invoice-check-title">Factuur checken</p>
  <p id="invoice-check-copy">
    Vul het totaalbedrag inclusief btw in om te controleren of de exclusieve prijs en het btw-bedrag kloppen.
  </p>
</div>

<div class="context-links" id="context-links" hidden></div>
```

```html
<p>Gebruik een van de snelle acties hierboven als je btw wilt toevoegen, terugrekenen, een factuur wilt controleren of Nederlandse en Belgische tarieven wilt vergelijken.</p>
<p>De modus bepaalt welke uitkomst bovenaan staat. Je ziet daarnaast altijd het exclusieve bedrag, het btw-bedrag en het inclusieve totaal in aparte resultaatkaarten.</p>
```

```css
.quick-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--space-md);
}

.quick-example {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 0.85rem;
}

.quick-example:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.invoice-check-helper,
.context-links {
  margin-top: var(--space-md);
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-md);
}
```

```javascript
var CONTEXT_LINK_CONFIG = {
  'excl-incl': [
    { href: '/kennisbank/wat-is-btw/', label: 'Wat is btw en hoe werkt het?' },
    { href: '/kennisbank/btw-aangifte-zzp/', label: 'Btw-aangifte doen als zzp\'er' }
  ],
  'incl-excl': [
    { href: '/kennisbank/factuur-zzp/', label: 'Factuur maken als zzp\'er' },
    { href: '/kennisbank/wat-is-btw/', label: 'Wat is btw en hoe werkt het?' }
  ],
  'compare-rates': [
    { href: '/kennisbank/wat-is-btw/', label: 'Wat is btw en hoe werkt het?' },
    { href: '/kennisbank/btw-op-eten-en-drinken/', label: 'BTW op eten en drinken: welk tarief geldt wanneer?' }
  ]
};

function applyQuickExample(example) {
  if (example.land === 'be') switchTab('be');
  if (example.land === 'nl') switchTab('nl');

  applyModeUi(example.mode);
  actieveLand = example.land;
  document.getElementById('amount-' + example.land).value = example.amount;
  document.getElementById('rate-' + example.land).value = example.rate;
  recalc(example.land);
}

function renderInvoiceHelper(mode) {
  var wrap = document.getElementById('invoice-check-helper');
  var copy = document.getElementById('invoice-check-copy');
  var zichtbaar = mode === 'incl-excl';
  wrap.hidden = !zichtbaar;
  if (!zichtbaar) return;
  copy.textContent = 'Vul het totaalbedrag inclusief btw in om te controleren of de exclusieve prijs en het btw-bedrag kloppen.';
}

function renderContextLinks(mode, land, pct) {
  var wrap = document.getElementById('context-links');
  var items = CONTEXT_LINK_CONFIG[mode] || CONTEXT_LINK_CONFIG['excl-incl'];

  if (land === 'be' && pct === 0.06) {
    items = [
      { href: '/kennisbank/wat-is-btw/', label: 'Wat is btw en hoe werkt het?' },
      { href: '/kennisbank/btw-op-eten-en-drinken/', label: 'BTW op eten en drinken: welk tarief geldt wanneer?' }
    ];
  }

  wrap.innerHTML = '<p class="context-links-title">Meer weten?</p>' + items.map(function(item) {
    return '<a class="context-link" href="' + item.href + '">' + item.label + '</a>';
  }).join('');
  wrap.hidden = false;
}
```

```javascript
// Add this near the end of recalc(), after setResults(...) and before the function returns.
if (!raw || isNaN(amt) || amt <= 0) {
  document.getElementById('invoice-check-helper').hidden = true;
  document.getElementById('context-links').hidden = true;
  return;
}

renderInvoiceHelper(mode);
renderContextLinks(mode, land, pct);
```

- [ ] **Step 4: Write the manual browser checklist file**

```md
# BTW Berekenen Flagship Manual Checklist

- [ ] Quick intent `BTW erbij rekenen` activates `Excl -> Incl`
- [ ] Quick intent `BTW eruit rekenen` activates `Incl -> Excl`
- [ ] Quick intent `Factuur checken` activates `Incl -> Excl` and shows the invoice helper
- [ ] Quick intent `NL of BE vergelijken` activates `Tarieven vergelijken`
- [ ] Switching from NL to BE keeps the typed amount
- [ ] `?bedrag=121&tarief=21&modus=incl` restores the `Incl -> Excl` flow
- [ ] `?bedrag=100&tarief=21&mode=compare-rates` restores the comparison mode
- [ ] `Deel link` copies the current page URL with `mode=` in the query string
- [ ] Quick example `100 euro BE @ 6%` opens the BE tab and recalculates
- [ ] Context links change after recalculating in `Incl -> Excl` mode
```

- [ ] **Step 5: Run the smoke test and confirm all support blocks pass**

Run: `node tests/btw-berekenen-flagship.spec.js`
Expected: PASS and print `task 4 smoke checks passed`

- [ ] **Step 6: Run the manual browser checklist on a local static server**

Run: `python -m http.server 4173`
Expected: Python starts a local server and prints `Serving HTTP on 0.0.0.0 port 4173`

Open: `http://127.0.0.1:4173/btw-berekenen/`
Expected: Every checklist item in `docs/checklists/2026-04-22-btw-berekenen-flagship-manual.md` can be marked complete

- [ ] **Step 7: Commit the support and verification slice**

```bash
git add btw-berekenen/index.html tests/btw-berekenen-flagship.spec.js docs/checklists/2026-04-22-btw-berekenen-flagship-manual.md
git commit -m "feat: add btw flagship guidance and support blocks"
```
