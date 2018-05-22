import debounce from '../../utils/debounce';
import { write as writeLocationHash } from '../../utils/location_hash';

const updateLocationHash = debounce((store) => {
  const {
    chordSheet: { chordSheet },
    ui: { previewMode },
  } = store.getState();

  writeLocationHash({ chordSheet, previewMode });
});

const synchronizeLocationHash = store => next => (action) => {
  updateLocationHash(store);
  return next(action);
};

export default synchronizeLocationHash;
