// src/components/Login.js
import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {login, setToken} from '../../Services/authService'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response) {
        setSuccessMsg('Login successful!');
        //let profile= getProfile();
        setErrorMsg('');        
        localStorage.setItem("isAuthenticated", true);
        setToken(response.token); // Assuming response contains access_token
        navigate("/profile");
        window.location.reload();
      }
    } catch (error) {
      setErrorMsg(error.message || 'Login failed');
      setSuccessMsg('');
    } 
  }
    


  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {errorMsg && <Typography color="error">{errorMsg}</Typography>}
      {successMsg && <Typography color="primary">{successMsg}</Typography>}
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button
        color="secondary"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => navigate("/signup")}
      >
        Create Account
      </Button>
    </Paper>
  );
}