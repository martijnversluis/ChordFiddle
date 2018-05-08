import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RadioGroup from './RadioGroup';
import { setPreviewMode } from '../actions/ui_actions';

class PreviewModeSelector extends Component {
  render() {
    const { setPreviewMode, previewMode } = this.props;

    return (
      <RadioGroup
        selected={previewMode}
        onOptionSelected={() => setPreviewMode()}
        options={{ html: 'Markup', text: 'Plain' }}
      />
    );
  }
}

PreviewModeSelector.propTypes = {
  previewMode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { previewMode } = state.ui;
  return { previewMode };
};

const mapDispatchToProps = {
  setPreviewMode
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewModeSelector);
