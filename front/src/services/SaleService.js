import axios from "axiosConfig";

const getAll = () => {
  return axios.get("/ventas");
};

const get = (id) => {
  return axios.get(`/ventas/${id}`);
};

const create = (data) => {
  return axios.post("/ventas", data);
};

const update = (id, data) => {
  return axios.patch(`/ventas/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`/ventas/${id}`);
};

const removeAll = () => {
  return axios.delete(`/ventas`);
};

const getStatus = () => {
  return axios.get("/secretaria");
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
