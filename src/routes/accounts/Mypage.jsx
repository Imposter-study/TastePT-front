import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";
import defaultProfile from "../../assets/image.png";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authUser } from "../../recoil/authAtom";
import { privateAccountAPI, publicAccountAPI } from "../../api/accountApi";
import CheckBox from "../../components/CheckBox";
import DisabledInput from "../../components/DisabledInput";
import { errMessage } from "../../utils/errMessage";

function Mypage() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  // atom : 전역 상태 관리
  const user = useRecoilValue(authUser);
  const setAuthUser = useSetRecoilState(authUser);

  // useState : 상태 관리
  const [profileImgUrl, setProfileImgUrl] = useState(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({}); 
  let isProfileChanged = false

  // useState : 상태 관리
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
    });
  };

  const getUserProfile = async () => {
    try {
      if (user.nickname) {
        const response = await privateAccountAPI.get(`${user.nickname}/`);
        console.log(response);
        setUserProfile(response.data);
        if (response.data.profile_picture) {
          setProfileImgUrl(baseURL + response.data.profile_picture);
        }
        setSelectedAllergyList(response.data.allergies);
        setSelectedPreferredCuisineList(response.data.preferred_cuisine);
        setLoading(false);
      }
    } catch (error) {
      console.error("프로필 정보를 가져오는데 실패했습니다:", error);
      setLoading(true);
    }
  };

  const onFileChange = (event) => {
    event.preventDefault();
    // console.log(event.target.files[0]);
    const profileImgFile = event.target.files[0];
    const profileImgUrl = URL.createObjectURL(profileImgFile);
    // console.log(profileImgUrl);
    setProfileImgUrl(profileImgUrl);
    isProfileChanged = true
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(document.getElementById("nickname-input").value);
    const nickname = document.getElementById("nickname-input").value;
    const age = document.getElementById("age-input").value;
    const gender = document.getElementById("gender-input").value;
    const diet = document.getElementById("diet-input").value;

    const formData = new FormData();
    formData.append("nickname", nickname); // 닉네임
    formData.append("age", age); // 나이
    formData.append("gender", gender); // 성별
    formData.append("diet", diet); // 다이어트 여부

    // 알러지
    if (selectedAllergyList.length > 0) {
      selectedAllergyList.forEach((allergy) => {
        formData.append("allergies", allergy);
      });
    }

    // 선호 요리
    if (selectedPreferredCuisineList.length > 0) {
      selectedPreferredCuisineList.forEach((preferredCuisine) => {
        formData.append("preferred_cuisine", preferredCuisine);
      });
    }

    // 프로필 이미지
    if (isProfileChanged) {
      console.log(document.getElementById("profileImg").files[0]);
      const profileImgFile = document.getElementById("profileImg").files[0];
      // console.log(profileImgUrl);
      // console.log(profileImgUrl.split("/").pop());
      formData.append("profile_picture", profileImgFile);
    }

    privateAccountAPI
      .put(``, formData)
      .then((response) => {
        console.log(response);
        setAuthUser({
          nickname: response.data.nickname,
          profileImg: response.data.profile_picture,
        });
        alert("프로필 수정이 완료되었습니다.");
        navigate(`/${response.data.nickname}`);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  useEffect(() => {
    if (user.nickname) {
      getAllergyList();
      getPreferredCuisineList();
      getUserProfile();
    }
  }, [user.nickname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      <div className="w-fit border-gray-300 m-5">
        <div className="flex justify-center max-w-[300px]">
          <div className="flex flex-col items-center max-w-[150px]">
            <img
              src={profileImgUrl}
              alt="프로필 이미지"
              className="size-25 mb-3 rounded-full object-cover"
            />
            <label htmlFor="profileImg">
              <div className="text-sm p-1 px-4 border rounded-md w-full bg-gray-200">
                프로필 이미지 수정
              </div>
            </label>
            <input
              id="profileImg"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
        </div>
        <div className="flex">
          {/* 왼쪽 컨테이너 */}
          <div className="flex">
            <div className="flex-1 p-5 min-w-[300px] w-full">
              {/* 이메일 */}
              <DisabledInput
                inputLabel="Email"
                inputValue={userProfile.email}
              />

              {/* 닉네임 */}
              <Input
                inputLabel="Nickname"
                isrequired={true}
                defaultValue={userProfile.nickname}
              />

              {/* 나이 */}
              <Input
                inputLabel="Age"
                isrequired={false}
                inputType="number"
                defaultValue={userProfile.age}
              />

              {/* 성별 */}
              <Dropdown
                dropdownLabel="Gender"
                options={["M", "F"]}
                defaultValue={userProfile.gender}
              />

              {/* 다이어트 여부 */}
              <Dropdown
                dropdownLabel="Diet"
                options={["true", "false"]}
                defaultValue={userProfile.diet ? "true" : "false"}
              />
            </div>
            {/* 오른쪽 컨테이너 */}
            <div className="flex-1 p-5 min-w-[300px] w-full">
              {/* 알러지 */}
              <CheckBox
                boxTitle="Allergy"
                componentList={allergyList}
                selectedData={setSelectedAllergyList}
                defaultList={userProfile.allergies}
              />

              {/* 선호 요리 */}
              <CheckBox
                boxTitle="Preferred cuisine"
                componentList={preferredCuisineList}
                selectedData={setSelectedPreferredCuisineList}
                defaultList={userProfile.preferred_cuisine}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-4">
          <div className="flex">
            <div className="p-1">
              <Link to="/password">
                <Button
                  buttonName="패스워드 수정"
                  bgColor="red"
                  borderColor="red"
                />
              </Link>
            </div>
            <div className="p-1">
              <Button
                buttonName="변경사항 저장"
                bgColor="yellow"
                textColor="gray"
                borderColor="yellow"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
