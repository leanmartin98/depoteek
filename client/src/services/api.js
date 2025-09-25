import axios from "axios";

const API_BASE_URL = '/api';

export const productAPI = {
    // Obtener todos los productos
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/products`);
        return res.data
    },

    // Obtener producto por ID
    getById: async (id) => {
        const res = await axios.get(`${API_BASE_URL}/products/${id}`);
        return res.data;
    }
}

export const testAPI = {
    checkConnection: async () => {
        const res = await axios.get(`${API_BASE_URL}/test`);
        return res.data;
    }
};