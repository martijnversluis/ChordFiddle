import context from 'jest-plugin-context';

import { read } from '../../utils/location_hash';

jest.mock('../../utils/query_param', () => {
  let mockQueryParams = {};

  return {
    getQueryParams() {
      return mockQueryParams;
    },

    mockQueryParams(queryParams) {
      mockQueryParams = queryParams;
    },
  };
});

jest.mock('../../utils/string_compression', () => ({
  decompress(input) {
    return `decompressed(${input})`;
  },
}));

const mockedQueryParam = require('../../utils/query_param');

describe('location_hash', () => {
  describe('read', () => {
    it('returns the preview mode', () => {
      mockedQueryParam.mockQueryParams({ preview: 'queryPreview' });
      const { previewMode } = read();

      expect(previewMode).toEqual('queryPreview');
    });

    context('when the location hash contains a chord sheet', () => {
      it('returns the chord sheet', () => {
        mockedQueryParam.mockQueryParams({ chord_sheet: 'queryChordSheet' });
        const { chordSheet } = read();

        expect(chordSheet).toEqual('decompressed(queryChordSheet)');
      });
    });

    context('when the location hash contains an empty chord sheet', () => {
      it('returns null', () => {
        mockedQueryParam.mockQueryParams({ chord_sheet: '' });
        const { chordSheet } = read();

        expect(chordSheet).toBe(null);
      });
    });

    context('when the location hash contains no empty chord sheet', () => {
      it('returns null', () => {
        mockedQueryParam.mockQueryParams({});
        const { chordSheet } = read();

        expect(chordSheet).toBe(null);
      });
    });
  });
});
