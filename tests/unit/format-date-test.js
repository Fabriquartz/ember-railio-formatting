import { module, test } from 'qunit';
import { formatDate } from 'ember-railio-formatting';

module('Unit | formateDate', function () {
  test('formatDate returns a stringified number', function (assert) {
    let value = new Date(2017, 6, 4, 0, 1);
    assert.strictEqual(formatDate(value), '04-07-2017 00:01');
  });

  test('formatDate returns value if not a date', function (assert) {
    let value = '';
    assert.strictEqual(formatDate(value), '');
  });

  test('formatDate returns default options if options not set', function (assert) {
    let value = new Date(2017, 6, 4, 0, 1);
    let options = null;

    assert.strictEqual(formatDate(value, options), '04-07-2017 00:01');
  });

  test('formatDate returns default options if options is not an object', function (assert) {
    let value = new Date(2017, 6, 4, 0, 1);
    let options = '';

    assert.strictEqual(formatDate(value, options), '04-07-2017 00:01');
  });

  test('formatDate returns weekday and default options', function (assert) {
    let value = new Date(2017, 6, 4, 0, 1);
    let options = { weekday: 'short' };

    assert.strictEqual(formatDate(value, options), 'Tue 04-07-2017 00:01');
  });

  test('formatDate returns custom options before default options', function (assert) {
    let value = new Date(2017, 6, 4, 19, 12);
    let options = { hour: null, minute: null };

    assert.strictEqual(formatDate(value, options), '04-07-2017');
  });

  test('formatDate uses custom locale when set', function (assert) {
    let value = new Date(2017, 6, 4, 19, 12);
    let options = { locale: 'en-US' };

    assert.strictEqual(formatDate(value, options), '07/04/2017, 7:12 PM');

    options.month = 'long';
    assert.strictEqual(formatDate(value, options), 'July 04, 2017, 7:12 PM');
  });
});
