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
expectMatch(/function getModeFromUi\(\)/, 'Missing getModeFromUi helper');
expectMatch(/function bepaalModeVanParams\(params\)/, 'Missing bepaalModeVanParams helper');
expectMatch(/function syncLandState\(vanLand, naarLand\)/, 'Missing syncLandState helper');
expectMatch(/params\.get\('mode'\)/, 'Missing modern mode deeplink read');
expectMatch(/params\.get\('modus'\)/, 'Missing legacy modus deeplink read');
expectMatch(/params\.set\('mode', mode\)/, 'Missing modern mode deeplink write');
expectMatch(/params\.set\('modus',/, 'Missing legacy modus deeplink write');
expectMatch(/velden\.mode \|\|/, 'Missing mode-first restore path');

console.log('task 2 smoke checks passed');
