# TASK-008 Sign-off Report: Vakantiegeld Berekenen

**Status**: DONE
**Sign-off datum**: 11 maart 2026
**Preview URL**: https://281a28ff.rekengemak.pages.dev/vakantiegeld-berekenen/
**Live URL**: https://rekengemak.nl/vakantiegeld-berekenen/
**PR**: #2 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Kỹ thuật (13 mục) | 13/13 PASS |
| B. Tính toán (8 cases) | 8/8 PASS |
| C. UX (9 mục) | 9/9 PASS |
| D. Nội dung (5 mục) | 5/5 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 35/35 PASS**

---

## A. Technische checks (13/13 PASS)

1. HTTP 200 + HTTPS - PASS
2. Rich Results WebApplication - PASS
3. Rich Results FAQPage - PASS (8 Questions with Answers)
4. Rich Results BreadcrumbList - PASS (2 ListItems)
5. 0 externe requests - PASS
6. Em dash in source - PASS (niet gevonden)
7. -- in body-tekst - PASS (alleen CSS vars + placeholders)
8. ... in source - PASS (niet gevonden)
9. Furthermore/Moreover/Additionally - PASS (niet gevonden)
10. Interne links >= 5 - PASS (19 totaal: 5 article + 14 footer)
11. Sitemap bevat vakantiegeld-berekenen/ - PASS
12. html lang="nl" - PASS
13. 3 ad slots aanwezig - PASS

## B. Berekeningen (8/8 PASS)

| # | Maandsalaris | Maanden | Verwacht | Actueel | Result |
|---|-------------|---------|----------|---------|--------|
| 1 | 3.000 | 12 | 2.880,00 | 2.880,00 | PASS |
| 2 | 3.000 | 6 | 1.440,00 | 1.440,00 | PASS |
| 3 | 2.500 | 12 | 2.400,00 | 2.400,00 | PASS |
| 4 | 2.500 | 1 | 200,00 | 200,00 | PASS |
| 5 | 5.000 | 12 | 4.800,00 | 4.800,00 | PASS |
| 6 | 1.750 | 8 | 1.120,00 | 1.120,00 | PASS |
| 7 | (leeg) | 12 | -- | -- | PASS |
| 8 | 3.000 | 1 | 240,00 | 240,00 | PASS |

Formule: maandsalaris x 12 x 0.08 x (maanden / 12)

## C. UX (9/9 PASS)

1. Slider realtime update - PASS
2. Slider default = 12 - PASS
3. inputmode=decimal (iOS numeriek toetsenbord) - PASS
4. Mobiel 375px geen horizontale scroll - PASS
5. Kopieer -> Gekopieerd! 1,5s -> terug - PASS
6. Hard refresh: dark mode direct (script first in head) - PASS
7. Toggle light/dark + localStorage rekengemak-theme - PASS
8. Empty state: -- muted styling - PASS
9. Filled state: groen 2.25rem - PASS

## D. Inhoud (5/5 PASS)

1. H1 "Vakantiegeld Berekenen 2026" bevat keyword - PASS
2. 8 FAQ items - PASS
3. Badge "Bijgewerkt: januari 2026" - PASS
4. Disclaimer aanwezig onder result box - PASS
5. Keyword in eerste 100 woorden - PASS
