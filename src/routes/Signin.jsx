import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { publicAccountAPI } from "../api/accountApi";

function Signin() {
  const navigate = useNavigate();

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
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        console.log("로그인 실패");
      });
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
          <div className="pb-2">
            <Button buttonName="Sign in" />
          </div>
        </form>
        <a className="text-sm underline" href="">
          Forgot password?
        </a>
      </div>
    </div>
  );
}

export default Signin;
