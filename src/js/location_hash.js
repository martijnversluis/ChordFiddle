import queryString from 'query-string';
import { compress, decompress } from './string_compression';

function getRawQueryParams() {
  return queryString.parse(window.location.hash);
}

function setRawQueryParams(rawQueryParams) {
  window.location.hash = queryString.stringify(rawQueryParams);
}

export function setQueryParams({ chordSheet, config, displayMode }) {
  setRawQueryParams({
    chord_sheet: compress(chordSheet),
    config: compress(JSON.stringify(config)),
    display_mode: displayMode,
  });
}

export function getQueryParams() {
  const { display_mode: displayMode, chord_sheet: chordSheet, config } = getRawQueryParams();
  const decompressedConfig = decompress(config);
  const configObject = decompressedConfig.length > 0 ? JSON.parse(decompressedConfig) : {};

  return { config: configObject, displayMode, chordSheet: decompress(chordSheet) };
}
