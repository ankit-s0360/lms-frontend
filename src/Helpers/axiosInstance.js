import axios from "axios";


const BASE_URL = "https://coursify-server-ue6e.onrender.com/api/v1";
// const BASE_URL = "http://localhost:5000/api/v1";

// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;
const axiosInstance = axios.create({
    baseURL : BASE_URL,
    withCredentials: true,
});

export default axiosInstance;