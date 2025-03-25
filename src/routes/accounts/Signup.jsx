import Button from "../../components/Button";
import CheckBox from "../../components/CheckBox";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { publicAccountAPI } from "../../api/accountApi";
import { errMessage } from "../../utils/errMessage";
import Loading from "../../components/Loading";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [randomNickname, setRandomNickname] = useState("");
  const [allergyList, setAllergyList] = useState([]);
  const [preferredCuisineList, setPreferredCuisineList] = useState([]);
  const [selectedAllergyList, setSelectedAllergyList] = useState([]);
  const [selectedPreferredCuisineList, setSelectedPreferredCuisineList] =
    useState([]);

  const getAllergyList = () => {
    publicAccountAPI.get("allergies_list/").then((response) => {
      // console.log(response);
      // console.log(response.data);
      const allergies = response.data.map((allergy) => allergy.ingredient);
      setAllergyList(allergies);
    });
  };

  const getPreferredCuisineList = () => {
    publicAccountAPI.get("preferredCuisine_list/").then((response) => {
      // console.log(response);
      // console.log(response.data);
      const preferredCuisines = response.data.map(
        (preferredCuisine) => preferredCuisine.cuisine
      );
      setPreferredCuisineList(preferredCuisines);
      setLoading(false);
    });
  };

  // 랜덤 닉네임 생성
  const generateRandomNickname = () => {
    publicAccountAPI.get("random_nickname/").then((response) => {
      // console.log(response);
      // console.log(response.data);
      const nickname = response.data.nickname;
      // console.log(nickname);
      setRandomNickname(nickname);
      // setLoading(false);
    });
  };

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
    // console.log(signUpForm["gender-input"].value);
    const gender = signUpForm["gender-input"].value;
    if (gender) {
      formData.append("gender", gender);
    }

    // 알러지
    // console.log(selectedAllergyList);
    // console.log(typeof selectedAllergyList);
    if (selectedAllergyList.length > 0) {
      // 각각의 알러지 항목을 별도로 추가
      selectedAllergyList.forEach((allergy) => {
        formData.append("allergies", allergy);
      });
    }

    // 선호 요리
    // console.log(selectedPreferredCuisineList);
    if (selectedPreferredCuisineList.length > 0) {
      // 각각의 선호 요리 항목을 별도로 추가
      selectedPreferredCuisineList.forEach((cuisine) => {
        formData.append("preferred_cuisine", cuisine);
      });
    }

    // 다이어트 여부
    const isDiet = signUpForm["diet-input"].value;
    if (isDiet === "유") {
      // console.log(isDiet);
      formData.append("diet", true);
    } else if (isDiet === "무") {
      // console.log(isDiet);
      formData.append("diet", false);
    }

    publicAccountAPI
      .post("", formData)
      .then((response) => {
        // console.log(response);
        alert("회원가입이 완료되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        // console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  useEffect(() => {
    getAllergyList();
    getPreferredCuisineList();
    // generateRandomNickname();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      {loading ? (
        <Loading text="Loading" />
      ) : (
        <div className="border-2 rounded-md w-fit border-gray-300 m-5">
          <form id="signUpForm" onSubmit={onSubmit}>
            <div className="flex">
              <div className="flex">
                {/* 왼쪽 컨테이너 */}
                <div className="flex-1 p-5 min-w-[300px] w-full">
                  {/* 이메일 */}
                  <Input
                    inputLabel="Email *"
                    isrequired={true}
                    inputType="email"
                  />

                  {/* 패스워드 */}
                  <Input
                    inputLabel="Password *"
                    isrequired={true}
                    inputType="password"
                  />

                  {/* 확인 패스워드 */}
                  <Input
                    inputLabel="Confirm Password *"
                    isrequired={true}
                    inputType="password"
                  />

                  {/* 닉네임 */}
                  <div className="flex items-end gap-2 w-full">
                    <div className="flex-1">
                      <Input
                        inputLabel="Nickname *"
                        isrequired={true}
                        value={randomNickname}
                        onChange={(e) => setRandomNickname(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <div
                        className="p-1 px-4 border border-gray-400 rounded-md min-w-max max-w-full cursor-pointer"
                        onClick={generateRandomNickname}
                      >
                        🎲
                      </div>
                    </div>
                  </div>

                  {/* 나이 */}
                  <Input
                    inputLabel="Age"
                    isrequired={false}
                    inputType="number"
                  />
                </div>

                {/* 오른쪽 컨테이너 */}
                <div className="flex-1 p-5 min-w-[300px] w-full">
                  {/* 성별 */}
                  <Dropdown dropdownLabel="Gender" options={["M", "F"]} />

                  {/* 다이어트 여부 */}
                  <Dropdown dropdownLabel="Diet" options={["True", "False"]} />

                  {/* 알러지 */}
                  <CheckBox
                    boxTitle="Allergy"
                    componentList={allergyList}
                    selectedData={setSelectedAllergyList}
                  />

                  {/* 선호 요리 */}
                  <CheckBox
                    boxTitle="Preferred cuisine"
                    componentList={preferredCuisineList}
                    selectedData={setSelectedPreferredCuisineList}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center w-2/5 py-10">
                <Button buttonName="Submit" onSubmit={onSubmit} />
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
