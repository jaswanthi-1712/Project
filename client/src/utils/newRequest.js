import axios from "axios";

const fetchData = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
});

export default fetchData;
export { fetchData };
