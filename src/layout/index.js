// Packages
import React from "react";

// Components
import { Button } from "../components";

//Constants
import { Constants } from "../config";

// Style
import "../styles/layouts/sidebar.scss";

const onLogin = () => {
  // event handler for login
};

const Layout = ({ children }) => {
  return (
    <div className="main-container">
      <div className="sidebar">
        <div className="full-width">
          <div className="logo-container">
            <img
              className="logo"
              src="https://recro.io/static/svg/logo.svg"
              alt="logo"
            />
          </div>
          <ul className="sidebar-items">
            {Constants.SIDEBAR_ITEMS.map((item, i) => {
              return (
                <li className={`sidebar-item ${i === 0 ? 'selected-sidebar-item' : ''}`} key={i}>
                  <label className="item-content">{item}</label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <main className="main-content">
        <header className="container-header">
          <Button
            className="login-btn"
            label="Login"
            width="8rem"
            onClick={onLogin}
          />
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
