import { module, test } from 'qunit';
import { formatNumber } from 'ember-railio-formatting';

module('Unit | formatNumber', function () {
  test('formatNumber returns a stringified number', function (assert) {
    assert.equal(formatNumber(10), '10');
  });

  test('formatNumber returns a replacement if undefined', function (assert) {
    assert.equal(
      formatNumber(undefined, { replacement: '-' }),
      '-',
      'Shows replacement when value is undefinded'
    );
  });

  test('formatNumber returns a replacement if null', function (assert) {
    assert.equal(
      formatNumber(null, { replacement: '-' }),
      '-',
      'Shows replacement when value is null'
    );
  });

  test('formatNumber returns a replacement if empty string', function (assert) {
    assert.equal(
      formatNumber('', { replacement: '-' }),
      '-',
      'Shows replacement when value is an empty string'
    );
  });

  test('formatNumber returns a replacement if empty array', function (assert) {
    assert.equal(
      formatNumber([], { replacement: '-' }),
      '-',
      'Shows replacement when value is an empty array'
    );
  });

  test('formatNumber returns 0 if value is 0', function (assert) {
    assert.equal(formatNumber(0), 0, 'Returns 0 when value is 0');
  });

  test('formatNumber by default formats with same decimals', function (assert) {
    assert.equal(formatNumber(10.123), '10,123');
  });

  test('formatNumber formats a negative value', function (assert) {
    assert.equal(formatNumber(-3.5), '-3,5');
  });

  test('formatNumber formats a negative value between -1 and 0', function (assert) {
    assert.equal(formatNumber(-0.6), '-0,6');
  });

  test('formatNumber formats by decimals', function (assert) {
    assert.expect(101);

    assert.equal(formatNumber(10.121, { decimals: 2 }), '10,12');
    assert.equal(formatNumber(10.2, { decimals: 2 }), '10,20');

    for (let i = 0; i < 94; i++) {
      let number = i;

      assert.equal(
        formatNumber(number / 100, { decimals: 1 }),
        `0,${Math.round(number / 10)}`,
        'slices decimals'
      );
    }

    assert.equal(formatNumber(0.95, { decimals: 1 }), '1,0');
    assert.equal(formatNumber(0.96, { decimals: 1 }), '1,0');
    assert.equal(formatNumber(0.97, { decimals: 1 }), '1,0');
    assert.equal(formatNumber(0.98, { decimals: 1 }), '1,0');
    assert.equal(formatNumber(0.99, { decimals: 1 }), '1,0');
  });

  test('formatNumber formats a large number', function (assert) {
    assert.equal(formatNumber(1600000.987), '1 600 000,987');
    assert.equal(formatNumber(1600000.987, { decimals: 2 }), '1 600 000,99');
    assert.equal(formatNumber(1600000.987, { decimals: 4 }), '1 600 000,9870');
  });
});
