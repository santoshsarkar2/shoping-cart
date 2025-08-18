import React, { useState, useEffect } from 'react'
import { formatCurrency } from '../../Services/Service'
import { getCategory, addCategory, updateCategory, deleteCategory } from '../../Services/productServices'
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
    const [editCategory, setEditCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });
     const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const cat = await getCategory(); // Replace with your actual API call
            setCategory(cat);

            //console.log("Categor Page: ", category);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Open modal for adding a new product
    const openAddModal = () => {
        setEditCategory(null);
        setFormData({ name: '', description: '' });
        //setShowModal(true);
        setOpen(true);
    };

    // Open modal for editing a product
    const openEditModal = (cat) => {
        //alert(product.name)
        setEditCategory(cat);
        setFormData({
            category_id: cat.category_id,
            name: cat.name,
            description: cat.description
        });
        //setShowModal(true);
        setOpen(true);
    };

    // Delete category
    const deleteCat = async (id) => {
        if (window.confirm('Are you sure you want to delete this Category?')) {
            try {
                const response = await deleteCategory(id);
                console.log(response);
                if (response) {
                    console.log("Deleted Category", id);
                    fetchData(); // Refresh products list
                } else {
                    console.error('Error deleting product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitCategory = async (e) => {
            e.preventDefault();
            try {
            let response;
            if (editCategory) {
                // Edit product (PUT request)
                response = await updateCategory(formData.category_id,formData);
            } else {
                // Add Product 
                response = await addCategory(formData);
                console.log(response);            
            }
            if(response){
                fetchData(); // Refresh products list
                setShowModal(false);
                setOpen(false);
    
            }else{
                console.error('Error saving product');
            }
            } catch (error) {
                console.error("Error :", error);
                }
            };



    return (
        <section>
            <h1>Category Management</h1>
      <Button variant="contained" color="primary" onClick={openAddModal} style={{ marginBottom: '20px' }}>
        Add Category
      </Button>

        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Description </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log(category)} */}
            {category.map((cat) => (
              <TableRow key={cat.category_id}>
                <TableCell><img width='50px' src={cat.image_url} /> {cat.name}</TableCell>
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




{/* Dialog for Add/Edit */}
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
            autoFocus
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





            


            {/* Modal */}
                {showModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {/* <h5 className="modal-title">Add New Product</h5> */}
                                    <h2>{editCategory ? 'Edit Category' : 'Add Category'}</h2>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea type="text" className="form-control" name="description" value={formData.description} onChange={handleInputChange} />
                                    </div>

                                    
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-success" onClick={handleSubmitCategory}>Save Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


        </section>
    );
}


export default CategoryView
