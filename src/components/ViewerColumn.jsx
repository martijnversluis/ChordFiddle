import React from 'react';

import PreviewModeSelectorContainer from '../containers/PreviewModeSelectorContainer';
import ChordSheetViewerContainer from '../containers/ChordSheetViewerContainer';

function ViewerColumn() {
  return (
    <section className="App__column">
      <PreviewModeSelectorContainer />
      <ChordSheetViewerContainer />
    </section>
  );
}

export default ViewerColumn;
