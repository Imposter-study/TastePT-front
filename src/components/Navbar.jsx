import Button from "./Button";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-screen min-w-[100px] overflow-x-auto bg-white">
      <div className="container mx-auto flex justify-between items-center border-b-2 border-gray-300 p-5">
        <div className="m-1 font-bold text-lg">logo</div>
        <div className="flex">
          <div className="px-1">
            <Button
              buttonName="Sign up"
              bgColor="gray"
              textColor="black"
              borderColor="gray"
            />
          </div>
          <div className="px-1">
            <Button buttonName="Sign in" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
