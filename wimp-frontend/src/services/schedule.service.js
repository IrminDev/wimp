import axios from "axios";
const URL = "/api/schedule";

const getSchedules = async () => {
    const response = await axios.get(URL);
    return response.data;
}

const getScheduleByGroup = async (id) => {
    const response = await axios.get(`${URL}/group/${id}`);
    return response.data;
}

const getScheduleByTeacher = async (id) => {
    const response = await axios.get(`${URL}/teacher/${id}`);
    return response.data;
}

const createSchedule = async (schedule) => {
    const response = await axios.post(URL, schedule);
    return response.data;
}

const updateSchedule = async (id, schedule) => {
    const response = await axios.put(`${URL}/${id}`, schedule);
    return response.data;
}

const deleteSchedule = async (id) => {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
}

export default {
    getSchedules,
    getScheduleByGroup,
    getScheduleByTeacher,
    createSchedule,
    updateSchedule,
    deleteSchedule
}