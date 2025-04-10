import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";
import defaultProfile from "../../assets/image.png";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authUser } from "../../recoil/authAtom";
import { privateAccountAPI } from "../../api/accountApi";
import CheckBox from "../../components/CheckBox";
import DisabledInput from "../../components/DisabledInput";
import { errMessage } from "../../utils/errMessage";
import { getImageUrl } from "../../utils/imageUtils";
import Loading from "../../components/Loading";
import { useAxios } from "../../hooks/useAxios";
import { useAllergyList } from "../../hooks/useAllergyList";
import { usePreferredCusisineList } from "../../hooks/usePreferredCuisineList";

function Mypage() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // atom : 전역 상태 관리
  const user = useRecoilValue(authUser);
  const setAuthUser = useSetRecoilState(authUser);

  // useState : 상태 관리
  const [profileImgUrl, setProfileImgUrl] = useState(defaultProfile);
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  // useState : 상태 관리
  const [selectedAllergyList, setSelectedAllergyList] = useState([]);
  const [selectedPreferredCuisineList, setSelectedPreferredCuisineList] =
    useState([]);

  const { data, loading } = useAxios(`${user.nickname}/`, privateAccountAPI); // 유저 데이터 가져오기
  const allergyList = useAllergyList(); // 알러지 목록 가져오기
  const preferredCuisineList = usePreferredCusisineList(); // 선호 요리 목록 가져오기

  // 프로필 이미지 변경
  const onFileChange = (event) => {
    event.preventDefault();
    // console.log(event.target.files[0]);
    const profileImgFile = event.target.files[0];
    const profileImgUrl = URL.createObjectURL(profileImgFile);
    // console.log(profileImgUrl);
    setProfileImgUrl(profileImgUrl);
    setIsProfileChanged(true);
  };

  // 기본 이미지로 변경
  const handleSetDefaultProfile = () => {
    const defaultImgConfirm = window.confirm("기본 이미지로 변경하시겠습니까?");
    if (defaultImgConfirm) {
      setProfileImgUrl(defaultProfile);
      setIsProfileChanged(true);
    }
  };

  // 프로필 수정
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
    // console.log("프로필 이미지 변경 여부 : ", isProfileChanged);
    if (isProfileChanged) {
      if (profileImgUrl === defaultProfile) {
        formData.append("profile_picture", "");
      } else {
        // console.log(document.getElementById("profileImg").files[0]);
        const profileImgFile = document.getElementById("profileImg").files[0];
        // console.log(profileImgUrl);
        // console.log(profileImgUrl.split("/").pop());
        formData.append("profile_picture", profileImgFile);
      }
    }

    privateAccountAPI
      .put(``, formData)
      .then((response) => {
        // console.log(response);
        setAuthUser({
          nickname: response.data.nickname,
          profileImg: response.data.profile_picture,
        });
        alert("프로필 수정이 완료되었습니다.");
        navigate(`/${response.data.nickname}`);
      })
      .catch((error) => {
        // console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      });
  };

  useEffect(() => {
    if (user.nickname) {
      // getAllergyList();
      // getPreferredCuisineList();

      if (data.allergies) {
        setSelectedAllergyList(data.allergies);
        setSelectedPreferredCuisineList(data.preferred_cuisine);
      }
      if (data.profile_picture) {
        setProfileImgUrl(getImageUrl(data.profile_picture));
      }
    }
  }, [user.nickname, data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <Loading text="Loading" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      <div className="w-fit border-gray-300 m-5">
        <div className="flex flex-col justify-center items-center max-w-[300px]">
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
          <div
            className="text-sm text-gray-400 hover:underline cursor-pointer"
            onClick={handleSetDefaultProfile}
          >
            기본 이미지로 변경하기
          </div>
        </div>
        <div className="flex">
          {/* 왼쪽 컨테이너 */}
          <div className="flex">
            <div className="flex-1 p-5 min-w-[300px] w-full">
              {/* 이메일 */}
              <DisabledInput inputLabel="Email" inputValue={data.email} />

              {/* 닉네임 */}
              <Input
                inputLabel="Nickname"
                isrequired={true}
                defaultValue={data.nickname}
              />

              {/* 나이 */}
              <Input
                inputLabel="Age"
                isrequired={false}
                inputType="number"
                defaultValue={data.age}
              />

              {/* 성별 */}
              <Dropdown
                dropdownLabel="Gender"
                options={["M", "F"]}
                defaultValue={data.gender}
              />

              {/* 다이어트 여부 */}
              <Dropdown
                dropdownLabel="Diet"
                options={["true", "false"]}
                defaultValue={data.diet ? "true" : "false"}
              />
            </div>
            {/* 오른쪽 컨테이너 */}
            <div className="flex-1 p-5 min-w-[300px] w-full">
              {/* 알러지 */}
              <CheckBox
                boxTitle="Allergy"
                componentList={allergyList}
                selectedData={setSelectedAllergyList}
                defaultList={data.allergies}
              />

              {/* 선호 요리 */}
              <CheckBox
                boxTitle="Preferred cuisine"
                componentList={preferredCuisineList}
                selectedData={setSelectedPreferredCuisineList}
                defaultList={data.preferred_cuisine}
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
