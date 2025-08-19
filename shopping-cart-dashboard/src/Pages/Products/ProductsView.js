import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../Services/Service';
import { getProduct, getCategory, addProduct, deleteProduct, updateProduct } from '../../Services/productServices';
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

function ProductsView() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '', price: '', category_id: '', category_name: '', stock_quantity: '', sku: '' });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter products based on search query
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const fetchData = async () => {
        try {
            const cat = await getCategory();
            setCategories(cat);
            const response = await getProduct();
            setProducts(response);
            setFilteredProducts(response); // Initialize filtered products
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (editProduct) {
                response = await updateProduct(formData.product_id, formData);
            } else {
                response = await addProduct(formData);
            }
            if (response) {
                fetchData();
                setShowModal(false);
            } else {
                console.error('Error saving product');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const openAddModal = () => {
        setEditProduct(null);
        setFormData({ name: '', description: '', price: '', category_id: '', category_name: '', stock_quantity: '', sku: '' });
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditProduct(product);
        setFormData({
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            description: product.description,
            stock_quantity: product.stock_quantity,
            category_id: product.category_id,
            sku: product.sku,
        });
        setShowModal(true);
    };

    const deleteProd = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await deleteProduct(id);
                if (response) {
                    console.log("Deleted Product", id);
                    fetchData();
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <section>
            <h1>Product Management</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by name, description, or SKU"
                    style={{ width: '300px' }}
                />
                <Button variant="contained" color="primary" onClick={openAddModal}>
                    Add Product
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Product Name</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Description</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Price (₹)</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>SKU</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Stock</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Category</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>Category ID</TableCell>
                            <TableCell style={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.product_id}>
                                <TableCell>
                                    <img width='50px' src={product.image} alt={product.name} /> {product.name}
                                </TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.stock_quantity}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.category_id}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => openEditModal(product)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteProd(product.product_id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>{editProduct ? 'Edit Product' : 'Add Product'}</h2>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Stock Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="stock_quantity"
                                        value={formData.stock_quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">SKU</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="sku"
                                        value={formData.sku}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categorySelect" className="form-label fw-bold text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        id="categorySelect"
                                        className="form-select"
                                        name="category_id"
                                        value={formData.category_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.category_id} value={category.category_id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleSubmitProduct}
                                >
                                    Save Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProductsView;