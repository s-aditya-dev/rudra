import React from 'react';
import "./Nav.css"; // Create separate CSS file if needed

const Nav = ({ toggleSideMenu, activeLink, toggleDarkMode, darkMode, currentUser }) => {
  return (
    <nav className="nav">
      <button id="menu-btn" onClick={toggleSideMenu}>
        <span className="material-icons-sharp">menu</span>
      </button>
      <h1 className="CurrContentHeading">{activeLink}</h1>
      <div className="dark-mode" onClick={toggleDarkMode}>
        <span className={`material-icons-sharp ${!darkMode ? 'active' : ''}`}>light_mode</span>
        <span className={`material-icons-sharp ${darkMode ? 'active' : ''}`}>dark_mode</span>
      </div>
      <div className="profile">
        <div className="info">
          <p>
            Hey, <b>{currentUser?.firstName ?? 'Guest'}</b>
          </p>
          <small className="text-muted">{currentUser?.admin ? 'Admin' : currentUser ? 'User' : 'Unknown'}</small>
        </div>
        <div className="profile-photo">
          <img
            src='https://pics.craiyon.com/2023-08-29/eb9601cadf2744219982a10ac54b3b17.webp'
            alt="Profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
