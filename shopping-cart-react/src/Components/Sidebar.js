// src/components/Sidebar.js
import React, {useState, useEffect} from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar,Typography,Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';

import { getToken, getUser, clearAuthData } from '../Services/authService'


const drawerWidth = 240;

export default function Sidebar() {
  const menuItems = [
    { text: "Dashboard", path: "/", icon: <HomeIcon /> },
    { text: "About", path: "/about", icon: <InfoIcon /> },
    { text: "Contact", path: "/contact", icon: <ContactMailIcon /> },
  ];

  /*
  const storedUser = JSON.parse(localStorage.getItem('user-info'));
  console.log(storedUser.name);
  alert("asssa",storedUser.name)
  */
let token = getToken();

const [open, setOpen] = useState(false);
const handleClick = () => {
    setOpen(!open);
  };
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user-info');    
    if (storedUser) {      
      setUser(JSON.parse(storedUser));      
    }
  }, []);

console.log("Sidebar",user.avatar)





  return (

    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >

      <Toolbar />

      {user ? (
      <div className="user-info"> 
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Link to="/profile">
            <Avatar
              alt={user.first_name || "User"}
              src={user.avatar}
              sx={{ width: 56, height: 56, mb: 1 }}
            />
          </Link>
          <Typography variant="h6" gutterBottom>
            {user.first_name +" "+  user.first_name || "User"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email || ""}
          </Typography>
        </Box>  
      </div>
      ):(<></>)}

      




      

      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <hr />
      {token && (
      <List>
        <ListItemButton onClick={handleClick} >         
        <ListItemIcon>{<ProductionQuantityLimitsIcon />}</ListItemIcon>
        <ListItemText primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>    
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton to="/products/category" sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Category" />            
          </ListItemButton>
          <ListItemButton to="/products" sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Product" />            
          </ListItemButton>
          
        </List>
      </Collapse>    
      </List>
      )}
      
    </Drawer>
  );
}