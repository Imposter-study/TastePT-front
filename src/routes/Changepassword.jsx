import Button from "../components/Button";
import Input from "../components/Input";

function Changepassword() {
  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      <div className="border-2 rounded-md border-gray-200 min-w-[300px] p-5">
        <div>
          <Input inputLabel="Password" isrequired={true} inputType="password" />
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
        <div className="py-5">
          <Button buttonName="Change Password" />
        </div>
      </div>
    </div>
  );
}

export default Changepassword;
