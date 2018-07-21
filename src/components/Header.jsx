import React from 'react';

import SiteName from './SiteName';
import Navigation from './Navigation';

import '../css/Header.css';

const Header = () => (
  <header className="Header">
    <div className="Header__wrapper">
      <SiteName />
      <Navigation />
    </div>
  </header>
);

export default Header;
