import { module, test } from 'qunit';
import { toNumber } from 'ember-railio-to-number';

module('toNumber');

test('10,10 to number', function(assert) {
  assert.equal(toNumber('10,10'), 10.10);
});

test('10.10 to number', function(assert) {
  assert.equal(toNumber('10.10'), 10.10);
});

test('1,000.10 to number', function(assert) {
  assert.equal(toNumber('1,000.10'), 1000.10);
});

test('1.000,10 to number', function(assert) {
  assert.equal(toNumber('1.000,10'), 1000.10);
});

test('1 000,10 to number', function(assert) {
  assert.equal(toNumber('1 000,10'), 1000.10);
});
