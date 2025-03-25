import Button from "../components/Button";
import ProtectedButton from "../components/ProtectedButton";
import bgImage from "../assets/background-img.png";
import bgImage2 from "../assets/background-img2.webp";

function Home() {
  return (
    <div
      className="flex items-center justify-center min-h-screen pt-20"
      style={{
        backgroundImage: `url(${bgImage2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex m-10 justify-center items-center">
        <div className="flex flex-col justify-center items-center h-5/6 w-4/5 min-w-[400px] min-h-[250px] border-5 border-double rounded-xl border-gray-400">
          <strong className="text-black text-6xl m-3 mt-5 pt-5 ">맛P.T</strong>
          <p className="flex flex-col text-gray-500 text-xl text-center m-2">
            <span className="italic">게으른 완벽주의자를 위한</span>
            <span className="text-gray-600 font-bold">레시피 챗봇</span>
          </p>
          <div className="m-2">
            <ProtectedButton to="/chatbot">
              <Button buttonName="맛P.T랑 채팅하기" />
            </ProtectedButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
