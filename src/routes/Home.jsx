import Button from "../components/Button";
import ProtectedButton from "../components/ProtectedButton";
import bgImage2 from "../assets/background-img2.webp";

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen pt-20">
      <img
        src={bgImage2}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        fetchpriority="high"
      />
      <div className="flex m-10 justify-center items-center z-10">
        <div className="flex flex-col justify-center items-center h-5/6 w-4/5 min-w-[400px] min-h-[250px] border-5 border-double rounded-xl border-gray-400">
          <strong className="text-black text-6xl m-3 pt-5 ">맛P.T</strong>
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
