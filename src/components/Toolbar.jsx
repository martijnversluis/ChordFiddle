import React from 'react';

import store from '../store';
import { showImportDialog } from '../actions/ui_actions';
import '../css/Toolbar.css';
import { switchToFlat, switchToSharp, transposeDown, transposeUp } from '../actions/chord_sheet_actions';

const buttons = [
  ['Transpose down', transposeDown],
  ['Transpose up', transposeUp],
  ['Use ♯', switchToSharp],
  ['Use ♭', switchToFlat],
  ['Import chord sheet', showImportDialog],
];

function Toolbar() {
  return (
    <ul className="Toolbar">
      {
        buttons.map(([buttonText, action]) => (
          <li>
            <button onClick={() => store.dispatch(action())}>{buttonText}</button>
          </li>
        ))
      }
    </ul>
  );
}

export default Toolbar;
