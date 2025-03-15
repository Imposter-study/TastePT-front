import { useEffect, useState } from "react";
import DisabledInput from "../../components/DisabledInput";
import defaultProfile from "/image.png";
import Button from "../../components/Button";
import { publicAccountAPI } from "../../api/accountApi";
import { useParams } from "react-router-dom";

function Profile() {
  const { nickname } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const getProfile = () => {
    publicAccountAPI.get(`${nickname}/`).then((response) => {
      console.log(response);
      setUser(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getProfile();
  }, [nickname]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-20">
      {loading ? (
        "loading"
      ) : (
        <div className="w-fit border-gray-300 m-5">
          <div className="flex flex-col items-center max-w-[150px] pb-2 ">
            <img
              src={defaultProfile}
              alt="프로필 이미지"
              className="size-25 mb-3 rounded-full object-cover"
            />
            <Button buttonName="팔로우" bgColor="gray" textColor="black" />
          </div>
          <div className="flex">
            <div>
              <DisabledInput
                inputLabel="Email"
                inputValue="testuser@test.com"
              />
              <DisabledInput inputLabel="Nickname" inputValue={user.nickname} />
              <DisabledInput inputLabel="Age" inputValue={user.age || "-"} />
              <DisabledInput
                inputLabel="Gender"
                inputValue={user.gender || "-"}
              />
            </div>
            <div>
              <DisabledInput inputLabel="Diet" inputValue="다이어트 유 or 무" />
              <DisabledInput
                inputLabel="Preferred Cuisine"
                inputValue="다이어트 유 or 무"
              />
              <DisabledInput
                inputLabel="Allergy"
                inputValue="땅콩, 아몬드 ..."
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="pl-5">
              <Button buttonName="신고하기" bgColor="red" borderColor="red" />
            </div>
            <div className="pl-5">
              <Button
                buttonName="차단하기"
                bgColor="yellow"
                borderColor="yellow"
                textColor="black"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
