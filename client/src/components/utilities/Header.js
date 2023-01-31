import React from "react";
import logo from "../../assets/logo.svg";
import hamburger from "../../assets/hamburguer.svg";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";

//Menu toggle
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg">
      {/* <div className="header-container-app"> */}
      <Container fluid>
        <Navbar.Brand href="#home">
          <div className="logo-container">
            <img className="logo" src={logo} alt="Logo" />
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Collapse id="offcanvasNavbar-expand-lg">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                document.cookie = "token=; max-age=0";
                localStorage.removeItem("isAuth");
                localStorage.removeItem("userLogged");
                localStorage.removeItem("ui");
                navigate("/");
              }}
            >
              Sign out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* </div> */}
    </Navbar>

    // <div className="header-container-app">
    //   <div className="logo-container">
    //     <img className="logo" src={logo} alt="Logo" />
    //   </div>
    //   <div className="menu-container">
    //     <button
    //       onClick={() => {
    //         document.cookie = "token=; max-age=0";
    //         localStorage.removeItem("isAuth");
    //         localStorage.removeItem("userLogged");
    //         localStorage.removeItem("ui");
    //         navigate("/");
    //       }}
    //     >
    //       Logout
    //     </button>

    //     {/* <img className="menu-hamburger" src={hamburger} alt="Hamburger icon" /> */}
    //   </div>
    // </div>
  );
}

export default Header;
