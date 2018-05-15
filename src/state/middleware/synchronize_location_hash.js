import { setQueryParams } from '../../utils/query_param';
import { compress } from '../../utils/string_compression';
import debounce from '../../utils/debounce';

const updateLocationHash = debounce((store) => {
  const {
    chordSheet: { chordSheet },
    ui: { previewMode },
  } = store.getState();

  setQueryParams({
    chord_sheet: compress(chordSheet),
    preview: previewMode,
  });
});

const synchronizeLocationHash = store => next => (action) => {
  updateLocationHash(store);
  return next(action);
};

export default synchronizeLocationHash;
