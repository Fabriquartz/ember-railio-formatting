import { assign } from '@ember/polyfills';
import { isEmpty } from '@ember/utils';
import moment from 'moment';
import { A } from '@ember/array';

const THOUSANDS_REGEX = /(\d+)(\d{3})/;

function addThousandSeperators(integer) {
  let string = integer.toString();

  while (integer >= 1000 && THOUSANDS_REGEX.test(string)) {
    string = string.replace(THOUSANDS_REGEX, '$1 $2');
  }

  return string;
}

export function toNumber(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (value instanceof Date) {
    return value.valueOf();
  }

  if (typeof value === 'string') {
    let commaIndex = value.indexOf(',');
    let dotIndex = value.indexOf('.');
    let parsed = value;

    // Removes the thousands separators
    parsed = parsed.replace(' ', '');
    if (commaIndex < dotIndex) {
      parsed = parsed.replace(',', '');
    } else {
      parsed = parsed.replace('.', '');
    }

    // normalizes decimal seperator to a dot
    parsed = parsed.replace(',', '.');

    return parseFloat(parsed);
  }

  return null;
}

export function formatNumber(value, { decimals, replacement } = {}) {
  let originalValue = value;

  if (isEmpty(value)) {
    return replacement;
  }

  value = toNumber(value);

  if (typeof value !== 'number' || isNaN(value)) {
    return originalValue;
  }

  let [int, dec] = `${value}`.split('.');

  decimals = decimals || (dec && dec.length) || 0;
  decimals = decimals > 10 ? 10 : decimals;

  let factor = Math.pow(10, decimals);

  value = Math.round(value * factor) / factor;

  [int, dec] = `${value}`.split('.');

  if ((!dec && decimals > 0) || (dec && dec.length !== decimals)) {
    dec = dec || '0';
    dec = `${dec}${new Array(decimals - dec.length).fill(0).join('')}`;
  }

  int = addThousandSeperators(int);

  return A([int, dec]).compact().join(',');
}

export function formatDate(value, options) {
  options = assign({}, options);

  if (!(value instanceof Date)) {
    return value;
  }

  if (options === null || typeof options !== 'object') {
    options = {};
  }

  let weekday = '';
  if (options.weekday) {
    weekday = `${moment(value).format('ddd')} `;
    options.weekday = undefined;
  }

  options = assign(
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      locale: 'nl-NL',
    },
    options
  );

  // toLocaleString doesn't handle options with null or empty string, only undefined.
  // if you use undefined in the template helper it will convert to null,
  // so it has to be done over here.
  Object.keys(options).forEach(function (key) {
    // eslint-disable-next-line no-prototype-builtins
    if (options.hasOwnProperty(key) && options[key] == null) {
      options[key] = undefined;
    }
  });

  return `${weekday}${value.toLocaleString(options.locale, options)}`;
}
