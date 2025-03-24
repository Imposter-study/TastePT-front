import Button from "../../components/Button";
import Input from "../../components/Input";
import { privateAccountAPI } from "../../api/accountApi";
import { errMessage } from "../../utils/errMessage";

function CheckPassword() {
  const onSubmit = (event) => {
    event.preventDefault();
    const confirmWithdraw = window.confirm("탈퇴하시겠습니까?");
    if (confirmWithdraw) {
      const checkPasswordForm = event.target;
      //   console.log(checkPasswordForm);
      const password = checkPasswordForm["password-input"].value;
      //   console.log(password);
      privateAccountAPI
        .delete("", { data: { password: password } })
        .then((response) => {
          // console.log(response);
          alert(response.data.message);
          window.location.href = "/";
        })
        .catch((error) => {
          // console.log(error);
          const errorMessage = errMessage(error);
          alert(errorMessage);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-20">
      <div className="border-2 rounded-md w-1/3 border-gray-300 m-5 px-5 pb-3 min-w-[300px]">
        <form id="check-password-form" onSubmit={onSubmit}>
          <Input inputLabel="Password" isrequired={true} inputType="password" />
          <div className="flex justify-center p-2">
            <Button buttonName="탈퇴하기" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckPassword;
