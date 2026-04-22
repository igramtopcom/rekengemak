const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const vm = require('vm');

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

expectMatch(/function getLegacyMode\(land\)/, 'Missing legacy mode reader');
expectMatch(/function syncShellModeToLegacyControls\(land\)/, 'Missing shell sync helper');
expectMatch(/function setMode\(mode\)/, 'Missing mode switch helper');
expectMatch(/function handleQuickIntent\(intent\)/, 'Missing hero intent handler');
expectMatch(/function showActionButtons\(land, show\)/, 'Missing result action bridge');
expectMatch(/syncShellModeToLegacyControls\(land\);/, 'Missing recalc/tab sync bridge');

function createClassList(initial) {
  const classes = new Set(initial || []);

  return {
    add: function() {
      Array.prototype.forEach.call(arguments, function(name) {
        classes.add(name);
      });
    },
    remove: function() {
      Array.prototype.forEach.call(arguments, function(name) {
        classes.delete(name);
      });
    },
    toggle: function(name, force) {
      var next = force;
      if (typeof force === 'undefined') {
        next = !classes.has(name);
      }
      if (next) classes.add(name);
      else classes.delete(name);
      return next;
    },
    contains: function(name) {
      return classes.has(name);
    }
  };
}

function createElement(id, options) {
  options = options || {};
  return {
    id: id,
    value: options.value || '',
    checked: !!options.checked,
    hidden: !!options.hidden,
    textContent: options.textContent || '',
    selectedIndex: options.selectedIndex || 0,
    style: {},
    options: options.options || [],
    classList: createClassList(options.classNames),
    attributes: options.attributes ? Object.assign({}, options.attributes) : {},
    parentElement: null,
    setAttribute: function(name, value) {
      this.attributes[name] = value;
    },
    getAttribute: function(name) {
      if (name === 'data-mode') return this.attributes[name];
      return this.attributes[name];
    }
  };
}

const elements = new Map();
function addElement(id, options) {
  const el = createElement(id, options);
  elements.set(id, el);
  return el;
}

addElement('dir-nl', { checked: false });
addElement('dir-be', { checked: true });
addElement('tab-nl', { classNames: ['active'] });
addElement('tab-be', { classNames: [] });
addElement('panel-nl', { classNames: ['active'] });
addElement('panel-be', { classNames: [] });
addElement('amount-nl');
addElement('amount-be');
addElement('rate-nl', { value: '0.21', options: [{ value: '0.21' }, { value: '0.09' }, { value: '0.00' }] });
addElement('rate-be', { value: '0.21', options: [{ value: '0.21' }, { value: '0.06' }, { value: '0.00' }] });
addElement('amount-label-nl', { textContent: 'Bedrag exclusief btw' });
addElement('amount-label-be', { textContent: 'Bedrag exclusief btw' });
addElement('res-incl-nl');
addElement('res-btw-nl');
addElement('res-excl-nl');
addElement('res-incl-be');
addElement('res-btw-be');
addElement('res-excl-be');
addElement('btn-print-nl', { hidden: true });
addElement('btn-print-be', { hidden: true });
addElement('btn-kopieer-alles-nl', { hidden: true });
addElement('btn-kopieer-alles-be', { hidden: true });
addElement('btn-share-link-nl', { hidden: true, textContent: 'Deel link' });
addElement('btn-share-link-be', { hidden: true, textContent: 'Deel link' });
addElement('formula-blok', { classNames: [] });
addElement('vergelijk-blok', { hidden: true });
addElement('geschiedenis-wrap', { classNames: [] });
addElement('geschiedenis-list', { classNames: [] });
addElement('result-actions-nl', { classNames: [] });
addElement('result-actions-be', { classNames: [] });
addElement('mode-excl-incl', { classNames: ['mode-btn'], attributes: { 'data-mode': 'excl-incl' } });
addElement('mode-incl-excl', { classNames: ['mode-btn'], attributes: { 'data-mode': 'incl-excl' } });
addElement('mode-vat-only', { classNames: ['mode-btn'], attributes: { 'data-mode': 'vat-only' } });
addElement('mode-compare-rates', { classNames: ['mode-btn'], attributes: { 'data-mode': 'compare-rates' } });

const modeButtons = [
  elements.get('mode-excl-incl'),
  elements.get('mode-incl-excl'),
  elements.get('mode-vat-only'),
  elements.get('mode-compare-rates')
];

const documentStub = {
  documentElement: {
    setAttribute: function() {}
  },
  getElementById: function(id) {
    return elements.get(id) || null;
  },
  querySelectorAll: function(selector) {
    if (selector === '.mode-btn') return modeButtons;
    return [];
  }
};

const context = {
  document: documentStub,
  window: {
    location: { href: 'https://rekengemak.nl/btw-berekenen/?bedrag=100' },
    print: function() {}
  },
  navigator: {
    clipboard: {
      writeText: function() {
        return Promise.resolve();
      }
    }
  },
  history: {
    replaceState: function() {}
  },
  localStorage: {
    getItem: function() { return null; },
    setItem: function() {},
    removeItem: function() {}
  },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  console: console,
  Math: Math,
  Date: Date,
  Intl: Intl,
  JSON: JSON,
  Array: Array,
  Object: Object,
  Promise: Promise,
  parseFloat: parseFloat,
  isNaN: isNaN,
  encodeURIComponent: encodeURIComponent,
  decodeURIComponent: decodeURIComponent
};
context.global = context;
context.self = context;

const scriptBlocks = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
assert.ok(scriptBlocks.length > 0, 'Could not find inline script block');
let runtimeScript = scriptBlocks[scriptBlocks.length - 1][1];
runtimeScript = runtimeScript.replace(/\r?\nleesUrlParams\(\);\r?\nrenderGeschiedenis\(\);\s*$/, '\n');

vm.createContext(context);
vm.runInContext(runtimeScript, context);

function activeModeId() {
  return modeButtons.find(function(btn) {
    return btn.classList.contains('active');
  }).id;
}

assert.equal(context.getLegacyMode('nl'), 'excl-incl');
context.syncShellModeToLegacyControls('nl');
assert.equal(activeModeId(), 'mode-excl-incl', 'Shell should reflect the NL checkbox state');

elements.get('dir-nl').checked = true;
context.setMode('incl-excl');
assert.equal(elements.get('dir-nl').checked, true, 'Supported mode should update the legacy checkbox');
assert.equal(activeModeId(), 'mode-incl-excl', 'Shell should match the supported direction mode');

elements.get('dir-nl').checked = false;
context.setMode('vat-only');
assert.equal(elements.get('dir-nl').checked, false, 'Unsupported shell mode must not alter the legacy checkbox');
assert.equal(activeModeId(), 'mode-excl-incl', 'Unsupported shell mode must fall back to the current legacy direction');

elements.get('dir-nl').checked = true;
context.handleQuickIntent('compare-rates');
assert.equal(elements.get('dir-nl').checked, true, 'Compare intent must preserve the current legacy direction');
assert.equal(activeModeId(), 'mode-incl-excl', 'Compare intent must not claim an unsupported mode');

elements.get('dir-be').checked = true;
context.switchTab('be');
assert.equal(activeModeId(), 'mode-incl-excl', 'Switching tabs should sync from the active checkbox state');

elements.get('dir-nl').checked = false;
context.recalc('nl');
assert.equal(activeModeId(), 'mode-excl-incl', 'Recalc should resync the shell from the legacy direction');

context.showActionButtons('nl', true);
assert.equal(elements.get('btn-share-link-nl').hidden, false, 'Share action should become visible with the other result actions');

console.log('task 1 smoke checks passed');
