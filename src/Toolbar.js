import React from 'react';
import './Toolbar.css';

export default function(props) {
  const {
    onTransposeDown,
    onTransposeUp,
    onSwitchToSharp,
    onSwitchToFlat,
    onShowImportChordSheetDialog
  } = props;

  return <ul className="Toolbar">
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
      <button onClick={onShowImportChordSheetDialog}>Import chord sheet</button>
    </li>
  </ul>;
}
