# TASK-004 — Trang Chủ Redesign & Content
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P0 — uitvoeren NA T-017 (alle 12 tools live)
**Branch:** `feature/TASK-004-homepage-redesign`
**File:** `index.html`

---

# PM REVIEW — HUIDIGE STAAT HOMEPAGE

## Wat goed werkt
- 4-groepen structuur (Financieel / Werk & Salaris / Tekst / Dagelijks) is logisch
- Tool cards met badge "Beschikbaar" / "Binnenkort" werkt duidelijk
- Footer met 4 kolommen en alle links aanwezig
- Dark mode consistent met tool-pagina's

## Problemen geidentificeerd

| # | Probleem | Impact |
|---|---|---|
| 1 | Geen logo/favicon | Merk herkenbaarheid nul, professioneel vertrouwen laag |
| 2 | Thin content — alleen tool-namen + 1 zin | Google ziet homepage als inhoudsloos, geen SEO-waarde |
| 3 | Geen USP-sectie — waarom RekenGemak vs concurrenten? | Geen reden voor bezoeker om te blijven |
| 4 | Geen hamburger menu op mobile | UX probleem op 375px — navigatie ontoegankelijk |
| 5 | Footer mist About + Terms of Service | AdSense vereist deze pagina's expliciet |
| 6 | Geen trust signals | Geen "gratis", "geen registratie", "privacy" zichtbaar |
| 7 | Statisch, geen visuele hiërarchie | Hero sectie te vlak, geen call-to-action |

---

# PHẦN 1: TASK BRIEF

## Mục tiêu

Herbouw de homepage tot een professionele landingspagina die:
1. Bezoekers overtuigt te blijven via duidelijke USPs en trust signals
2. Voldoende content bevat voor Google SEO (geen thin content)
3. AdSense-geschikt is — About en Terms of Service aanwezig
4. Volledig werkt op mobile inclusief hamburger menu
5. Een herkenbaar merk uitstraalt via logo + favicon

---

## SEO Metadata homepage

- **URL canonical:** `https://rekengemak.nl/`
- **Title (62 ký tự):** `RekenGemak -- Gratis Online Rekenhulpen voor Nederland en Belgie`
- **Meta description (155 ký tự):** `Bereken btw, procenten, uurloon, vakantiegeld en meer. Gratis online rekenhulpen voor Nederland en Belgie. Geen registratie, direct resultaat, altijd actueel.`
- **H1:** `Gratis Online Rekenhulpen voor Nederland en Belgie`

---

## Logo & Favicon

### Logo in header
Eenvoudig text-logo met accent — geen externe afbeelding nodig:

```html
<a href="/" class="logo" aria-label="RekenGemak - naar de homepage">
  <span class="logo-reken">Reken</span><span class="logo-gemak">Gemak</span>
</a>
```

```css
.logo { text-decoration: none; font-size: 1.3rem; font-weight: 700; }
.logo-reken { color: var(--text-primary); }
.logo-gemak { color: var(--accent); }
```

### Favicon (SVG inline — geen extern bestand nodig)
```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
    <rect width='32' height='32' rx='6' fill='%231F5C99'/>
    <text x='50%25' y='54%25' font-family='system-ui' font-size='18'
          font-weight='700' fill='white' text-anchor='middle'
          dominant-baseline='middle'>R</text>
  </svg>">
```

---

## Header met hamburger menu (mobile)

