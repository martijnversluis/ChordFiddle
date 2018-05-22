import { connect } from 'react-redux';

import { setChordSheet, setSelectionRange } from '../state/chord_sheet/actions';
import ChordSheetEditor from '../components/ChordSheetEditor';

const mapStateToProps = (state) => {
  const { chordSheet, selectionStart, selectionEnd } = state.chordSheet;
  return { chordSheet, selectionStart, selectionEnd };
};

const mapDispatchToProps = {
  onChordSheetChange: setChordSheet,
  onSelectionChange: setSelectionRange,
};

const ChordSheetEditorContainer = connect(mapStateToProps, mapDispatchToProps)(ChordSheetEditor);

export default ChordSheetEditorContainer;
