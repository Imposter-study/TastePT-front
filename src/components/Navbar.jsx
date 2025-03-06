function Navbar() {
  return (
    <div>
      <div className="flex justify-between border-b-2 border-gray-300">
        <div className="p-5 m-1">logo</div>
        <div className="flex p-5">
          <button className="bg-gray-200 text-black text-sm p-1 px-3 m-1 border border-gray-500 rounded-md">Sign up</button>
          <button className="bg-black text-white text-sm p-1 px-3 m-1 border border-black rounded-md">Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
