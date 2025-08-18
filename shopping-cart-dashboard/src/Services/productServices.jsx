import API from './api';


// Helper function to handle errors consistently
const handleApiError = (error) => {
    if (error.response) {
        // Server responded with a status code outside 2xx
        throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
        // No response received
        throw new Error('Network error: No response from server');
    } else {
        // Error setting up the request
        throw new Error(`Request error: ${error.message}`);
    }
};

export const getOrders = async () => {    
    try {        
        const response = await API.get('/order/orders');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

/* PRODUCT  */

export const getProduct = async () => {    
    try {        
        const response = await API.get('/products/product');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

export const getProductById = async (productId) => {    
    try {        
        //const response = await API.get('/products/product');
        const response = await API.get(`/products/product/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

export const addProduct = async (productData) => {    
    try {
        // Ensure productData is valid
        if (!productData || typeof productData !== 'object') {
            throw new Error('Invalid product data');
        }

        // Explicitly set headers for POST request (if required by your API)
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await API.post('/products/product', productData, config);
        return response.data;
    } catch (error) {
        handleApiError(error);
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
    //alert(productId)
    try {
        const response = await API.delete(`/products/product/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};

/* CATEGORIES  */

export const getCategory = async () => {    
    try {        
        const response = await API.get('/products/category');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

export const getCategoryById = async (categoryId) => {    
    try {        
        //const response = await API.get('/products/product');
        const response = await API.get(`/products/category/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

export const addCategory = async (categoryData) => {    
    try {
        // Ensure productData is valid
        if (!categoryData || typeof categoryData !== 'object') {
            throw new Error('Invalid product data');
        }

        // Explicitly set headers for POST request (if required by your API)
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await API.post('/products/category', categoryData, config);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }   
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await API.put(`/products/category/${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const deleteCategory = async (categoryId) => {
    //alert(categoryId)
    try {
        const response = await API.delete(`/products/category/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};



