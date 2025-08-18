import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/User/Login';
import SignUp from './Components/User/SignUp';
import Profile from './Components/User/Profile';
import ProtectedRoute from './ProtectedRoute'
import Header from './Components/Header'
import About from './Components/Pages/About'
import Contact from './Components/Pages/Contact'
import Sidebar from './Components/Sidebar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ProductList from './Components/Products/ProductList';
import NavBar from './Components/NavBar';
import CategoryList from './Components/Products/Category';




function App() {

  //const token= localStorage.getItem('token');
  //const user= localStorage.getItem('user-info');
  //console.log("APP Page: ",user);


  return (    
    <React.Fragment>
    <CssBaseline />
    
    <div className="">
      <Header />
      {/* <NavBar /> */}
      {/* {token && <Sidebar />} */}
      <Container>
      <Routes>        
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/category" element={<CategoryList />} />


      </Routes>
    </Container></div>
    </React.Fragment>
  );
}

export default App;
