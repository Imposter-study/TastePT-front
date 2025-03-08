import axios from "axios";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";

function Signup() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData();
    const signUpForm = event.target;

    // console.log(signUpForm["email-input"].value);

    formData.append("email", signUpForm["email-input"].value); // 이메일
    formData.append("password", signUpForm["password-input"].value); // 패스워드
    // 확인 패스워드
    formData.append(
      "password_confirm",
      signUpForm["confirmpassword-input"].value
    );
    formData.append("nickname", signUpForm["nickname-input"].value); // 닉네임

    console.log(formData);

    axios
      .post(`${baseURL}accounts/signup/`, formData)
      .then((response) => console.log(response))
      .catch((error) => {
        const errorData = error.response.data;
        console.log(errorData);
        const firstKey = Object.keys(errorData)[0]; // errorData(json)의 첫 번째 key값
        alert(error.response.data[firstKey]);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      <div className="border-2 rounded-md w-fit border-gray-300 m-5">
        <form id="signUpForm" onSubmit={onSubmit}>
          <div className="flex">
            <div className="flex">
              <div className="flex-1 p-5 min-w-[300px] w-full">
                <Input
                  inputLabel="Email *"
                  isrequired={true}
                  inputType="email"
                />
                <Input
                  inputLabel="Password *"
                  isrequired={true}
                  inputType="password"
                />
                <Input
                  inputLabel="Confirm Password *"
                  isrequired={true}
                  inputType="password"
                />
                <Input inputLabel="Nickname *" isrequired={true} />
                <Input inputLabel="Age" isrequired={false} inputType="number" />
              </div>
              <div className="flex-1 p-5 min-w-[300px] w-full">
                <Dropdown
                  dropdownLabel="Gender"
                  options={["Male", "Female", "Other"]}
                />
                <Dropdown
                  dropdownLabel="Allerge"
                  options={["알러지1", "알러지2", "Other"]}
                />
                <Dropdown
                  dropdownLabel="Preferred cuisine"
                  options={["cuisine1", "cuisine2", "cuisine3"]}
                />
                <Dropdown
                  dropdownLabel="Diet"
                  options={["유", "무", "Other"]}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-2/5 py-10">
              <Button buttonName="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
