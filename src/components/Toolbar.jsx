import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/Toolbar.css';
import propCollectionValidator from '../utils/prop_collection_validator';

class Toolbar extends Component {
  renderButtons() {
    const { buttons, onButtonClicked } = this.props;

    return buttons.map(([buttonText, action]) => (
      <li key={buttonText}>
        <button onClick={() => onButtonClicked(action)}>{buttonText}</button>
      </li>
    ));
  }

  render() {
    return (
      <ul className="Toolbar">
        {this.renderButtons()}
      </ul>
    );
  }
}

Toolbar.propTypes = {
  buttons: propCollectionValidator((i, [buttonText, buttonAction]) => ([
    [
      typeof buttonText === 'string',
      `button text ${buttonText} is not a string`,
    ],

    [
      typeof buttonAction === 'function',
      `button action ${buttonAction} is not a function`,
    ],
  ])),

  onButtonClicked: PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
  buttons: [],
};

export default Toolbar;
