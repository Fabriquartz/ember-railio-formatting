import { module, test } from 'qunit';
import { toNumber } from 'ember-railio-formatting';

module('Unit | toNumber', function () {
  test('number 10.10 to number', function (assert) {
    assert.equal(toNumber(10.1), 10.1);
  });

  test('10,10 to number', function (assert) {
    assert.equal(toNumber('10,10'), 10.1);
  });

  test('10.10 to number', function (assert) {
    assert.equal(toNumber('10.10'), 10.1);
  });

  test('1,000.10 to number', function (assert) {
    assert.equal(toNumber('1,000.10'), 1000.1);
  });

  test('1.000,10 to number', function (assert) {
    assert.equal(toNumber('1.000,10'), 1000.1);
  });

  test('1 000,10 to number', function (assert) {
    assert.equal(toNumber('1 000,10'), 1000.1);
  });

  test('date to number', function (assert) {
    let date = new Date(1420096080000);
    assert.equal(toNumber(date), 1420096080000);
  });

  test('none number to number', function (assert) {
    assert.equal(toNumber(true), null);
  });
});
