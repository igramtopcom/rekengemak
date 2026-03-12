# TASK-012 — Tekst Vergelijken
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P2
**Branch:** `feature/TASK-012-tekst-vergelijken`
**File:** `tekst-vergelijken/index.html`

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Xây dựng công cụ Tekst Vergelijken tại `/tekst-vergelijken/` — so sánh 2 văn bản và hiển thị sự khác biệt ở cấp độ từ (word-level diff). Từ bị xóa hiển thị màu đỏ có gạch ngang, từ được thêm hiển thị màu xanh có gạch dưới. Kết quả hiển thị ngay khi người dùng nhấn nút so sánh.

---

## SEO Metadata

- **URL canonical:** `https://rekengemak.nl/tekst-vergelijken/`
- **Title (58 ký tự):** `Tekst Vergelijken Online Gratis -- Verschillen Vinden | RekenGemak`
- **Meta description (154 ký tự):** `Vergelijk twee teksten en zie direct de verschillen. Gratis online tekstvergeliiker met woordniveau diff. Handig voor revisies, vertalingen en tekstcontrole.`
- **H1:** `Tekst Vergelijken`
- **Từ khóa chính:** `tekst vergelijken` (8K–14K/tháng, KD 8–14)
- **Từ khóa dài:**
  - tekst vergelijken online gratis
  - twee teksten vergelijken
  - verschillen vinden in tekst
  - tekst diff online
  - tekstverschillen markeren
  - revisie tekst controleren

---

## Open Graph Tags

```html
<meta property="og:title"       content="Tekst Vergelijken Online Gratis -- Verschillen Vinden | RekenGemak">
<meta property="og:description" content="Vergelijk twee teksten en zie direct de verschillen. Gratis online tekstvergelijker met woordniveau diff. Handig voor revisies, vertalingen en tekstcontrole.">
<meta property="og:url"         content="https://rekengemak.nl/tekst-vergelijken/">
<meta property="og:type"        content="website">
```

---

## CSS — Zelfde 8-block structuur als T-001

Dev kopieert CSS van `btw-berekenen/index.html` volledig. Textarea CSS overnemen van T-010. Aanvullende CSS voor diff output hieronder.

### Aanvullende CSS

```css
/* ═══ TEXTAREA (van T-010) ════════════════════════════════════════════ */
.textarea-wrap {
  position: relative;
  margin-bottom: var(--space-md);
}

textarea {
  width: 100%;
  min-height: 160px;
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

/* ═══ TWEE KOLOMMEN INPUT ══════════════════════════════════════════════ */
.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
}

@media (max-width: 600px) {
  .compare-grid { grid-template-columns: 1fr; }
}

.compare-col label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* ═══ DIFF OUTPUT ══════════════════════════════════════════════════════ */
.diff-output {
  display: none;
  margin-top: var(--space-md);
}

.diff-output.visible {
  display: block;
}

.diff-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
  flex-wrap: wrap;
  gap: 8px;
}

.diff-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.diff-stats {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.diff-box {
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-md);
  line-height: 1.8;
  font-size: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
}

/* Verwijderde woorden */
.diff-del {
  background: rgba(224, 82, 82, 0.18);
  color: #E05252;
  text-decoration: line-through;
  border-radius: 3px;
  padding: 0 2px;
}

/* Toegevoegde woorden */
.diff-add {
  background: rgba(46, 160, 67, 0.18);
  color: var(--success);
  text-decoration: underline;
  border-radius: 3px;
  padding: 0 2px;
}

/* Identieke tekst */
.diff-same {
  color: var(--text-primary);
}

/* Legenda */
.diff-legend {
  display: flex;
  gap: var(--space-md);
  margin-top: 10px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.legend-dot {
  width: 12px; height: 12px;
  border-radius: 2px;
  flex-shrink: 0;
}

.legend-dot.del { background: rgba(224, 82, 82, 0.4); }
.legend-dot.add { background: rgba(46, 160, 67, 0.4); }

/* Identiek-melding */
.diff-identical {
  text-align: center;
  padding: var(--space-lg);
  color: var(--success);
  font-weight: 600;
  font-size: 1.1rem;
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
    <a href="/">Thuis</a> &rsaquo; <span>Tekst Vergelijken</span>
  </nav>
  <h1>Tekst Vergelijken</h1>
  <p style="color:var(--text-secondary);margin-top:8px;font-size:1rem;">
    Plak twee versies van een tekst en zie direct welke woorden zijn toegevoegd of verwijderd.
  </p>
</div>
```

