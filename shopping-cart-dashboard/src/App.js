//import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
//import {fetchDashboardData} from './Services/fetchDashboardData';
import DashboardView from './DashBoard/DashboardView';
import OrdersView from './Pages/Products/OrdersView'
import ProductsView from './Pages/Products/ProductsView'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Help from './Pages/Help';
import Sidebar2 from './Components/Sidebar2';
import Login from './Pages/Users/Login';
import Profile from './Pages/Users/Profile';
import { getProduct, getCategory } from './Services/productServices'
import { getToken,getAuthHeaders } from './Services/authService'
import CategoryView from './Pages/Products/CategoryView';
import UsersList from './Pages/Users/UsersList';
import UpdateProfile from './Pages/Users/UpdateProfile';






function App() {
  const [productData, setProductData] = useState(null);
  const [categorytData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [themeColor, setThemeColor] = useState('#4299e1');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem('token');







  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        } 
    // async function loadData() {
    //   try {
    //     setLoading(true);
    //     setError(null);
    //     const fetchedProductData = await getProduct();
    //     const fetchedCategorytData = await getCategory();
    //     setProductData(fetchedProductData);
    //     setCategoryData(fetchedCategorytData);
    //   } catch (e) {
    //     setError(e.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
    // loadData();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', themeColor);
  }, [themeColor]);


  return (
    <div className="app-container">
      <Header
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/*       
      {<div className="content-wrapper">
        {!loading && !error && data && <Sidebar activeView={view} setView={setView} />}
        <main className="main-content">

          {loading && <div className="loading-overlay">Loading Dashboard...</div>}
          {error && <div className="error-message">{error}</div>}
          {!loading && !error && data && <CurrentView />}
        </main>
      </div>} */}
      <div className="content-wrapper">
        {console.log("APP.js IsLogedIn : ",isLoggedIn)}



        {token ? (
          <div className='left-sidebar'>
            <Sidebar2 />
          </div>
      ) : (<></>)}


      
        {/* <div className='left-sidebar'>
          <Sidebar2 />
        </div> */}

        <main className="main-content">
          {/* {console.log("Data : ",productData)} */}
          {/* {loading && <div className="loading-overlay">Loading Dashboard...</div>} */}

          <Routes>
            <Route>
              <Route path="/" element={<DashboardView />} />
              <Route path="/products" element={<ProductsView />} />
              <Route path="/category" element={<CategoryView />} />
              <Route path="/orders" element={<OrdersView />} />
              <Route path="/help" element={<Help />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<UpdateProfile />} />
              <Route path="/users-list" element={<UsersList />} />


            </Route>

          </Routes>
        </main>
      </div>







    </div>
  );





}

export default App;
