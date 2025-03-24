import axios from "axios";
import baseAPI from "./axiosInstance";
import { getCsrfToken } from "../utils/csrfUtils";

const publicCommunityAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}community/`,
  headers: baseAPI.defaults.headers,
  timeout: baseAPI.defaults.timeout,
});

const privateCommunityAPI = axios.create({
  ...baseAPI.defaults,
  baseURL: `${baseAPI.defaults.baseURL}community/`,
  withCredentials: true, // 세션 인증 사용
});

const commentAPI = axios.create({
  ...baseAPI.defaults,
  baseURL: `${baseAPI.defaults.baseURL}community/comment/`,
  withCredentials: true, // 세션 인증 사용
});

privateCommunityAPI.interceptors.request.use((config) => {
  config.headers["X-CSRFToken"] = getCsrfToken(); // 최신 CSRF 토큰 가져오기
  return config;
});

commentAPI.interceptors.request.use((config) => {
  config.headers["X-CSRFToken"] = getCsrfToken(); // 최신 CSRF 토큰 가져오기
  return config;
});

export { publicCommunityAPI, privateCommunityAPI, commentAPI };
