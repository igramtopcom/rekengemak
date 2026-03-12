# TASK-013 Sign-off Report: Minimumloon Berekenen

**Status**: DONE
**Sign-off datum**: 12 maart 2026
**Live URL**: https://rekengemak.nl/minimumloon-berekenen/
**PR**: #10 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (13 items) | 13/13 PASS |
| B. Berekeningen (10 cases) | 10/10 PASS |
| C. UX (14 items) | 14/14 PASS |
| D. Inhoud (7 items) | 7/7 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 44/44 PASS**

---

## A. Technische checks (13/13 PASS)

1. HTTP 200 + HTTPS - PASS
2. Rich Results WebApplication - PASS
3. Rich Results FAQPage - PASS (8 Questions with Answers)
4. Rich Results BreadcrumbList - PASS
5. 0 externe requests in source - PASS (Cloudflare beacon is platform-injected)
6. Em dash in body-tekst - PASS (niet gevonden)
7. ... in source - PASS (niet gevonden)
8. Furthermore/Moreover/Additionally - PASS (niet gevonden)
9. Interne links >= 5 - PASS (19 totaal)
10. Sitemap bevat minimumloon-berekenen/ - PASS
11. html lang="nl" - PASS
12. 3 ad slots aanwezig - PASS
13. Badge "Bijgewerkt: januari 2026" - PASS

## B. Berekeningen (10/10 PASS)

### Volwassen >= 21 jaar (3 cases)

| # | Leeftijd | Uren/week | Per uur | Per dag | Per week | Per maand | Resultaat |
|---|---|---|---|---|---|---|---|
| 1 | 21+ | 40 | 13,68 | 109,44 | 547,20 | 2.371,20 | PASS |
| 2 | 21+ | 32 | 13,68 | 109,44 | 437,76 | 1.896,96 | PASS |
| 3 | 21+ | 20 | 13,68 | 109,44 | 273,60 | 1.185,60 | PASS |

### Jongeren leeftijdsfactoren (6 cases)

| # | Leeftijd | Factor | Per uur | Per maand (40u/w) | Resultaat |
|---|---|---|---|---|---|
| 4 | 20 jaar | 62,5% | 8,55 | 1.482,00 | PASS |
| 5 | 19 jaar | 55% | 7,52 | 1.304,16 | PASS |
| 6 | 18 jaar | 47% | 6,43 | 1.114,46 | PASS |
| 7 | 17 jaar | 39% | 5,34 | 924,77 | PASS |
| 8 | 16 jaar | 34% | 4,65 | 806,21 | PASS |
| 9 | 15 jaar | 30% | 4,10 | 711,36 | PASS |

**Noot bij case 7**: Brief vermeldde 925,07 maar correcte berekening is 13,68 x 0,39 x 40 x 52/12 = 924,77. Ons resultaat is wiskundig correct.

### Pageload default (1 case)

| # | Conditie | Verwacht | Resultaat |
|---|---|---|---|
| 10 | Pageload | 21+ / 40u/w: per uur 13,68, per maand 2.371,20 | PASS |

## C. UX (14/14 PASS)

1. recalc() en buildTabel() bij pageload - PASS
2. Dropdown leeftijd onchange - PASS
3. Select option bg-input fix - PASS
4. Slider oninput realtime - PASS
5. Slider default 40 - PASS
6. Jeugd-toelichting verborgen bij 21+ - PASS
7. Leeftijdstabel dynamisch gebouwd - PASS
8. Actieve rij markering (active-row) - PASS
9. Result grid 4 items - PASS
10. Result grid 2 kolommen desktop - PASS
11. Result grid 1 kolom mobiel - PASS
12. Dark mode script first in head - PASS
13. Disclaimer aanwezig - PASS
14. Intl.NumberFormat nl-NL - PASS

## D. Inhoud (7/7 PASS)

1. H1 = "Minimumloon Berekenen 2026" - PASS
2. Badge "Bijgewerkt: januari 2026" - PASS
3. Keyword "minimumloon" in eerste 100 woorden - PASS
4. FAQ: 8 vragen - PASS
5. Interne links >= 5 - PASS (19 totaal)
6. Geen em dash / ... / AI-woorden - PASS
7. Disclaimer met Rijksoverheid verwijzing - PASS
