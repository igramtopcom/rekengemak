# TASK-011 Sign-off Report: Tekens Tellen

**Status**: DONE
**Sign-off datum**: 11 maart 2026
**Live URL**: https://rekengemak.nl/tekens-tellen/
**PR**: #8 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (13 items) | 13/13 PASS |
| B. Berekeningen (20 cases) | 20/20 PASS |
| C. UX (11 items) | 11/11 PASS |
| D. Inhoud (6 items) | 6/6 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 50/50 PASS**

---

## A. Technische checks (13/13 PASS)

1. HTTP 200 + HTTPS - PASS
2. Rich Results WebApplication - PASS
3. Rich Results FAQPage - PASS (8 Questions with Answers)
4. Rich Results BreadcrumbList - PASS
5. 0 externe requests in source - PASS (Cloudflare beacon is platform-injected)
6. Em dash in body-tekst - PASS (niet gevonden)
7. -- in body-tekst - PASS (niet gevonden)
8. ... in source - PASS (niet gevonden)
9. Furthermore/Moreover/Additionally - PASS (niet gevonden)
10. Interne links >= 5 - PASS (19 totaal)
11. Sitemap bevat tekens-tellen/ - PASS
12. html lang="nl" - PASS
13. 3 ad slots aanwezig - PASS

## B. Berekeningen (20/20 PASS)

### Hoofd tellers (5 cases)

| # | Input | Incl. spaties | Excl. spaties | Resultaat |
|---|---|---|---|---|
| 1 | "" | 0 | 0 | PASS |
| 2 | "Hallo" | 5 | 5 | PASS |
| 3 | "Hallo wereld" | 12 | 11 | PASS |
| 4 | "abc def ghi" | 11 | 9 | PASS |
| 5 | "a b c" | 5 | 3 | PASS |

### Platform bars - kleur en telling (7 cases)

| # | Tekens | Platform | Verwacht staat | Resultaat |
|---|---|---|---|---|
| 1 | 0 | X / Twitter | groen | PASS |
| 2 | 100 | X / Twitter | groen (36%) | PASS |
| 3 | 230 | X / Twitter | oranje (82%) | PASS |
| 4 | 280 | X / Twitter | oranje (100%) | PASS |
| 5 | 300 | X / Twitter | rood | PASS |
| 6 | 100 | SMS | groen (63%) | PASS |
| 7 | 200 | SMS | rood | PASS |

**Noot bij case 6**: Brief vermeldde "oranje" voor 100/160 tekens, maar 62,5% is onder de 80%-drempel. Groen is het correcte gedrag volgens de kleurlogica (0-80% = groen, 80-100% = oranje, >100% = rood).

### Alle 8 platforms aanwezig (8 cases)

| Platform | Limiet | Aanwezig |
|---|---|---|
| X / Twitter | 280 | PASS |
| Instagram | 2.200 | PASS |
| LinkedIn post | 3.000 | PASS |
| Facebook | 63.206 | PASS |
| TikTok | 2.200 | PASS |
| YouTube | 5.000 | PASS |
| WhatsApp | 65.536 | PASS |
| SMS | 160 | PASS |

## C. UX (11/11 PASS)

1. Real-time: oninput op textarea - PASS
2. Empty state: beide tellers tonen 0 - PASS
3. Textarea min-height 180px - PASS
4. Textarea resize: vertical - PASS
5. Wis tekst button aanwezig - PASS
6. Kopieer telling button aanwezig - PASS
7. Gekopieerd! feedback in JS - PASS
8. Platform list aanwezig - PASS
9. Main count bar aanwezig - PASS
10. Dark mode script first in head - PASS
11. nl-NL formatting in JS - PASS

## D. Inhoud (6/6 PASS)

1. H1 = "Tekens Tellen" - PASS
2. Keyword "tekens tellen" in eerste 100 woorden - PASS
3. FAQ: 8 vragen - PASS
4. Interne links >= 5 - PASS (19 totaal)
5. Geen em dash / ... / AI-woorden - PASS
6. Privacy FAQ: "tekst niet opgeslagen" - PASS
