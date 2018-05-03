import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../css/RadioGroup.css';

let instanceCount = 0;

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.groupId = instanceCount;
    instanceCount += 1;
  }

  onChange = (event) => {
    const { onOptionSelected } = this.props;
    onOptionSelected(event.target.value);
  };

  renderOptions() {
    const { options, selected } = this.props;

    return Object.keys(options).map((name) => {
      const radioId = `radio-group-${this.groupId}-${name}`;
      const label = options[name];

      return (
        <li key={`${this.groupId}_${name}`} className="RadioGroup__option">
          <input
            className="RadioGroup__radio"
            checked={selected === name}
            onChange={this.onChange}
            id={radioId}
            name={`radio-group-${this.groupId}`}
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

function validateRadioGroupOption(optionKey, optionLabel) {
  const errors = [];

  if (typeof optionKey !== 'string') {
    errors.push(`key ${optionKey} is not a string`);
  }

  if (typeof optionLabel !== 'string') {
    errors.push(`label ${optionLabel} is not a string`);
  }

  return errors;
}

RadioGroup.propTypes = {
  onOptionSelected: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,

  options(props, propName, componentName) {
    const radioGroupOptions = props[propName];
    let errors = [];

    Object.keys(radioGroupOptions).forEach((optionKey) => {
      const optionLabel = radioGroupOptions[optionKey];
      const optionErrors = validateRadioGroupOption(optionKey, optionLabel);
      errors = errors.concat(optionErrors);
    });

    if (errors.length > 0) {
      return Error(`Invalid prop ${propName} supplied to component ${componentName}:\n${errors.join('\n')}`);
    }

    return null;
  },
};

RadioGroup.defaultProps = {
  options: {},
};

export default RadioGroup;
