import React from 'react';

import ToolbarContainer from '../containers/ToolbarContainer';
import ChordSheetEditorContainer from '../containers/ChordSheetEditorContainer';

const EditorColumn = () => (
  <section className="App__column">
    <ToolbarContainer />
    <ChordSheetEditorContainer />
  </section>
);

export default EditorColumn;
