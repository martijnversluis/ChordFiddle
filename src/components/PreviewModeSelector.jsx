import React from 'react';
import PropTypes from 'prop-types';

import RadioGroup from './RadioGroup';

const PreviewModeSelector = (props) => {
  const { onOptionSelected, previewMode } = props;

  return (
    <RadioGroup
      id={'preview_mode'}
      selected={previewMode}
      onOptionSelected={onOptionSelected}
      options={{ html: 'Markup', text: 'Plain' }}
    />
  );
};

PreviewModeSelector.propTypes = {
  previewMode: PropTypes.string.isRequired,
  onOptionSelected: PropTypes.func.isRequired,
};

export default PreviewModeSelector;
