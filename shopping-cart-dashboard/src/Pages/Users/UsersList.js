import React, { useState, useEffect } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  TextField, TextareaAutosize, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
//import { getAllUsers } from '../../Services/authService'
import { getAllUsers, updateProfile, addUser,updateUser } from '../../Services/authService'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', address: '' });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllUsers(); // Replace with your actual API call
      setUsers(res);
      //console.log("Orders Page: ", orders);
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
  };

  // Open modal for adding a new product
  const openAddModal = () => {
    setEditUser(null);
    setFormData({ first_name: '', last_name: '', email: '', password: '', address: '' });
    //setShowModal(true);
    setOpen(true);
  };

  // Open modal for editing a product
  const openEditModal = (user) => {
    //alert(product.name)
    setEditUser(user);
    setFormData({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      address: user.address
    });
    //setShowModal(true);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e]: false }); // Clear error on change
  };

  const handleFormSubmit2 = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: formData.email.trim() === '',
      password: formData.password.trim() === '',
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err);
    if (!hasError) {
      console.log('Login submitted:', formData);
      // Add your authentication logic here
    }


  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editUser) {
        // Edit product (PUT request)
        response = await updateUser(formData.user_id, formData);
      } else {
        // Add Product 
        response = await addUser(formData);
        console.log(response);
      }
      if (response) {
        fetchData(); // Refresh products list
        setShowModal(false);
        setOpen(false);

      } else {
        console.error('Error saving product');
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };




  return (
    <>
      <h1>Users Management</h1>
      <Button variant="contained" color="primary" onClick={openAddModal} style={{ marginBottom: '20px' }}>
        Add User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>email </TableCell>
              <TableCell>Address </TableCell>
              <TableCell>Ph No </TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log(category)} */}
            {users.map((user) => (
              <TableRow key={user.user_d}>
                <TableCell><img width='50px' src={user.avatar} /> {user.first_name} {user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openEditModal(user)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                  //onClick={() => deleteCat(cat.category_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required

          />
          <TextField
            autoFocus
            margin="dense"
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Address"
            name="address"
            multiline
            rows={2}
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required
          />
          <hr />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required
            error={errors.email}
            helperText={errors.email ? 'Email is required' : ''}

          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            name="password"            
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            required
            error={errors.password}
            helperText={errors.password ? 'Password is required' : ''}

          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleFormSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>



    </>
  )
}

export default UsersList
