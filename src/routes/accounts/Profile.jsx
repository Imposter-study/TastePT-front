import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import DisabledInput from "../../components/DisabledInput";
import defaultProfile from "../../assets/image.png";
import Button from "../../components/Button";
import { publicAccountAPI } from "../../api/accountApi";
import { useParams } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import { authUser } from "../../recoil/authAtom";
import { getImageUrl } from "../../utils/imageUtils";
import { commingSoon } from "../../utils/commingSoon";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";

function Profile() {
  const { nickname } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const authProfile = useRecoilValue(authUser);
  const [notFound, setNotFound] = useState(false);

  const getProfile = () => {
    publicAccountAPI
      .get(`${nickname}/`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.response.status);
        if (error.response.status === 404) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      });
  };

  useEffect(() => {
    getProfile();
  }, [nickname]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-20">
      {loading ? (
        <Loading text="Loading" />
      ) : (
        <div className="w-fit border-gray-300 m-5">
          <div className="flex flex-col items-center max-w-[150px] pb-2 ">
            <img
              src={getImageUrl(user.profile_picture, defaultProfile)}
              alt="프로필 이미지"
              className="size-25 mb-3 rounded-full object-cover"
            />
            <Button
              buttonName="팔로우"
              bgColor="gray"
              textColor="black"
              onClick={commingSoon}
            />
          </div>
          <div className="flex">
            <div>
              <DisabledInput inputLabel="Email" inputValue={user.email} />
              <DisabledInput inputLabel="Nickname" inputValue={user.nickname} />
              <DisabledInput inputLabel="Age" inputValue={user.age || "-"} />
              <DisabledInput
                inputLabel="Gender"
                inputValue={user.gender || "-"}
              />
            </div>
            <div>
              {/* 다이어트 여부 */}
              <DisabledInput
                inputLabel="Diet"
                inputValue={user.diet ? "다이어트 중" : "안 다이어트 중"}
              />
              {/* 선호 요리 */}
              <CheckBox
                boxTitle="Preferred Cuisine"
                componentList={user.preferred_cuisine}
                disabled={true}
                defaultChecked={true}
              />

              {/* 알러지 */}
              <CheckBox
                boxTitle="Allergy"
                componentList={user.allergies}
                disabled={true}
                defaultChecked={true}
              />
            </div>
          </div>
          {authProfile.nickname === user.nickname ? (
            <div className="flex justify-end gap-3">
              <Link to={`/mypage`}>
                <Button
                  buttonName="프로필 수정하기"
                  bgColor="white"
                  textColor="gray"
                  borderColor="gray"
                />
              </Link>
              <Link to={`/checkpassword`}>
                <Button buttonName="탈퇴하기" />
              </Link>
            </div>
          ) : (
            <div className="flex justify-end">
              <div className="pl-5">
                <Button
                  buttonName="신고하기"
                  bgColor="red"
                  borderColor="red"
                  onClick={commingSoon}
                />
              </div>
              <div className="pl-5">
                <Button
                  buttonName="차단하기"
                  bgColor="yellow"
                  borderColor="yellow"
                  textColor="black"
                  onClick={commingSoon}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;