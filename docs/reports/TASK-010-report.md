# TASK-010 Sign-off Report: Woorden Tellen

**Status**: DONE
**Sign-off datum**: 11 maart 2026
**Live URL**: https://rekengemak.nl/woorden-tellen/
**PR**: #7 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (13 items) | 13/13 PASS |
| B. Berekeningen (18 cases) | 18/18 PASS |
| C. UX (11 items) | 11/11 PASS |
| D. Inhoud (6 items) | 6/6 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 48/48 PASS**

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
10. Interne links >= 5 - PASS (21 totaal)
11. Sitemap bevat woorden-tellen/ - PASS
12. html lang="nl" - PASS
13. 3 ad slots aanwezig - PASS

## B. Berekeningen (18/18 PASS)

### Woorden tellen (5 cases)

| # | Input | Verwacht | Resultaat |
|---|---|---|---|
| 1 | "" | 0 | PASS |
| 2 | "Hallo wereld" | 2 | PASS |
| 3 | "Een twee drie vier vijf" | 5 | PASS |
| 4 | "Dit is een zin. En nog een." | 7 | PASS |
| 5 | "  spaties  voor  en  na  " | 4 | PASS |

### Tekens tellen (3 cases)

| # | Input | Verwacht (incl/excl spatie) | Resultaat |
|---|---|---|---|
| 1 | "Hallo" | 5/5 | PASS |
| 2 | "Hallo wereld" | 12/11 | PASS |
| 3 | "abc def" | 7/6 | PASS |

### Zinnen tellen (5 cases)

| # | Input | Verwacht | Resultaat |
|---|---|---|---|
| 1 | "Hallo." | 1 | PASS |
| 2 | "Hallo. Wereld." | 2 | PASS |
| 3 | "Hallo! Hoe gaat het? Goed." | 3 | PASS |
| 4 | "Geen punt" | 1 | PASS |
| 5 | "" | 0 | PASS |

### Alinea's tellen (4 cases)

| # | Input | Verwacht | Resultaat |
|---|---|---|---|
| 1 | "Een alinea zonder enters" | 1 | PASS |
| 2 | "Alinea 1\n\nAlinea 2" | 2 | PASS |
| 3 | "A\n\nB\n\nC" | 3 | PASS |
| 4 | "" | 0 | PASS |

### Leestijd (5 cases, 200 woorden/min)

| # | Woorden | Verwacht | Resultaat |
|---|---|---|---|
| 1 | 0 | "0 min" | PASS |
| 2 | 100 | "< 1 min (30 sec)" | PASS |
| 3 | 200 | "1 min" | PASS |
| 4 | 400 | "2 min" | PASS |
| 5 | 1000 | "5 min" | PASS |

## C. UX (11/11 PASS)

1. Real-time: oninput op textarea - PASS
2. Empty state: alle stats tonen 0 - PASS
3. Textarea min-height 180px - PASS
4. Textarea resize: vertical - PASS
5. Wis tekst button aanwezig - PASS
6. Kopieer statistieken button aanwezig - PASS
7. Gekopieerd! feedback in JS - PASS
8. Stats bar aanwezig - PASS
9. Leestijd full-width (stat-leestijd) - PASS
10. Dark mode script first in head - PASS
11. Stats bar mobile 2-col (480px breakpoint) - PASS

## D. Inhoud (6/6 PASS)

1. H1 = "Woorden Tellen" - PASS
2. Keyword "woorden tellen" in eerste 100 woorden - PASS
3. FAQ: 8 vragen - PASS
4. Interne links >= 5 - PASS (21 totaal)
5. Geen em dash / ... / AI-woorden - PASS
6. Privacy FAQ: "tekst niet opgeslagen" - PASS
