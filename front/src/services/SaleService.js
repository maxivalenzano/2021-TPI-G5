import axios from "axiosConfig";
import authHeader from "./auth-header";

const getAll = () => {
  return axios.get("/ventas", { headers: authHeader() });
};

const get = (id) => {
  return axios.get(`/ventas/${id}`, { headers: authHeader() });
};

const create = (data) => {
  return axios.post("/ventas", { headers: authHeader() }, data);
};

const update = (id, data) => {
  return axios.patch(`/ventas/${id}`, { headers: authHeader() }, data);
};

const remove = (id) => {
  return axios.delete(`/ventas/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return axios.delete(`/ventas`, { headers: authHeader() });
};

const getStatus = () => {
  return axios.get("/secretaria", { headers: authHeader() });
};

const object = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  getStatus,
};
export default object;
