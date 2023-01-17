import React from "react";
import logo from "../../assets/logo.svg";
import hamburger from "../../assets/hamburguer.svg";
import "./Header.css";

function Header() {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="menu-container">
        <img className="menu-hamburger" src={hamburger} alt="Hamburger icon" />
      </div>
    </div>
  );
}

export default Header;
