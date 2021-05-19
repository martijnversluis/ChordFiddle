import chordsheetjs from 'chordsheetjs';

import './sass/main.sass';

import { convertChordSheetToChordPro } from './js/chord_sheet_transformations';
import { getQueryParams, setChordSheet, setDisplayMode } from './js/location_hash';
import ChordSheetEditor from './js/chord_sheet_editor';
import ChordSheetViewer from './js/chord_sheet_viewer';
import ImportDialog from './js/import_dialog';
import Toolbar from './js/toolbar';

let song = null;

const chordSheetEditor = new ChordSheetEditor('chordSheetEditor');
const chordSheetViewer = new ChordSheetViewer('chordSheetViewer');

function onChordSheetChange(chordSheet) {
  setChordSheet(chordSheet);

  try {
    const parser = new chordsheetjs.ChordProParser();
    song = parser.parse(chordSheet);
    chordSheetViewer.render(song);
    chordSheetEditor.resetError();
  } catch ({ message, location }) {
    chordSheetEditor.showError(message, location.start.line);
  }
}

chordSheetEditor.onChordSheetChange = onChordSheetChange;

chordSheetViewer.onDisplayModeChanged = (displayMode) => {
  setDisplayMode(displayMode);
  chordSheetViewer.render(song);
};

const importDialog = new ImportDialog('importDialog');

importDialog.onImportConfirmed = (chordSheet) => {
  const chordProSheet = convertChordSheetToChordPro(chordSheet);
  chordSheetEditor.setValue(chordProSheet);
  onChordSheetChange(chordProSheet);
};

const toolbar = new Toolbar('toolbar');
toolbar.onTransformClick = (transform) => chordSheetEditor.transformChordSheet(transform);
toolbar.onImportChordSheetClick = () => importDialog.open();

const { chordSheet, displayMode } = getQueryParams();

if (displayMode) {
  chordSheetViewer.setSelectedMode(displayMode);
}

if (chordSheet) {
  chordSheetEditor.setValue(chordSheet);
  onChordSheetChange(chordSheet);
} else {
  onChordSheetChange(chordSheetEditor.getValue());
}

chordSheetEditor.updateLineNumbers();
