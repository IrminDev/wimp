import axios from 'axios';
const URL = 'http://localhost:5000/api/teacher';

const getTeachers = async () => {
    const response = await axios.get(URL);
    return response.data;
}

const getTeacherById = async (id) => {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
}

const createTeacher = async (teacher) => {
    const response = await axios.post(URL, teacher);
    return response.data;
}

const updateTeacher = async (id, teacher) => {
    const response = await axios.put(`${URL}/${id}`, teacher);
    return response.data;
}

const deleteTeacher = async (id) => {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
}

export default {
    getTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
}