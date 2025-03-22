import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate, useLocation } from "react-router-dom";
import { publicAccountAPI, privateAccountAPI } from "../../api/accountApi";
import { useSetRecoilState } from "recoil";
import { isAuthenticated, authUser } from "../../recoil/authAtom";
import { errMessage } from "../../utils/errMessage";

function Signin() {
  const navigate = useNavigate();
  const setIsAuth = useSetRecoilState(isAuthenticated);
  const setAuthUser = useSetRecoilState(authUser);
  const location = useLocation();
  const redirectedFrom = location?.state?.redirectedFrom?.pathname || "/";

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target);
    const signInForm = event.target;

    // console.log(signInForm["email-input"].value);
    const username = signInForm["email-input"].value;
    const password = signInForm["password-input"].value;

    publicAccountAPI
      .post(`signin/`, { username, password })
      .then((response) => {
        console.log(response);
        console.log("로그인 성공");
        setIsAuth(true);
        setAuthUser({
          nickname: response.data.nickname,
          profileImg: response.data.profile_img,
        });
        navigate(redirectedFrom);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  const handleKakaoLogin = () => {
    privateAccountAPI
      .get(`social/signin/kakao/`)
      .then((response) => {
        console.log(response);
        window.location.href = response.data.auth_url;
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      <div className="border-2 rounded-md w-1/3 border-gray-300 m-5 px-5 pb-3 min-w-[300px]">
        <form onSubmit={onSubmit}>
          <div className="py-4">
            <Input inputLabel="Email" isrequired={true} inputType="email" />
            <Input
              inputLabel="Password"
              isrequired={true}
              inputType="password"
            />
          </div>
          <div className="flex justify-center pb-2">
            <Button buttonName="Sign in" />
          </div>
        </form>
        <a className="text-sm underline" href="">
          Forgot password?
        </a>
      </div>
      <div onClick={handleKakaoLogin}>카카오 로그인</div>
    </div>
  );
}

export default Signin;
