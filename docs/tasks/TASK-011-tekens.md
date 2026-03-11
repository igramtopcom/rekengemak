# TASK-011 — Tekens Tellen
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P2
**Branch:** `feature/TASK-011-tekens-tellen`
**File:** `tekens-tellen/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Tekens Tellen tại `/tekens-tellen/` — đếm real-time số ký tự trong văn bản và so sánh với giới hạn ký tự của các nền tảng mạng xã hội phổ biến. Người dùng dán văn bản vào, thấy ngay số ký tự và còn được bao nhiêu ký tự trước khi đạt giới hạn của từng platform.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/tekens-tellen/`
- **Title (58 ký tự):** `Tekens Tellen Online Gratis -- Tekenteller | RekenGemak`
- **Meta description (154 ký tự):** `Tel tekens in je tekst en check de limiet voor Twitter, Instagram, LinkedIn en meer. Gratis online tekenteller met live feedback. Plak je tekst en zie direct het resultaat.`
- **H1:** `Tekens Tellen`
- **Từ khóa chính:** `tekens tellen` (10K–18K/tháng, KD 10–18)
- **Từ khóa dài:**
  - tekens tellen online gratis
  - tekenteller sociale media
  - karakters tellen tekst
  - twitter tekenlimiet controleren
  - instagram caption tekens tellen
  - tekens tellen met spaties

---

## Open Graph Tags

```html
<meta property="og:title"       content="Tekens Tellen Online Gratis -- Tekenteller | RekenGemak">
<meta property="og:description" content="Tel tekens in je tekst en check de limiet voor Twitter, Instagram, LinkedIn en meer. Gratis online tekenteller met live feedback.">
<meta property="og:url"         content="https://rekengemak.nl/tekens-tellen/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert CSS van `btw-berekenen/index.html` volledig. Textarea CSS overnemen van T-010. Aanvullende CSS voor platform bars hieronder.

### Aanvullende CSS (bovenop T-010 textarea CSS)

```css
/* ═══ PLATFORM BARS ═══════════════════════════════════════════════════ */
.platform-list {
  margin-top: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.platform-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px var(--space-md);
  transition: border-color var(--transition);
}

.platform-item.ok {
  border-left: 4px solid var(--success);
}

.platform-item.warning {
  border-left: 4px solid #E09B3A;
}

.platform-item.over {
  border-left: 4px solid #E05252;
}

.platform-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.platform-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.platform-count {
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-secondary);
}

