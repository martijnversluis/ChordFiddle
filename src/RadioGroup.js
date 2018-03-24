import React, { Component } from 'react';
import './RadioGroup.css';

let instanceCount = 0;

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.groupId = instanceCount++;
  }

  render() {
    return (
      <ul className="RadioGroup">
        {this.renderOptions()}
      </ul>
    );
  }

  renderOptions() {
    const {options, selected} = this.props;

    return Object.keys(options).map(name => {
      const radioId = `radio-group-${this.groupId}-${name}`;
      const label = options[name];

      return <li key={`${this.groupId}_${name}`} className="RadioGroup__option">
        <input
          className="RadioGroup__radio"
          checked={ selected === name }
          onChange={ this.onChange }
          id={ radioId }
          name={ `radio-group-${this.groupId}` }
          type="radio"
          value={ name }
        />

        <label className="RadioGroup__label" htmlFor={ radioId }>{ label }</label>
      </li>
    });
  }

  onChange = (event) => {
    const {onOptionSelected} = this.props;
    onOptionSelected(event.target.value);
  }
}
