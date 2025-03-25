import cryPT from "../assets/CryPT.png";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-20">
      <img src={cryPT} alt="tastePT-logo" className="size-50" />
      <div className="text-2xl font-bold">404 Not Found</div>
      <div className="text-sm">페이지를 찾을 수 없어요</div>
    </div>
  );
}

export default NotFound;
