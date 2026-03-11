# TASK-003 Sign-off Report: Korting Berekenen

**Status**: DONE
**Sign-off datum**: 11 maart 2026
**Live URL**: https://rekengemak.nl/korting-berekenen/
**PR**: #4 (merged)

---

## Resultaten

| Categorie | Score |
|-----------|-------|
| A. Technische checks (13 mục) | 13/13 PASS |
| B. Berekeningen (20 cases, 3 tabs) | 20/20 PASS |
| C. UX (11 mục) | 11/11 PASS |
| D. Inhoud (5 mục) | 5/5 PASS |
| PageSpeed | Accepted (same stack as T-001 = 100/100) |
| Rich Results (3 schemas) | 3/3 PASS |

**Totaal: 49/49 PASS**

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
11. Sitemap bevat korting-berekenen/ - PASS
12. html lang="nl" - PASS
13. 3 ad slots aanwezig - PASS

## B. Berekeningen (20/20 PASS)

### Tab 1: Prijs na korting
| # | Originele prijs | Korting % | Verwachte prijs | Besparing | Result |
|---|----------------|-----------|-----------------|-----------|--------|
| 1 | 150 | 20% | 120,00 | 30,00 | PASS |
| 2 | 200 | 25% | 150,00 | 50,00 | PASS |
| 3 | 99 | 10% | 89,10 | 9,90 | PASS |
| 4 | 500 | 50% | 250,00 | 250,00 | PASS |
| 5 | 100 | 0% | 100,00 | 0,00 | PASS |
| 6 | 100 | 100% | 0,00 | 100,00 | PASS |
| 7 | (leeg) | 20% | -- | -- | PASS |

### Tab 2: Kortingspercentage
| # | Originele prijs | Prijs na korting | Verwacht % | Besparing | Result |
|---|----------------|------------------|------------|-----------|--------|
| 1 | 150 | 120 | 20% | 30,00 | PASS |
| 2 | 200 | 150 | 25% | 50,00 | PASS |
| 3 | 80 | 60 | 25% | 20,00 | PASS |
| 4 | 100 | 100 | 0% | 0,00 | PASS |
| 5 | 100 | 110 | -- (nieuw > origineel) | -- | PASS |
| 6 | (leeg) | 120 | -- | -- | PASS |

### Tab 3: Originele prijs terugrekenen
| # | Prijs na korting | Korting % | Verwachte originele prijs | Besparing | Result |
|---|-----------------|-----------|--------------------------|-----------|--------|
| 1 | 80 | 20% | 100,00 | 20,00 | PASS |
| 2 | 120 | 20% | 150,00 | 30,00 | PASS |
| 3 | 75 | 25% | 100,00 | 25,00 | PASS |
| 4 | 250 | 50% | 500,00 | 250,00 | PASS |
| 5 | 80 | 0% | 80,00 | 0,00 | PASS |
| 6 | 80 | 100% | -- (deling door 0) | -- | PASS |
| 7 | (leeg) | 20% | -- | -- | PASS |

## C. UX (11/11 PASS)

1. 3 tabs switchen - PASS
2. Tab switch: waarden blijven staan - PASS
3. iOS Safari: numeriek toetsenbord (inputmode=decimal) - PASS
4. Mobiel 375px: geen horizontale scroll - PASS
5. Kopieer prijs/percentage -> Gekopieerd! 1,5s -> terug - PASS
6. Hard refresh: dark mode direct (script first in head) - PASS
7. Toggle light/dark + localStorage rekengemak-theme - PASS
8. Empty state: -- muted 1.2rem - PASS
9. Filled state: groen 2.25rem - PASS
10. Validatie panel 2: nieuw > origineel -> -- - PASS
11. Validatie panel 3: korting >= 100% -> -- - PASS

## D. Inhoud (5/5 PASS)

1. H1 "Korting Berekenen" - PASS
2. Keyword in eerste 100 woorden - PASS
3. 8 FAQ items - PASS
4. Minimaal 5 interne links - PASS (21 totaal)
5. Geen em dash / ... / AI-woorden - PASS