---

## Tool Card

```html
<section class="tool-card" aria-label="Tekst Vergelijken">

  <!-- Twee tekstkolommen -->
  <div class="compare-grid">
    <div class="compare-col">
      <label for="tekst-a">Originele tekst</label>
      <div class="textarea-wrap">
        <textarea id="tekst-a"
                  placeholder="Plak hier de originele tekst..."
                  aria-label="Originele tekst"></textarea>
      </div>
    </div>
    <div class="compare-col">
      <label for="tekst-b">Nieuwe tekst</label>
      <div class="textarea-wrap">
        <textarea id="tekst-b"
                  placeholder="Plak hier de nieuwe tekst..."
                  aria-label="Nieuwe tekst"></textarea>
      </div>
    </div>
  </div>

  <!-- Actieknoppen -->
  <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
    <button class="btn-primary" onclick="runDiff()" id="btn-vergelijk">
      Vergelijk teksten
    </button>
    <button class="btn-secondary" onclick="resetTool()">
      Wis alles
    </button>
  </div>

  <!-- Diff output -->
  <div class="diff-output" id="diff-output">

    <div class="diff-header">
      <span class="diff-title">Resultaat</span>
      <span class="diff-stats" id="diff-stats"></span>
    </div>

    <div class="diff-box" id="diff-box"></div>

    <div class="diff-legend">
      <div class="legend-item">
        <div class="legend-dot del"></div>
        <span>Verwijderd</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot add"></div>
        <span>Toegevoegd</span>
      </div>
    </div>

    <div style="margin-top:var(--space-md);">
      <button class="btn-copy" onclick="copyDiff()" id="btn-copy-diff">
        Kopieer resultaat (platte tekst)
      </button>
    </div>

  </div>

</section>
```

---

## Logic JavaScript

