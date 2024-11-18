import axios from 'axios';
const url = '/api/admin/';

const login = async (email, password) => {
    const response = await axios.post(`${url}/login`, { email, password });
    return response.data;
}

const verifyToken = async (token) => {
    const response = await axios.get(`${url}/verifyToken`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export default { login,
    verifyToken
 };