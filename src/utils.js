import axios from "axios";
const customFetch = axios.create({
  baseURL: "http://localhost:5010/api/tasks"
});

export default customFetch;
