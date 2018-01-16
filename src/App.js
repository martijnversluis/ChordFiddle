import React, { Component } from 'react';
import packageInfo from '../package.json';
class App extends Component {
  render() {
    return (
      <div className="App-container">
        <header>
          <div className="wrapper">
            <h1 className="site-name">
              <a href="/">{ packageInfo.name }</a>
            </h1>

            <ul className="meta">
              <li>Version { packageInfo.version }</li>

              <li>
                <span>Built with </span>
                <a
                  href="https://github.com/martijnversluis/ChordSheetJS"
                  target="_blank"
                >ChordSheetJS</a>
                <span> and </span>
                <a href="https://github.com/martijnversluis/ChordJS" target="_blank">ChordJS</a>
              </li>

              <li>
                <a href={ packageInfo.homepage } target="_blank">GitHub</a>
              </li>

              <li>
                <a href={ packageInfo.bugs.url } target="_blank">Issues</a>
              </li>

              <li>
                <a href={ packageInfo.about } target="_blank">About</a>
              </li>
            </ul>
          </div>
        </header>

        <main>
          <div className="columns">
            <section className="column column-left">
              <ul className="mod-toolbar mod-main-toolbar">
                <li>
                  <button>Transpose down</button>
                </li>

                <li>
                  <button>Transpose up</button>
                </li>

                <li>
                  <button>Use ♯</button>
                </li>

                <li>
                  <button>Use ♭</button>
                </li>

                <li>
                  <a href="#import-chord-sheet-modal" className="button">Import chord sheet</a>
                </li>
              </ul>

              <textarea className="sheet-editor active"></textarea>
            </section>

            <section className="column column-right">
              <ul className="mod-radio-group">
                <li>
                  <input checked="checked" id="view-type-plain" name="view_type" type="radio" value="plain"/>
                  <label htmlFor="view-type-plain">Text</label>
                </li>

                <li>
                  <input data-id="view-type-html" id="view-type-html" name="view_type" type="radio" value="html"/>
                  <label htmlFor="view-type-html">HTML</label>
                </li>
              </ul>

              <textarea readOnly="readonly" className="sheet-editor active"></textarea>

              <div className="sheet-viewer mod-html-preview"></div>
            </section>
          </div>
        </main>

        <section className="mod-modal mod-import-chord-sheet" id="import-chord-sheet-modal">
          <a href="#" className="close">×</a>

          <div className="contents">
            <h1>Import chord sheet</h1>
            <textarea data-id="chord-sheet-import-area" className="sheet-editor active"></textarea>

            <div className="mod-toolbar">
              <button data-id="import-chord-sheet-submit" className="large">Import chord sheet</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
