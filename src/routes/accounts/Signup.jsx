import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { publicAccountAPI } from "../../api/accountApi";

function Signup() {
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(event.target);
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

    // 나이
    const age = signUpForm["age-input"].value;
    if (age) {
      formData.append("age", age);
    }

    // 성별
    console.log(signUpForm["gender-input"].value);
    const gender = signUpForm["gender-input"].value;
    if (gender === "남자") {
      formData.append("gender", "M");
    } else if (gender === "여자") {
      formData.append("gender", "F");
    }

    // 알러지
    // 추가 예정

    // 선호 요리
    // 추가 예정

    // 다이어트 여부 (백엔드 모델에 없음)
    const isDiet = signUpForm["diet-input"].value;
    if (isDiet === "유") {
      console.log(isDiet);
      // formData.append("diet", "Y");
    } else if (isDiet === "무") {
      console.log(isDiet);
      // formData.append("diet", "N");
    }

    publicAccountAPI
      .post("", formData)
      .then((response) => {
        console.log(response);
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.log();
        console.log(error);
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
                <Dropdown dropdownLabel="Gender" options={["남자", "여자"]} />
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
            <div className="flex justify-center w-2/5 py-10">
              <Button buttonName="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