```javascript
/* ═══ WORD-LEVEL DIFF ALGORITME ═════════════════════════════════════════
   Implementatie van Myers diff op woordniveau.
   Invoer: twee strings.
   Uitvoer: array van { type: 'same'|'del'|'add', text: string }
════════════════════════════════════════════════════════════════════════ */

/* Splits tekst in tokens: woorden + witruimte als aparte tokens */
function tokenize(str) {
  /* Split op witruimte maar bewaar de witruimte als token */
  return str.split(/(\s+)/);
}

/* LCS-gebaseerde diff (eenvoudige implementatie) */
function diffTokens(a, b) {
  var m = a.length;
  var n = b.length;

  /* DP tabel voor LCS */
  var dp = [];
  for (var i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      if (a[i-1] === b[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }

  /* Backtrack om diff te reconstrueren */
  var result = [];
  var i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i-1] === b[j-1]) {
      result.unshift({ type: 'same', text: a[i-1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) {
      result.unshift({ type: 'add', text: b[j-1] });
      j--;
    } else {
      result.unshift({ type: 'del', text: a[i-1] });
      i--;
    }
  }
  return result;
}

/* ═══ RUN DIFF ══════════════════════════════════════════════════════════ */
function runDiff() {
  var a = document.getElementById('tekst-a').value;
  var b = document.getElementById('tekst-b').value;

  var output = document.getElementById('diff-output');
  var box    = document.getElementById('diff-box');
  var stats  = document.getElementById('diff-stats');

  /* Lege invoer afhandelen */
  if (!a.trim() && !b.trim()) {
    output.classList.remove('visible');
    return;
  }

  var tokensA = tokenize(a);
  var tokensB = tokenize(b);
  var diff    = diffTokens(tokensA, tokensB);

  /* Tel wijzigingen */
  var nDel = 0, nAdd = 0;
  diff.forEach(function(d) {
    if (d.type === 'del' && d.text.trim()) nDel++;
    if (d.type === 'add' && d.text.trim()) nAdd++;
  });

  /* Render */
  box.innerHTML = '';

  if (nDel === 0 && nAdd === 0) {
    /* Identieke teksten */
    box.innerHTML = '<div class="diff-identical">Teksten zijn identiek.</div>';
    stats.textContent = '';
  } else {
    diff.forEach(function(d) {
      var span = document.createElement('span');
      span.textContent = d.text;
      if (d.type === 'del') span.className = 'diff-del';
      else if (d.type === 'add') span.className = 'diff-add';
      else span.className = 'diff-same';
      box.appendChild(span);
    });
    stats.textContent =
      nDel + ' verwijderd' + (nDel !== 1 ? '' : '') +
      ' · ' + nAdd + ' toegevoegd';
  }

  output.classList.add('visible');
}

/* ═══ RESET ═════════════════════════════════════════════════════════════ */
function resetTool() {
  document.getElementById('tekst-a').value = '';
  document.getElementById('tekst-b').value = '';
  document.getElementById('diff-output').classList.remove('visible');
  document.getElementById('diff-box').innerHTML = '';
  document.getElementById('diff-stats').textContent = '';
  document.getElementById('tekst-a').focus();
}

/* ═══ COPY DIFF ═════════════════════════════════════════════════════════
   Kopieert platte tekst: [DEL: woord] en [ADD: woord] notatie
════════════════════════════════════════════════════════════════════════ */
function copyDiff() {
  var box   = document.getElementById('diff-box');
  var spans = box.querySelectorAll('span');
  var txt   = '';
  spans.forEach(function(s) {
    if (s.classList.contains('diff-del')) {
      txt += '[DEL: ' + s.textContent + ']';
    } else if (s.classList.contains('diff-add')) {
      txt += '[ADD: ' + s.textContent + ']';
    } else {
      txt += s.textContent;
    }
  });
  if (!txt) return;
  navigator.clipboard.writeText(txt).then(function() {
    var btn = document.getElementById('btn-copy-diff');
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
  "name": "Tekst Vergelijken — RekenGemak",
  "url": "https://rekengemak.nl/tekst-vergelijken/",
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
      "name": "Hoe werkt de tekstvergelijker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plak de originele tekst in het linker veld en de nieuwe versie in het rechter veld. Klik op 'Vergelijk teksten' en de tool markeert direct welke woorden zijn verwijderd (rood, doorgestreept) en welke zijn toegevoegd (groen, onderstreept). Ongewijzigde woorden blijven gewoon zichtbaar."
      }
    },
    {
      "@type": "Question",
      "name": "Op welk niveau worden de teksten vergeleken?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De vergelijking werkt op woordniveau. Elk woord in de originele tekst wordt vergeleken met de nieuwe tekst. Dit is handig voor het controleren van revisies, omdat je precies ziet welke woorden zijn gewijzigd, verplaatst of vervangen. Kleine spellingwijzigingen worden ook opgemerkt."
      }
    },
    {
      "@type": "Question",
      "name": "Waarvoor gebruik je een tekstvergelijker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Een tekstvergelijker gebruik je voor het controleren van tekstrevisiess, het vergelijken van twee versies van een vertaling, het opsporen van ongewenste wijzigingen in contracten of juridische teksten, en het controleren of een herziene tekst alleen de beoogde aanpassingen bevat."
      }
    },
    {
      "@type": "Question",
      "name": "Werkt de vergelijker ook met lange teksten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de vergelijker werkt met teksten van elke lengte. Bij zeer lange teksten kan de berekening een halve seconde langer duren. Het resultaat is altijd nauwkeurig, ongeacht de lengte van de tekst."
      }
    },
    {
      "@type": "Question",
      "name": "Worden hoofdletters en leestekens meegenomen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, de vergelijking is hoofdlettergevoelig. 'Hallo' en 'hallo' worden als twee verschillende woorden beschouwd. Ook leestekens worden meegenomen: een punt of komma aan het einde van een woord telt mee als onderdeel van dat woord."
      }
    },
    {
      "@type": "Question",
      "name": "Kan ik het resultaat opslaan of exporteren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, met de knop 'Kopieer resultaat' kopieer je de volledige diff als platte tekst naar je klembord. Verwijderde woorden worden gemarkeerd met [DEL: woord] en toegevoegde woorden met [ADD: woord]. Zo kun je het resultaat plakken in een e-mail, document of teksteditor."
      }
    },
    {
      "@type": "Question",
      "name": "Wat betekent het als er geen verschillen worden gevonden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als de twee teksten identiek zijn, toont de vergelijker de melding 'Teksten zijn identiek.' Dit betekent dat er geen enkel woord of teken verschilt tussen de twee versies, inclusief spaties en leestekens."
      }
    },
    {
      "@type": "Question",
      "name": "Wordt mijn tekst opgeslagen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, de teksten die je invoert worden niet opgeslagen en niet verzonden naar een server. De vergelijking gebeurt volledig in je browser. Als je de pagina sluit of vernieuwt, zijn beide teksten weg."
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
      "name": "Tekst Vergelijken",
      "item": "https://rekengemak.nl/tekst-vergelijken/"
    }
  ]
}
```

