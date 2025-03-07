import Button from "./Button";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center border-b-2 border-gray-300 p-5">
        <div className="m-1 font-bold text-lg">logo</div>
        <div className="flex">
          <Button
            buttonName="Sign up"
            bgColor="gray"
            textColor="black"
            borderColor="gray"
          />
          <Button buttonName="Sign in" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
