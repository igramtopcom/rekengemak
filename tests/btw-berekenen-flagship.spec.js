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
expectMatch(/function syncShellModeToLegacyControls\(land, mode\)/, 'Missing shell sync helper');
expectMatch(/function setMode\(mode\)/, 'Missing mode switch helper');
expectMatch(/function handleQuickIntent\(intent\)/, 'Missing hero intent handler');
expectMatch(/setAttribute\('aria-pressed',/, 'Missing aria-pressed sync for mode buttons');

expectMatch(
  /function recalc\(land\)[\s\S]*syncShellModeToLegacyControls\(land, getLegacyMode\(land\)\);/,
  'Missing recalc shell sync'
);
expectMatch(
  /function resetPanel\(land\)[\s\S]*syncShellModeToLegacyControls\(land, getLegacyMode\(land\)\);/,
  'Missing reset shell sync'
);
expectMatch(
  /function switchTab\(land\)[\s\S]*syncShellModeToLegacyControls\(land, getLegacyMode\(land\)\);/,
  'Missing tab shell sync'
);
expectMatch(
  /function herstelFormulier\(velden\)[\s\S]*syncShellModeToLegacyControls\(land, getLegacyMode\(land\)\);/,
  'Missing restore shell sync'
);
expectMatch(
  /function leesUrlParams\(\)[\s\S]*syncShellModeToLegacyControls\(land, getLegacyMode\(land\)\);/,
  'Missing URL restore shell sync'
);

expectMatch(
  /function showActionButtons\(land, show\)[\s\S]*var share = document\.getElementById\('btn-share-link-' \+ land\);[\s\S]*if \(share\) share\.hidden = !show;/,
  'Missing share-action visibility bridge'
);

expectMatch(
  /var resolvedMode = mode === 'incl-excl' \|\| mode === 'excl-incl' \? mode : getLegacyMode\(actieveLand\);/,
  'Missing mode normalization logic'
);
expectMatch(/setMode\('compare-rates'\)/, 'Missing compare-rates normalization path');

console.log('task 1 smoke checks passed');
