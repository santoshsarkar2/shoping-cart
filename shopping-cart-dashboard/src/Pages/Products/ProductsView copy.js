import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../Services/Service'
import { getProduct, getCategory, addProduct, deleteProduct, updateProduct } from '../../Services/productServices'
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
    const [editProduct, setEditProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    //const [modalOpen, setModalOpen] = useState(false);    
    //const [newProduct, setNewProduct] = useState({name: '', description: '', price: '', category_id: '', stock_quantity: '', sku: '' });
    const [formData, setFormData] = useState({ name: '', description: '', price: '', category_id: '', category_name: '', stock_quantity: '', sku: '' });
    const [open, setOpen] = useState(false);



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const cat = await getCategory(); // Replace with your actual API call
            setCategories(cat);
            const response = await getProduct();
            setProducts(response);

            //console.log("Product Page: ", data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        try {
        let response;
        if (editProduct) {
            // Edit product (PUT request)
            response = await updateProduct(formData.product_id,formData);
        } else {
            // Add Product 
            response = await addProduct(formData);
            console.log(response);            
        }
        if(response){
            fetchData(); // Refresh products list
            setShowModal(false);

        }else{
            console.error('Error saving product');
        }
        } catch (error) {
            console.error("Error :", error);
            }
        };
            





           

        // Open modal for adding a new product
        const openAddModal = () => {
            setEditProduct(null);
            //setFormData({ name: '', price: '', description: '', category_id: '' });
            setFormData({ name: '', description: '', price: '', category_id: '', category_name: '', stock_quantity: '', sku: '' });
            setShowModal(true);
        };

        // Open modal for editing a product
        const openEditModal = (product) => {
            //alert(product.name)
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



        // Delete product
        const deleteProd = async (id) => {
            if (window.confirm('Are you sure you want to delete this product?')) {
                try {
                    const response = await deleteProduct(id);
                    console.log(response);
                    if (response) {
                        console.log("Deleted Product", id);
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


        return (
            <section>

                <h1>Product Management</h1>
                      <Button variant="contained" color="primary" onClick={openAddModal} style={{ marginBottom: '20px' }}>
                        Add Category
                      </Button>

                <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Product Name</TableCell>
                              <TableCell>Description </TableCell>
                              <TableCell>Price (₹) </TableCell>
                              <TableCell>SKU </TableCell>
                              <TableCell>Stock </TableCell>
                              <TableCell>Category </TableCell>
                              <TableCell>Category id </TableCell>
                              <TableCell align="right">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {/* {console.log(category)} */}
                            {products.map((product) => (
                              <TableRow key={product.product_id}>
                                <TableCell><img width='50px' src={product.image} /> {product.name}</TableCell>
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
                
                
                
                
{/*                 
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price (₹)</th>
                            <th>SKU</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.length > 0 ? (
                            products?.map((product) => (
                                <tr key={product.product_id}>
                                    <td>{product.product_id}</td>
                                    <td><img height='25px' src={product.image} /> {product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.sku}</td>
                                    <td>{product.stock_quantity}</td>
                                    <td>{product.category}</td>
                                    <td><button onClick={() => openEditModal(product)}>Edit</button>
                                        <button onClick={() => deleteProd(product.product_id)}>Delete</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Loading products...</td>
                            </tr>
                        )}
                    </tbody>
                </table> */}

                {/*             
            <div className="products-grid">
                {products?.map(product => (
                    <div key={product.product_id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3 className="product-name"><Link to={product.product_id}>{product.name}</Link></h3>
                            <p className="product-category">{product.categories}</p>
                            <p className="product-price">{formatCurrency(product.price)}</p>
                            <p className="product-stock">{product.stock_quantity} in stock</p>
                        </div>
                    </div>
                ))}
            </div> 
*/}

                {/* Modal */}
                {showModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {/* <h5 className="modal-title">Add New Product</h5> */}
                                    <h2>{editProduct ? 'Edit Product' : 'Add Product'}</h2>
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

                                    <div className="mb-3">
                                        <label className="form-label">Price</label>
                                        <input type="number" className="form-control" name="price" value={formData.price} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Stock Quantity</label>
                                        <input type="number" className="form-control" name="stock_quantity" value={formData.stock_quantity} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">SKU</label>
                                        <input type="text" className="form-control" name="sku" value={formData.sku} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="categorySelect" className="form-label fw-bold text-gray-700">
                                            Category
                                        </label>
                                        { console.log("Anil: ",formData)}
                                        <select
                                            id="categorySelect"
                                            className="form-select"
                                            name="category_id"
                                            value={formData.category_id}
                                            onChange={handleInputChange}
                                        //onChange={(e) => setSelectedCategory(e.target.value)}
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
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="button" className="btn btn-success" onClick={handleSubmitProduct}>Save Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        );
    }

    export default ProductsView