---

## Nội dung tiếng Hà Lan — Article section

### H2: "Hoe werkt de tekstvergelijker?"

Plak de originele tekst in het linker invoerveld en de gewijzigde versie in het rechter veld. Klik op "Vergelijk teksten" en de tool laat direct zien wat er is veranderd.

Verwijderde woorden zijn rood gekleurd en doorgestreept. Toegevoegde woorden zijn groen en onderstreept. Woorden die niet zijn gewijzigd, blijven gewoon leesbaar staan. Zo zie je in een oogopslag hoe groot de revisie is en wat er precies is aangepast.

Met "Kopieer resultaat" sla je de diff op als platte tekst met [DEL] en [ADD] markeringen. Handig om in een e-mail of document te plakken.

### H2: "Voor wie is deze rekenhulp?"

- Schrijvers en redacteuren die twee versies van een tekst willen vergelijken
- Vertalers die een bronvertaling willen controleren op ongewenste wijzigingen
- Juristen en contractbeheerders die documentversies willen vergelijken
- Studenten die een eerste en tweede conceptversie naast elkaar willen leggen
- Iedereen die snel wil zien wat er is veranderd tussen twee teksten

### H2: "Veelgestelde vragen"

8 Q&A — `div.faq > div.faq-item > h3 + p` — zelfde tekst als FAQPage schema.

### H2: "Gerelateerde rekenhulpen"

```html
<div class="related-tools">
  <a href="/woorden-tellen/">Woorden tellen</a>
  <a href="/tekens-tellen/">Tekens tellen</a>
  <a href="/procenten-berekenen/">Procenten berekenen</a>
  <a href="/btw-berekenen/">BTW berekenen</a>
  <a href="/korting-berekenen/">Korting berekenen</a>
</div>
```

---

## Dev Rules — Niet overslaan

1. **CSS van T-001 + textarea CSS van T-010** — diff output CSS toevoegen
2. **1 HTML-bestand** — alles inline
3. **Geen framework, geen externe bibliotheken**
4. **`<html lang="nl">`** — verplicht
5. **Dark mode script** — eerste tag in `<head>`
6. **Geen `oninput` op textarea** — diff wordt alleen gestart bij klikken op "Vergelijk teksten"
7. **Diff algoritme: LCS op woordniveau** — implementeer zoals de JS spec hierboven
8. **Witruimte als aparte token** — `tokenize()` splitst op `(\s+)` zodat spaties en enters bewaard blijven in het resultaat
9. **Identieke teksten:** toon melding "Teksten zijn identiek." — geen lege diff-box
10. **Lege invoer:** geen diff starten als beide velden leeg zijn
11. **Copy output:** `[DEL: ...]` en `[ADD: ...]` notatie in platte tekst
12. **Diff output verborgen bij pageload** — `display:none`, alleen zichtbaar na klikken
13. **`btn-primary` stijl** — zelfde als `btn-copy` maar fullwidth op mobile is niet vereist
14. **Tekst wordt NIET opgeslagen** — geen localStorage voor tekst
15. **Footer trailing slash** — `/privacy/`, `/contact/`
16. **JSON-LD schemas** — onderaan body, na `</footer>`
17. **FAQ** — `div.faq > div.faq-item > h3 + p`

---

# PHẦN 2: GIT WORKFLOW & DEPLOY

