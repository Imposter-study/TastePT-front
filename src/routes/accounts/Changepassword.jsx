import Button from "../../components/Button";
import Input from "../../components/Input";
import { privateAccountAPI } from "../../api/accountApi";
import { useNavigate } from "react-router-dom";
import { authUser, isAuthenticated } from "../../recoil/authAtom";
import { useSetRecoilState } from "recoil";
import { errMessage } from "../../utils/errMessage";

function Changepassword() {
  const navigate = useNavigate();

  const setIsAuth = useSetRecoilState(isAuthenticated);
  const setUser = useSetRecoilState(authUser);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const passwordForm = event.target;
    const password = passwordForm["password-input"].value;
    const newPassword = passwordForm["newpassword-input"].value;
    const passwordConfirm = passwordForm["passwordconfirm-input"].value;

    const data = {
      old_password: password,
      new_password: newPassword,
      new_password_confirm: passwordConfirm,
    };

    console.log(data);

    privateAccountAPI
      .put("password/", data)
      .then((response) => {
        console.log(response);
        setIsAuth(false);
        setUser({});
        alert(
          "비밀번호가 변경되었습니다. \n 변경된 비밀번호로 로그인 해주세요."
        );
        navigate(`/signin`);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      <div className="border-2 rounded-md border-gray-200 min-w-[300px] p-5">
        <form id="changepassword-form" onSubmit={handleSubmit}>
          <div>
            <Input
              inputLabel="Password"
              isrequired={true}
              inputType="password"
            />
            <Input
              inputLabel="New Password"
              isrequired={true}
              inputType="password"
            />
            <Input
              inputLabel="Password Confirm"
              isrequired={true}
              inputType="password"
            />
          </div>
          <div className="flex justify-center py-5">
            <Button buttonName="Change Password" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Changepassword;
