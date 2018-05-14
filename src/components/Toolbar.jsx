import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showImportDialog } from '../actions/ui_actions';
import { switchToFlat, switchToSharp, transposeDown, transposeUp } from '../actions/chord_sheet_actions';

import '../css/Toolbar.css';

class Toolbar extends Component {
  static getButtons() {
    return [
      ['Transpose down', transposeDown],
      ['Transpose up', transposeUp],
      ['Use ♯', switchToSharp],
      ['Use ♭', switchToFlat],
      ['Import chord sheet', showImportDialog],
    ];
  }


  render() {
    const buttons = Toolbar.getButtons();
    const { onButtonClicked } = this.props;

    return (
      <ul className="Toolbar">
        {
          buttons.map(([buttonText, action]) => (
            <li key={buttonText}>
              <button onClick={() => onButtonClicked(action)}>{buttonText}</button>
            </li>
          ))
        }
      </ul>
    );
  }
}

Toolbar.propTypes = {
  onButtonClicked: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onButtonClicked(action) {
    dispatch(action());
  },
});

export default connect(null, mapDispatchToProps)(Toolbar);