.platform-count.ok     { color: var(--success); }
.platform-count.warning { color: #E09B3A; }
.platform-count.over   { color: #E05252; font-weight: 700; }

.platform-bar-bg {
  height: 6px;
  background: var(--bg-input);
  border-radius: 3px;
  overflow: hidden;
}

.platform-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.15s ease, background-color 0.15s ease;
  background: var(--success);
}

.platform-bar-fill.warning { background: #E09B3A; }
.platform-bar-fill.over    { background: #E05252; width: 100% !important; }

/* ═══ HOOFD TELLER ═════════════════════════════════════════════════════ */
.main-count-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  margin-bottom: var(--space-md);
}

@media (max-width: 480px) {
  .main-count-bar { grid-template-columns: 1fr 1fr; }
}

.main-count-item {
  background: var(--result-bg);
  border-left: 4px solid var(--success);
  border-radius: var(--radius);
  padding: 12px var(--space-md);
  text-align: center;
}

.main-count-num {
  font-size: 2rem;
  font-weight: 700;
  color: var(--success);
  font-variant-numeric: tabular-nums;
  display: block;
  line-height: 1.2;
}

.main-count-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 3px;
  display: block;
}
```

---

## Tool Card

```html
<section class="tool-card" aria-label="Tekens Tellen">

  <!-- Toolbar -->
  <div class="textarea-toolbar">
    <button class="btn-secondary" onclick="clearText()"
            style="padding:6px 14px;font-size:0.85rem;">Wis tekst</button>
    <button class="btn-copy" onclick="copyCount()" id="btn-copy-count">
      Kopieer telling
    </button>
  </div>

  <!-- Textarea -->
  <div class="textarea-wrap">
    <textarea id="tekst-input"
              placeholder="Plak of typ hier je tekst..."
              oninput="updateCount()"
              aria-label="Tekst invoer"></textarea>
  </div>

  <!-- Hoofd tellers: tekens incl. + excl. spaties -->
  <div class="main-count-bar">
    <div class="main-count-item">
      <span class="main-count-num" id="count-incl">0</span>
      <span class="main-count-label">Tekens (incl. spaties)</span>
    </div>
    <div class="main-count-item">
      <span class="main-count-num" id="count-excl">0</span>
      <span class="main-count-label">Tekens (excl. spaties)</span>
    </div>
  </div>

  <!-- Platform limieten -->
  <div style="margin-bottom:8px;">
    <span style="font-size:0.85rem;font-weight:600;color:var(--text-secondary);
                 text-transform:uppercase;letter-spacing:0.05em;">
      Platformlimieten
    </span>
  </div>

  <div class="platform-list" id="platform-list">
    <!-- Dynamisch gegenereerd door JS -->
  </div>

</section>
```

---

## Logic JavaScript

```javascript
/* ═══ PLATFORM DEFINITIES ═══════════════════════════════════════════════
   Naam, limiet (tekens incl. spaties), beschrijving
════════════════════════════════════════════════════════════════════════ */
var PLATFORMS = [
  { name: 'X / Twitter',   limit: 280,   desc: 'post' },
  { name: 'Instagram',     limit: 2200,  desc: 'caption' },
  { name: 'LinkedIn post', limit: 3000,  desc: 'post' },
  { name: 'Facebook',      limit: 63206, desc: 'post' },
  { name: 'TikTok',        limit: 2200,  desc: 'caption' },
  { name: 'YouTube',       limit: 5000,  desc: 'beschrijving' },
  { name: 'WhatsApp',      limit: 65536, desc: 'bericht' },
  { name: 'SMS',           limit: 160,   desc: 'bericht (1 SMS)' }
];

/* ═══ INIT ══════════════════════════════════════════════════════════════ */
(function init() {
  buildPlatformList();
  updateCount();
})();

/* ═══ BUILD PLATFORM LIST ════════════════════════════════════════════════ */
function buildPlatformList() {
  var list = document.getElementById('platform-list');
  if (!list) return;
  list.innerHTML = '';
  PLATFORMS.forEach(function(p, i) {
    var div = document.createElement('div');
    div.className = 'platform-item';
    div.id = 'plat-' + i;
    div.innerHTML =
      '<div class="platform-header">' +
        '<span class="platform-name">' + p.name + '</span>' +
        '<span class="platform-count" id="plat-count-' + i + '">0 / ' + p.limit.toLocaleString('nl-NL') + '</span>' +
      '</div>' +
      '<div class="platform-bar-bg">' +
        '<div class="platform-bar-fill" id="plat-bar-' + i + '" style="width:0%"></div>' +
      '</div>';
    list.appendChild(div);
  });
}

/* ═══ UPDATE COUNT ═══════════════════════════════════════════════════════ */
function updateCount() {
  var txt      = document.getElementById('tekst-input').value;
  var inclSpatie = txt.length;
  var exclSpatie = txt.replace(/ /g, '').length;

  /* Hoofd tellers */
  document.getElementById('count-incl').textContent = inclSpatie.toLocaleString('nl-NL');
  document.getElementById('count-excl').textContent = exclSpatie.toLocaleString('nl-NL');

  /* Platform bars */
  PLATFORMS.forEach(function(p, i) {
    var used    = inclSpatie;
    var limit   = p.limit;
    var rest    = limit - used;
    var pct     = Math.min((used / limit) * 100, 100);
    var state   = used === 0 ? 'ok' : used <= limit * 0.8 ? 'ok' : used <= limit ? 'warning' : 'over';

    /* Item border */
    var item = document.getElementById('plat-' + i);
    item.className = 'platform-item ' + state;

    /* Count tekst */
    var countEl = document.getElementById('plat-count-' + i);
    if (rest >= 0) {
      countEl.textContent = used.toLocaleString('nl-NL') + ' / ' + limit.toLocaleString('nl-NL') +
                            ' (' + rest.toLocaleString('nl-NL') + ' over)';
    } else {
      countEl.textContent = used.toLocaleString('nl-NL') + ' / ' + limit.toLocaleString('nl-NL') +
                            ' (' + Math.abs(rest).toLocaleString('nl-NL') + ' te veel)';
    }
    countEl.className = 'platform-count ' + state;

    /* Progress bar */
    var bar = document.getElementById('plat-bar-' + i);
    bar.style.width     = pct + '%';
    bar.className       = 'platform-bar-fill ' + (state === 'ok' ? '' : state);
  });
}

/* ═══ CLEAR ═════════════════════════════════════════════════════════════ */
function clearText() {
  document.getElementById('tekst-input').value = '';
  document.getElementById('tekst-input').focus();
  updateCount();
}

/* ═══ COPY TELLING ══════════════════════════════════════════════════════ */
function copyCount() {
  var incl = document.getElementById('count-incl').textContent;
  var excl = document.getElementById('count-excl').textContent;
  var txt  = 'Tekens (incl. spaties): ' + incl + '\nTekens (excl. spaties): ' + excl;
  navigator.clipboard.writeText(txt).then(function() {
    var btn = document.getElementById('btn-copy-count');
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

## Platformlimieten — referentie 2026

| Platform | Limiet | Type |
|---|---|---|
| X / Twitter | 280 | post |
| Instagram | 2.200 | caption |
| LinkedIn post | 3.000 | post |
| Facebook | 63.206 | post |
| TikTok | 2.200 | caption |
| YouTube | 5.000 | beschrijving |
| WhatsApp | 65.536 | bericht |
| SMS | 160 | 1 SMS-bericht |

---

## 3 JSON-LD Schemas — Cuối body

### Schema 1: WebApplication

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Tekens Tellen — RekenGemak",
  "url": "https://rekengemak.nl/tekens-tellen/",
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
      "name": "Hoeveel tekens mag een tweet op X (Twitter) hebben?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Op X (voorheen Twitter) mag een post maximaal 280 tekens bevatten. Dit geldt voor de standaard gratis accounts. Links worden automatisch omgezet naar een t.co-link van 23 tekens, ongeacht de originele lengte. De tekenteller op deze pagina telt alle tekens inclusief spaties."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel tekens mag een Instagram caption hebben?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een Instagram-caption mag maximaal 2.200 tekens bevatten. In het overzicht van het bericht worden alleen de eerste 125 tekens getoond, waarna de tekst wordt afgekapt met een 'meer'-link. Voor het beste bereik raden veel marketeers aan om de belangrijkste boodschap in de eerste 125 tekens te plaatsen."
      }
    },
    {
      "@type": "Question",
      "name": "Wat is het verschil tussen tekens met en zonder spaties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tekens inclusief spaties telt alle karakters in de tekst, ook spaties, enters en leestekens. Tekens exclusief spaties telt alleen de zichtbare karakters. Sociale media zoals X en LinkedIn hanteren de telling inclusief spaties. Bij academische opdrachten wordt soms de telling exclusief spaties gevraagd."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel tekens mag een LinkedIn-post hebben?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een LinkedIn-post mag maximaal 3.000 tekens bevatten. De eerste 200 tekens zijn zichtbaar zonder te klikken op 'meer weergeven'. Voor artikelen op LinkedIn ligt de limiet veel hoger, namelijk op 125.000 tekens."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel tekens past er in een SMS-bericht?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een standaard SMS-bericht bevat maximaal 160 tekens in de GSM-7 tekenset, die de meeste Latijnse letters, cijfers en veelgebruikte leestekens omvat. Gebruik je speciale tekens of emoji, dan daalt de limiet naar 70 tekens per SMS. Langere berichten worden automatisch opgesplitst in meerdere SMS-berichten."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel tekens mag een YouTube-beschrijving hebben?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een YouTube-videobeschrijving mag maximaal 5.000 tekens bevatten. De eerste 157 tekens zijn zichtbaar in zoekresultaten. Het is verstandig om relevante zoekwoorden en links in de eerste 200 tekens te plaatsen, omdat de rest standaard ingeklapt is."
      }
    },
    {
      "@type": "Question",
      "name": "Worden emoji ook meegeteld als tekens?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, emoji tellen mee als tekens. Sommige emoji bestaan technisch uit meerdere Unicode-tekens en tellen daarom zwaarder. Op X telt een emoji standaard als 2 tekens. De tekenteller op deze pagina telt op basis van JavaScript string length, wat overeenkomt met de meeste platform-tellingen."
      }
    },
    {
      "@type": "Question",
      "name": "Wordt mijn tekst opgeslagen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, de tekst die je invoert wordt niet opgeslagen en niet verzonden naar een server. De tekenteller werkt volledig in je browser. Als je de pagina sluit of vernieuwt, is de tekst weg."
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
      "name": "Tekens Tellen",
      "item": "https://rekengemak.nl/tekens-tellen/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de tekenteller?"

Plak je tekst in het invoerveld of typ direct. De teller werkt real-time: je ziet meteen het aantal tekens inclusief en exclusief spaties.

Daaronder staan de platformlimieten voor de meest gebruikte sociale media. Een groene balk betekent dat je tekst binnen de limiet valt. Wordt de balk oranje, dan zit je boven de 80 procent van de limiet. Rood betekent dat je de limiet hebt overschreden.

Zo zie je in een oogopslag voor welke platforms je tekst geschikt is en waar je moet inkorten.

### H2: "Voor wie is deze rekenhulp?"

- Social media managers die posts op meerdere platforms willen plaatsen
- Marketeers die advertentieteksten binnen tekenlimieten willen houden
- Journalisten en bloggers die titels en beschrijvingen willen optimaliseren
- Studenten die een maximumaantal tekens moeten aanhouden voor een opdracht
- Iedereen die snel wil controleren of een tekst binnen een tekenlimiet past

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/woorden-tellen/">Woorden tellen</a>
  <a href="/tekst-vergelijken/">Tekst vergelijken</a>
  <a href="/procenten-berekenen/">Procenten berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/korting-berekenen/">Korting berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 + textarea CSS van T-010** — platform bars CSS hieronder toevoegen
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **`oninput` op textarea** — real-time update zonder submit-knop
7. **Stats tonen `0` bij lege textarea** — niet `--`
8. **Platform bars dynamisch bouwen** via `buildPlatformList()` — niet hardcoden in HTML
9. **Kleurlogica platform bars:**
   - 0–80% van limiet → groen (`var(--success)`)
   - 80–100% → oranje (`#E09B3A`) — waarschuwing
   - >100% → rood (`#E05252`) — overschreden, balk op 100% breedte
10. **Count tekst platform:** "X / limiet (Y over)" of "X / limiet (Y te veel)"
11. **`toLocaleString('nl-NL')`** voor alle getallen in platform bars — punten als duizendscheidingsteken
12. **Tekst wordt NIET opgeslagen** — geen localStorage voor tekst
13. **"Kopieer telling"** kopieert alleen de 2 hoofdtellingen als platte tekst
14. **Footer trailing slash** — `/privacy/`, `/contact/`
15. **JSON-LD schemas** — onderaan body, na `</footer>`
16. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-011-tekens-tellen

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-011-tekens.md
git commit -m "docs: add brief TASK-011"

# Stap 3: code committen
git add tekens-tellen/index.html
git commit -m "feat: TASK-011 tekens-tellen tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-011-tekens-tellen
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/tekens-tellen/
```

> **Belangrijk:** Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/tekens-tellen/` — niet op localhost.

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/tekens-tellen/`

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
- [ ] **Sitemap:** tekens-tellen/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Tính toán — Chạy trên live URL

### Hoofd tellers

| Invoer | Incl. spaties | Excl. spaties | PASS/FAIL |
|---|---|---|---|
| `(leeg)` | 0 | 0 | |
| `Hallo` | 5 | 5 | |
| `Hallo wereld` | 12 | 11 | |
| `abc def ghi` | 11 | 9 | |
| `a b c` | 5 | 3 | |

### Platform bars — kleur en telling

| Invoer (tekens) | Platform | Verwacht staat | Count tekst | PASS/FAIL |
|---|---|---|---|---|
| 0 tekens | X / Twitter | groen, "0 / 280 (280 over)" | | |
| 100 tekens | X / Twitter | groen (36%) | "100 / 280 (180 over)" | |
| 230 tekens | X / Twitter | oranje (82%) | "230 / 280 (50 over)" | |
| 280 tekens | X / Twitter | oranje (100%) | "280 / 280 (0 over)" | |
| 300 tekens | X / Twitter | rood, balk 100% | "300 / 280 (20 te veel)" | |
| 100 tekens | SMS | oranje (63%) | "100 / 160 (60 over)" | |
| 200 tekens | SMS | rood | "200 / 160 (40 te veel)" | |

### Platform bars — alle 8 aanwezig

- [ ] X / Twitter (280) aanwezig
- [ ] Instagram (2.200) aanwezig
- [ ] LinkedIn post (3.000) aanwezig
- [ ] Facebook (63.206) aanwezig
- [ ] TikTok (2.200) aanwezig
- [ ] YouTube (5.000) aanwezig
- [ ] WhatsApp (65.536) aanwezig
- [ ] SMS (160) aanwezig

## C. UX op apparaten

- [ ] **Real-time:** typen → tellers + bars direct bijgewerkt
- [ ] **Lege textarea:** beide tellers tonen `0`, alle bars groen op 0%
- [ ] **Knop "Wis tekst":** textarea leeg, tellers 0, focus terug op textarea
- [ ] **Knop "Kopieer telling":** klembord bevat incl. + excl. telling als platte tekst
- [ ] **"Gekopieerd!" feedback:** 1,5 sec → terug
- [ ] **Kleur groen → oranje bij >80%:** visueel zichtbaar op X-bar bij 230 tekens
- [ ] **Kleur rood + balk 100% bij overschrijding:** visueel zichtbaar op X-bar bij 300 tekens
- [ ] **Getallen in bars:** punten als duizendscheidingsteken (nl-NL)
- [ ] **Mobiel 375px:** geen horizontale scroll, platform bars full width
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage `rekengemak-theme` correct

## D. Inhoud

- [ ] **H1** = "Tekens Tellen"
- [ ] **Keyword "tekens tellen"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden**
- [ ] **Privacyvermelding in FAQ:** tekst wordt niet opgeslagen — aanwezig

## Samenvatting

```
Live URL getest: https://rekengemak.nl/tekens-tellen/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
