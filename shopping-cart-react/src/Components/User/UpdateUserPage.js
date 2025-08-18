import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

const UpdateUserPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    location: '',
    avatar: '',
  });

  // Load data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user-info');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("Update User: ",user.data)
      //alert(user)
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Save updated data
  const handleUpdate = () => {
    localStorage.setItem('user-info', JSON.stringify(user));
    alert('User info updated successfully!');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Update User Info
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={user.location}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Avatar URL"
            name="avatar"
            value={user.avatar}
            onChange={handleChange}
            fullWidth
          />

          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default UpdateUserPage;