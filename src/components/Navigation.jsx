import React from 'react';

import ExternalLink from './ExternalLink';
import packageInfo from '../../package.json';

const Navigation = () => (
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

export default Navigation;
