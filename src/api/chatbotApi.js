import axios from "axios";
import baseAPI from "./axiosInstance";
import { getCsrfToken } from "../utils/csrfUtils";

const chatbotAPI = axios.create({
  ...baseAPI.defaults,
  baseURL: `${baseAPI.defaults.baseURL}chatbot/`,
  withCredentials: true, // 세션 인증 사용
});

chatbotAPI.interceptors.request.use((config) => {
  config.headers["X-CSRFToken"] = getCsrfToken(); // 최신 CSRF 토큰 가져오기
  return config;
});

export { chatbotAPI };
