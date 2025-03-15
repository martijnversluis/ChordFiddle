import chordsheetjs from 'chordsheetjs';

import './sass/main.sass';

import { convertChordSheetToChordPro } from './js/chord_sheet_transformations';
import { getQueryParams, setQueryParams } from './js/location_hash';
import ChordSheetEditor from './js/chord_sheet_editor';
import ChordSheetViewer from './js/chord_sheet_viewer';
import ImportDialog from './js/import_dialog';
import Toolbar from './js/toolbar';
import ConfigEditor from './js/config_editor';
import debounce from './js/debounce';

class App {
  song;
  chordSheet;
  config;
  displayMode;

  chordSheetEditor;
  chordSheetViewer;
  configEditor;
  importDialog;
  toolbar;

  constructor() {
    this.chordSheetEditor = new ChordSheetEditor('chordSheetEditor');
    this.chordSheetViewer = new ChordSheetViewer('chordSheetViewer');
    this.configEditor = new ConfigEditor('configEditor');
    this.importDialog = new ImportDialog('importDialog');
    this.toolbar = new Toolbar('toolbar');
  }

  start() {
    this.syncWithQueryParams();
    this.render();
    this.addChangeListeners();
  }

  syncWithQueryParams() {
    const { chordSheet, config, displayMode } = getQueryParams();

    this.syncDisplayMode(displayMode);
    this.syncChordSheet(chordSheet);
    this.syncConfig(config);
  }

  addChangeListeners() {
    this.configEditor.onConfigChange = (config) => {
      this.config = config;
      this.render();
    };

    this.importDialog.onImportConfirmed = (chordSheet) => {
      const chordProSheet = convertChordSheetToChordPro(chordSheet);
      this.chordSheetEditor.setValue(chordProSheet);
      this.render();
    };

    this.chordSheetViewer.onDisplayModeChanged = () => {
      this.render();
    };

    this.toolbar.onTransformClick = (transform) => this.chordSheetEditor.transformChordSheet(transform);
    this.toolbar.onImportChordSheetClick = () => this.importDialog.open();

    this.chordSheetEditor.onChordSheetChange = (newChordSheet) => {
      this.chordSheet = newChordSheet;
      this.render();
    };
  }

  syncConfig(config) {
    if (config) {
      this.config = config;
      this.configEditor.setConfig(config);
    } else {
      this.config = this.configEditor.getConfig();
    }
  }

  syncChordSheet(chordSheet) {
    if (chordSheet) {
      this.chordSheet = chordSheet;
      this.chordSheetEditor.setValue(chordSheet);
    } else {
      this.chordSheet = this.chordSheetEditor.getValue();
    }
  }

  syncDisplayMode(displayMode) {
    if (displayMode) {
      this.displayMode = displayMode;
      this.chordSheetViewer.setSelectedMode(displayMode);
    } else {
      this.displayMode = this.chordSheetViewer.getSelectedMode();
    }
  }

  render = debounce(() => {
    this.renderChordSheet();
    this.updateQueryParams();
  }, 100);

  renderChordSheet() {
    try {
      const parser = new chordsheetjs.ChordProParser();
      this.song = parser.parse(this.chordSheet);
      this.chordSheetViewer.render(this.song, this.config);
      this.chordSheetEditor.resetError();
    } catch ({ message, location }) {
      this.chordSheetEditor.showError(message, location);
    }
  }

  updateQueryParams() {
    setQueryParams({
      chordSheet: this.chordSheet,
      config: this.config,
      displayMode: this.displayMode,
    });
  }
}

new App().start();
