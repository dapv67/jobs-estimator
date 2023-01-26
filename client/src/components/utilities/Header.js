import React from "react";
import logo from "../../assets/logo.svg";
import hamburger from "../../assets/hamburguer.svg";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import { LogoutButton } from "./Logout";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container-app">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="menu-container">
        <button
          onClick={() => {
            document.cookie = "token=; max-age=0";
            localStorage.removeItem("isAuth");
            localStorage.removeItem("userLogged");
            localStorage.removeItem("ui");
            navigate("/");
          }}
        >
          Logout
        </button>
        {/* <LogoutButton /> */}
        {/* <img className="menu-hamburger" src={hamburger} alt="Hamburger icon" /> */}
      </div>
    </div>
  );
}

export default Header;
