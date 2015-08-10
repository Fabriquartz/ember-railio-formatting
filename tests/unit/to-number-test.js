import { module, test } from 'qunit';
import { toNumber } from 'ember-railio-formatting';

module('toNumber');

test('number 10.10 to number', function(assert) {
  assert.equal(toNumber(10.10), 10.10);
});

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

test('date to number', function(assert) {
  const date = new Date(2015, 0, 1, 8, 8);
  assert.equal(toNumber(date), 1420096080000);
});

test('none number to number', function(assert) {
  assert.equal(toNumber(true), null);
});