```bash
# Stap 1: branch aanmaken
git checkout -b feature/TASK-012-tekst-vergelijken

# Stap 2: brief committen VOOR code
git add docs/tasks/TASK-012-tekst-vergelijken.md
git commit -m "docs: add brief TASK-012"

# Stap 3: code committen
git add tekst-vergelijken/index.html
git commit -m "feat: TASK-012 tekst-vergelijken tool"

# Stap 4: push + PR aanmaken + DIRECT MERGEN naar main
git push origin feature/TASK-012-tekst-vergelijken
# Cloudflare Pages auto-deploy in 2-3 minuten
# Live URL: https://rekengemak.nl/tekst-vergelijken/
```

> **Belangrijk:** Merge naar main VOOR je het testrapport opstuurt. Test uitsluitend op `https://rekengemak.nl/tekst-vergelijken/` — niet op localhost.

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/tekst-vergelijken/`

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
- [ ] **Sitemap:** tekst-vergelijken/ vermeld
- [ ] **HTTP 200 + HTTPS actief**

## B. Diff correctheid — Chạy trên live URL

### Basis diff

| Tekst A | Tekst B | Verwacht | PASS/FAIL |
|---|---|---|---|
| `Hallo wereld` | `Hallo wereld` | "Teksten zijn identiek." | |
| `Hallo wereld` | `Hallo Nederland` | "wereld" rood DEL, "Nederland" groen ADD | |
| `een twee drie` | `een drie` | "twee" rood DEL, rest ongewijzigd | |
| `een drie` | `een twee drie` | "twee" groen ADD, rest ongewijzigd | |
| `De kat zit op de mat` | `De hond zit op de mat` | "kat" DEL, "hond" ADD | |
| (leeg) | (leeg) | Geen diff, output verborgen | |
| `Hallo` | (leeg) | "Hallo" volledig rood DEL | |
| (leeg) | `Hallo` | "Hallo" volledig groen ADD | |

### Diff statistieken

| Scenario | Verwacht stats tekst | PASS/FAIL |
|---|---|---|
| 1 woord DEL, 1 woord ADD | "1 verwijderd · 1 toegevoegd" | |
| 2 woorden DEL, 0 ADD | "2 verwijderd · 0 toegevoegd" | |
| Identieke teksten | Geen stats tekst | |

### Kopieer output (platte tekst)

| Scenario | Verwacht klembord | PASS/FAIL |
|---|---|---|
| "Hallo wereld" vs "Hallo Nederland" | `Hallo [DEL: wereld][ADD: Nederland]` | |
| Identieke teksten | Geen actie (knop doet niets) | |

## C. UX op apparaten

- [ ] **Pageload:** diff-output verborgen, beide textarea's leeg
- [ ] **Knop "Vergelijk teksten":** klikken → diff zichtbaar
- [ ] **Knop "Wis alles":** beide textarea's leeg, diff verborgen, focus op tekst-a
- [ ] **Identieke teksten:** melding "Teksten zijn identiek." zichtbaar in diff-box
- [ ] **DEL kleur:** rood + doorgestreept
- [ ] **ADD kleur:** groen + onderstreept
- [ ] **Legenda:** "Verwijderd" + "Toegevoegd" zichtbaar onder diff-box
- [ ] **Knop "Kopieer resultaat":** → "Gekopieerd!" 1,5 sec → terug
- [ ] **Desktop:** twee textarea's naast elkaar (grid 1fr 1fr)
- [ ] **Mobiel 375px:** twee textarea's onder elkaar, geen scroll
- [ ] **Hard refresh:** dark mode direct, geen witte flits
- [ ] **Toggle light/dark:** werkt, localStorage `rekengemak-theme` correct

## D. Inhoud

- [ ] **H1** = "Tekst Vergelijken"
- [ ] **Keyword "tekst vergelijken"** in eerste 100 woorden artikel
- [ ] **FAQ:** 8 vragen, antwoorden 40–80 woorden, natuurlijk Nederlands
- [ ] **Minimaal 5 interne links**
- [ ] **Geen em dash, geen "...", geen AI-woorden**
- [ ] **Privacyvermelding in FAQ:** tekst wordt niet opgeslagen — aanwezig

## Samenvatting

```
Live URL getest: https://rekengemak.nl/tekst-vergelijken/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
