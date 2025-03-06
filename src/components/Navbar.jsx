function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center border-b-2 border-gray-300 p-5">
        <div className="m-1 font-bold text-lg">logo</div>
        <div className="flex">
          <button className="bg-gray-200 text-black text-sm p-2 px-4 m-1 border border-gray-500 rounded-md">
            Sign up
          </button>
          <button className="bg-black text-white text-sm p-2 px-4 m-1 border border-black rounded-md">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
