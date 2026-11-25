import assert from 'node:assert/strict';
import test from 'node:test';
import chordsheetjs from 'chordsheetjs';

import { getImportFormatOptions, getParserForFormat } from './import_format.js';

test('import format options include Ultimate Guitar and Chords over Words', () => {
  const names = getImportFormatOptions().map((option) => option.value);

  assert.ok(names.includes('ultimate-guitar'));
  assert.ok(names.includes('chords-over-words'));
});

test('Ultimate Guitar format uses the expected parser class', () => {
  const parser = getParserForFormat('ultimate-guitar');

  assert.equal(parser, chordsheetjs.UltimateGuitarParser);
});
