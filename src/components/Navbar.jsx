import { Link } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-screen min-w-[400px] overflow-x-auto bg-white z-50">
      <div className="container mx-auto flex justify-between items-center border-b-2 border-gray-300 p-5">
        <Link to="/">
          <div className="m-1 font-bold text-lg cursor-pointer">logo</div>
        </Link>
        <div className="flex items-center">
          <div className="px-5">
            <Link to="/community">
              <div className="text-sm cursor-pointer">Community</div>
            </Link>
          </div>
          <div className="px-1">
            <Link to="/signup">
              <Button
                buttonName="Sign up"
                bgColor="gray"
                textColor="black"
                borderColor="gray"
              />
            </Link>
          </div>
          <div className="px-1">
            <Link to="/signin">
              <Button buttonName="Sign in" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
