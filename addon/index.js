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
