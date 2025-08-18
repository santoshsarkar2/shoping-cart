// src/components/Header.js
import React, { useState, useContext, useEffect  } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { ThemeContext } from "../Context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { getToken, clearAuthData } from "../Services/authService"; // Adjust the import path as necessary
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Sidebar from "./Sidebar";

export default function Header() {
    const { mode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    let token = getToken();


    // const storedUser = JSON.parse(localStorage.getItem('user-info'));
    // console.log(storedUser.name);

    //const storedUser =getUser();
    //alert(storedUser.data.avatar);
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





    const [open, setOpen] = useState(false);

    const menuItems = [
        { text: "Home", path: "/", icon: <HomeIcon /> },
        { text: "About", path: "/about", icon: <InfoIcon /> },
        { text: "Contact", path: "/contact", icon: <ContactMailIcon /> },
    ];

    
    // return(
    //     <>
    //     <AppBar position="static">
    //   <Toolbar>
    //     {/* Left-side content */}
    //     <Typography variant="h6" sx={{ flexGrow: 1 }}>
    //       My App
    //     </Typography>
    //     {/* Right-side user icon */}
    //     <IconButton color="inherit">
    //       <Avatar>
    //         <AccountCircle />
    //       </Avatar>
    //     </IconButton>    


    //   </Toolbar>
    // </AppBar>
    //     </>
        
    // )

    return (
        <>
            {user && <Sidebar />}
            <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" sx={{ mr: 2, display: { xs: "block", md: "none" } }} onClick={() => setOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Shoapping Cart App
                    </Typography>

                    <div style={{ /* display: "flex", */ gap: "10px", display: window.innerWidth > 768 ? "flex" : "none" }}>
                        {menuItems.map((item) => (
                            <Button key={item.text} color="inherit" component={Link} to={item.path}>
                                {item.text}
                            </Button>
                        ))}




                        {user ? (
                            <>
                                <Link to="/profile">
                                <Avatar alt="Remy Sharp" src={user.avatar} />
                                </Link>

                                <Button color="inherit" onClick={() => {
                                    //localStorage.clear();
                                    clearAuthData(); // Clear authentication data
                                    navigate("/login");
                                    //window.location.href = "/login";    
                                    window.location.reload();

                                }}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                        )}



                        <IconButton color="inherit" onClick={toggleTheme}>
                            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>


                    </div>


                </Toolbar>
            </AppBar>

            {/* Drawer for Mobile */}
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <List sx={{ width: 250 }}>
                    {menuItems.map((item) => (
                        <ListItem button key={item.text} component={Link} to={item.path} onClick={() => setOpen(false)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>


    );




}