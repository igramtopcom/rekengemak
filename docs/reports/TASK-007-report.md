# TASK-007 Sign-off Report: Uurloon Berekenen

**Status**: DONE
**Sign-off datum**: 11 maart 2026
**Live URL**: https://rekengemak.nl/uurloon-berekenen/
**PR**: #5 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (13 items) | 13/13 PASS |
| B. Berekeningen (16 cases, 2 tabs) | 16/16 PASS |
| C. UX (15 items) | 15/15 PASS |
| D. Inhoud (5 items) | 5/5 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 49/49 PASS**

---

## A. Technische checks (13/13 PASS)

1. HTTP 200 + HTTPS - PASS
2. Rich Results WebApplication - PASS
3. Rich Results FAQPage - PASS (8 Questions with Answers)
4. Rich Results BreadcrumbList - PASS (2 ListItems)
5. 0 externe requests - PASS (Cloudflare beacon is platform-injected, not in source)
6. Em dash in source - PASS (niet gevonden)
7. -- in body-tekst - PASS (alleen placeholders in result boxes)
8. ... in source - PASS (niet gevonden)
9. Furthermore/Moreover/Additionally - PASS (niet gevonden)
10. Interne links >= 5 - PASS (21 totaal)
11. Sitemap bevat uurloon-berekenen/ - PASS
12. html lang="nl" - PASS
13. 3 ad slots aanwezig - PASS

## B. Berekeningen (16/16 PASS)

### Tab 1: Maandsalaris naar uurloon (excl. vakantiegeld)

| # | Maandsalaris | Uren/week | VG | Verwacht uurloon | Actueel | Result |
|---|---|---|---|---|---|---|
| 1 | 3.000 | 40 | Uit | 17,31 | 17,31 | PASS |
| 2 | 3.000 | 36 | Uit | 19,23 | 19,23 | PASS |
| 3 | 3.000 | 32 | Uit | 21,63 | 21,63 | PASS |
| 4 | 2.500 | 40 | Uit | 14,42 | 14,42 | PASS |
| 5 | 5.000 | 40 | Uit | 28,85 | 28,85 | PASS |

### Tab 1: Maandsalaris naar uurloon (incl. vakantiegeld)

| # | Maandsalaris | Uren/week | VG | Verwacht uurloon | Actueel | Result |
|---|---|---|---|---|---|---|
| 6 | 3.000 | 40 | Aan | 18,69 | 18,69 | PASS |
| 7 | 3.000 | 36 | Aan | 20,77 | 20,77 | PASS |
| 8 | 2.500 | 40 | Aan | 15,58 | 15,58 | PASS |
| 9 | (leeg) | 40 | Uit | -- | -- | PASS |

### Tab 2: Uurloon naar maandsalaris (excl. vakantiegeld)

| # | Uurloon | Uren/week | VG | Verwacht maandsalaris | Actueel | Result |
|---|---|---|---|---|---|---|
| 10 | 17,31 | 40 | Uit | 3.000,40 | 3.000,40 | PASS |
| 11 | 20,00 | 40 | Uit | 3.466,67 | 3.466,67 | PASS |
| 12 | 15,00 | 36 | Uit | 2.340,00 | 2.340,00 | PASS |
| 13 | 13,68 | 40 | Uit | 2.371,20 | 2.371,20 | PASS |

### Tab 2: Uurloon naar maandsalaris (incl. vakantiegeld)

| # | Uurloon | Uren/week | VG | Verwacht maandsalaris | Actueel | Result |
|---|---|---|---|---|---|---|
| 14 | 18,69 | 40 | Aan | ~3.000 (afronding OK) | 2.999,63 | PASS |
| 15 | 20,00 | 40 | Aan | 3.209,88 | 3.209,88 | PASS |
| 16 | (leeg) | 40 | Uit | -- | -- | PASS |

> Opmerking case 14: 18,69 x 2080 / 12,96 = 2.999,63 - wiskundig correct. Afwijking door afronding uurloon.

## C. UX (15/15 PASS)

1. 2 tabs switchen - PASS
2. Slider realtime update - PASS
3. Preset knoppen 32/36/38/40 - PASS
4. Slider default = 40 - PASS
5. VG toggle default = UIT - PASS
6. VG toggle AAN: +8% - PASS
7. iOS Safari: inputmode=decimal - PASS
8. Mobiel 375px: geen horizontale scroll - PASS
9. Kopieer -> Gekopieerd! 1,5s -> terug - PASS
10. Hard refresh: dark mode direct - PASS
11. Toggle light/dark + localStorage - PASS
12. Empty state: -- muted 1.2rem - PASS
13. Filled state: groen 2.25rem - PASS
14. Disclaimer in beide tabs - PASS
15. Badge "Bijgewerkt: januari 2026" - PASS

## D. Inhoud (5/5 PASS)

1. H1 "Uurloon Berekenen" - PASS
2. Keyword in eerste 100 woorden - PASS
3. 8 FAQ items - PASS
4. Minimaal 5 interne links - PASS (21 totaal)
5. Geen em dash / ... / AI-woorden - PASS
