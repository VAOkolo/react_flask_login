import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export const register = async (user) => {
  try {
    const res = await axios.post(`${baseURL}/register`, user);
    return { success: true, ...res.data };
  } catch (error) {
    return { success: false, error: error.response.data };
  }
};

export const login = async (user) => {
  try {
    const res = await axios.post(`${baseURL}/login`, user);
    return { success: true, ...res.data };
  } catch (error) {
    return { success: false, error: error.response.data };
  }
};

export const getUser = async () => {
  try {
    const res = await axios.get(`${baseURL}/user`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error.response.data };
  }
};