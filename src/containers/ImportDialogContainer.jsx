import { connect } from 'react-redux';

import { importChordSheet, setImportableChordSheet } from '../state/chord_sheet/actions';
import { hideImportDialog } from '../state/ui/actions';
import ImportDialog from '../components/ImportDialog';

const mapStateToProps = (state) => {
  const { showImportDialog: show } = state.ui;
  return { show };
};

const mapDispatchToProps = {
  onCloseButtonClick: hideImportDialog,
  onImportButtonClick: importChordSheet,
  onImportableChordSheetChange: setImportableChordSheet,
};

const ImportDialogContainer = connect(mapStateToProps, mapDispatchToProps)(ImportDialog);

export default ImportDialogContainer;
