import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://rudra-backend-4hzl.onrender.com/api/",
  withCredentials: true,
});

export default newRequest;
