import Button from "../components/Button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen pt-20">
      <div className="flex m-10 justify-center items-center border-b-2 border-gray-300 pb-10 min-w-[300px]">
        <div className="flex flex-col justify-center items-center h-5/6 w-4/5 p-5 bg-gray-100">
          <strong className="text-black text-6xl m-3 mt-5 pt-10 ">맛P.T</strong>
          <p className="text-gray-500 text-2xl m-2">subtitle</p>
          <div className="m-2">
            <Link to="/chatbot">
              <Button buttonName="start" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
