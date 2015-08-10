import $ from 'jquery';

const THOUSANDS_REGEX = /(\d+)(\d{3})/;

function addThousandSeperators(integer) {
  let string = integer.toString();

  while (integer >= 1000 && THOUSANDS_REGEX.test(string)) {
    string = string.replace(THOUSANDS_REGEX, '$1.$2');
  }

  return string;
}

export function toNumber(value) {
  if (typeof value === 'number') { return value; }

  if (value instanceof Date) { return value.valueOf(); }

  if (typeof value === 'string') {
    const commaIndex = value.indexOf(',');
    const dotIndex   = value.indexOf('.');
    let parsed       = value;

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

export function formatNumber(value, { decimals } = {}) {
  const originalValue = value;
  value = toNumber(value);

  if (typeof value !== 'number' || isNaN(value)) { return originalValue; }

  const integerValue = Math.floor(value);
  const decimalValue = value - integerValue;

  const integerStringValue = addThousandSeperators(integerValue);

  if (decimalValue > 0 || decimals > 0) {
    let decimalStringValue = decimalValue.toFixed(decimals).slice(2);
    return `${integerStringValue},${decimalStringValue}`;
  } else {
    return integerStringValue;
  }
}

export function formatDate(value, options) {
  if (!(value instanceof Date)) { return value; }
  if (options === null || typeof object !== 'object') {
    options = {};
  }
  options = $.extend({
    year:   'numeric',
    month:  '2-digit',
    day:    '2-digit',
    hour:   'numeric',
    minute: 'numeric'
  }, options);
  return value.toLocaleString('nl-NL', options);
}
