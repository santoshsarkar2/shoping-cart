import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../../Services/Service';
import { getCategory, addCategory, updateCategory, deleteCategory } from '../../Services/productServices';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TextareaAutosize,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

function CategoryView() {
    const [category, setCategory] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [editCategory, setEditCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter categories based on search query
        const filtered = category.filter(cat =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [searchQuery, category]);

    const fetchData = async () => {
        try {
            const cat = await getCategory();
            setCategory(cat);
            setFilteredCategories(cat); // Initialize filtered categories
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const openAddModal = () => {
        setEditCategory(null);
        setFormData({ name: '', description: '' });
        setOpen(true);
    };

    const openEditModal = (cat) => {
        setEditCategory(cat);
        setFormData({
            category_id: cat.category_id,
            name: cat.name,
            description: cat.description
        });
        setOpen(true);
    };

    const deleteCat = async (id) => {
        if (window.confirm('Are you sure you want to delete this Category?')) {
            try {
                const response = await deleteCategory(id);
                if (response) {
                    console.log("Deleted Category", id);
                    fetchData();
                } else {
                    console.error('Error deleting category');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmitCategory = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editCategory) {
                response = await updateCategory(formData.category_id, formData);
            } else {
                response = await addCategory(formData);
            }
            if (response) {
                fetchData();
                setOpen(false);
            } else {
                console.error('Error saving category');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <section>
            <h1>Category Management</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <TextField
                    label="Search Categories"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name or description"
                    style={{ width: '300px' }}
                />
                <Button variant="contained" color="primary" onClick={openAddModal}>
                    Add Category
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Category Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Description</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategories.map((cat) => (
                            <TableRow key={cat.category_id}>
                                <TableCell>
                                    <img width='50px' src={cat.image_url} alt={cat.name} /> {cat.name}
                                </TableCell>
                                <TableCell>{cat.description}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => openEditModal(cat)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteCat(cat.category_id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Category Description"
                        name="description"
                        multiline
                        rows={2}
                        value={formData.description}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitCategory} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
}

export default CategoryView;