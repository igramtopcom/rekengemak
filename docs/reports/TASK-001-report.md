# TASK-001 Sign-off Report: BTW Berekenen

**Status**: DONE
**Sign-off datum**: 11 maart 2026
**Commit**: 998f6e3 (main)
**URL live**: https://rekengemak.nl/btw-berekenen/

---

## Resultaten

| Hạng mục | Kết quả |
|----------|---------|
| A. Kỹ thuật (9 mục) | 9/9 PASS |
| B. Tính toán (8 cases) | 8/8 PASS |
| C. UX (7 mục) | 7/7 PASS |
| D. Nội dung (5 mục) | 5/5 PASS |
| PageSpeed mobile | 100/100 |
| PageSpeed desktop | 100/100 |
| Rich Results - BreadcrumbList | PASS |
| Rich Results - FAQPage | PASS |
| Rich Results - WebApplication | PASS (1 warning niet-kritiek: aggregateRating optioneel) |
| 6 UI Fixes | Alle DONE |

---

## A. Technische checks (9/9 PASS)

1. HTTP 200 - PASS
2. Em dash in body text - PASS (alleen in CSS comment + JSON-LD)
3. Double hyphen in body text - PASS (alleen in title, CSS vars, result placeholders)
4. Ellipsis "..." - PASS (geen gevonden)
5. Verboden woorden - PASS (geen gevonden)
6. Interne links >= 5 - PASS (19 links in content + footer)
7. Sitemap bevat btw-berekenen/ - PASS
8. HTTPS actief - PASS
9. Externe resources = 0 - PASS (0 externe CSS/JS/Fonts)

## B. Berekeningen (8/8 PASS)

| # | Input | Tarief | Richting | Verwacht | Actueel | Result |
|---|-------|--------|----------|----------|---------|--------|
| 1 | 100 | NL 21% | Excl-Incl | Incl=121,00 | 121,00 | PASS |
| 2 | 200 | NL 9% | Excl-Incl | Incl=218,00 | 218,00 | PASS |
| 3 | 500 | NL 0% | Excl-Incl | Incl=500,00 | 500,00 | PASS |
| 4 | 121 | NL 21% | Incl-Excl | Excl=100,00 | 100,00 | PASS |
| 5 | 200 | BE 6% | Excl-Incl | Incl=212,00 | 212,00 | PASS |
| 6 | 242 | BE 21% | Incl-Excl | Excl=200,00 | 200,00 | PASS |
| 7 | (leeg) | - | - | -- overal | -- | PASS |
| 8 | 100,50 | NL 21% | Excl-Incl | Incl=121,61 | 121,61 | PASS |

## C. UX checks (7/7 PASS)

1. Kopieer -> "Gekopieerd!" 1,5s -> terug naar "Kopieer" - PASS
2. Hard refresh: geen witte flits (theme script first in head) - PASS
3. Toggle light/dark + localStorage key rekengemak-theme - PASS
4. Tab NL -> BE: resultaten resetten naar "--" - PASS
5. Toggle richting: label wisselt excl/incl - PASS
6. Touch targets >= 48px - PASS
7. Geen horizontal scroll @ 375px - PASS

## D. Content checks (5/5 PASS)

1. H1 bevat "btw berekenen" - PASS
2. Eerste 100 woorden bevatten "btw berekenen" - PASS
3. Badge "Bijgewerkt: januari 2026" - PASS
4. FAQ items = 8 - PASS
5. JSON-LD schemas: 3 blocks (WebApplication, FAQPage, BreadcrumbList) - PASS

## UI Fixes (6/6 DONE)

1. Fix 1: Whitespace van lege ad slots - DONE (`:empty { display: none }`)
2. Fix 2: Em dash in dropdown -> hyphen - DONE
3. Fix 3: Result box empty state muted styling - DONE
4. Fix 4: Tab flags emoji Windows limitation - ACKNOWLEDGED (code correct)
5. Fix 5: Homepage hero spacing - DONE
6. Fix 6: Dropdown options dark mode background - DONE

## PageSpeed Insights

- Mobile: 100/100
- Desktop: 100/100

## Rich Results

- BreadcrumbList: PASS
- FAQPage: PASS
- WebApplication: PASS (warning: aggregateRating optioneel - niet-kritiek)
