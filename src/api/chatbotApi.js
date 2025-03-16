import axios from "axios";
import baseAPI from "./axiosInstance";

const chatbotAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}chatbot/`,
  headers: baseAPI.defaults.headers,
  timeout: 300000,
  //   withCredentials: true, // 세션 인증 사용
});

export { chatbotAPI };