```html
<header>
  <div class="header-inner">
    <a href="/" class="logo">
      <span class="logo-reken">Reken</span><span class="logo-gemak">Gemak</span>
    </a>

    <!-- Desktop nav -->
    <nav class="nav-desktop" aria-label="Hoofdnavigatie">
      <a href="/btw-berekenen/">BTW</a>
      <a href="/procenten-berekenen/">Procenten</a>
      <a href="/uurloon-berekenen/">Uurloon</a>
      <a href="/woorden-tellen/">Tekst</a>
    </nav>

    <div style="display:flex;align-items:center;gap:12px;">
      <!-- Dark mode toggle -->
      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Thema wisselen">
        <span id="theme-icon">◑</span>
      </button>
      <!-- Hamburger (alleen mobile) -->
      <button class="hamburger" id="hamburger" onclick="toggleMenu()"
              aria-label="Menu openen" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <!-- Mobile menu -->
  <nav class="nav-mobile" id="nav-mobile" aria-hidden="true">
    <div class="nav-mobile-grid">
      <div class="nav-group">
        <span class="nav-group-title">Financieel</span>
        <a href="/btw-berekenen/">BTW Berekenen</a>
        <a href="/procenten-berekenen/">Procenten Berekenen</a>
        <a href="/korting-berekenen/">Korting Berekenen</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-title">Werk &amp; Salaris</span>
        <a href="/uurloon-berekenen/">Uurloon Berekenen</a>
        <a href="/vakantiegeld-berekenen/">Vakantiegeld Berekenen</a>
        <a href="/vakantiedagen-berekenen/">Vakantiedagen Berekenen</a>
        <a href="/minimumloon-berekenen/">Minimumloon Berekenen</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-title">Tekst</span>
        <a href="/woorden-tellen/">Woorden Tellen</a>
        <a href="/tekens-tellen/">Tekens Tellen</a>
        <a href="/tekst-vergelijken/">Tekst Vergelijken</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-title">Dagelijks</span>
        <a href="/willekeurig-getal/">Willekeurig Getal</a>
        <a href="/wachtwoord-generator/">Wachtwoord Generator</a>
      </div>
    </div>
  </nav>
</header>
```

### CSS hamburger + mobile nav

```css
/* Hamburger knop */
.hamburger {
  display: none;
  flex-direction: column; justify-content: center; align-items: center;
  gap: 5px; width: 40px; height: 40px;
  background: transparent; border: none; cursor: pointer; padding: 6px;
}
.hamburger span {
  display: block; width: 22px; height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile nav panel */
.nav-mobile {
  display: none;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  padding: var(--space-md);
}
.nav-mobile.open { display: block; }

.nav-mobile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}
@media (max-width: 400px) {
  .nav-mobile-grid { grid-template-columns: 1fr; }
}
.nav-group { display: flex; flex-direction: column; gap: 6px; }
.nav-group-title {
  font-size: 0.75rem; font-weight: 700;
  color: var(--accent); text-transform: uppercase;
  letter-spacing: 0.06em; margin-bottom: 2px;
}
.nav-group a {
  font-size: 0.9rem; color: var(--text-secondary);
  text-decoration: none; padding: 3px 0;
  transition: color var(--transition);
}
.nav-group a:hover { color: var(--text-primary); }

/* Desktop nav */
.nav-desktop { display: flex; gap: var(--space-md); }
.nav-desktop a {
  font-size: 0.9rem; color: var(--text-secondary);
  text-decoration: none; transition: color var(--transition);
}
.nav-desktop a:hover { color: var(--text-primary); }

@media (max-width: 768px) {
  .nav-desktop { display: none; }
  .hamburger { display: flex; }
}

/* JS toggle */
/* function toggleMenu() {
  var btn = document.getElementById('hamburger');
  var nav = document.getElementById('nav-mobile');
  var open = nav.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open);
  nav.setAttribute('aria-hidden', !open);
} */
```

---

## Hero Sectie — met USP en trust signals

