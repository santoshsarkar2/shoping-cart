import React, { useState, useEffect } from 'react'
import { getProduct, getCategory } from '../../Services/productServices'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: ''
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct(); // Replace with your actual API call        
        setProducts(data);
        const cat = await getCategory(); // Replace with your actual API call
        setCategories(cat);
        //console.log("Product Page: ", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

    const handleAddProduct = () => {
    const newId = products.length + 1;
    const productToAdd = { id: newId, ...newProduct };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', price: '', category: '' });
    console.log("New Products:",newProduct)
    setShowModal(false);
  };


  return (
    <div className="container mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product List</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          ➕ Add New Product
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td><img height='25px'  src={product.image} /> {product.name}</td>
                <td>{product.price}</td>
                <td>{product.sku}</td>                
                <td>{product.stock_quantity}</td>
                <td>{product.categories}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Loading products...</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={newProduct.name} onChange={handleInputChange} />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input type="number" className="form-control" name="price" value={newProduct.price} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                            <label htmlFor="categorySelect" className="form-label fw-bold text-gray-700">
                                Category
                            </label>
                            <select
                                id="categorySelect"
                                className="form-select"
                                name="category"
                                value={newProduct.category}
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
                <button type="button" className="btn btn-success" onClick={handleAddProduct}>Add Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default ProductList
