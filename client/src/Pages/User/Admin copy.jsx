import React, { useState, useEffect, Component } from 'react';
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

// Main Content Import
import UserList from './Sub Pages/Users/User-list.jsx';
import ClientList from './Sub Pages/Client List/Client.jsx';
import ClientListForm from './Sub Pages/Form/Form.jsx';
import MainForm from './Sub Pages/Form/MainForm.jsx';

// Components import
import Maintenance from "../../Components/Maintenance/Maintenance.jsx";
import Unauthorized from "../../Components/Unauthorized/Unauthorized.jsx";

const Admin = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Links For the Side Bar
  const links = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Analytics', icon: 'insights' },
    { name: 'Users', icon: 'person_outline' },
    { name: 'Client List', icon: 'list_alt' },
    { name: 'Form', icon: 'receipt_long' },
    { name: 'Task', icon: 'inventory' },
    { name: 'Reports', icon: 'report_gmailerrorred' },
    { name: 'Page', icon: 'newspaper' },
    { name: 'Tickets', icon: 'mail_outline' },
    { name: 'Settings', icon: 'settings' },
  ];

  const [sideMenuVisible, setSideMenuVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState('Users');

  const toggleSideMenu = () => {
    setSideMenuVisible(!sideMenuVisible);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  // Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode-variables');
    } else {
      document.body.classList.remove('dark-mode-variables');
    }
  }, [darkMode]);

  // Main Content Rendering
  const renderMainContent = () => {
    switch (activeLink) {
      case 'Dashboard':
        return (
          <Maintenance />
        );
      case 'Analytics':
        return (
          <Maintenance />
        );
      case 'Users':
        return (
          <UserList />
        );
      case 'Client List':
        return (
          <ClientList />
        );
      case 'Form':
        return (
          <ClientListForm />
        );
      case 'Reports':
        return (
          <Maintenance />
        );
      case 'Page':
        return (
          <Maintenance />
        );
      case 'Tickets':
        return (
          <Maintenance />
        );
      case 'Settings':
        return (
          <Maintenance />
        );
      default:
        return null;
    }
  };


  if (!currentUser) {
    return <Unauthorized />;
  }

  if (!currentUser.admin) {
    return <Unauthorized />;
  }

  return (
    <div className="container">
      {/* Sidebar Section */}
      <aside style={{ display: sideMenuVisible ? 'block' : 'none' }}>
        <div className="toggle">
          <div className="logo danger">Rudra</div>
          <div className="close" id="close-btn" onClick={toggleSideMenu}>
            <span className="material-icons-sharp">close</span>
          </div>
        </div>

        <div className="sidebar">
          {/* Creating Side Bar Links Dynamically */}
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
      {/* End of Sidebar Section */}

      {/* Main Content */}
      <main className="main-content">
        {renderMainContent()}
      </main>
      {/* End of Main Content */}

      {/* Nav */}
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
    </div>
  );
};

export default Admin;
