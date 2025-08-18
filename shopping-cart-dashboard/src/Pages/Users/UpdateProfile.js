import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../Services/authService'
import { Link } from 'react-router-dom';

import {
  TextField, Button, Paper, Avatar, Box, Card, CardContent, Typography, IconButton, Stack,
} from '@mui/material';

const UpdateProfile = () => {
  const [profile, setProfile] = useState([]);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', avatar: '' });
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    avatar: '',
  });

 // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  // Save updated data
  const handleUpdate = () => {    
    console.log('User info updated successfully!', user);    
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getProfile(); // Replace with your actual API call
      setProfile(response);
      //console.log("profile Page: ", profile);
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
          Update Profile
        </Typography>
      <Box sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Update User Info
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Avatar URL"
            name="avatar"
            value={profile.avatar}
            onChange={handleChange}
            fullWidth
          />

          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>

    </div>
  )
}

export default UpdateProfile
