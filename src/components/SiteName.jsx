import React from 'react';

import packageInfo from '../../package.json';

const SiteName = () => (
  <h1 className="Header__site-name">
    <a href="/">{packageInfo.name}</a>
  </h1>
);

export default SiteName;
