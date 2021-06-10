import axios from "axiosConfig";
import Cookies from 'js-cookie'

const register = (data) => {
  return axios.post("auth/signup", {
    username: data.username,
    password: data.password,
    email: data.email,
  });
};

const login = (data) => {
  return axios.post("auth/signin", {
    username: data.username,
    password: data.password,
    email: data.email,
  })
};

const recovery = (data) => {
  return axios.post("auth/recovery", {
    username: data.username,
    password: data.password,
    email: data.email,
  });
};

const logout = () => {
  Cookies.remove('access_token')
};

const getCurrentUser = () => {
  return JSON.parse(Cookies.get('access_token'));
};

const object = {
  register,
  login,
  logout,
  getCurrentUser,
  recovery
};

export default object