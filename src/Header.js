import React from 'react';
import ExternalLink from './ExternalLink';
import packageInfo from '../package.json';
import './Header.css';

export default function Header() {
  return <header className="Header">
    <div className="Header__wrapper">
      <h1 className="Header__site-name">
        <a href="/">{packageInfo.name}</a>
      </h1>

      <ul className="Header__navigation">
        <li>Version {packageInfo.version}</li>

        <li>
          <span>Built with </span>
          <ExternalLink href="https://github.com/martijnversluis/ChordSheetJS">ChordSheetJS</ExternalLink>
          <span> and </span>
          <ExternalLink href="https://github.com/martijnversluis/ChordJS">ChordJS</ExternalLink>
        </li>

        <li>
          <ExternalLink href={packageInfo.homepage}>GitHub</ExternalLink>
        </li>

        <li>
          <ExternalLink href={packageInfo.bugs.url}>Issues</ExternalLink>
        </li>

        <li>
          <ExternalLink href={packageInfo.about}>About</ExternalLink>
        </li>
      </ul>
    </div>
  </header>
}
