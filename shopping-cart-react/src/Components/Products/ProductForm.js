import React, { useState, useEffect } from 'react'



// ProductForm Component for Create and Update
const ProductForm = ({ onSave, editingProduct }) => {
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData(editingProduct);
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) {
            alert('Name and Price are required!');
            return;
        }
        onSave(formData);
        setFormData({ id: null, name: '', price: '', description: '' });
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
                <div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {editingProduct ? 'Update' : 'Add'} Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductForm
