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

expectMatch(/function setMode\(mode\)/, 'Missing mode switch helper');
expectMatch(/function handleQuickIntent\(intent\)/, 'Missing hero intent handler');

console.log('task 1 smoke checks passed');
