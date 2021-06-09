import axios from "axios";

export default axios.create({
  baseURL: "https://g5-rotiseriapp.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  },
});
