import React, {Component} from 'react';
import './ImportDialog.css';

export default class ImportDialog extends Component {
  render() {
    const {show, onCancel} = this.props;

    if (!show) {
      return null;
    }

    return <section className="ImportDialog">
      <button className="ImportDialog__close-button" onClick={onCancel}>×</button>

      <div className="ImportDialog__contents">
        <h1>Import chord sheet</h1>
        <textarea
          className="ChordSheetEditor"
          ref={importChordSheetEditor => (this.importChordSheetEditor = importChordSheetEditor)}
        ></textarea>

        <div className="ImportDialog__buttons">
          <button className="large" onClick={this.onSubmit}>Import chord sheet</button>
        </div>
      </div>
    </section>;
  }

  onSubmit = () => {
    this.props.onSubmit(this.importChordSheetEditor.value);
  };
}
