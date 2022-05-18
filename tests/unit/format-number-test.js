import { module, test } from 'qunit';
import { formatNumber } from 'ember-railio-formatting';

module('Unit | formatNumber', function () {
  test('formatNumber returns a stringified number', function (assert) {
    assert.strictEqual(formatNumber(10), '10');
  });

  test('formatNumber returns a replacement if undefined', function (assert) {
    assert.strictEqual(
      formatNumber(undefined, { replacement: '-' }),
      '-',
      'Shows replacement when value is undefinded'
    );
  });

  test('formatNumber returns a replacement if null', function (assert) {
    assert.strictEqual(
      formatNumber(null, { replacement: '-' }),
      '-',
      'Shows replacement when value is null'
    );
  });

  test('formatNumber returns a replacement if empty string', function (assert) {
    assert.strictEqual(
      formatNumber('', { replacement: '-' }),
      '-',
      'Shows replacement when value is an empty string'
    );
  });

  test('formatNumber returns a replacement if empty array', function (assert) {
    assert.strictEqual(
      formatNumber([], { replacement: '-' }),
      '-',
      'Shows replacement when value is an empty array'
    );
  });

  test('formatNumber returns 0 if value is 0', function (assert) {
    assert.strictEqual(formatNumber(0), '0', 'Returns 0 when value is 0');
  });

  test('formatNumber by default formats with same decimals', function (assert) {
    assert.strictEqual(formatNumber(10.123), '10,123');
  });

  test('formatNumber formats a negative value', function (assert) {
    assert.strictEqual(formatNumber(-3.5), '-3,5');
  });

  test('formatNumber formats a negative value between -1 and 0', function (assert) {
    assert.strictEqual(formatNumber(-0.6), '-0,6');
  });

  test('formatNumber formats by decimals', function (assert) {
    assert.expect(101);

    assert.strictEqual(formatNumber(10.121, { decimals: 2 }), '10,12');
    assert.strictEqual(formatNumber(10.2, { decimals: 2 }), '10,20');

    for (let i = 0; i < 94; i++) {
      let number = i;

      assert.strictEqual(
        formatNumber(number / 100, { decimals: 1 }),
        `0,${Math.round(number / 10)}`,
        'slices decimals'
      );
    }

    assert.strictEqual(formatNumber(0.95, { decimals: 1 }), '1,0');
    assert.strictEqual(formatNumber(0.96, { decimals: 1 }), '1,0');
    assert.strictEqual(formatNumber(0.97, { decimals: 1 }), '1,0');
    assert.strictEqual(formatNumber(0.98, { decimals: 1 }), '1,0');
    assert.strictEqual(formatNumber(0.99, { decimals: 1 }), '1,0');
  });

  test('formatNumber formats a large number', function (assert) {
    assert.strictEqual(formatNumber(1600000.987), '1 600 000,987');
    assert.strictEqual(
      formatNumber(1600000.987, { decimals: 2 }),
      '1 600 000,99'
    );
    assert.strictEqual(
      formatNumber(1600000.987, { decimals: 4 }),
      '1 600 000,9870'
    );
  });

  test('formatNumber handles up to 10 decimals', function (assert) {
    assert.strictEqual(formatNumber(1, { decimals: 10 }).length, 12);
    assert.strictEqual(formatNumber(1, { decimals: 11 }).length, 12);

    assert.strictEqual(formatNumber(1.0123456789), '1,0123456789');
    assert.strictEqual(formatNumber(1.01234567895), '1,0123456790');
  });

  test('Ignore giant numbers', function (assert) {
    assert.strictEqual(formatNumber(1.56e1, { decimals: 2 }), '15,60');
    assert.strictEqual(formatNumber(1.56e20, { decimals: 2 }).length, 30);
    assert.strictEqual(
      Math.round(formatNumber(1.56e25, { decimals: 2 }) / 1e25),
      2
    );
  });
});
