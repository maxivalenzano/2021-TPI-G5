import axios from "axios";

export default axios.create({
  baseURL: "https://secure-sands-97755.herokuapp.com",
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer tokenardo",
  },
});
