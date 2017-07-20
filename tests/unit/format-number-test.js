import { module, test } from 'qunit';
import { formatNumber } from 'ember-railio-formatting';

module('Unit | formatNumber');

test('formatNumber returns a stringified number', function(assert) {
  assert.equal(formatNumber(10), '10');
});

test('formatNumber returns a replacement if undefined', function(assert) {
  assert.equal(formatNumber(undefined, { replacement: '-' }), '-',
               'Shows replacement when value is undefinded');
});

test('formatNumber returns a replacement if null', function(assert) {
  assert.equal(formatNumber(null, { replacement: '-' }), '-',
               'Shows replacement when value is null');
});

test('formatNumber returns a replacement if empty string', function(assert) {
  assert.equal(formatNumber('', { replacement: '-' }), '-',
               'Shows replacement when value is an empty string');
});

test('formatNumber returns a replacement if empty array', function(assert) {
  assert.equal(formatNumber([], { replacement: '-' }), '-',
               'Shows replacement when value is an empty array');
});

test('formatNumber returns 0 if value is 0', function(assert) {
  assert.equal(formatNumber(0), 0,
               'Returns 0 when value is 0');
});

test('formatNumber by default formats with same decimals', function(assert) {
  assert.equal(formatNumber(10.123), '10,123');
});

test('formatNumber formats a negative value', function(assert) {
  assert.equal(formatNumber(-3.5), '-3,5');
});

test('formatNumber formats a negative value between -1 and 0', function(assert) {
  assert.equal(formatNumber(-0.6), '-0,6');
});

test('formatNumber formats by decimals', function(assert) {
  assert.equal(formatNumber(10.120, { decimals: 2 }), '10,12', 'slices decimals');
  assert.equal(formatNumber(10.2, { decimals: 2 }), '10,20', 'fills decimals');
});
