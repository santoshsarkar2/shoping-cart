import API from './api';

export const getProduct = async () => {    
    try {        
        const response = await API.get('/products/product');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

export const getCategory = async () => {    
    try {        
        const response = await API.get('/products/category');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await API.put(`/products/product/${productId}`, productData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await API.delete(`/products/product/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};


