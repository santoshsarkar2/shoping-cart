import React, { useState, useEffect } from 'react'
import { getCategory } from '../../Services/productServices'

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
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
    setCategories({ ...newCategory, [e.target.name]: e.target.value });
  };

    const handleAddCategory = () => {
    const newId = categories.length + 1;
    const categoryToAdd = { id: newId, ...newCategory };
    setCategories([...categories, categoryToAdd]);
    setNewCategory({ name: '', description: '' });
    console.log("New Category:",newCategory)
    setShowModal(false);
  };


  return (
    <div className="container mt-4">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product List</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          ➕ Add New Category
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_id}</td>
                <td><img height='25px'  src={category.image} /> {category.name}</td>
                <td>{category.description}</td>
                
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
                  <input type="text" className="form-control" name="name" value={newCategory.name} onChange={handleInputChange} />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input type="number" className="form-control" name="price" value={newCategory.description} onChange={handleInputChange} />
                </div>
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={handleAddCategory}>Add Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default CategoryList
