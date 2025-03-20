import { useRecoilValue } from "recoil";
import { isAuthenticated } from "../recoil/authAtom";
import { useNavigate } from "react-router-dom";

function ProtectedButton({ to, children }) {
  const isAuth = useRecoilValue(isAuthenticated);
  const navigate = useNavigate();

  const onclick = () => {
    if (isAuth) {
      navigate(to); // 로그인 되어 있으면 정상 이동
    } else {
      const confirm = window.confirm(
        "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (confirm) {
        // 로그인 페이지로 이동, 원래 가려고 했던 페이지 저장
        navigate("/signin", { state: { redirectedFrom: { pathname: to } } });
      }
    }
  };

  return <div onClick={onclick}>{children}</div>;
}

export default ProtectedButton;
