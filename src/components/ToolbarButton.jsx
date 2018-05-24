import React from 'react';
import PropTypes from 'prop-types';

const ToolbarButton = (props) => {
  const { onClick, text } = props;

  return (
    <li key={text}>
      <button onClick={onClick}>{text}</button>
    </li>
  );
};

ToolbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default ToolbarButton;
