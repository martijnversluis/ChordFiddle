import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/RadioGroup.css';
import propCollectionValidator from '../utils/prop_collection_validator';

class RadioGroup extends Component {
  onChange = (event) => {
    const { onOptionSelected } = this.props;
    onOptionSelected(event.target.value);
  };

  renderOptions() {
    const { id, options, selected } = this.props;

    return Object.keys(options).map((name) => {
      const radioId = `radio-group-${id}-${name}`;
      const label = options[name];

      return (
        <li key={`${id}_${name}`} className="RadioGroup__option">
          <input
            className="RadioGroup__radio"
            checked={selected === name}
            onChange={this.onChange}
            id={radioId}
            name={`radio-group-${id}`}
            type="radio"
            value={name}
          />

          <label className="RadioGroup__label" htmlFor={radioId}>{label}</label>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="RadioGroup">
        {this.renderOptions()}
      </ul>
    );
  }
}

RadioGroup.propTypes = {
  id: PropTypes.string.isRequired,
  onOptionSelected: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,

  options: propCollectionValidator((optionKey, optionLabel) => ([
    [
      typeof optionKey === 'string',
      `key ${optionKey} is not a string`,
    ],

    [
      typeof optionLabel === 'string',
      `label ${optionLabel} is not a string`,
    ],
  ])),
};

RadioGroup.defaultProps = {
  options: {},
};

export default RadioGroup;