```html
<section class="hero-home">
  <div class="hero-home-inner">
    <h1>Gratis Online Rekenhulpen<br>voor Nederland en Belgie</h1>
    <p class="hero-sub">
      Bereken btw, uurloon, vakantiegeld, procenten en meer.
      Direct resultaat, geen registratie, volledig gratis.
    </p>

    <!-- Trust badges -->
    <div class="trust-badges">
      <div class="trust-item">
        <span class="trust-icon">✓</span>
        <span>100% gratis</span>
      </div>
      <div class="trust-item">
        <span class="trust-icon">✓</span>
        <span>Geen registratie</span>
      </div>
      <div class="trust-item">
        <span class="trust-icon">✓</span>
        <span>Geen opslag van gegevens</span>
      </div>
      <div class="trust-item">
        <span class="trust-icon">✓</span>
        <span>Altijd actueel 2026</span>
      </div>
    </div>

    <!-- Statistieken -->
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="stat-number">12</span>
        <span class="stat-label">Rekenhulpen</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number">4</span>
        <span class="stat-label">Categorieen</span>
      </div>
      <div class="hero-stat">
        <span class="stat-number">NL + BE</span>
        <span class="stat-label">Beide markten</span>
      </div>
    </div>
  </div>
</section>
```

### CSS hero home

```css
.hero-home {
  text-align: center;
  padding: var(--space-xl) var(--space-md);
  max-width: 720px;
  margin: 0 auto;
}
.hero-home h1 {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 800; line-height: 1.2;
  color: var(--text-primary); margin-bottom: var(--space-md);
}
.hero-sub {
  font-size: 1.1rem; color: var(--text-secondary);
  line-height: 1.6; margin-bottom: var(--space-lg);
}

/* Trust badges */
.trust-badges {
  display: flex; flex-wrap: wrap; justify-content: center;
  gap: 10px; margin-bottom: var(--space-lg);
}
.trust-item {
  display: flex; align-items: center; gap: 6px;
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 20px; padding: 6px 14px;
  font-size: 0.85rem; color: var(--text-secondary);
}
.trust-icon { color: var(--success); font-weight: 700; }

/* Stats */
.hero-stats {
  display: flex; justify-content: center; gap: var(--space-xl);
  flex-wrap: wrap;
}
.hero-stat { text-align: center; }
.stat-number {
  display: block; font-size: 2rem; font-weight: 800;
  color: var(--accent); line-height: 1;
}
.stat-label {
  display: block; font-size: 0.8rem;
  color: var(--text-secondary); margin-top: 4px;
}
```

---

## Tool Cards — verbeterd met hover + link

```css
/* Tool card verbeteringen */
.tool-card-home {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--space-lg);
  text-decoration: none;
  display: block;
  transition: border-color var(--transition), transform 0.15s ease,
              box-shadow var(--transition);
  position: relative;
  overflow: hidden;
}
.tool-card-home::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--accent);
  transform: scaleX(0);
  transition: transform 0.2s ease;
  transform-origin: left;
}
.tool-card-home:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.tool-card-home:hover::before { transform: scaleX(1); }

.tool-card-home .tool-name {
  font-size: 1.05rem; font-weight: 700;
  color: var(--text-primary); margin: 8px 0 6px;
}
.tool-card-home .tool-desc {
  font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;
}
.tool-card-home .tool-arrow {
  position: absolute; bottom: var(--space-md); right: var(--space-md);
  color: var(--accent); font-size: 1.1rem; opacity: 0;
  transition: opacity var(--transition), transform var(--transition);
}
.tool-card-home:hover .tool-arrow {
  opacity: 1; transform: translateX(3px);
}

/* "Binnenkort" kaarten: niet klikbaar, lager contrast */
.tool-card-home.binnenkort {
  cursor: default; pointer-events: none; opacity: 0.6;
}
.tool-card-home.binnenkort:hover { transform: none; box-shadow: none; }
```

---

## USP Sectie — na tool grid, voor footer

