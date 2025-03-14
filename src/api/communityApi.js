import axios from "axios";
import baseAPI from "./axiosInstance";

const publicCommunityAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}community/`,
  headers: baseAPI.defaults.headers,
  timeout: baseAPI.defaults.timeout,
});

const privateCommunityAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}community/`,
  headers: baseAPI.defaults.headers,
  timeout: baseAPI.defaults.timeout,
  withCredentials: true, // 세션 인증 사용
});

const commentAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}community/comment/`,
  headers: baseAPI.defaults.headers,
  timeout: baseAPI.defaults.timeout,
  withCredentials: true, // 세션 인증 사용
});

export { publicCommunityAPI, privateCommunityAPI, commentAPI };
