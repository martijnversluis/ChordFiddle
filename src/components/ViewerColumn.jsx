import React from 'react';

import PreviewModeSelectorContainer from '../containers/PreviewModeSelectorContainer';
import ChordSheetViewerContainer from '../containers/ChordSheetViewerContainer';

const ViewerColumn = () => (
  <section className="App__column">
    <PreviewModeSelectorContainer />
    <ChordSheetViewerContainer />
  </section>
);

export default ViewerColumn;
