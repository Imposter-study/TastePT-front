import axios from "axios";
import baseAPI from "./axiosInstance";

const publicAccountAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}accounts/`,
  headers: baseAPI.defaults.headers, // 기존 헤더 유지
  timeout: baseAPI.defaults.timeout, // 기존 타임아웃 유지
});

const privateAccountAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}accounts/`,
  headers: baseAPI.defaults.headers,
  timeout: baseAPI.defaults.timeout,
  withCredentials: true, // 세션 인증 사용
});

export { publicAccountAPI, privateAccountAPI };
