import axios from "axios";
import baseAPI from "./axiosInstance";
import Cookies from "js-cookie"; // CSRF 토큰 가져오기 위해 필요

const csrfToken = Cookies.get("csrftoken");

const publicCommunityAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}community/`,
  headers: baseAPI.defaults.headers,
  timeout: baseAPI.defaults.timeout,
});

const privateCommunityAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}community/`,
  headers: {
    ...baseAPI.defaults.headers,
    "X-CSRFToken": csrfToken, // CSRF 토큰 추가
  },
  timeout: baseAPI.defaults.timeout,
  withCredentials: true, // 세션 인증 사용
});

const commentAPI = axios.create({
  baseURL: `${baseAPI.defaults.baseURL}community/`,
  headers: {
    ...baseAPI.defaults.headers,
    "X-CSRFToken": csrfToken, // CSRF 토큰 추가
  },
  timeout: baseAPI.defaults.timeout,
  withCredentials: true, // 세션 인증 사용
});

export { publicCommunityAPI, privateCommunityAPI, commentAPI };
