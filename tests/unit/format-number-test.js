import { module, test } from 'qunit';
import { formatNumber } from 'ember-railio-formatting';

module('Unit | formatNumber');

test('formatNumber returns a stringified number', function(assert) {
  assert.equal(formatNumber(10), '10');
});

test('formatNumber by default formats with same decimals', function(assert) {
  assert.equal(formatNumber(10.123), '10,123');
});

test('formatNumber formats a negative value', function(assert) {
  assert.equal(formatNumber(-3.5), '-3,5');
});

test('formatNumber formats by decimals', function(assert) {
  assert.equal(formatNumber(10.120, { decimals: 2 }), '10,12', 'slices the decimals');
  assert.equal(formatNumber(10.2, { decimals: 2 }), '10,20', 'fills the decimals');
});