```html
<section class="usp-section">
  <div class="usp-grid">

    <div class="usp-item">
      <div class="usp-icon">🔒</div>
      <h3>Privacy eerst</h3>
      <p>
        Alle berekeningen vinden volledig lokaal in je browser plaats.
        Jouw gegevens verlaten nooit je apparaat. Er wordt niets opgeslagen,
        geen cookies voor tracking, geen account vereist.
      </p>
    </div>

    <div class="usp-item">
      <div class="usp-icon">🇳🇱🇧🇪</div>
      <h3>Nederland en Belgie</h3>
      <p>
        RekenGemak is de enige rekenhulp die btw-tarieven voor zowel Nederland
        (0%, 9%, 21%) als Belgie (0%, 6%, 21%) in een en dezelfde tool
        ondersteunt. Gemaakt voor meer dan 24 miljoen Nederlandstaligen.
      </p>
    </div>

    <div class="usp-item">
      <div class="usp-icon">⚡</div>
      <h3>Direct resultaat</h3>
      <p>
        Geen laadtijden, geen wachten, geen gedoe. Elke rekenhulp toont
        het resultaat terwijl je typt. Geen advertenties die de tool
        vertragen, geen pop-ups, geen afleiding.
      </p>
    </div>

    <div class="usp-item">
      <div class="usp-icon">📅</div>
      <h3>Altijd actueel</h3>
      <p>
        Het minimumloon, de btw-tarieven en vakantiegeldregels worden
        bijgehouden en twee keer per jaar gecontroleerd. Je rekent altijd
        met de meest recente wettelijke bedragen voor 2026.
      </p>
    </div>

  </div>
</section>
```

### CSS USP sectie

```css
.usp-section {
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: var(--space-xl) var(--space-md);
  margin: var(--space-xl) 0;
}
.usp-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  max-width: 900px;
  margin: 0 auto;
}
@media (max-width: 600px) {
  .usp-grid { grid-template-columns: 1fr; }
}
.usp-item { padding: var(--space-md); }
.usp-icon { font-size: 1.8rem; margin-bottom: 10px; }
.usp-item h3 {
  font-size: 1rem; font-weight: 700;
  color: var(--text-primary); margin-bottom: 8px;
}
.usp-item p {
  font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;
}
```

---

## SEO Content Sectie — na USP, voor footer

```html
<section class="content-home">
  <div class="content-home-inner">

    <h2>Wat is RekenGemak?</h2>
    <p>
      RekenGemak is een gratis online platform met rekenhulpen voor het dagelijks
      leven in Nederland en Belgie. Of je nu snel de btw wilt uitrekenen, wilt weten
      hoeveel vakantiegeld je krijgt of een sterk wachtwoord nodig hebt: alles staat
      op een plek, werkt direct en is volledig gratis.
    </p>
    <p>
      Alle tools werken zonder account, zonder registratie en zonder dat je gegevens
      worden opgeslagen. De berekeningen vinden volledig in je browser plaats. Je kunt
      RekenGemak gebruiken op je telefoon, tablet of computer.
    </p>

    <h2>Voor wie is RekenGemak?</h2>
    <p>
      RekenGemak is gemaakt voor iedereen die snel en betrouwbaar wil rekenen.
      Ondernemers gebruiken het voor btw-berekeningen en factuurcontroles.
      Werknemers rekenen hun vakantiegeld en vakantiedagen na. Studenten en
      scholieren gebruiken de procenten- en woordenteller voor opdrachten.
      Social media managers controleren hun teksten op tekenlimieten.
    </p>

    <h2>Waarom kiezen voor RekenGemak?</h2>
    <p>
      De meeste online rekenhulpen richten zich op een enkel land, hebben verouderde
      tarieven of zijn overdekt met advertenties die het gebruik vertragen.
      RekenGemak biedt 12 moderne tools in een overzichtelijke interface, ondersteunt
      zowel de Nederlandse als de Belgische markt en wordt twee keer per jaar
      bijgewerkt met de nieuwste wettelijke bedragen.
    </p>

  </div>
</section>
```

### CSS content home

