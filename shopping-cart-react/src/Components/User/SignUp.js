// src/components/Signup.js
import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {signup} from '../../Services/authService'

export default function Signup() {
  
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  //const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const avatar= "https://lh3.googleusercontent.com/a/ACg8ocK6zm36maRpg2Rxt3Lr7u7jabM1E-KRPbI7ip2vaZuDPH2sgnGY=s288-c-no"
  const navigate = useNavigate();

  const handleSignup = () => {
    signup(first_name, last_name, email, password,avatar)
      .then(response => {
        if (response) {
          alert('Signup successful! You can now login.');
          navigate("/login");
        }
      })
      .catch(error => {
        alert(error.message || 'Signup failed');
      });

  }



  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        label="First Name"
        type="text"
        fullWidth
        margin="normal"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        type="text"
        fullWidth
        margin="normal"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
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
        onClick={handleSignup}
      >
        Sign Up
      </Button>
      <Button
        color="secondary"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </Button>
    </Paper>
  );
}