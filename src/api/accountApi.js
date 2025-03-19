import axios from "axios";
import baseAPI from "./axiosInstance";
import Cookies from "js-cookie"; // CSRF 토큰 가져오기 위해 필요

const getCsrfToken = () => {
  const csrfToken = Cookies.get("csrftoken");
  return csrfToken;
};

const publicAccountAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}accounts/`,
  headers: baseAPI.defaults.headers, // 기존 헤더 유지
  timeout: baseAPI.defaults.timeout, // 기존 타임아웃 유지
});

const privateAccountAPI = axios.create({
  ...baseAPI.defaults,
  baseURL: `${baseAPI.defaults.baseURL}accounts/`,
  withCredentials: true, // 세션 인증 사용
});

// 요청 인터셉터에서 항상 최신 CSRF 토큰을 설정
privateAccountAPI.interceptors.request.use((config) => {
  config.headers["X-CSRFToken"] = getCsrfToken(); // 최신 CSRF 토큰 가져오기
  return config;
});

export { publicAccountAPI, privateAccountAPI };
