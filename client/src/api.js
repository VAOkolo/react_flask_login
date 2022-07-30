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
    return { success: true, data: toCamelCase(res.data) };
  } catch (error) {
    return { success: false, error: error.response.data };
  }
};

export const updateUser = async (data) => {
  try {
    const res = await axios.patch(`${baseURL}/user`, {
      full_name: data.fullName,
      age: data.age,
      favorite_color: data.favoriteColor,
    });

    return { success: true, data: toCamelCase(res.data) };
  } catch (error) {
    return { success: false, error: error.response.data };
  }
};

// Change object keys from snake_case to camelCase
const toCamelCase = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    const newKey = key
      .split("_")
      .map((word, i) => (i > 0 ? word[0].toUpperCase() + word.slice(1) : word))
      .join("");

    newObj[newKey] = obj[key];
  });

  return newObj;
};