```css
.content-home {
  padding: var(--space-xl) var(--space-md);
}
.content-home-inner {
  max-width: 720px; margin: 0 auto;
}
.content-home h2 {
  font-size: 1.25rem; font-weight: 700;
  color: var(--text-primary); margin: var(--space-lg) 0 var(--space-sm);
}
.content-home h2:first-child { margin-top: 0; }
.content-home p {
  font-size: 0.95rem; color: var(--text-secondary);
  line-height: 1.7; margin-bottom: var(--space-md);
}
```

---

## Footer — uitgebreid met About + Terms

```html
<footer>
  <div class="footer-grid">

    <div class="footer-col">
      <div class="footer-brand">
        <span class="logo-reken">Reken</span><span class="logo-gemak">Gemak</span>
      </div>
      <p class="footer-desc">
        Gratis online rekenhulpen voor Nederland en Belgie. Altijd actueel, altijd gratis.
      </p>
    </div>

    <div class="footer-col">
      <span class="footer-title">Financieel</span>
      <a href="/btw-berekenen/">BTW Berekenen</a>
      <a href="/procenten-berekenen/">Procenten Berekenen</a>
      <a href="/korting-berekenen/">Korting Berekenen</a>
    </div>

    <div class="footer-col">
      <span class="footer-title">Werk &amp; Salaris</span>
      <a href="/uurloon-berekenen/">Uurloon Berekenen</a>
      <a href="/vakantiegeld-berekenen/">Vakantiegeld Berekenen</a>
      <a href="/vakantiedagen-berekenen/">Vakantiedagen Berekenen</a>
      <a href="/minimumloon-berekenen/">Minimumloon Berekenen</a>
    </div>

    <div class="footer-col">
      <span class="footer-title">Tekst</span>
      <a href="/woorden-tellen/">Woorden Tellen</a>
      <a href="/tekens-tellen/">Tekens Tellen</a>
      <a href="/tekst-vergelijken/">Tekst Vergelijken</a>
    </div>

    <div class="footer-col">
      <span class="footer-title">Dagelijks</span>
      <a href="/willekeurig-getal/">Willekeurig Getal</a>
      <a href="/wachtwoord-generator/">Wachtwoord Generator</a>
    </div>

    <div class="footer-col">
      <span class="footer-title">Over ons</span>
      <a href="/about/">Over RekenGemak</a>
      <a href="/contact/">Contact</a>
      <a href="/privacy/">Privacybeleid</a>
      <a href="/terms/">Gebruiksvoorwaarden</a>
    </div>

  </div>

  <div class="footer-bottom">
    <span>&copy; 2026 RekenGemak</span>
    <span>Gratis rekenhulpen voor Nederland en Belgie</span>
  </div>
</footer>
```

---

## Nieuwe pagina's — About en Terms (vereist voor AdSense)

### `/about/index.html` — minimale inhoud

```
H1: Over RekenGemak
Tekst: Wat is RekenGemak, wie maakt het, missie (gratis tools NL+BE),
       hoe tools up-to-date gehouden worden, contactmogelijkheid.
~200 woorden. Geen tools, geen ads. 3 interne links.
```

### `/terms/index.html` — minimale inhoud

```
H1: Gebruiksvoorwaarden
Secties:
1. Gebruik van de tools (informatief, geen garantie op juistheid)
2. Intellectueel eigendom
3. Aansprakelijkheid (indicatieve berekeningen, raadpleeg professional)
4. Wijzigingen in de voorwaarden
5. Contactgegevens
~300 woorden. Geen tools, geen ads. 3 interne links.
```

> **Belangrijk voor AdSense:** Google controleert bij beoordeling of About en Terms bereikbaar zijn vanuit de footer. Beide pagina's moeten live zijn VOOR de AdSense-aanvraag.

---

