import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../recoil/authAtom";

const ProtectedRouter = () => {
  const isAuth = useRecoilValue(isAuthenticated); // 로그인 여부 확인
  const currentLocation = useLocation();

  // 로그인 안되어있으면 로그인 페이지로 리다이렉트
  if (!isAuth) {
    return (
      <Navigate
        to="/signin"
        replace
        state={{ redirectedFrom: currentLocation }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRouter;
