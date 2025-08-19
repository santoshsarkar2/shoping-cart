import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { getToken, clearAuthData } from "../Services/authService";



function Header({ themeColor, setThemeColor, isLoggedIn, setIsLoggedIn }) {
  const [user, setUser] = useState(null);
  let token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      //const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:4000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.setItem('user-info', JSON.stringify(res.data));
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, []);
  

  return (
    <header className="app-header">
      {console.log("Header.js IsLogedIn : ",isLoggedIn)}
      <nav className="header-nav-left">
        <Link to="/" className="header-logo">
          <span className="material-symbols-outlined logo-icon">store</span>
          <span>ShopAdmin</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/help">Help</Link>
        <Link to="/example">Examples</Link>

      </nav>
      <div className="header-nav-right">
        <div className="theme-changer">
          <label htmlFor="theme-picker" className="material-symbols-outlined">palette</label>
          <input
            id="theme-picker"
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            title="Change theme color"
          />
        </div>        

        {user ? (
          <>
            <Link to="/profile">
              <Avatar alt="Remy Sharp" src={user.avatar} />
            </Link>

            <Link className="login-button" onClick={() => {
              //localStorage.clear();
              clearAuthData(); // Clear authentication data
              navigate("/login");
              //window.location.href = "/login";    
              window.location.reload();

            }}>
              Logout
            </Link>
          </>
        ) : (
          <Link className="login-button" component={Link} to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}


export default Header
