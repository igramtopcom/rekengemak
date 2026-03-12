# TASK-017 — Wachtwoord Generator
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P3
**Branch:** `feature/TASK-017-wachtwoord-generator`
**File:** `wachtwoord-generator/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Wachtwoord Generator tại `/wachtwoord-generator/` — genereer direct een sterk wachtwoord met instelbare lengte (8–64 tekens) en keuze uit tekensets. Een visuele sterkte-indicator toont hoe sterk het wachtwoord is. Eén klik om te kopiëren, één klik om opnieuw te genereren.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/wachtwoord-generator/`
- **Title (60 ký tự):** `Wachtwoord Generator Online Gratis -- Sterk Wachtwoord | RekenGemak`
- **Meta description (153 ký tự):** `Genereer direct een sterk willekeurig wachtwoord. Stel de lengte en tekens in en kopieer met een klik. Gratis, veilig en zonder registratie.`
- **H1:** `Wachtwoord Generator`
- **Từ khóa chính:** `wachtwoord generator` (12K–20K/tháng, KD 40–55)
- **Từ khóa dài:**
  - wachtwoord generator online gratis
  - sterk wachtwoord maken
  - veilig wachtwoord genereren
  - willekeurig wachtwoord aanmaken
  - wachtwoord generator met symbolen
  - wachtwoord 20 tekens genereren

---

## Open Graph Tags

```html
<meta property="og:title"       content="Wachtwoord Generator Online Gratis -- Sterk Wachtwoord | RekenGemak">
<meta property="og:description" content="Genereer direct een sterk willekeurig wachtwoord. Stel de lengte en tekens in en kopieer met een klik. Gratis, veilig en zonder registratie.">
<meta property="og:url"         content="https://rekengemak.nl/wachtwoord-generator/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert CSS van `btw-berekenen/index.html` volledig. Slider CSS overnemen van T-008/T-009. Aanvullende CSS hieronder.

### Aanvullende CSS

```css
/* ═══ WACHTWOORD DISPLAY ═══════════════════════════════════════════════ */
.password-box {
  position: relative;
  background: var(--bg-input);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 18px var(--space-md);
  margin-top: var(--space-md);
  transition: border-color var(--transition);
}

.password-box:focus-within {
  border-color: var(--accent);
}

.password-display {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  word-break: break-all;
  line-height: 1.5;
  min-height: 2rem;
  letter-spacing: 0.04em;
}

@media (max-width: 480px) {
  .password-display { font-size: 1.05rem; }
}

.password-actions {
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  flex-wrap: wrap;
}

/* ═══ STERKTE METER ════════════════════════════════════════════════════ */
.strength-wrap {
  margin-top: var(--space-md);
}

.strength-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.strength-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.strength-text {
  font-size: 0.85rem;
  font-weight: 700;
}

.strength-bar-bg {
  height: 8px;
  background: var(--bg-input);
  border-radius: 4px;
  overflow: hidden;
}

.strength-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease, background-color 0.3s ease;
}

