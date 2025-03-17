import axios from "axios";
import baseAPI from "./axiosInstance";
import Cookies from "js-cookie"; // CSRF 토큰 가져오기 위해 필요

const csrfToken = Cookies.get("csrftoken");

const publicAccountAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}accounts/`,
  headers: baseAPI.defaults.headers, // 기존 헤더 유지
  timeout: baseAPI.defaults.timeout, // 기존 타임아웃 유지
});

const privateAccountAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}accounts/`,
  headers: {
    ...baseAPI.defaults.headers,
    "X-CSRFToken": csrfToken, // CSRF 토큰 추가
  },
  timeout: baseAPI.defaults.timeout,
  withCredentials: true, // 세션 인증 사용
});

export { publicAccountAPI, privateAccountAPI };
