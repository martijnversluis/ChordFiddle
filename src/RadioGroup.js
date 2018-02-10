import React, { Component } from 'react';
import './RadioGroup.css';

let instanceCount = 0;

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    const {selected} = this.props;
    this.state = {selected};
  }

  render() {
    return (
      <ul className="RadioGroup">
        {this.renderOptions()}
      </ul>
    );
  }

  renderOptions() {
    const {options} = this.props;
    const {selected} = this.state;
    const groupId = instanceCount++;

    return Object.keys(options).map(name => {
      const radioId = `radio-group-${groupId}-${name}`;
      const label = options[name];

      return <li key={`${groupId}_${name}`} className="RadioGroup__option">
        <input
          className="RadioGroup__radio"
          checked={ selected === name }
          onChange={ this.onChange }
          id={ radioId }
          name={ `radio-group-${groupId}` }
          type="radio"
          value={ name }
        />

        <label className="RadioGroup__label" htmlFor={ radioId }>{ label }</label>
      </li>
    });
  }

  onChange = (event) => {
    const {onOptionSelected} = this.props;
    const selected = event.target.value;
    this.setState({selected});
    onOptionSelected(selected);
  }
}
