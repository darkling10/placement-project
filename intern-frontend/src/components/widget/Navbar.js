import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavbarUser = (props) => {
  const history = useNavigate();
  const handleLogout = () => {
    history("/login", { replace: true });
    localStorage.clear();
  };

  const LogoutButton = () => {
    return (
      <Nav.Item onClick={handleLogout}>
        <Nav.Link>
          <Link to="/login">Logout</Link>
        </Nav.Link>
      </Nav.Item>
    );
  };

  const LoginButton = () => {
    return (
      <Nav.Item>
        <Nav.Link>
          <Link to="/login">Login</Link>
        </Nav.Link>
      </Nav.Item>
    );
  };

  const RegistrationButton = () => {
    return (
      <Nav.Item>
        <Nav.Link>
          <Link to="/registration">Registration</Link>
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Home</Navbar.Brand>
          <Nav variant="pills" defaultActiveKey="/home">
            {props.showLogin === true && <LoginButton />}
            {props.showLogout === true && <LogoutButton />}
            {!props.showLogout === true && <RegistrationButton />}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default NavbarUser;