## JSON-LD Schema — Homepage

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RekenGemak",
  "url": "https://rekengemak.nl/",
  "description": "Gratis online rekenhulpen voor Nederland en Belgie. BTW, procenten, uurloon, vakantiegeld en meer.",
  "inLanguage": "nl",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://rekengemak.nl/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## Header Synchronisatie — ALLE 12 landingspagina's

> **Probleem:** De huidige header op tool-pagina's wijkt af van de homepage-header. Dit geeft een inconsistente merkbeleving en moet in deze task tegelijk worden opgelost.

### Standaard header — identiek op ELKE pagina van de site

De header hieronder is de enige toegestane header-variant. Dev past deze toe op:
- `index.html` (homepage)
- Alle 12 tool-pagina's (btw-berekenen, procenten-berekenen, enz.)
- `about/index.html` en `terms/index.html`

```html
<header>
  <div class="header-inner">

    <!-- Logo — altijd terug naar homepage -->
    <a href="/" class="logo" aria-label="RekenGemak homepage">
      <span class="logo-reken">Reken</span><span class="logo-gemak">Gemak</span>
    </a>

    <!-- Desktop nav — verborgen op mobile -->
    <nav class="nav-desktop" aria-label="Hoofdnavigatie">
      <a href="/btw-berekenen/">BTW</a>
      <a href="/procenten-berekenen/">Procenten</a>
      <a href="/uurloon-berekenen/">Uurloon</a>
      <a href="/woorden-tellen/">Tekst</a>
    </nav>

    <div style="display:flex;align-items:center;gap:12px;">
      <!-- Dark mode toggle — zelfde knop als bestaande pagina's -->
      <button class="theme-toggle" onclick="toggleTheme()" aria-label="Thema wisselen">◑</button>
      <!-- Hamburger — alleen zichtbaar op mobile -->
      <button class="hamburger" id="hamburger" onclick="toggleMenu()"
              aria-label="Menu openen" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>

  <!-- Mobile dropdown nav -->
  <nav class="nav-mobile" id="nav-mobile" aria-hidden="true">
    <div class="nav-mobile-grid">
      <div class="nav-group">
        <span class="nav-group-title">Financieel</span>
        <a href="/btw-berekenen/">BTW Berekenen</a>
        <a href="/procenten-berekenen/">Procenten Berekenen</a>
        <a href="/korting-berekenen/">Korting Berekenen</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-title">Werk &amp; Salaris</span>
        <a href="/uurloon-berekenen/">Uurloon Berekenen</a>
        <a href="/vakantiegeld-berekenen/">Vakantiegeld Berekenen</a>
        <a href="/vakantiedagen-berekenen/">Vakantiedagen Berekenen</a>
        <a href="/minimumloon-berekenen/">Minimumloon Berekenen</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-title">Tekst</span>
        <a href="/woorden-tellen/">Woorden Tellen</a>
        <a href="/tekens-tellen/">Tekens Tellen</a>
        <a href="/tekst-vergelijken/">Tekst Vergelijken</a>
      </div>
      <div class="nav-group">
        <span class="nav-group-title">Dagelijks</span>
        <a href="/minimumloon-berekenen/">Minimumloon Berekenen</a>
        <a href="/willekeurig-getal/">Willekeurig Getal</a>
        <a href="/wachtwoord-generator/">Wachtwoord Generator</a>
      </div>
    </div>
  </nav>
</header>
```

### Pagina's die header-update krijgen in deze task

