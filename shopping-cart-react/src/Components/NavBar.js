import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = {
    profileImage: 'https://example.com/user.jpg',
    name: 'John Doe',
  };
  const navigate = useNavigate();

  const handleProfile = () => navigate('/profile');
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/login');
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown
            title={
              <Image
                src={isLoggedIn && user.profileImage ? user.profileImage : '/default-user.png'}
                roundedCircle
                width={30}
                height={30}
                alt={isLoggedIn ? user.name : 'User'}
              />
            }
            id="user-dropdown"
            align="end"
          >
            {isLoggedIn ? (
              <>
                <NavDropdown.Item onClick={handleProfile}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </>
            ) : (
              <NavDropdown.Item onClick={handleLogin}>Login</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;