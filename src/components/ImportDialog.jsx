import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import store from '../store';
import { hideImportDialog } from '../actions/ui_actions';
import { importChordSheet } from '../actions/chord_sheet_actions';

import '../css/ImportDialog.css';

class ImportDialog extends Component {
  onSubmit = () => {
    store.dispatch(importChordSheet(this.importChordSheetEditor.value));
    store.dispatch(hideImportDialog());
  };

  render() {
    const { show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <section className="ImportDialog">
        <button className="ImportDialog__close-button" onClick={() => store.dispatch(hideImportDialog())}>×</button>

        <div className="ImportDialog__contents">
          <h1>Import chord sheet</h1>
          <textarea
            className="ChordSheetEditor"
            ref={importChordSheetEditor => (this.importChordSheetEditor = importChordSheetEditor)}
          />

          <div className="ImportDialog__buttons">
            <button className="large" onClick={this.onSubmit}>Import chord sheet</button>
          </div>
        </div>
      </section>
    );
  }
}

ImportDialog.propTypes = {
  show: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  const { showImportDialog: show } = state.ui;
  return { show };
};

export default connect(mapStateToProps)(ImportDialog);
