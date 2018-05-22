import synchronizeLocationHash from '../../state/middleware/synchronize_location_hash';

jest.mock('../../utils/debounce', () => callback => callback);

const fakeStore = {
  getState() {
    return {
      chordSheet: { chordSheet: 'currentChordSheet' },
      ui: { previewMode: 'text' },
    };
  },
};

const mockedLocationHash = require('../../utils/location_hash');

describe('synchronizeLocationHash', () => {
  it('writes the location hash', () => {
    const mockWrite = jest.fn();
    mockedLocationHash.write = mockWrite;

    const action = { type: 'FOOBAR' };
    const fakeNext = jest.fn();

    synchronizeLocationHash(fakeStore)(fakeNext)(action);

    expect(mockWrite).toHaveBeenCalledWith({ chordSheet: 'currentChordSheet', previewMode: 'text' });
  });

  it('calls the next middleware', () => {
    const action = { type: 'FOOBAR' };
    const fakeNext = jest.fn();

    synchronizeLocationHash(fakeStore)(fakeNext)(action);

    expect(fakeNext).toHaveBeenCalledWith(action);
  });
});
