const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const html = fs.readFileSync(
  path.join(__dirname, '..', 'btw-berekenen', 'index.html'),
  'utf8'
);

function expectMatch(pattern, message) {
  assert.match(html, pattern, message);
}

expectMatch(/id="intent-add-vat"/, 'Missing hero quick intent button: intent-add-vat');
expectMatch(/id="intent-remove-vat"/, 'Missing hero quick intent button: intent-remove-vat');
expectMatch(/id="intent-invoice-check"/, 'Missing hero quick intent button: intent-invoice-check');
expectMatch(/id="intent-compare-rates"/, 'Missing hero quick intent button: intent-compare-rates');

expectMatch(/id="mode-excl-incl"/, 'Missing mode button: mode-excl-incl');
expectMatch(/id="mode-incl-excl"/, 'Missing mode button: mode-incl-excl');
expectMatch(/id="mode-vat-only"/, 'Missing mode button: mode-vat-only');
expectMatch(/id="mode-compare-rates"/, 'Missing mode button: mode-compare-rates');

expectMatch(/id="btn-share-link-nl"/, 'Missing NL share-link button');
expectMatch(/id="btn-share-link-be"/, 'Missing BE share-link button');
expectMatch(/id="mode-vat-only"[^>]*disabled[^>]*aria-disabled="true"[^>]*Binnenkort/, 'Missing coming-soon treatment for vat-only mode');
expectMatch(/id="mode-compare-rates"[^>]*disabled[^>]*aria-disabled="true"[^>]*Binnenkort/, 'Missing coming-soon treatment for compare-rates mode');
expectMatch(/id="intent-compare-rates"[^>]*disabled[^>]*aria-disabled="true"[^>]*Binnenkort/, 'Missing coming-soon treatment for compare intent');

expectMatch(/var actieveMode = 'excl-incl';/, 'Missing legacy mode mirror');
expectMatch(/function getLegacyMode\(land\)/, 'Missing legacy mode reader');
expectMatch(/function getModeFromUi\(\)/, 'Missing getModeFromUi helper');
expectMatch(/function modeNaarRichting\(mode\)/, 'Missing modeNaarRichting helper');
expectMatch(/function bepaalModeVanParams\(params\)/, 'Missing bepaalModeVanParams helper');
expectMatch(/function syncLandState\(vanLand, naarLand\)/, 'Missing syncLandState helper');
expectMatch(/function syncShellModeToLegacyControls\(land, mode\)/, 'Missing shell sync helper');
expectMatch(/function setMode\(mode\)/, 'Missing mode switch helper');
expectMatch(/function handleLegacyDirectionChange\(land\)/, 'Missing legacy direction bridge helper');
expectMatch(/function handleQuickIntent\(intent\)/, 'Missing hero intent handler');
expectMatch(/setAttribute\('aria-pressed',/, 'Missing aria-pressed sync for mode buttons');

expectMatch(
  /function showActionButtons\(land, show\)[\s\S]*var share = document\.getElementById\('btn-share-link-' \+ land\);[\s\S]*if \(share\) share\.hidden = !show;/,
  'Missing share-action visibility bridge'
);

expectMatch(/id="dir-nl" onchange="handleLegacyDirectionChange\('nl'\)"/, 'Missing NL legacy direction bridge wiring');
expectMatch(/id="dir-be" onchange="handleLegacyDirectionChange\('be'\)"/, 'Missing BE legacy direction bridge wiring');
expectMatch(/params\.get\('mode'\)/, 'Missing modern mode deeplink read');
expectMatch(/params\.get\('modus'\)/, 'Missing legacy modus deeplink read');
expectMatch(/params\.set\('mode', mode\)/, 'Missing modern mode deeplink write');
expectMatch(/params\.set\('modus',/, 'Missing legacy modus deeplink write');
expectMatch(/velden\.mode \|\|/, 'Missing mode-first restore path');
expectMatch(/function leesUrlParams\(\)[\s\S]*if \(params\.get\('bedrag'\)\) recalc\(land\);[\s\S]*else recalc\(land\);/, 'Missing mode-only deeplink sync path');
expectMatch(/function recalc\(land, options\)/, 'Missing recalc options signature for tab-sync control');
expectMatch(/var persistHistory = options\.persistHistory !== false;/, 'Missing persistHistory guard in recalc');
expectMatch(/function switchTab\(land\)[\s\S]*recalc\(land, \{ persistHistory: false \}\);/, 'Missing no-history tab sync recalc');
expectMatch(/mode === 'compare-rates' \|\| mode === 'vat-only'/, 'Missing explicit placeholder mode handling');
expectMatch(/params\.set\('modus', mode\)/, 'Missing explicit placeholder mode URL preservation');
expectMatch(/mode:\s*[A-Za-z]+Mode,\s*modus:\s*/, 'Missing mode persistence in history payload');
expectMatch(/setMode\('compare-rates'\)/, 'Missing compare-rates normalization path');
expectMatch(/id="result-primary-nl"/, 'Missing NL primary result node');
expectMatch(/id="result-primary-be"/, 'Missing BE primary result node');
expectMatch(/id="card-excl-nl"/, 'Missing NL excl result card');
expectMatch(/id="card-btw-nl"/, 'Missing NL btw result card');
expectMatch(/id="card-incl-nl"/, 'Missing NL incl result card');
expectMatch(/id="card-excl-be"/, 'Missing BE excl result card');
expectMatch(/id="card-btw-be"/, 'Missing BE btw result card');
expectMatch(/id="card-incl-be"/, 'Missing BE incl result card');
expectMatch(/id="btn-copy-primary-nl"/, 'Missing NL primary copy button');
expectMatch(/id="btn-copy-primary-be"/, 'Missing BE primary copy button');
expectMatch(/id="btn-share-link-nl"/, 'Missing NL share-link button');
expectMatch(/function deelLink\(land\)/, 'Missing deelLink helper');
expectMatch(/function getPrimaryValueForMode\(mode, result\)/, 'Missing mode-aware primary value helper');
expectMatch(/function getPrimaryLabelForMode\(mode\)/, 'Missing mode-aware primary label helper');
expectMatch(/mode === 'compare-rates'[\s\S]*Vergelijking binnenkort beschikbaar/, 'Missing compare-rates primary label handling');
expectMatch(
  /function setResults\(land, result, mode\)[\s\S]*result-label-[\s\S]*result-primary-[\s\S]*card-excl-[\s\S]*card-btw-[\s\S]*card-incl-[\s\S]*getPrimaryLabelForMode\(resolvedMode\)[\s\S]*getPrimaryValueForMode\(resolvedMode, result\)/,
  'Missing rewritten setResults workspace rendering'
);
expectMatch(
  /function showActionButtons\(land, show\)[\s\S]*btn-copy-primary-[\s\S]*btn-share-link-[\s\S]*btn-kopieer-alles-[\s\S]*if \(primaryCopy\) primaryCopy\.hidden = !show;[\s\S]*if \(share\) share\.hidden = !show;[\s\S]*if \(copy\)  copy\.hidden  = !show;/,
  'Missing primary-copy visibility handling in showActionButtons'
);
expectMatch(
  /function kopieerAlles\(land\)[\s\S]*card-excl-[\s\S]*card-btw-[\s\S]*card-incl-[\s\S]*result-primary-/,
  'Missing result workspace copy-all sources'
);
assert.doesNotMatch(html, /function printResultaat\(\)/, 'Orphaned printResultaat helper should be removed');

console.log('task 3 smoke checks passed');
