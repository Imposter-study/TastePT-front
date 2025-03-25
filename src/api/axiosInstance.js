import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const baseAPI = axios.create({
  baseURL: apiURL,
  timeout: 30000, // 10초 동안 응답이 없으면 요청 취소
});

export default baseAPI;
