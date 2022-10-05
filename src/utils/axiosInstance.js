import axios from "axios";

const baseURL = "https://shows-api.quantox.dev/api";
let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authTokens?.token}`,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.token}`;
  }

  return req;
});

export default axiosInstance;
