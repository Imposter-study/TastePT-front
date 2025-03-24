import { Link } from "react-router-dom";
import Button from "./Button";
import { useRecoilState } from "recoil";
import { isAuthenticated, authUser } from "../recoil/authAtom";
import { privateAccountAPI } from "../api/accountApi";
import defaultProfile from "../assets/image.png";
import tastePTLogo from "../assets/tastePT.png";
import { commingSoon } from "../utils/commingSoon";
import { errMessage } from "../utils/errMessage";

function Navbar() {
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [isAuth, setIsAuth] = useRecoilState(isAuthenticated);
  const [user, setUser] = useRecoilState(authUser);
  // console.log(isAuth);
  // console.log(user);
  const handleSignOut = async () => {
    const signOutConfirm = window.confirm("로그아웃 하시겠습니까?");

    if (signOutConfirm) {
      await privateAccountAPI
        .post("signout/")
        .then((response) => {
          // console.log(response);
          setIsAuth(false);
          setUser({});
          alert(response.data.detail);
          window.location.href = "/";
        })
        .catch((error) => {
          // console.log(error);
          const errorMessage = errMessage(error);
          alert(errorMessage);
        });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen min-w-[400px] overflow-x-auto bg-white z-50">
      <div className="container mx-auto flex justify-between items-center border-b-2 border-gray-300 pr-5 py-2">
        <Link to="/">
          <div className="font-bold text-lg cursor-pointer">
            <img
              src={tastePTLogo}
              alt="tastePT-logo"
              className="size-15 object-cover"
            />
          </div>
        </Link>
        <div className="flex items-center">
          <div className="px-5 gap-5 flex">
            <div className="text-sm cursor-pointer" onClick={commingSoon}>
              Shop
            </div>
            <div className="text-sm cursor-pointer" onClick={commingSoon}>
              Live Chatting
            </div>
            <Link to="/community">
              <div className="text-sm cursor-pointer">Community</div>
            </Link>
          </div>
          {isAuth ? (
            <>
              <div className="px-1">
                <Button
                  buttonName="Sign out"
                  bgColor="gray"
                  textColor="black"
                  borderColor="gray"
                  onClick={handleSignOut}
                />
              </div>
              <div className="px-1">
                <Link to={`/${user.nickname}`}>
                  <img
                    src={
                      user.profileImg
                        ? baseURL + user.profileImg
                        : defaultProfile
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
