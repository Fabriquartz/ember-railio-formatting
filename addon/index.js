import {
  isString,
  isNumber,
  isDate
} from 'ember-cli-railio-core/utils/typecheck';

export function toNumber(value) {
  if (isNumber(value)) { return value; }
  if (isDate(value))   { return value.valueOf(); }
  if (isString(value)) {
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