| Pagina | Bestand | Actie |
|---|---|---|
| Homepage | `index.html` | Nieuwe header (onderdeel redesign) |
| BTW Berekenen | `btw-berekenen/index.html` | Header vervangen |
| Procenten Berekenen | `procenten-berekenen/index.html` | Header vervangen |
| Korting Berekenen | `korting-berekenen/index.html` | Header vervangen |
| Uurloon Berekenen | `uurloon-berekenen/index.html` | Header vervangen |
| Vakantiegeld Berekenen | `vakantiegeld-berekenen/index.html` | Header vervangen |
| Vakantiedagen Berekenen | `vakantiedagen-berekenen/index.html` | Header vervangen |
| Woorden Tellen | `woorden-tellen/index.html` | Header vervangen |
| Tekens Tellen | `tekens-tellen/index.html` | Header vervangen |
| Tekst Vergelijken | `tekst-vergelijken/index.html` | Header vervangen |
| Minimumloon Berekenen | `minimumloon-berekenen/index.html` | Header vervangen |
| Willekeurig Getal | `willekeurig-getal/index.html` | Header vervangen |
| Wachtwoord Generator | `wachtwoord-generator/index.html` | Header vervangen (T-017 meenemen bij deploy) |
| About | `about/index.html` | Header meenemen bij aanmaken |
| Terms | `terms/index.html` | Header meenemen bij aanmaken |

> **Tip voor Dev:** Gebruik een sed-script of find-replace over alle bestanden voor het `<header>`-blok. Handmatig 15 bestanden aanpassen is foutgevoelig. Controleer daarna of `toggleTheme()` nog werkt op elke pagina — de dark mode JS moet al aanwezig zijn.

### CSS die bij header hoort — toevoegen aan ALLE pagina's

De CSS-blokken voor `.logo`, `.hamburger`, `.nav-desktop`, `.nav-mobile`, `.nav-group` staan gespecificeerd in de **Header sectie** eerder in dit brief. Dev voegt deze CSS-blokken toe aan het bestaande `<style>`-blok van elke pagina. Bestaande header-CSS (indien afwijkend) verwijderen.

---

## Samenvatting wijzigingen

| Onderdeel | Wijziging |
|---|---|
| Logo | Text-logo "RekenGemak" met accent-kleur op "Gemak" — op ALLE pagina's |
| Favicon | SVG inline — "R" op blauwe achtergrond |
| Header | Uniforme header op alle 15 pagina's (12 tools + home + about + terms) |
| Hamburger | Mobile nav menu op ALLE pagina's — niet alleen homepage |
| Hero | H1 + subtitel + 4 trust badges + 3 statistieken |
| Tool cards | Hover animatie, pijl-indicator, klikbare kaarten |
| USP sectie | 4 blokken: Privacy / NL+BE / Direct resultaat / Actueel |
| SEO content | 3 H2-secties, ~300 woorden over wat/voor wie/waarom |
| Footer | Brand kolom toegevoegd, About + Terms links toegevoegd |
| About pagina | Nieuw: `/about/` — vereist voor AdSense |
| Terms pagina | Nieuw: `/terms/` — vereist voor AdSense |

---

## Dev Rules — Niet overslaan

1. **1 HTML-bestand per pagina** — alles inline (index.html, about/index.html, terms/index.html)
2. **Dark mode script** — eerste tag in `<head>` op ALLE pagina's
3. **GSC + GA4** — aanwezig op ALLE pagina's (ook about/ en terms/)
4. **Header IDENTIEK op alle pagina's** — geen afwijkingen toegestaan tussen homepage en tool-pagina's
5. **`toggleMenu()` JS aanwezig op ALLE pagina's** — niet alleen homepage
6. **Tool cards als `<a href>` tags** — niet als div — voor semantiek en SEO
7. **"Binnenkort" cards:** `pointer-events: none` + geen href + lager contrast
8. **Na T-017 live:** alle 12 cards op "Beschikbaar" zetten
9. **Footer trailing slash** — `/about/`, `/terms/`, `/privacy/`, `/contact/`
10. **Geen emoji in JSON-LD** — alleen in HTML content

---

# PHẦN 2: GIT WORKFLOW

