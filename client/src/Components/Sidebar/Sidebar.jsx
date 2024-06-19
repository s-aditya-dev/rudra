import React from 'react';
import "./Sidebar.css";

const Sidebar = ({ links, activeLink, handleLinkClick, handleLogout, sideMenuVisible, toggleSideMenu }) => {
  return (
    <aside style={{ display: sideMenuVisible ? 'block' : 'none' }}>
      <div className="toggle">
        <div className="logo danger">Rudra</div>
        <div className="close" id="close-btn" onClick={toggleSideMenu}>
          <span className="material-icons-sharp">close</span>
        </div>
      </div>
      <div className="sidebar">
        {links.map((link) => (
          <a
            key={link.name}
            className={`side-link ${activeLink === link.name ? 'active' : ''}`}
            onClick={() => handleLinkClick(link.name)}
          >
            <span className="material-icons-sharp">{link.icon}</span>
            <h3>{link.name}</h3>
            <span className="message-count"></span>
          </a>
        ))}
        <a className="side-link" onClick={handleLogout}>
          <span className="material-icons-sharp">logout</span>
          <h3>Logout</h3>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
