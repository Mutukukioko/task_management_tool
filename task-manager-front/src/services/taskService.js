import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks/';

const getTasks = () => axios.get(API_URL);
const createTask = (task) => axios.post(API_URL, task);
const updateTask = (id, task) => axios.put(`${API_URL}${id}/`, task);
const deleteTask = (id) => axios.delete(`${API_URL}${id}/`);

export { getTasks, createTask, updateTask, deleteTask };
