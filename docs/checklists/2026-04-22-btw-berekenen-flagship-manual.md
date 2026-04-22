# BTW Berekenen Flagship Manual Checklist

- [ ] Quick intent `BTW erbij rekenen` activates `Excl -> Incl`
- [ ] Quick intent `BTW eruit rekenen` activates `Incl -> Excl`
- [ ] Quick intent `Factuur checken` activates `Incl -> Excl` and shows the invoice helper
- [ ] Quick intent `NL of BE vergelijken` activates `Tarieven vergelijken`
- [ ] Switching from NL to BE keeps the typed amount
- [ ] `?bedrag=121&tarief=21&modus=incl` restores the `Incl -> Excl` flow
- [ ] `?bedrag=100&tarief=21&mode=compare-rates` restores the comparison mode
- [ ] `Deel link` copies the current page URL with `mode=` in the query string
- [ ] Quick example `100 euro BE @ 6%` opens the BE tab and recalculates
- [ ] Context links change after recalculating in `Incl -> Excl` mode
