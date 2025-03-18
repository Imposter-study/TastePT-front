import { useSetRecoilState } from "recoil";
import { isAuthenticated, authUser } from "../recoil/authAtom";
import { privateAccountAPI } from "../api/accountApi";
import { useEffect } from "react";
function AuthProvider() {
  const setIsAuthenticated = useSetRecoilState(isAuthenticated);
  const setauthUser = useSetRecoilState(authUser);

  const checkAuth = async () => {
    const response = await privateAccountAPI.get("auth-check/");
    // console.log(response);
    setIsAuthenticated(response.data.authenticated);
    setauthUser({
      nickname: response.data.user,
      profileImg: response.data.profile_img,
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <></>;
}

export default AuthProvider;
