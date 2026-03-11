# TASK-002 Sign-off Report: Procenten Berekenen

**Status**: DONE
**Sign-off datum**: 11 maart 2026
**Live URL**: https://rekengemak.nl/procenten-berekenen/
**PR**: #3 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (13 mục) | 13/13 PASS |
| B. Berekeningen (24 cases, 5 tabs) | 24/24 PASS |
| C. UX (11 mục) | 11/11 PASS |
| D. Inhoud (5 mục) | 5/5 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 53/53 PASS**

---

## A. Technische checks (13/13 PASS)

1. HTTP 200 + HTTPS - PASS
2. Rich Results WebApplication - PASS
3. Rich Results FAQPage - PASS (8 Questions with Answers)
4. Rich Results BreadcrumbList - PASS (2 ListItems)
5. 0 externe requests - PASS
6. Em dash in source - PASS (niet gevonden)
7. -- in body-tekst - PASS (alleen placeholders)
8. ... in source - PASS (niet gevonden)
9. Furthermore/Moreover/Additionally - PASS (niet gevonden)
10. Interne links >= 5 - PASS (21 totaal)
11. Sitemap bevat procenten-berekenen/ - PASS
12. html lang="nl" - PASS
13. 3 ad slots aanwezig - PASS

## B. Berekeningen (24/24 PASS)

### Tab 1: % van getal
| # | % | Getal | Verwacht | Actueel | Result |
|---|---|-------|----------|---------|--------|
| 1 | 15 | 200 | 30 | 30 | PASS |
| 2 | 10 | 150 | 15 | 15 | PASS |
| 3 | 100 | 75 | 75 | 75 | PASS |
| 4 | 0 | 500 | 0 | 0 | PASS |
| 5 | 33,5 | 200 | 67 | 67 | PASS |
| 6 | (leeg) | 200 | -- | -- | PASS |

### Tab 2: Wat % is X van Y
| # | Deel | Geheel | Verwacht | Actueel | Result |
|---|------|--------|----------|---------|--------|
| 1 | 20 | 80 | 25% | 25% | PASS |
| 2 | 1 | 4 | 25% | 25% | PASS |
| 3 | 50 | 200 | 25% | 25% | PASS |
| 4 | 3 | 9 | 33,33% | 33,33% | PASS |
| 5 | (leeg) | 80 | -- | -- | PASS |

### Tab 3: Stijging %
| # | Oud | Nieuw | Verwacht % | Abs. verschil | Result |
|---|-----|-------|------------|---------------|--------|
| 1 | 80 | 100 | +25% | +20 | PASS |
| 2 | 100 | 80 | -20% | -20 | PASS |
| 3 | 200 | 250 | +25% | +50 | PASS |
| 4 | 50 | 50 | +0% | +0 | PASS |
| 5 | (leeg) | 100 | -- | -- | PASS |

### Tab 4: Verhogen met %
| # | Getal | % | Verwacht | Toename | Result |
|---|-------|---|----------|---------|--------|
| 1 | 100 | 21 | 121 | +21 | PASS |
| 2 | 200 | 10 | 220 | +20 | PASS |
| 3 | 1.000 | 5 | 1.050 | +50 | PASS |
| 4 | (leeg) | 10 | -- | -- | PASS |

### Tab 5: Verlagen met %
| # | Getal | % | Verwacht | Afname | Result |
|---|-------|---|----------|--------|--------|
| 1 | 200 | 25 | 150 | -50 | PASS |
| 2 | 100 | 10 | 90 | -10 | PASS |
| 3 | 500 | 50 | 250 | -250 | PASS |
| 4 | (leeg) | 25 | -- | -- | PASS |

## C. UX (11/11 PASS)

1. 5 tabs switchen - PASS
2. Tab switch: waarden blijven staan - PASS
3. Tab 3 stijging positief: groen var(--success) - PASS
4. Tab 3 daling negatief: rood #E05252 - PASS
5. iOS Safari: numeriek toetsenbord (inputmode=decimal) - PASS
6. Mobiel 375px: geen horizontale scroll - PASS
7. Kopieer -> Gekopieerd! 1,5s -> terug - PASS
8. Hard refresh: dark mode direct (script first in head) - PASS
9. Toggle light/dark + localStorage rekengemak-theme - PASS
10. Empty state: -- muted styling - PASS
11. Filled state: groen 2.25rem - PASS

## D. Inhoud (5/5 PASS)

1. H1 "Procenten Berekenen" - PASS
2. Keyword in eerste 100 woorden - PASS
3. 8 FAQ items - PASS
4. Minimaal 5 interne links - PASS (21 totaal)
5. Geen em dash / ... / AI-woorden - PASS
