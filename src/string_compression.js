import LZString from 'lz-string';

export function compress(input) {
  return LZString.compressToEncodedURIComponent(input);
}

export function decompress(input) {
  return LZString.decompressFromEncodedURIComponent(input);
}
