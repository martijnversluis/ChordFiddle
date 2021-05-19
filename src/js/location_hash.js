import queryString from 'query-string';
import { compress, decompress } from './string_compression';

function getRawQueryParams() {
  return queryString.parse(window.location.hash);
}

function setRawQueryParams(rawQueryParams) {
  window.location.hash = queryString.stringify(rawQueryParams);
}

export function setChordSheet(chordSheet) {
  const { display_mode: displayMode } = getRawQueryParams();

  setRawQueryParams({
    display_mode: displayMode,
    chord_sheet: compress(chordSheet),
  });
}

export function setDisplayMode(displayMode) {
  const { chord_sheet: chordSheet } = getRawQueryParams();
  setRawQueryParams({ display_mode: displayMode, chord_sheet: chordSheet });
}

export function getQueryParams() {
  const { display_mode: displayMode, chord_sheet: chordSheet } = getRawQueryParams();
  return { displayMode, chordSheet: decompress(chordSheet) };
}
