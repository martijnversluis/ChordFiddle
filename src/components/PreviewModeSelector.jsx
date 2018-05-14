import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RadioGroup from './RadioGroup';
import { setPreviewMode } from '../actions/ui_actions';

const PreviewModeSelector = (props) => {
  const { onOptionSelected, previewMode } = props;

  return (
    <RadioGroup
      selected={previewMode}
      onOptionSelected={onOptionSelected}
      options={{ html: 'Markup', text: 'Plain' }}
    />
  );
};

PreviewModeSelector.propTypes = {
  previewMode: PropTypes.string.isRequired,
  onOptionSelected: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { previewMode } = state.ui;
  return { previewMode };
};

const mapDispatchToProps = {
  onOptionSelected: setPreviewMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewModeSelector);