```bash
git checkout -b feature/TASK-004-homepage-redesign

# Commit 1: header sync op alle 12 bestaande tool-pagina's
git add btw-berekenen/index.html procenten-berekenen/index.html \
        korting-berekenen/index.html uurloon-berekenen/index.html \
        vakantiegeld-berekenen/index.html vakantiedagen-berekenen/index.html \
        woorden-tellen/index.html tekens-tellen/index.html \
        tekst-vergelijken/index.html minimumloon-berekenen/index.html \
        willekeurig-getal/index.html wachtwoord-generator/index.html
git commit -m "feat: TASK-004 sync header op alle tool-pagina's"

# Commit 2: homepage redesign
git add index.html
git commit -m "feat: TASK-004 homepage redesign met USP, content, hamburger menu"

# Commit 3: about pagina
git add about/index.html
git commit -m "feat: TASK-004 add about pagina"

# Commit 4: terms pagina
git add terms/index.html
git commit -m "feat: TASK-004 add terms pagina"

git push origin feature/TASK-004-homepage-redesign
# PR aanmaken → DIRECT MERGEN naar main
# Cloudflare Pages auto-deploy in 2-3 minuten
```

---

# PHẦN 3: CHECKLIST TEST LIVE

> **Live URL:** `https://rekengemak.nl/`

## A. Kỹ thuật

- [ ] PageSpeed mobile >= 90
- [ ] PageSpeed desktop >= 95
- [ ] GSC + GA4 aanwezig op homepage
- [ ] GSC + GA4 aanwezig op /about/ en /terms/
- [ ] JSON-LD WebSite schema aanwezig
- [ ] Favicon zichtbaar in browser tab
- [ ] HTTP 200 op /, /about/, /terms/

## B. Visueel

- [ ] Logo "RekenGemak" zichtbaar in header, "Gemak" in accent-kleur
- [ ] Hero: H1 + 4 trust badges + 3 statistieken zichtbaar
- [ ] USP sectie: 4 blokken zichtbaar
- [ ] SEO content: 3 H2-secties zichtbaar
- [ ] Footer: 6 kolommen inclusief "Over ons" met 4 links

## C. Interactie

- [ ] Desktop (> 768px): hamburger NIET zichtbaar, nav-desktop WEL
- [ ] Mobile (< 768px): hamburger WEL zichtbaar, nav-desktop NIET
- [ ] Hamburger klikken: menu opent/sluit correct
- [ ] Hamburger animatie: 3 strepen → kruis bij openen
- [ ] Tool card hover: border blauw, lichte lift, pijl zichtbaar
- [ ] Alle 12 tool cards klikken → juiste URL
- [ ] "Binnenkort" cards: niet klikbaar, gereduceerde opacity

## D. Pagina's About + Terms

- [ ] `/about/` laadt, H1 aanwezig, 3+ interne links
- [ ] `/terms/` laadt, H1 aanwezig, 5 secties aanwezig
- [ ] Beide pagina's bereikbaar via footer
- [ ] Beide pagina's in sitemap

## F. Header Sync — tool-pagina's (spot-check 4 pagina's)

- [ ] `btw-berekenen/`: logo "RekenGemak" zichtbaar, "Gemak" in accent-kleur
- [ ] `uurloon-berekenen/`: hamburger zichtbaar op 375px
- [ ] `woorden-tellen/`: mobile nav opent met alle 4 groepen
- [ ] `minimumloon-berekenen/`: desktop nav-links aanwezig, hamburger verborgen
- [ ] Alle tool-pagina's: `toggleMenu()` werkt (geen JS-fout in console)
- [ ] Alle tool-pagina's: dark mode toggle werkt nog steeds na header-update

- [ ] `/about/` live en bereikbaar
- [ ] `/terms/` live en bereikbaar
- [ ] `/privacy/` live en bereikbaar
- [ ] `/contact/` live en bereikbaar
- [ ] Geen broken links in footer

## Samenvatting

```
Live URL: https://rekengemak.nl/
Totaal PASS: [X] / [totaal]
Totaal FAIL: [lijst]
Opmerkingen: [indien van toepassing]
```
