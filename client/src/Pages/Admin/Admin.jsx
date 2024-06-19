import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import Nav from "../../Components/Nav/Nav.jsx";
import Maintenance from "../../Components/Maintenance/Maintenance.jsx";
import Unauthorized from "../../Components/Unauthorized/Unauthorized.jsx";

import UserList from "./Sub Pages/Users/User-list.jsx";
import ClientList from "./Sub Pages/Client List/Client.jsx";
import ClientListForm from "./Sub Pages/Form/Form.jsx";

const Admin = () => {
  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const links = [
    { name: "Dashboard", icon: "dashboard", roles: ["admin", "user"] },
    { name: "Analytics", icon: "insights", roles: ["admin", "user"] },
    { name: "Users", icon: "person_outline", roles: ["admin"] },
    { name: "Client List", icon: "list_alt", roles: ["admin", "user"] },
    { name: "Form", icon: "receipt_long", roles: ["admin", "user"] },
    { name: "Task", icon: "inventory", roles: ["admin", "user"] },
    { name: "Reports", icon: "report_gmailerrorred", roles: ["admin"] },
    { name: "Page", icon: "newspaper", roles: ["admin"] },
    { name: "Tickets", icon: "mail_outline", roles: ["admin"] },
    // { name: 'Settings', icon: 'settings', roles: ['admin', 'user'] },
  ];

  const [sideMenuVisible, setSideMenuVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState(
    currentUser.admin ? "Users" : "Client List"
  );

  const toggleSideMenu = () => {
    setSideMenuVisible(!sideMenuVisible);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode-variables");
    } else {
      document.body.classList.remove("dark-mode-variables");
    }
  }, [darkMode]);

  const renderMainContent = () => {
    switch (activeLink) {
      case "Dashboard":
        return <Maintenance />;
      case "Analytics":
        return <Maintenance />;
      case "Users":
        return <UserList />;
      case "Client List":
        return <ClientList />;
      case "Form":
        return <ClientListForm />;
      case "Task":
        return <Maintenance />;
      case "Reports":
        return <Maintenance />;
      case "Page":
        return <Maintenance />;
      case "Tickets":
        return <Maintenance />;
      case "Settings":
        return <Maintenance />;
      default:
        return null;
    }
  };

  if (!currentUser) {
    return <Unauthorized />;
  }

  const filteredLinks = links.filter((link) =>
    currentUser.admin
      ? link.roles.includes("admin")
      : link.roles.includes("user")
  );

  return (
    <div className="container">
      <Sidebar
        links={filteredLinks}
        activeLink={activeLink}
        handleLinkClick={handleLinkClick}
        handleLogout={handleLogout}
        sideMenuVisible={sideMenuVisible}
        toggleSideMenu={toggleSideMenu}
      />
      <main className="main-content">{renderMainContent()}</main>
      <Nav
        toggleSideMenu={toggleSideMenu}
        activeLink={activeLink}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Admin;
