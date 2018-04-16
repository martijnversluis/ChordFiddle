import React, { Component } from 'react';
import ExternalLink from './ExternalLink';
import packageInfo from '../package.json';
import './Header.css';

export default class Header extends Component {
  static renderSiteName() {
    return (
      <h1 className="Header__site-name">
        <a href="/">{packageInfo.name}</a>
      </h1>
    );
  }

  static renderNavigation() {
    return (
      <ul className="Header__navigation">
        <li>Version {packageInfo.version}</li>

        <li>
          <span>Built with </span>
          <ExternalLink href="https://github.com/martijnversluis/ChordSheetJS">ChordSheetJS</ExternalLink>
          <span> and </span>
          <ExternalLink href="https://github.com/martijnversluis/ChordJS">ChordJS</ExternalLink>
        </li>

        <li>
          <ExternalLink href={packageInfo.githubHome}>GitHub</ExternalLink>
        </li>

        <li>
          <ExternalLink href={packageInfo.bugs.url}>Issues</ExternalLink>
        </li>

        <li>
          <ExternalLink href={packageInfo.about}>About</ExternalLink>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <header className="Header">
        <div className="Header__wrapper">
          {Header.renderSiteName()}
          {Header.renderNavigation()}
        </div>
      </header>
    );
  }
}
