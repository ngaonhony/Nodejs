import axios from 'axios';

const API_URL = '/api/users';

export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data.user;
};

export const updateUser = async (id, userData) => {
  const response = await axios.patch(`${API_URL}/${id}`, userData);
  return response.data.data.user;
};