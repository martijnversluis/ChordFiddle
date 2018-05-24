import React from 'react';
import PropTypes from 'prop-types';

import ToolbarButton from './ToolbarButton';
import { switchToFlat, switchToSharp, transposeDown, transposeUp } from '../state/chord_sheet/actions';
import { showImportDialog } from '../state/ui/actions';

import '../css/Toolbar.css';

const Toolbar = (props) => {
  const { onButtonClicked } = props;

  return (
    <ul className="Toolbar">
      <ToolbarButton onClick={() => onButtonClicked(transposeDown)} text={'Transpose down'} />
      <ToolbarButton onClick={() => onButtonClicked(transposeUp)} text={'Transpose up'} />
      <ToolbarButton onClick={() => onButtonClicked(switchToSharp)} text={'Use ♯'} />
      <ToolbarButton onClick={() => onButtonClicked(switchToFlat)} text={'Use ♭'} />
      <ToolbarButton onClick={() => onButtonClicked(showImportDialog)} text={'Import chord sheet'} />
    </ul>
  );
};

Toolbar.propTypes = {
  onButtonClicked: PropTypes.func.isRequired,
};

export default Toolbar;
