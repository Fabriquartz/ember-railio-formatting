import { module, test } from 'qunit';
import { formatDate } from 'ember-railio-formatting';

module('Unit | formateDate');

test('formatDate returns a stringified number', function(assert) {
  let value = new Date(111111);
  assert.equal(formatDate(value), '01-01-1970 00:01');
});

test('formatDate returns value if not a date', function(assert) {
  let value = '';
  assert.equal(formatDate(value), '');
});

test('formatDate returns default options if options not set', function(assert) {
  let value   = new Date(111111);
  let options = null;

  assert.equal(formatDate(value, options), '01-01-1970 00:01');
});

test('formatDate returns default options if options is not an object', function(assert) {
  let value   = new Date(111111);
  let options = '';

  assert.equal(formatDate(value, options), '01-01-1970 00:01');
});

test('formatDate returns weekday and default options', function(assert) {
  let value   = new Date(111111);
  let options = { weekday: 'short' };

  assert.equal(formatDate(value, options), 'Thu 01-01-1970 00:01');
});

test('formatDate returns custom options before default options', function(assert) {
  let value   = new Date(111111);
  let options = { hour: null, minute: null };

  assert.equal(formatDate(value, options), '01-01-1970');
});
