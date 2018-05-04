import React from 'react';
import PropTypes from 'prop-types';

import store from '../store';
import { showImportDialog } from '../actions/ui_actions';
import '../css/Toolbar.css';

function Toolbar(props) {
  const { onTransposeDown, onTransposeUp, onSwitchToSharp, onSwitchToFlat } = props;

  return (
    <ul className="Toolbar">
      <li>
        <button onClick={onTransposeDown}>Transpose down</button>
      </li>

      <li>
        <button onClick={onTransposeUp}>Transpose up</button>
      </li>

      <li>
        <button onClick={onSwitchToSharp}>Use ♯</button>
      </li>

      <li>
        <button onClick={onSwitchToFlat}>Use ♭</button>
      </li>

      <li>
        <button onClick={() => store.dispatch(showImportDialog())}>Import chord sheet</button>
      </li>
    </ul>
  );
}

Toolbar.propTypes = {
  onTransposeDown: PropTypes.func.isRequired,
  onTransposeUp: PropTypes.func.isRequired,
  onSwitchToSharp: PropTypes.func.isRequired,
  onSwitchToFlat: PropTypes.func.isRequired,
};

export default Toolbar;
