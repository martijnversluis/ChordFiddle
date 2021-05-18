import queryString from 'query-string';
import { compress, decompress } from './string_compression';

export function setQueryParams({ displayMode, chordSheet }) {
  window.location.hash = queryString.stringify({
    display_mode: displayMode,
    chord_sheet: compress(chordSheet),
  });
}

export function getQueryParams() {
  const { display_mode: displayMode, chord_sheet: chordSheet } = queryString.parse(window.location.hash);
  return { displayMode, chordSheet: decompress(chordSheet) };
}
