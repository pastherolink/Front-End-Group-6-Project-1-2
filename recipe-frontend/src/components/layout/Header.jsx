import React from 'react';
import Navigation from './Navigation';
import '../../styles/components/Header.css';

const Header = () => {
  return (
    <header>
      <h1>Recipe List Application</h1>
      <Navigation />
    </header>
  );
};

export default Header;