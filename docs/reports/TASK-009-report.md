# TASK-009 Sign-off Report: Vakantiedagen Berekenen

**Status**: DONE
**Sign-off datum**: 11 maart 2026
**Live URL**: https://rekengemak.nl/vakantiedagen-berekenen/
**PR**: #6 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (13 items) | 13/13 PASS |
| B. Berekeningen (9 cases + pageload) | 9/9 PASS |
| C. UX (14 items) | 14/14 PASS |
| D. Inhoud (7 items) | 7/7 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 43/43 PASS**

---

## A. Technische checks (13/13 PASS)

1. HTTP 200 + HTTPS - PASS
2. Rich Results WebApplication - PASS
3. Rich Results FAQPage - PASS (8 Questions with Answers)
4. Rich Results BreadcrumbList - PASS (2 ListItems)
5. 0 externe requests in source - PASS (Cloudflare beacon is platform-injected)
6. Em dash in body-tekst - PASS (niet gevonden)
7. -- in body-tekst - PASS (alleen result placeholders)
8. ... in source - PASS (niet gevonden)
9. Furthermore/Moreover/Additionally - PASS (niet gevonden)
10. Interne links >= 5 - PASS (21 totaal)
11. Sitemap bevat vakantiedagen-berekenen/ - PASS
12. html lang="nl" - PASS
13. 3 ad slots aanwezig - PASS

## B. Berekeningen (9/9 PASS)

### Wettelijke dagen (formule: 4 x uren/8)

| # | Uren/week | Extra dagen | Maanden | Wettelijk | Totaal | In uren | Pro-rata | Result |
|---|---|---|---|---|---|---|---|---|
| 1 | 40 | 0 | 12 | 20 | 20 | 160 | 20 | PASS |
| 2 | 40 | 5 | 12 | 20 | 25 | 200 | 25 | PASS |
| 3 | 32 | 0 | 12 | 16 | 16 | 102,4 | 16 | PASS |
| 4 | 24 | 0 | 12 | 12 | 12 | 57,6 | 12 | PASS |
| 5 | 40 | 0 | 6 | 20 | 20 | 160 | 10 | PASS |
| 6 | 40 | 5 | 6 | 20 | 25 | 200 | 12,5 | PASS |
| 7 | 32 | 3 | 9 | 16 | 19 | 121,6 | 14,25 | PASS |
| 8 | 40 | 0 | 1 | 20 | 20 | 160 | 1,7 | PASS |

### Pageload default

| Conditie | Verwacht | Result |
|---|---|---|
| Pagina geladen zonder invoer | W=20, T=20, U=160, PR=20 (defaults: 40u, 12mnd) | PASS |

## C. UX (14/14 PASS)

1. Pageload: resultaat direct zichtbaar (recalc() op init) - PASS
2. Slider uren realtime - PASS
3. Slider maanden realtime - PASS
4. Slider uren default = 40 - PASS
5. Slider maanden default = 12 - PASS
6. Bovenwettelijk leeg = 0, geen fout - PASS
7. iOS Safari: inputmode=decimal op bovenwettelijk-veld - PASS
8. Mobiel 375px: result grid 1 kolom (breakpoint 480px) - PASS
9. Result grid desktop: 2 kolommen (4 items, 2x2) - PASS
10. Pro-rata label: "dagen (volledig jaar)" vs "dagen (X van 12 mnd)" - PASS
11. Kopieer totaal -> Gekopieerd! 1,5s -> terug - PASS
12. Hard refresh: dark mode direct (script first in head) - PASS
13. Toggle light/dark + localStorage rekengemak-theme - PASS
14. Disclaimer zichtbaar, italic - PASS

## D. Inhoud (7/7 PASS)

1. H1 "Vakantiedagen Berekenen 2026" - PASS
2. Badge "Bijgewerkt: januari 2026" aanwezig - PASS
3. Keyword "vakantiedagen" in eerste 100 woorden - PASS
4. FAQ: 8 vragen - PASS
5. Minimaal 5 interne links - PASS (21 totaal)
6. Geen em dash / ... / AI-woorden - PASS
7. Disclaimer aanwezig onder result grid - PASS
