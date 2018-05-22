import React from 'react';

import { switchToFlat, switchToSharp, transposeDown, transposeUp } from '../state/chord_sheet/actions';
import { showImportDialog } from '../state/ui/actions';
import ToolbarContainer from '../containers/ToolbarContainer';
import ChordSheetEditorContainer from '../containers/ChordSheetEditorContainer';

function EditorColumn() {
  return (
    <section className="App__column">
      <ToolbarContainer
        buttons={[
          ['Transpose down', transposeDown],
          ['Transpose up', transposeUp],
          ['Use ♯', switchToSharp],
          ['Use ♭', switchToFlat],
          ['Import chord sheet', showImportDialog],
        ]}
      />
      <ChordSheetEditorContainer />
    </section>
  );
}

export default EditorColumn;
