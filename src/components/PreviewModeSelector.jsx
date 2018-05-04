import React, { Component } from 'react';
import { connect } from 'react-redux';

import RadioGroup from './RadioGroup';
import { setPreviewMode } from '../actions/ui_actions';
import store from '../store';

class PreviewModeSelector extends Component {
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

  onPreviewModeChange = (newMode) => {
    store.dispatch(setPreviewMode(newMode));
  };
};

const mapStateToProps = state => {
  const { previewMode } = state.ui;
  return { previewMode };
};

export default connect(mapStateToProps)(PreviewModeSelector);
