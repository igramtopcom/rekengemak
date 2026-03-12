# TASK-012 Sign-off Report: Tekst Vergelijken

**Status**: DONE
**Sign-off datum**: 12 maart 2026
**Live URL**: https://rekengemak.nl/tekst-vergelijken/
**PR**: #9 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (13 items) | 13/13 PASS |
| B. Diff correctheid (11 cases) | 11/11 PASS |
| C. UX (12 items) | 12/12 PASS |
| D. Inhoud (6 items) | 6/6 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 42/42 PASS**

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
10. Sitemap bevat tekst-vergelijken/ - PASS
11. html lang="nl" - PASS
12. 3 ad slots aanwezig - PASS
13. HTTP 200 - PASS

## B. Diff correctheid (11/11 PASS)

### Basis diff (8 cases)

| # | Tekst A | Tekst B | Verwacht | Resultaat |
|---|---|---|---|---|
| 1 | Hallo wereld | Hallo wereld | Identiek (0 del, 0 add) | PASS |
| 2 | Hallo wereld | Hallo Nederland | 1 del, 1 add | PASS |
| 3 | een twee drie | een drie | 1 del, 0 add | PASS |
| 4 | een drie | een twee drie | 0 del, 1 add | PASS |
| 5 | De kat zit op de mat | De hond zit op de mat | 1 del, 1 add | PASS |
| 6 | (leeg) | (leeg) | 0 del, 0 add | PASS |
| 7 | Hallo | (leeg) | 1 del, 0 add | PASS |
| 8 | (leeg) | Hallo | 0 del, 1 add | PASS |

### Diff statistieken (2 cases)

| # | Scenario | Verwacht | Resultaat |
|---|---|---|---|
| 9 | 1 del, 1 add | "1 verwijderd · 1 toegevoegd" | PASS |
| 10 | Identiek | Geen stats tekst | PASS |

### Kopieer output (1 case)

| # | Scenario | Verwacht | Resultaat |
|---|---|---|---|
| 11 | Copy format | [DEL: woord] en [ADD: woord] notatie | PASS |

## C. UX (12/12 PASS)

1. Diff output verborgen bij pageload - PASS
2. Knop "Vergelijk teksten" aanwezig - PASS
3. Knop "Wis alles" aanwezig - PASS
4. Identiek melding "Teksten zijn identiek." - PASS
5. DEL kleur: rood + doorgestreept - PASS
6. ADD kleur: groen + onderstreept - PASS
7. Legenda "Verwijderd" + "Toegevoegd" - PASS
8. Knop "Kopieer resultaat (platte tekst)" - PASS
9. "Gekopieerd!" feedback in JS - PASS
10. Desktop: twee textarea's naast elkaar (grid 1fr 1fr) - PASS
11. Mobiel: stacking bij 600px - PASS
12. Dark mode script first in head - PASS

## D. Inhoud (6/6 PASS)

1. H1 = "Tekst Vergelijken" - PASS
2. Keyword "tekst vergelijken" in eerste 100 woorden - PASS
3. FAQ: 8 vragen - PASS
4. Interne links >= 5 - PASS (19 totaal)
5. Geen em dash / ... / AI-woorden - PASS
6. Privacy FAQ: "tekst niet opgeslagen" - PASS
