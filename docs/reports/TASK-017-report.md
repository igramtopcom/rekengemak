# TASK-017 Sign-off Report: Wachtwoord Generator

**Status**: DONE
**Sign-off datum**: 12 maart 2026
**Live URL**: https://rekengemak.nl/wachtwoord-generator/
**PR**: #13 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (14 items) | 14/14 PASS |
| B. Functionaliteit (17 items) | 17/17 PASS |
| C. UX (8 items) | 8/8 PASS |
| D. Inhoud (4 items) | 4/4 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 43/43 PASS**

---

## A. Technische checks (14/14 PASS)

1. HTTP 200 + HTTPS - PASS
2. Rich Results WebApplication - PASS
3. applicationCategory = SecurityApplication - PASS
4. Rich Results FAQPage - PASS (8 Questions with Answers)
5. Rich Results BreadcrumbList - PASS
6. Geen em dash in body-tekst - PASS
7. Geen ... in article-tekst - PASS (alleen in charset-example UI labels per brief)
8. Geen AI-woorden - PASS
9. Interne links >= 5 - PASS (14 unieke)
10. html lang="nl" - PASS
11. 3 ad slots aanwezig - PASS
12. crypto.getRandomValues aanwezig - PASS
13. GSC verificatie tag aanwezig - PASS
14. GA4 tag aanwezig (G-QH1TEMRFMD) - PASS

## B. Functionaliteit (17/17 PASS)

### Pageload state (4 items)

| # | Check | Resultaat |
|---|---|---|
| 1 | pwd-display met placeholder tekst | PASS |
| 2 | aria-live="polite" | PASS |
| 3 | Sterkte-indicator verborgen | PASS |
| 4 | Lengte slider default 16 | PASS |

### Tekenset defaults (4 items)

| # | Check | Resultaat |
|---|---|---|
| 5 | Hoofdletters checked | PASS |
| 6 | Kleine letters checked | PASS |
| 7 | Cijfers checked | PASS |
| 8 | Symbolen NOT checked | PASS |

### Core functionaliteit (9 items)

| # | Check | Resultaat |
|---|---|---|
| 9 | Slider range 8-64 | PASS |
| 10 | genereer() functie | PASS |
| 11 | randomPassword functie | PASS |
| 12 | updateSterkte functie | PASS |
| 13 | kopieerWachtwoord functie | PASS |
| 14 | charset-warning element | PASS |
| 15 | Strength states (weak/fair/good/strong) | PASS |
| 16 | Strength labels (Zwak/Matig/Goed/Sterk) | PASS |
| 17 | Sitemap bevat wachtwoord-generator/ | PASS |

## C. UX (8/8 PASS)

1. Kopieer knop aanwezig - PASS
2. Nieuw wachtwoord knop aanwezig - PASS
3. Gekopieerd! feedback - PASS
4. Monospace font (Courier New) - PASS
5. Strength bar animatie (transition 0.3s) - PASS
6. Slider oninput triggert genereer - PASS
7. Checkbox onchange triggert genereer - PASS
8. Dark mode script first in head - PASS

## D. Inhoud (4/4 PASS)

1. H1 = "Wachtwoord Generator" - PASS
2. Keyword "wachtwoord generator" in eerste 100 woorden - PASS
3. FAQ: 8 vragen - PASS
4. FAQ vermeldt crypto.getRandomValues - PASS
