import React from 'react';
import packageInfo from '../package.json';
import './Header.css';

export default function Header() {
  return <header className="Header">
    <div className="Header__wrapper">
      <h1 className="Header__site-name">
        <a href="/">{ packageInfo.name }</a>
      </h1>

      <ul className="Header__navigation">
        <li>Version { packageInfo.version }</li>

        <li>
          <span>Built with </span>
          <a
            href="https://github.com/martijnversluis/ChordSheetJS"
            target="_blank"
            rel="noopener noreferrer"
          >ChordSheetJS</a>
          <span> and </span>
          <a
            href="https://github.com/martijnversluis/ChordJS"
            target="_blank"
            rel="noopener noreferrer"
          >ChordJS</a>
        </li>

        <li>
          <a
            href={ packageInfo.homepage }
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a>
        </li>

        <li>
          <a
            href={ packageInfo.bugs.url }
            target="_blank"
            rel="noopener noreferrer"
          >Issues</a>
        </li>

        <li>
          <a
            href={ packageInfo.about }
            target="_blank"
            rel="noopener noreferrer"
          >About</a>
        </li>
      </ul>
    </div>
  </header>
}
