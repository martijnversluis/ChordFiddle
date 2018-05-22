import { connect } from 'react-redux';

import { setPreviewMode } from '../state/ui/actions';
import PreviewModeSelector from '../components/PreviewModeSelector';

const mapStateToProps = (state) => {
  const { previewMode } = state.ui;
  return { previewMode };
};

const mapDispatchToProps = {
  onOptionSelected: setPreviewMode,
};

const PreviewModeSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(PreviewModeSelector);

export default PreviewModeSelectorContainer;
