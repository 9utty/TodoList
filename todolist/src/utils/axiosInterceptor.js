import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000, // 타임아웃 설정, 10초 내에 응답이 없으면 에러 처리
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      if (
        config.method.toUpperCase() !== "GET" &&
        config.method.toUpperCase() !== "DELETE"
      ) {
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
