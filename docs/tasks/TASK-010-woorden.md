# TASK-010 — Woorden Tellen
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P2
**Branch:** `feature/TASK-010-woorden-tellen`
**File:** `woorden-tellen/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Woorden Tellen tại `/woorden-tellen/` — đếm real-time số từ, ký tự, câu, đoạn văn và ước tính thời gian đọc từ văn bản dán vào. Không cần nút bấm — mọi thống kê cập nhật ngay khi người dùng gõ hoặc dán văn bản.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/woorden-tellen/`
- **Title (57 ký tự):** `Woorden Tellen Online Gratis -- Woordenteller | RekenGemak`
- **Meta description (154 ký tự):** `Tel woorden, tekens, zinnen en alinea's in je tekst. Gratis online woordenteller met leestijdschatting. Plak je tekst en zie direct alle statistieken.`
- **H1:** `Woorden Tellen`
- **Từ khóa chính:** `woorden tellen` (18K–28K/tháng, KD 18–28)
- **Từ khóa dài:**
  - woorden tellen online gratis
  - woordenteller tekst
  - tekens tellen online
  - woorden tellen in tekst
  - leestijd berekenen tekst
  - zinnen tellen online

---

## Open Graph Tags

```html
<meta property="og:title"       content="Woorden Tellen Online Gratis -- Woordenteller | RekenGemak">
<meta property="og:description" content="Tel woorden, tekens, zinnen en alinea's in je tekst. Gratis online woordenteller met leestijdschatting. Plak je tekst en zie direct alle statistieken.">
<meta property="og:url"         content="https://rekengemak.nl/woorden-tellen/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert CSS van `btw-berekenen/index.html` volledig. Aanvullende CSS voor textarea en stats bar hieronder.

### Aanvullende CSS

```css
/* ═══ TEXTAREA ════════════════════════════════════════════════════════ */
.textarea-wrap {
  position: relative;
  margin-bottom: var(--space-md);
}

textarea {
  width: 100%;
  min-height: 180px;
  padding: 14px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  transition: border-color var(--transition);
  outline: none;
}

textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(31, 92, 153, 0.2);
}

textarea::placeholder {
  color: var(--text-secondary);
}

/* ═══ STATS BAR ═══════════════════════════════════════════════════════ */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

@media (max-width: 480px) {
  .stats-bar { grid-template-columns: repeat(2, 1fr); }
}

.stat-item {
  background: var(--result-bg);
  border-left: 4px solid var(--success);
  border-radius: var(--radius);
  padding: 12px var(--space-md);
  text-align: center;
}

.stat-num {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--success);
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
  display: block;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 3px;
  display: block;
}

/* Leestijd stat: volle breedte onderaan */
.stat-item.stat-leestijd {
  grid-column: 1 / -1;
  border-left-color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  text-align: left;
}

.stat-item.stat-leestijd .stat-num {
  font-size: 1.2rem;
  color: var(--accent);
}