/* Kleurstaten sterkte */
.strength-bar-fill.weak    { background: #E05252; }
.strength-bar-fill.fair    { background: #E09B3A; }
.strength-bar-fill.good    { background: #2EA043; }
.strength-bar-fill.strong  { background: #2272C3; }

.strength-text.weak   { color: #E05252; }
.strength-text.fair   { color: #E09B3A; }
.strength-text.good   { color: #2EA043; }
.strength-text.strong { color: #2272C3; }

/* ═══ CHECKBOXEN TEKENSETS ══════════════════════════════════════════════ */
.charset-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: var(--space-sm);
}

.charset-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: border-color var(--transition);
  user-select: none;
}

.charset-item:has(input:checked) {
  border-color: var(--accent);
}

.charset-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
  cursor: pointer;
  flex-shrink: 0;
}

.charset-item-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.charset-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.charset-example {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: 'Courier New', Courier, monospace;
}

/* Slider */
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
  font-size: 1rem;
}

input[type="range"] {
  width: 100%;
  height: 6px;
  accent-color: var(--accent);
  cursor: pointer;
}

/* Waarschuwing: geen tekenset geselecteerd */
.charset-warning {
  display: none;
  padding: 10px 14px;
  background: rgba(224, 82, 82, 0.12);
  border-left: 3px solid #E05252;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #E05252;
  margin-top: 10px;
}

.charset-warning.visible {
  display: block;
}
```

---

## Tool Card

```html
<section class="tool-card" aria-label="Wachtwoord Generator">

  <!-- Wachtwoord display -->
  <div style="font-size:0.875rem;font-weight:600;color:var(--text-secondary);
              text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">
    Gegenereerd wachtwoord
  </div>

  <div class="password-box">
    <div class="password-display" id="pwd-display" aria-live="polite">
      Klik op "Genereer" om te beginnen
    </div>
  </div>

  <!-- Sterkte meter -->
  <div class="strength-wrap" id="strength-wrap" style="display:none;">
    <div class="strength-header">
      <span class="strength-label">Sterkte</span>
      <span class="strength-text" id="strength-text"></span>
    </div>
    <div class="strength-bar-bg">
      <div class="strength-bar-fill" id="strength-bar" style="width:0%"></div>
    </div>
  </div>

  <!-- Actieknoppen -->
  <div class="password-actions">
    <button class="btn-copy" onclick="kopieerWachtwoord()" id="btn-copy-pwd">
      Kopieer
    </button>
    <button class="btn-secondary" onclick="genereer()" id="btn-nieuw">
      Nieuw wachtwoord
    </button>
  </div>

  <hr style="border:none;border-top:1px solid var(--border);
             margin:var(--space-lg) 0 var(--space-md);">

  <!-- Lengte slider -->
  <div class="slider-wrap">
    <label for="lengte-slider">
      <span>Lengte</span>
      <span class="slider-value" id="lengte-value">16</span>
    </label>
    <input type="range" id="lengte-slider"
           min="8" max="64" step="1" value="16"
           oninput="updateLengte(); genereer()">
  </div>

  <!-- Tekensets -->
  <div style="font-size:0.875rem;font-weight:600;color:var(--text-secondary);
              margin-bottom:var(--space-sm);">
    Tekens gebruiken
  </div>

  <div class="charset-grid">

    <label class="charset-item">
      <input type="checkbox" id="cb-hoofd" checked onchange="genereer()">
      <div class="charset-item-text">
        <span class="charset-name">Hoofdletters</span>
        <span class="charset-example">A B C ... Z</span>
      </div>
    </label>

    <label class="charset-item">
      <input type="checkbox" id="cb-klein" checked onchange="genereer()">
      <div class="charset-item-text">
        <span class="charset-name">Kleine letters</span>
        <span class="charset-example">a b c ... z</span>
      </div>
    </label>

    <label class="charset-item">
      <input type="checkbox" id="cb-cijfers" checked onchange="genereer()">
      <div class="charset-item-text">
        <span class="charset-name">Cijfers</span>
        <span class="charset-example">0 1 2 ... 9</span>
      </div>
    </label>

    <label class="charset-item">
      <input type="checkbox" id="cb-symbolen" onchange="genereer()">
      <div class="charset-item-text">
        <span class="charset-name">Symbolen</span>
        <span class="charset-example">! @ # $ % & *</span>
      </div>
    </label>

  </div>

  <!-- Waarschuwing geen tekenset -->
  <div class="charset-warning" id="charset-warning">
    Selecteer minimaal één tekenset om een wachtwoord te genereren.
  </div>

</section>
```

---

## Logic JavaScript

```javascript
/* ═══ TEKENSETS ═════════════════════════════════════════════════════════ */
var CHARS = {
  hoofd:    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  klein:    'abcdefghijklmnopqrstuvwxyz',
  cijfers:  '0123456789',
  symbolen: '!@#$%^&*()-_=+[]{}|;:,.<>?'
};

/* ═══ CRYPTO RANDOM — VERPLICHT ═════════════════════════════════════════
   NOOIT Math.random() gebruiken.
════════════════════════════════════════════════════════════════════════ */
function randomPassword(length, charset) {
  var arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(function(n) {
    return charset[n % charset.length];
  }).join('');
}

/* ═══ CHARSET SAMENSTELLEN ═══════════════════════════════════════════════ */
function buildCharset() {
  var cs = '';
  if (document.getElementById('cb-hoofd').checked)   cs += CHARS.hoofd;
  if (document.getElementById('cb-klein').checked)   cs += CHARS.klein;
  if (document.getElementById('cb-cijfers').checked) cs += CHARS.cijfers;
  if (document.getElementById('cb-symbolen').checked) cs += CHARS.symbolen;
  return cs;
}

/* ═══ GENEREER ══════════════════════════════════════════════════════════ */
function genereer() {
  var charset = buildCharset();
  var warning = document.getElementById('charset-warning');

  if (!charset) {
    warning.classList.add('visible');
    document.getElementById('pwd-display').textContent = '';
    document.getElementById('strength-wrap').style.display = 'none';
    return;
  }
  warning.classList.remove('visible');

  var lengte = parseInt(document.getElementById('lengte-slider').value);
  var pwd    = randomPassword(lengte, charset);

  document.getElementById('pwd-display').textContent = pwd;
  document.getElementById('strength-wrap').style.display = 'block';
  updateSterkte(pwd);
}

/* ═══ LENGTE SLIDER ═════════════════════════════════════════════════════ */
function updateLengte() {
  document.getElementById('lengte-value').textContent =
    document.getElementById('lengte-slider').value;
}

/* ═══ STERKTE BEREKENING ════════════════════════════════════════════════
   Score gebaseerd op lengte + gebruikte tekensets.
   Criteria:
     Zwak   (1 bar,  25%): < 8 tekens of 1 tekenset + kort
     Matig  (2 bars, 50%): 8-11 tekens, 1-2 tekensets
     Goed   (3 bars, 75%): 12-15 tekens of 3+ tekensets
     Sterk  (4 bars,100%): >= 16 tekens + 3+ tekensets
════════════════════════════════════════════════════════════════════════ */
function updateSterkte(pwd) {
  var len        = pwd.length;
  var nSets      = 0;
  if (document.getElementById('cb-hoofd').checked)    nSets++;
  if (document.getElementById('cb-klein').checked)    nSets++;
  if (document.getElementById('cb-cijfers').checked)  nSets++;
  if (document.getElementById('cb-symbolen').checked) nSets++;

  var score;
  if      (len >= 16 && nSets >= 3) score = 4;
  else if (len >= 12 || (len >= 8 && nSets >= 3)) score = 3;
  else if (len >= 8  && nSets >= 2) score = 2;
  else                               score = 1;

  var states = ['', 'weak', 'fair', 'good', 'strong'];
  var labels = ['', 'Zwak', 'Matig', 'Goed', 'Sterk'];
  var pcts   = ['', '25%', '50%', '75%', '100%'];

  var bar  = document.getElementById('strength-bar');
  var txt  = document.getElementById('strength-text');
  var cls  = states[score];

  bar.style.width = pcts[score];
  bar.className   = 'strength-bar-fill ' + cls;
  txt.textContent = labels[score];
  txt.className   = 'strength-text ' + cls;
}

/* ═══ KOPIEER ═══════════════════════════════════════════════════════════ */
function kopieerWachtwoord() {
  var pwd = document.getElementById('pwd-display').textContent;
  if (!pwd || pwd === 'Klik op "Genereer" om te beginnen') return;
  navigator.clipboard.writeText(pwd).then(function() {
    var btn = document.getElementById('btn-copy-pwd');
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

## Sterkte score — referentie

| Score | Label | Balk | Conditie |
|---|---|---|---|
| 1 | Zwak | 25% rood | len < 8 of 1 tekenset |
| 2 | Matig | 50% oranje | len 8–11, 2+ tekensets |
| 3 | Goed | 75% groen | len 12–15 of 3+ sets |
| 4 | Sterk | 100% blauw | len >= 16 + 3+ sets |

---

## 3 JSON-LD Schemas — Cuối body

### Schema 1: WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Wachtwoord Generator — RekenGemak",
  "url": "https://rekengemak.nl/wachtwoord-generator/",
  "applicationCategory": "SecurityApplication",
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
      "name": "Hoe genereer je een sterk wachtwoord?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een sterk wachtwoord heeft minimaal 16 tekens en bevat hoofdletters, kleine letters, cijfers en symbolen. Stel de schuifregelaar in op 16 of hoger, vink alle tekensets aan en klik op 'Genereer'. De sterkte-indicator toont direct hoe veilig het gegenereerde wachtwoord is."
      }
    },
    {
      "@type": "Question",
      "name": "Is het veilig om deze wachtwoord generator te gebruiken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. De generator werkt volledig in je browser en verstuurt niets naar een server. De wachtwoorden worden gegenereerd met crypto.getRandomValues(), de cryptografisch veilige willekeurigheidsfunctie van je browser. Het gegenereerde wachtwoord is nooit zichtbaar voor RekenGemak of een andere partij."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe lang moet een veilig wachtwoord zijn?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Beveiligingsexperts raden tegenwoordig minimaal 16 tekens aan voor een sterk wachtwoord. Bij een lengte van 20 tekens met hoofdletters, kleine letters, cijfers en symbolen is een wachtwoord in de praktijk onkraakbaar met brute-force methoden. Kortere wachtwoorden van 8 tot 12 tekens zijn zwakker maar nog steeds beter dan een hergebruikt wachtwoord."
      }
    },
    {
      "@type": "Question",
      "name": "Wat betekenen de sterkte-indicatoren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De sterkte-indicator toont vier niveaus: Zwak (rood) betekent dat het wachtwoord te kort is of te weinig tekensets gebruikt. Matig (oranje) is acceptabel voor weinig gevoelige accounts. Goed (groen) is geschikt voor de meeste toepassingen. Sterk (blauw) is het aanbevolen niveau voor bankzaken, e-mail en andere kritieke accounts."
      }
    },
    {
      "@type": "Question",
      "name": "Moet ik symbolen gebruiken in een wachtwoord?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Symbolen maken een wachtwoord aanzienlijk sterker door de mogelijke tekenruimte te vergroten. Een wachtwoord van 12 tekens met symbolen is vele malen moeilijker te kraken dan een wachtwoord van 12 tekens zonder symbolen. Sommige websites accepteren geen symbolen in wachtwoorden; in dat geval kun je de checkbox uitvinken."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe sla je een gegenereerd wachtwoord op?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kopieer het wachtwoord met de knop 'Kopieer' en sla het op in een wachtwoordmanager zoals Bitwarden, 1Password of KeePass. Noteer wachtwoorden nooit op papier of in een onbeveiligd tekstbestand. Een wachtwoordmanager onthoudt al je wachtwoorden zodat je er zelf maar een hoeft te onthouden."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik hetzelfde wachtwoord gebruiken voor meerdere accounts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, gebruik nooit hetzelfde wachtwoord voor meerdere accounts. Als een website gehackt wordt en jouw wachtwoord uitlekt, kunnen aanvallers daarmee bij al je andere accounts inloggen. Genereer voor elk account een uniek wachtwoord en sla ze op in een wachtwoordmanager."
      }
    },
    {
      "@type": "Question",
      "name": "Is de wachtwoord generator gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de wachtwoord generator van RekenGemak is volledig gratis en zonder registratie. Er is geen limiet op het aantal wachtwoorden dat je kunt genereren. De tool werkt direct in je browser, ook op je telefoon."
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
      "name": "Wachtwoord Generator",
      "item": "https://rekengemak.nl/wachtwoord-generator/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de wachtwoord generator?"

Stel de gewenste lengte in met de schuifregelaar. Standaard staat die op 16 tekens, wat al een goed niveau van beveiliging biedt. Vink de tekensets aan die je wilt gebruiken: hoofdletters, kleine letters, cijfers en symbolen. Klik daarna op "Genereer" en je wachtwoord verschijnt direct.

De sterkte-indicator toont in een klap hoe veilig het wachtwoord is. Groen betekent goed, blauw betekent sterk. Wil je een nieuw wachtwoord met dezelfde instellingen? Klik op "Nieuw wachtwoord". Met "Kopieer" zet je het wachtwoord direct op je klembord.

### H2: "Voor wie is deze rekenhulp?"

- Iedereen die een nieuw wachtwoord nodig heeft voor een website of app
- Mensen die hun bestaande, zwakke wachtwoorden willen vervangen door sterke versies
- IT-beheerders die tijdelijke wachtwoorden voor collega's moeten aanmaken
- Studenten en professionals die veiligheid serieus nemen
- Iedereen die geen zin heeft om zelf een willekeurig wachtwoord te bedenken

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/willekeurig-getal/">Willekeurig getal</a>
  <a href="/tekens-tellen/">Tekens tellen</a>
  <a href="/woorden-tellen/">Woorden tellen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/procenten-berekenen/">Procenten berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 + slider CSS van T-008** — wachtwoord display + sterkte + charset CSS toevoegen
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`crypto.getRandomValues()` VERPLICHT** — NOOIT `Math.random()`
7. **Default instellingen bij pageload:** lengte=16, hoofd ✓, klein ✓, cijfers ✓, symbolen ✗
8. **Geen auto-genereer bij pageload** — toon placeholder tekst, wacht op klik "Genereer"
9. **Slider + checkboxes:** wijziging triggert direct `genereer()` — real-time update
10. **Waarschuwing bij 0 tekensets:** rood blok zichtbaar, wachtwoord display leeg
11. **Sterkte-indicator verborgen bij pageload** — alleen zichtbaar na eerste generatie
12. **`applicationCategory: "SecurityApplication"`** in WebApplication schema — afwijkend van andere tools
13. **Monospace font voor wachtwoord display** — `font-family: 'Courier New', Courier, monospace`
14. **`aria-live="polite"`** op password-display — screenreader-vriendelijk
15. **Footer trailing slash** — `/privacy/`, `/contact/`
16. **JSON-LD schemas** — onderaan body, na `</footer>`
17. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-017-wachtwoord-generator

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-017-wachtwoord-generator.md
git commit -m "docs: add brief TASK-017"

# Stap 3: code committen
git add wachtwoord-generator/index.html
git commit -m "feat: TASK-017 wachtwoord-generator tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-017-wachtwoord-generator
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/wachtwoord-generator/
```

> **Belangrijk:** Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/wachtwoord-generator/` — niet op localhost.

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/wachtwoord-generator/`

## A. Kỹ thuật

- [ ] **PageSpeed mobile:** [score] — vereist >= 90
- [ ] **PageSpeed desktop:** [score] — vereist >= 95
- [ ] **Rich Results — WebApplication:** PASS / FAIL
- [ ] **Rich Results — FAQPage:** PASS / FAIL
- [ ] **Rich Results — BreadcrumbList:** PASS / FAIL
- [ ] **DevTools Network:** 0 externe requests
- [ ] **Source bevat `crypto.getRandomValues`:** PASS
- [ ] **Ctrl+F "Math.random":** niet gevonden
- [ ] **Ctrl+F "—" (em dash):** niet gevonden in body-tekst
- [ ] **Ctrl+F "--":** niet gevonden in body-tekst
- [ ] **Ctrl+F "...":** niet gevonden
- [ ] **Interne links:** [aantal] — minimaal 5
- [ ] **Sitemap:** wachtwoord-generator/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Functionaliteit — Chạy trên live URL

### Pageload state

| Conditie | Verwacht | PASS/FAIL |
|---|---|---|
| Pageload | Placeholder tekst, geen wachtwoord | |
| Pageload | Sterkte-indicator verborgen | |
| Pageload | Lengte slider = 16 | |
| Pageload | Hoofd + klein + cijfers aangevinkt, symbolen niet | |

### Genereer + lengte

| Lengte | Tekensets | Verwacht wachtwoord | Sterkte | PASS/FAIL |
|---|---|---|---|---|
| 16 | hoofd + klein + cijfers | 16 tekens, mix van A-Z a-z 0-9 | Sterk | |
| 8 | alleen kleine letters | 8 tekens, alleen a-z | Zwak | |
| 8 | hoofd + klein | 8 tekens, A-Z a-z | Matig | |
| 12 | hoofd + klein + cijfers | 12 tekens | Goed | |
| 16 | alle 4 tekensets | 16 tekens, incl. symbolen | Sterk | |
| 64 | alle 4 tekensets | 64 tekens | Sterk | |

### Sterkte score verificatie

| Lengte | Tekensets | Verwachte score | Label | PASS/FAIL |
|---|---|---|---|---|
| 8 | 1 (alleen klein) | 1 | Zwak | |
| 8 | 2 (klein + cijfers) | 2 | Matig | |
| 12 | 3 (hoofd + klein + cijfers) | 3 | Goed | |
| 16 | 3 (hoofd + klein + cijfers) | 4 | Sterk | |
| 16 | 4 (alle) | 4 | Sterk | |

### Validatie

| Scenario | Verwacht | PASS/FAIL |
|---|---|---|
| Alle checkboxes uitgevinkt | Waarschuwing rood zichtbaar | |
| Alle checkboxes uitgevinkt | Wachtwoord display leeg | |
| 1 checkbox weer aangevinkt | Waarschuwing verdwijnt, nieuw wachtwoord | |

## C. UX op apparaten

- [ ] **Knop "Genereer":** wachtwoord verschijnt, sterkte-indicator zichtbaar
- [ ] **Knop "Nieuw wachtwoord":** nieuw wachtwoord met zelfde instellingen
- [ ] **Slider realtime:** slepen → lengte getal + nieuw wachtwoord direct
- [ ] **Checkbox toggle realtime:** aanvinken/uitvinken → nieuw wachtwoord direct
- [ ] **Knop "Kopieer":** → "Gekopieerd!" 1,5 sec → terug
- [ ] **Wachtwoord font:** monospace (Courier New of vergelijkbaar)
- [ ] **Sterkte balk animatie:** vloeiende overgang bij verandering
- [ ] **Mobiel 375px:** charset grid 2 kolommen, geen horizontale scroll
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage `rekengemak-theme` correct

## D. Inhoud

- [ ] **H1** = "Wachtwoord Generator"
- [ ] **Keyword "wachtwoord generator"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden**
- [ ] **FAQ vermeldt crypto.getRandomValues** als bewijs van veiligheid

## Samenvatting

```
Live URL getest: https://rekengemak.nl/wachtwoord-generator/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
