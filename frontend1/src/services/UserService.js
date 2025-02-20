import axios from "axios";

const API_URL = "http://localhost:5000/users";

// Get --> Read (Fetch users in descending order)
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by latest
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Post --> Create
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

// Put --> Update
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

// Delete
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};
