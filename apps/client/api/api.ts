import Axios from "axios";

const baseURL = "http://10.0.0.117:3000";

export const api = Axios.create({
  baseURL,
});

export default api;
