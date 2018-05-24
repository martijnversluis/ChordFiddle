import context from 'jest-plugin-context';

import { getChordSheet } from '../state/initial_state';

jest.mock('../utils/example_chord_pro_sheet', () => 'exampleChordSheet');

jest.mock('../utils/location_hash', () => {
  let mockLocationHash = {};

  return {
    read() {
      return mockLocationHash;
    },

    mockLocationHash(locationHash) {
      mockLocationHash = locationHash;
    },
  };
});

const mockedLocationHash = require('../utils/location_hash');

describe('Initial state', () => {
  describe('#getChordSheet', () => {
    context('when the location hash contains a chord sheet', () => {
      it('returns the decompressed version', () => {
        mockedLocationHash.mockLocationHash({ chordSheet: 'someChordSheet' });

        expect(getChordSheet()).toEqual('someChordSheet');
      });
    });

    context('when the location hash contains an empty chord sheet', () => {
      it('returns the example chord sheet', () => {
        mockedLocationHash.mockLocationHash({ chordSheet: '' });

        expect(getChordSheet()).toEqual('exampleChordSheet');
      });
    });

    context('when the location hash contains an empty chord sheet', () => {
      it('returns the example chord sheet', () => {
        mockedLocationHash.mockLocationHash({ });

        expect(getChordSheet()).toEqual('exampleChordSheet');
      });
    });
  });
});
