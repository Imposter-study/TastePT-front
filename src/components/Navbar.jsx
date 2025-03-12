import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goSignUp = () => {
    navigate("/signup");
  };

  const goSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="fixed top-0 left-0 w-screen min-w-[100px] overflow-x-auto bg-white z-50">
      <div className="container mx-auto flex justify-between items-center border-b-2 border-gray-300 p-5">
        <div className="m-1 font-bold text-lg cursor-pointer" onClick={goHome}>
          logo
        </div>
        <div className="flex items-center">
          <div className="px-1">
            <Button
              buttonName="Sign up"
              bgColor="gray"
              textColor="black"
              borderColor="gray"
              onClick={goSignUp}
            />
          </div>
          <div className="px-1">
            <Button buttonName="Sign in" onClick={goSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
