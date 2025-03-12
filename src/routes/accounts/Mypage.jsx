import { useState } from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";
import defaultProfile from "/image.png";

function Mypage() {
  const [profileImgUrl, setProfileImgUrl] = useState(defaultProfile);

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onFileChange = (event) => {
    event.preventDefault();
    // console.log(event.target.files[0]);
    const profileImgFile = event.target.files[0];
    const profileImgUrl = URL.createObjectURL(profileImgFile);
    // console.log(profileImgUrl);
    setProfileImgUrl(profileImgUrl);
  };

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
          <div className="flex">
            <div className="flex-1 p-5 min-w-[300px] w-full">
              <div>
                <p>Email</p>
                <p className="text-gray-300 ml-3">example@ex.com</p>
              </div>
              <Input inputLabel="Nickname" isrequired={true} />
              <Input inputLabel="Age" isrequired={false} inputType="number" />
              <Dropdown
                dropdownLabel="Gender"
                options={["Male", "Female", "Other"]}
              />
            </div>
            <div className="flex-1 p-5 min-w-[300px] w-full">
              <div>
                <Dropdown
                  dropdownLabel="Allerge"
                  options={["알러지1", "알러지2", "Other"]}
                />
                <div className="flex">
                  <Button buttonName="알러지" />
                  <Button buttonName="알러지" />
                  <Button buttonName="알러지" />
                </div>
              </div>
              <Dropdown
                dropdownLabel="Preferred cuisine"
                options={["cuisine1", "cuisine2", "cuisine3"]}
              />
              <Dropdown dropdownLabel="Diet" options={["유", "무", "Other"]} />
            </div>
          </div>
        </div>
        <div className="flex justify-end mr-4">
          <div className="flex">
            <div className="p-1">
              <Button
                buttonName="패스워드 수정"
                bgColor="red"
                borderColor="red"
              />
            </div>
            <div className="p-1">
              <Button
                buttonName="변경사항 저장"
                bgColor="yellow"
                textColor="gray"
                borderColor="yellow"
                onClick={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
