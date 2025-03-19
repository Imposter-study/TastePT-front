import Cookies from "js-cookie";

export const getCsrfToken = () => {
  const csrfToken = Cookies.get("csrftoken");
  return csrfToken;
};
