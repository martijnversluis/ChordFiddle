import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RadioGroup from './RadioGroup';
import { setPreviewMode } from '../actions/ui_actions';
import store from '../store';

class PreviewModeSelector extends Component {
  onPreviewModeChange = (newMode) => {
    store.dispatch(setPreviewMode(newMode));
  };

  render() {
    const { previewMode } = this.props;

    return (
      <RadioGroup
        selected={previewMode}
        onOptionSelected={this.onPreviewModeChange}
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

export default connect(mapStateToProps)(PreviewModeSelector);
