import axios from "axios";
import baseAPI from "./axiosInstance";
import Cookies from "js-cookie"; // CSRF 토큰 가져오기 위해 필요

const csrfToken = Cookies.get("csrftoken");

const chatbotAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}chatbot/`,
  headers: {
    ...baseAPI.defaults.headers,
    "X-CSRFToken": csrfToken, // CSRF 토큰 추가
  },
  timeout: 300000,
  withCredentials: true, // 세션 인증 사용
});

export { chatbotAPI };