/* Toolbar boven textarea */
.textarea-toolbar {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
  margin-bottom: 6px;
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
    <a href="/">Thuis</a> &rsaquo; <span>Woorden Tellen</span>
  </nav>
  <h1>Woorden Tellen</h1>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Plak of typ je tekst en zie direct het aantal woorden, tekens, zinnen en de geschatte leestijd.
  </p>
</div>
```

---

## Tool Card

```html
<section class="tool-card" aria-label="Woorden Tellen">

  <!-- Toolbar: Wis knop -->
  <div class="textarea-toolbar">
    <button class="btn-secondary" onclick="clearText()" id="btn-wis"
            style="padding:6px 14px;font-size:0.85rem;">
      Wis tekst
    </button>
    <button class="btn-copy" onclick="copyStats()" id="btn-copy-stats">
      Kopieer statistieken
    </button>
  </div>

  <!-- Textarea -->
  <div class="textarea-wrap">
    <textarea id="tekst-input"
              placeholder="Plak of typ hier je tekst..."
              oninput="updateStats()"
              aria-label="Tekst invoer"></textarea>
  </div>

  <!-- Stats bar: 5 statistieken + leestijd -->
  <div class="stats-bar" id="stats-bar">
    <div class="stat-item">
      <span class="stat-num" id="stat-woorden">0</span>
      <span class="stat-label">Woorden</span>
    </div>
    <div class="stat-item">
      <span class="stat-num" id="stat-tekens">0</span>
      <span class="stat-label">Tekens</span>
    </div>
    <div class="stat-item">
      <span class="stat-num" id="stat-tekens-no-spatie">0</span>
      <span class="stat-label">Tekens (excl. spaties)</span>
    </div>
    <div class="stat-item">
      <span class="stat-num" id="stat-zinnen">0</span>
      <span class="stat-label">Zinnen</span>
    </div>
    <div class="stat-item">
      <span class="stat-num" id="stat-alineas">0</span>
      <span class="stat-label">Alinea's</span>
    </div>
    <!-- Leestijd: volle breedte -->
    <div class="stat-item stat-leestijd">
      <span class="stat-num" id="stat-leestijd">0 min</span>
      <span class="stat-label">Geschatte leestijd (200 woorden/min)</span>
    </div>
  </div>

</section>
```

---

## Logic JavaScript

```javascript
/* ═══ STATS UPDATE — REAL-TIME ═════════════════════════════════════════
   Wordt aangeroepen bij elke oninput op de textarea.
   Alle berekeningen zijn puur op de tekst, geen externe calls.
════════════════════════════════════════════════════════════════════════ */
function updateStats() {
  var tekst = document.getElementById('tekst-input').value;

  /* Woorden: split op whitespace, filter lege strings */
  var woorden = tekst.trim() === ''
    ? 0
    : tekst.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;

  /* Tekens (inclusief spaties) */
  var tekens = tekst.length;

  /* Tekens exclusief spaties */
  var tekensNoSpatie = tekst.replace(/\s/g, '').length;

  /* Zinnen: eindigen op . ! ? — minimaal 1 als er tekst is */
  var zinnen = 0;
  if (tekst.trim().length > 0) {
    var matches = tekst.match(/[^.!?]*[.!?]+/g);
    zinnen = matches ? matches.length : 1;
  }

  /* Alinea's: gescheiden door 1+ lege regels */
  var alineas = 0;
  if (tekst.trim().length > 0) {
    alineas = tekst.trim().split(/\n\s*\n/).filter(function(p) {
      return p.trim().length > 0;
    }).length;
    if (alineas === 0) alineas = 1; /* Minimaal 1 als er tekst is */
  }

  /* Leestijd: 200 woorden per minuut */
  var leestijdMin = woorden / 200;
  var leestijdTekst;
  if (woorden === 0) {
    leestijdTekst = '0 min';
  } else if (leestijdMin < 1) {
    var seconden = Math.ceil(leestijdMin * 60);
    leestijdTekst = '< 1 min (' + seconden + ' sec)';
  } else {
    leestijdTekst = Math.ceil(leestijdMin) + ' min';
  }

  /* Update DOM */
  document.getElementById('stat-woorden').textContent        = woorden;
  document.getElementById('stat-tekens').textContent         = tekens;
  document.getElementById('stat-tekens-no-spatie').textContent = tekensNoSpatie;
  document.getElementById('stat-zinnen').textContent         = zinnen;
  document.getElementById('stat-alineas').textContent        = alineas;
  document.getElementById('stat-leestijd').textContent       = leestijdTekst;
}

/* ═══ CLEAR TEXT ════════════════════════════════════════════════════════ */
function clearText() {
  document.getElementById('tekst-input').value = '';
  updateStats();
  document.getElementById('tekst-input').focus();
}

/* ═══ COPY STATISTICS ═══════════════════════════════════════════════════ */
function copyStats() {
  var woorden        = document.getElementById('stat-woorden').textContent;
  var tekens         = document.getElementById('stat-tekens').textContent;
  var tekensNoSpatie = document.getElementById('stat-tekens-no-spatie').textContent;
  var zinnen         = document.getElementById('stat-zinnen').textContent;
  var alineas        = document.getElementById('stat-alineas').textContent;
  var leestijd       = document.getElementById('stat-leestijd').textContent;

  var tekst =
    'Woorden: '                  + woorden        + '\n' +
    'Tekens (incl. spaties): '   + tekens         + '\n' +
    'Tekens (excl. spaties): '   + tekensNoSpatie + '\n' +
    'Zinnen: '                   + zinnen         + '\n' +
    'Alineas: '                  + alineas        + '\n' +
    'Leestijd: '                 + leestijd;

  navigator.clipboard.writeText(tekst).then(function() {
    var btn  = document.getElementById('btn-copy-stats');
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
  "name": "Woorden Tellen — RekenGemak",
  "url": "https://rekengemak.nl/woorden-tellen/",
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
      "name": "Hoe tel je woorden in een tekst?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plak je tekst in het invoerveld van de woordenteller. Het aantal woorden wordt direct geteld. Woorden worden gescheiden door spaties. Leestekens en cijfers tellen mee als onderdeel van een woord als ze direct aan een letter grenzen."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen tekens met en zonder spaties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tekens inclusief spaties telt elk karakter in de tekst, inclusief spaties, enters en leestekens. Tekens exclusief spaties telt alleen de zichtbare karakters. Platforms als Twitter en LinkedIn gebruiken vaak de telling inclusief spaties voor hun tekenlimiet."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe wordt de leestijd berekend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De leestijd is gebaseerd op een gemiddelde leessnelheid van 200 woorden per minuut. Dit is een veelgebruikte standaard voor Nederlands tekst. Bij korte teksten van minder dan 200 woorden toont de calculator de leestijd in seconden."
      }
    },
    {
      "@type": "Question",
      "name": "Hoe worden zinnen geteld?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zinnen worden geteld op basis van eindleestekens: punt, uitroepteken en vraagteken. Een zin eindigt dus bij een punt, uitroepteken of vraagteken. Tekst zonder eindleesteken telt als 1 zin als er tekst aanwezig is."
      }
    },
    {
      "@type": "Question",
      "name": "Waarvoor gebruik je een woordenteller?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een woordenteller gebruik je voor het controleren van een minimumaantal woorden voor een scriptie of artikel, het bewaken van de maximale tekenlimiet voor sociale media, het inschatten van de leestijd van een blog of nieuwsbrief, en het tellen van woorden in een vertaalopdracht voor prijsberekening."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel woorden heeft een A4 pagina?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een standaard A4 pagina met lettergrootte 12pt en regelafstand 1,5 bevat ongeveer 400 tot 500 woorden. Bij dubbele regelafstand is dat 250 tot 300 woorden. Voor wetenschappelijke teksten met voetnoten en afbeeldingen kan dit lager uitvallen."
      }
    },
    {
      "@type": "Question",
      "name": "Wordt mijn tekst opgeslagen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, de tekst die je invoert wordt niet opgeslagen en niet verzonden naar een server. De woordenteller werkt volledig in je browser. Als je de pagina sluit of vernieuwt, is de tekst weg."
      }
    },
    {
      "@type": "Question",
      "name": "Is de woordenteller gratis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de woordenteller van RekenGemak is volledig gratis. Je hoeft geen account aan te maken en er is geen limiet op de hoeveelheid tekst die je kunt invoeren. De tool werkt direct in je browser, ook op je telefoon."
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
      "name": "Woorden Tellen",
      "item": "https://rekengemak.nl/woorden-tellen/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de woordenteller?"

Plak je tekst in het grote invoerveld of typ direct. De statistieken worden meteen bijgewerkt zonder dat je op een knop hoeft te drukken. Je ziet het aantal woorden, tekens inclusief en exclusief spaties, zinnen en alinea's.

Onderaan staat de geschatte leestijd op basis van 200 woorden per minuut. Dit is een handige richtlijn voor blogposts, nieuwsbrieven en presentaties.

Wil je de statistieken bewaren? Klik op "Kopieer statistieken" om alle cijfers in een keer naar je klembord te kopiëren. Met "Wis tekst" begin je opnieuw.

### H2: "Voor wie is deze rekenhulp?"

- Studenten en scholieren die het minimumaantal woorden voor een opdracht willen controleren
- Bloggers en schrijvers die de leestijd van hun artikel willen inschatten
- Marketeers die teksten schrijven voor sociale media met een tekenlimiet
- Vertalers die het aantal woorden van een brondocument willen tellen voor een prijsopgave
- Iedereen die snel wil weten hoe lang een tekst is

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/tekens-tellen/">Tekens tellen</a>
  <a href="/tekst-vergelijken/">Tekst vergelijken</a>
  <a href="/procenten-berekenen/">Procenten berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/korting-berekenen/">Korting berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 hergebruiken** — textarea + stats bar CSS toevoegen
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`oninput` op textarea** — real-time update, geen submit-knop
7. **Textarea `min-height: 180px`** — minimum, gebruiker kan uitrekken via `resize: vertical`
8. **Stats tonen `0` bij lege textarea** — niet `--`, want dit is een teller die bij 0 begint
9. **Geen `Intl.NumberFormat` nodig** — getallen zijn gehele getallen, geen euro of procent
10. **Leestijd formule:** `woorden / 200` afgerond naar boven, onder 1 min → toon seconden
11. **Zinnentelling:** splits op `.`, `!`, `?` — minimaal 1 als er tekst is
12. **Alineatelling:** split op 1+ lege regels (`\n\s*\n`) — minimaal 1 als er tekst is
13. **Tekst wordt NIET opgeslagen** — geen localStorage voor de tekst zelf, alleen voor thema
14. **"Kopieer statistieken"** kopieert alle 6 statistieken als platte tekst
15. **Footer trailing slash** — `/privacy/`, `/contact/`
16. **JSON-LD schemas** — onderaan body, na `</footer>`
17. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-010-woorden-tellen

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-010-woorden.md
git commit -m "docs: add brief TASK-010"

# Stap 3: code committen
git add woorden-tellen/index.html
git commit -m "feat: TASK-010 woorden-tellen tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-010-woorden-tellen
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/woorden-tellen/
```

> **Belangrijk:** Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/woorden-tellen/` — niet op localhost.

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/woorden-tellen/`

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
- [ ] **Sitemap:** woorden-tellen/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Tính toán — Chạy trên live URL

### Woorden tellen

| Invoer | Verwacht woorden | Actueel | PASS/FAIL |
|---|---|---|---|
| `(leeg)` | 0 | | |
| `Hallo wereld` | 2 | | |
| `Een twee drie vier vijf` | 5 | | |
| `Dit is een zin. En nog een.` | 7 | | |
| `  spaties  voor  en  na  ` | 4 | | |
| 200 woorden (plak paragraaf) | 200 | | |

### Tekens tellen

| Invoer | Incl. spaties | Excl. spaties | PASS/FAIL |
|---|---|---|---|
| `Hallo` | 5 | 5 | |
| `Hallo wereld` | 12 | 11 | |
| `abc def` | 7 | 6 | |

### Zinnen tellen

| Invoer | Verwacht zinnen | PASS/FAIL |
|---|---|---|
| `Hallo.` | 1 | |
| `Hallo. Wereld.` | 2 | |
| `Hallo! Hoe gaat het? Goed.` | 3 | |
| `Geen punt` | 1 | |
| `(leeg)` | 0 | |

### Alinea's tellen

| Invoer | Verwacht | PASS/FAIL |
|---|---|---|
| `Een alinea zonder enters` | 1 | |
| `Alinea 1\n\nAlinea 2` | 2 | |
| `A\n\nB\n\nC` | 3 | |
| `(leeg)` | 0 | |

### Leestijd

| Woorden | Verwacht leestijd | PASS/FAIL |
|---|---|---|
| 0 | `0 min` | |
| 100 | `< 1 min (30 sec)` | |
| 200 | `1 min` | |
| 400 | `2 min` | |
| 1000 | `5 min` | |

## C. UX op apparaten

- [ ] **Real-time:** typen in textarea → stats direct bijgewerkt, geen vertraging
- [ ] **Lege textarea:** alle stats tonen `0`
- [ ] **Textarea min-height 180px:** zichtbaar op desktop
- [ ] **Textarea resize:** gebruiker kan de textarea groter slepen
- [ ] **Knop "Wis tekst":** textarea leeg, stats terug naar 0, focus terug op textarea
- [ ] **Knop "Kopieer statistieken":** klembord bevat alle 6 stats als platte tekst
- [ ] **"Gekopieerd!" feedback:** 1,5 sec → terug naar "Kopieer statistieken"
- [ ] **Mobiel 375px:** stats bar 2 kolommen, geen horizontale scroll
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage `rekengemak-theme` correct
- [ ] **Stats bar leestijd:** volle breedte onderaan, anders dan de 5 bovenstaan

## D. Inhoud

- [ ] **H1** = "Woorden Tellen"
- [ ] **Keyword "woorden tellen"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden**
- [ ] **Privacyvermelding in FAQ:** tekst wordt niet opgeslagen — aanwezig

## Samenvatting

```
Live URL getest: https://rekengemak.nl/woorden-tellen/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
