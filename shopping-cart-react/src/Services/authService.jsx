import API from './api';


export const login = async (email, password) => {
    try {
        const response = await API.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const signup = async (first_name, last_name, email, password, avatar) => {
    try {
        const response = await API.post('/auth/signup', { first_name, last_name, email, password, avatar });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};


export const getProfile = async () => {    
    try {        
        const response = await API.get('/users');
        console.log("Profile called");        
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }   
};

export const updateProfile = async (name, email, password, avatar) => {
    try {
        const response = await API.put('/auth/profile', { name, email, password, avatar });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};


export const deleteProfile = async () => {
    try {
        const response = await API.delete('/auth/profile');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
}
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
}
export const getToken = () => {
    return localStorage.getItem('token');
}
export const setToken = (token) => {
    localStorage.setItem('token', token);
}
export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user-info');

}
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
}
export const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return true; // User is authenticated
    }
    return false; // User is not authenticated
}
export const redirectToLogin = () => {
    window.location.href = '/login';
}
export const getUser = () => {
    return JSON.parse(localStorage.getItem('user-info'));
}