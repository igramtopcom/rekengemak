# TASK-005 — Google Search Console + GA4 Implementatie
**Status:** TODO → IN_PROGRESS
**Prioriteit:** P0 — uitvoeren VOOR T-14 en T-17
**Branch:** `feature/TASK-005-analytics`

---

## Mục tiêu

Voeg Google Search Console verificatie en GA4 tracking toe aan alle bestaande pagina's (10 stuks) en zorg dat T-14 en T-17 de codes al bevatten bij de eerste deploy.

---

## Codes om te implementeren

### 1. Search Console verificatie
Plaatsen in `<head>` van elke pagina — DIRECT NA de dark mode script tag:

```html
<meta name="google-site-verification" content="p04O3rfiWJMwK6QjhIhpvHyvEkbRa_CPS2rXKIEEkqI" />
```

### 2. GA4 tag
Plaatsen in `<head>` van elke pagina — DIRECT NA de Search Console meta tag:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QH1TEMRFMD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-QH1TEMRFMD');
</script>
```

---

## Volgorde in `<head>` na implementatie

```html
<head>
  <!-- 1. Dark mode script ← ALTIJD EERSTE -->
  <script>/* dark mode */</script>

  <!-- 2. Search Console verificatie ← NIEUW -->
  <meta name="google-site-verification" content="p04O3rfiWJMwK6QjhIhpvHyvEkbRa_CPS2rXKIEEkqI" />

  <!-- 3. GA4 ← NIEUW -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-QH1TEMRFMD"></script>
  <script>...</script>

  <!-- 4. Meta charset, viewport, title, description, canonical, OG -->
  <meta charset="UTF-8">
  ...
</head>
```

> **Belangrijk:** Dark mode script blijft ALTIJD de eerste tag in `<head>`. GA4 en GSC komen direct daarna, vóór alle andere meta-tags.

---

## Pagina's die aangepast moeten worden (10 stuks)

| # | Pagina | Bestand |
|---|---|---|
| 1 | BTW Berekenen | `btw-berekenen/index.html` |
| 2 | Procenten Berekenen | `procenten-berekenen/index.html` |
| 3 | Korting Berekenen | `korting-berekenen/index.html` |
| 4 | Uurloon Berekenen | `uurloon-berekenen/index.html` |
| 5 | Vakantiegeld Berekenen | `vakantiegeld-berekenen/index.html` |
| 6 | Vakantiedagen Berekenen | `vakantiedagen-berekenen/index.html` |
| 7 | Woorden Tellen | `woorden-tellen/index.html` |
| 8 | Tekens Tellen | `tekens-tellen/index.html` |
| 9 | Tekst Vergelijken | `tekst-vergelijken/index.html` |
| 10 | Minimumloon Berekenen | `minimumloon-berekenen/index.html` |

**T-14 en T-17:** codes direct meenemen in de initiële HTML — niet achteraf toevoegen.

---

## GIT WORKFLOW

```bash
git checkout -b feature/TASK-005-analytics

# Voeg codes toe aan alle 10 bestaande bestanden
# Gebruik sed of een script voor efficiëntie — zie tip hieronder

git add btw-berekenen/index.html \
        procenten-berekenen/index.html \
        korting-berekenen/index.html \
        uurloon-berekenen/index.html \
        vakantiegeld-berekenen/index.html \
        vakantiedagen-berekenen/index.html \
        woorden-tellen/index.html \
        tekens-tellen/index.html \
        tekst-vergelijken/index.html \
        minimumloon-berekenen/index.html

git commit -m "feat: TASK-005 add GSC verification + GA4 to all pages"
git push origin feature/TASK-005-analytics
# PR aanmaken → DIRECT MERGEN naar main
```

### Tip: script voor batch-insert

De dark mode script eindigt altijd op `</script>` als eerste tag. Dev kan een sed-commando gebruiken om na die eerste `</script>` de twee nieuwe blokken in te voegen — sneller dan 10 bestanden handmatig bewerken.

---

## CHECKLIST VERIFICATIE

### A. Search Console

- [ ] Alle 10 pagina's bevatten de GSC meta tag
- [ ] GSC meta tag staat DIRECT NA de dark mode script
- [ ] Verifieer in Google Search Console: status "Eigendom geverifieerd"
- [ ] Dien sitemap in via GSC: `https://rekengemak.nl/sitemap.xml`

### B. GA4

- [ ] Alle 10 pagina's bevatten de GA4 gtag scripts
- [ ] GA4 scripts staan DIRECT NA de GSC meta tag
- [ ] Verifieer in GA4 dashboard: realtime rapport toont bezoeken
- [ ] Property ID correct: `G-QH1TEMRFMD`

### C. Volgorde in `<head>` (check 3 willekeurige pagina's)

- [ ] `btw-berekenen/`: dark mode script → GSC meta → GA4 → rest
- [ ] `vakantiegeld-berekenen/`: zelfde volgorde
- [ ] `minimumloon-berekenen/`: zelfde volgorde

### D. PageSpeed na toevoeging

- [ ] GA4 script heeft `async` attribuut — geen blocking
- [ ] PageSpeed mobile nog steeds >= 90 (1 steekproef voldoende)

### E. T-14 en T-17

- [ ] Brief T-14 en T-17 bevatten de codes al in hun HTML template
- [ ] Geen aparte aanpassing nodig na deploy

## Samenvatting

```
Branch: feature/TASK-005-analytics
Pagina's bijgewerkt: [X]/10
GSC geverifieerd: JA/NEE
GA4 realtime actief: JA/NEE
Opmerkingen: [indien van toepassing]
```
