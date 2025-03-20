import notionIcon from "../assets/notion-icon.webp";
import githubIcon from "../assets/github-icon.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full bg-gray-100 ">
      <div className="text-gray-500 text-xs p-5">
        <p>
          <span
            className="font-bold hover:underline cursor-pointer"
            onClick={() => {
              navigate("/privacy-policy");
            }}
          >
            개인정보처리방침
          </span>
          <span> | </span>
          <span
            className="font-bold hover:underline cursor-pointer"
            onClick={() => {
              navigate("/terms-of-service");
            }}
          >
            이용약관
          </span>
        </p>
        <p>Email : imposterstudy@gmail.com</p>
        <p>Copyright ⓒ 2025. ImposterStudy All rights reserved.</p>
      </div>
      <div className="flex gap-3 p-5">
        <a href="https://www.notion.so/P-T-1a87d4611a6f80938cc9e0d41d01ca40?pvs=4">
          <img
            src={notionIcon}
            alt="notion-icon"
            className="size-6 object-cover"
          />
        </a>
        <a href="https://github.com/Imposter-study/TastePT">
          <img
            src={githubIcon}
            alt="github-icon"
            className="size-6 object-cover"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
