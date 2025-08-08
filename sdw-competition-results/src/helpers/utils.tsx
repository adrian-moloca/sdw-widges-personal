import get from 'lodash/get';

export const isDevelopment = import.meta.env.NODE_ENV === 'development';
export function formatMasterCode(input: string) {
  if (!input) return '-';
  const value = input.indexOf('$') > -1 ? input.split('$')[1] : input;
  return value;
}
export const isNullOrEmpty = (el: string | null | undefined) =>
  el === null ||
  el === undefined ||
  el === 'null' ||
  el === 'NULL' ||
  el === '' ||
  el === ' ' ||
  el === ',' ||
  el === '-';
export function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
export function camelCaseToWords(text: string): string {
  if (!text || isNumeric(text)) return text;
  return text
    .toLowerCase()
    .replaceAll('_', ' ')
    .replaceAll('.', ' ')
    .replace(/([A-Z][a-z])/g, ' $1')
    .replace(/\s*([A-Z]+)/g, ' $1')
    .replace(/./, (m) => m.toUpperCase())
    .trim();
}
export function snakeCaseToWords(text: string): string {
  if (!text || isNumeric(text)) return text;
  return text
    .replaceAll('_', ' ')
    .replaceAll('.', ' ')
    .replace(/([A-Z][a-z])/g, ' $1')
    .replace(/\s*([A-Z]+)/g, ' $1')
    .replace(/./, (m) => m.toUpperCase())
    .trim();
}
export function removeHtmlTags(text: string): string {
  return text?.toString().replace(/<[^>]*>/g, '');
}
function capitalizeEachWord(input: string): string {
  if (!input) return '';
  return input.toLowerCase().replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
}
export function humanize(str: string): string {
  if (!str) return '';
  if (isNumeric(str)) return str;
  return capitalizeEachWord(
    str
      .replace(/^[\s_]+|[\s_]+$/g, '')
      .replace(/[_\s]+/g, ' ')
      .replace(/^[a-z]/, function (m) {
        return m.toUpperCase();
      })
  );
}
export function parseTimeToSeconds(timeStr: string): number | null {
  const result = tryParseTimeToSeconds(timeStr);
  return isNaN(result) ? null : result;
}
export function tryParseTimeToSeconds(timeStr: string): number {
  const parts = timeStr.split(':');
  // Handle HH:MM:SS.s, MM:SS.s, or MM:SS
  if (parts.length === 3) {
    const [hh, mm, ss] = parts;
    return parseInt(hh) * 3600 + parseInt(mm) * 60 + parseFloat(ss);
  } else if (parts.length === 2) {
    const [mm, ss] = parts;
    return parseInt(mm) * 60 + parseFloat(ss);
  } else if (parts.length === 1) {
    return parseFloat(parts[0]);
  }
  return NaN;
}

export function formatSecondsToTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = (seconds % 60).toFixed(1).padStart(4, '0'); // "04.2"

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s}`;
  } else {
    return `${m}:${s}`;
  }
}
export function formatAthleteName(data: any): string {
  const participationName = get(data, 'participationName') ?? get(data, 'name');
  const preferredGivenName = get(data, 'preferredGivenName');
  const preferredFamilyName = get(data, 'preferredFamilyName');
  return preferredFamilyName || preferredGivenName
    ? `${preferredFamilyName.toUpperCase()} ${preferredGivenName}`
        .replaceAll('undefined', '')
        .trim()
    : participationName;
}

export const geCountryRegionDisplay = (e: any): string | null => {
  if (!e.country && !e.region) return null;

  if (e.region) {
    return e.country ? `${e.region}, ${e.country.replace('CNTR$', '')}` : e.region;
  }

  return `${e.country?.replace('CNTR$', '') ?? 'UNK'}`;
};

export const getMaxTextWidth = (
  field: string,
  header: string,
  rows: any[],
  charWidth: number = 10,
  minWidth: number = 70,
  extraWidth: number = 0
): number => {
  const maxLength = Math.max(
    ...rows.map((row) => get(row, field, '')?.toString().length ?? 0),
    header.length // include header length
  );
  return Math.max(minWidth, maxLength * charWidth) + extraWidth;
};

export function chunkWithMinSize(array: any[], maxChunkSize: number, minChunkSize = 3): any[][] {
  const result: any[][] = [];
  let i = 0;

  while (i < array.length) {
    const remaining = array.length - i;

    // If the remaining items are less than the min chunk size, append to previous chunk
    if (remaining < minChunkSize && result.length > 0) {
      result[result.length - 1].push(...array.slice(i));
      break;
    }

    // Adjust chunk size if needed to avoid tiny final chunk
    const nextChunkSize =
      remaining > maxChunkSize && remaining - maxChunkSize < minChunkSize
        ? Math.ceil(remaining / 2)
        : Math.min(maxChunkSize, remaining);

    result.push(array.slice(i, i + nextChunkSize));
    i += nextChunkSize;
  }

  return result;
}
export function removeCommonPrefix(strings: string[]): string[] {
  if (strings.length === 0) return [];

  const first = strings[0];
  let prefixLength = first.length;

  for (let i = 1; i < strings.length; i++) {
    let j = 0;
    while (j < prefixLength && j < strings[i].length && strings[i][j] === first[j]) {
      j++;
    }
    prefixLength = j;
  }

  return strings.map((str) => str.slice(prefixLength).trim());
}
export function stripCommonPrefixFromField(data: any[], field: string): any[] {
  if (data.length === 0) return [];

  const values = data.map((item) => item[field]);
  const first = values[0];
  let prefixLength = first.length;

  for (let i = 1; i < values.length; i++) {
    let j = 0;
    while (j < prefixLength && j < values[i].length && values[i][j] === first[j]) {
      j++;
    }
    prefixLength = j;
  }

  return data.map((item) => ({
    ...item,
    [field]: item[field].slice(prefixLength).trim(),
  }));
}
