import React from 'react';

import store from '../store';
import { showImportDialog } from '../actions/ui_actions';
import '../css/Toolbar.css';
import { switchToFlat, switchToSharp, transposeDown, transposeUp } from '../actions/chord_sheet_actions';

function Toolbar() {
  return (
    <ul className="Toolbar">
      <li>
        <button onClick={() => store.dispatch(transposeDown())}>Transpose down</button>
      </li>

      <li>
        <button onClick={() => store.dispatch(transposeUp())}>Transpose up</button>
      </li>

      <li>
        <button onClick={() => store.dispatch(switchToSharp())}>Use ♯</button>
      </li>

      <li>
        <button onClick={() => store.dispatch(switchToFlat())}>Use ♭</button>
      </li>

      <li>
        <button onClick={() => store.dispatch(showImportDialog())}>Import chord sheet</button>
      </li>
    </ul>
  );
}

export default Toolbar;
