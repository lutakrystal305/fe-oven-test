import axiosClient from './axiosClient';

const getTodos = ({ page, limit }) => {
  return axiosClient.get(`/todos?page=${page}&limit=${limit}`);
};

const searchTodosByName = ({ key }) => {
  return axiosClient.get(`/todos/search/name?search_key=${key}`);
};

const searchTodosByDate = ({ start_date, end_date }) => {
  return axiosClient.get(
    `/todos/search/date?date_key_start=${start_date}&date_key_end=${end_date}`
  );
};

const createTodo = (payload) => {
  return axiosClient.post('/todos', payload);
};

const getTodoById = (id) => {
  return axiosClient.get(`/todos/get/${id}`);
};

const updateNameTodo = (payload, id) => {
  return axiosClient.patch(`/todos/update/name/${id}`, payload);
};

const updateDateTodo = (payload, id) => {
  return axiosClient.patch(`/todos/update/date/${id}`, payload);
};

const updateStatusTodo = (payload, id) => {
  return axiosClient.patch(`/todos/update/status/${id}`, payload);
};

const deleteTodo = (id) => {
  return axiosClient.delete(`/todos/delete/${id}`);
};

export default {
  getTodos,
  searchTodosByDate,
  searchTodosByName,
  createTodo,
  getTodoById,
  updateNameTodo,
  updateDateTodo,
  updateStatusTodo,
  deleteTodo
};
