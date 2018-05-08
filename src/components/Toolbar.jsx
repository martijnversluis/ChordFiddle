import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showImportDialog } from '../actions/ui_actions';
import '../css/Toolbar.css';
import { switchToFlat, switchToSharp, transposeDown, transposeUp } from '../actions/chord_sheet_actions';

class Toolbar extends Component {
  getButtons() {
    const {
      transposeDown,
      transposeUp,
      switchToSharp,
      switchToFlat,
      showImportDialog,
    } = this.props;

    return [
      ['Transpose down', transposeDown],
      ['Transpose up', transposeUp],
      ['Use ♯', switchToSharp],
      ['Use ♭', switchToFlat],
      ['Import chord sheet', showImportDialog],
    ];
  }


  render() {
    const buttons = this.getButtons();

    return (
      <ul className="Toolbar">
        {
          buttons.map(([buttonText, action]) => (
            <li>
              <button onClick={() => action()}>{buttonText}</button>
            </li>
          ))
        }
      </ul>
    );
  }
}

const mapDispatchToProps = {
  transposeDown,
  transposeUp,
  switchToSharp,
  switchToFlat,
  showImportDialog
};

export default connect(null, mapDispatchToProps)(Toolbar);
