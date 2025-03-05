function Home() {
  return (
    <div className="flex m-10 justify-center items-center border-b-2 border-gray-300 pb-10">
      <div className="flex flex-col justify-center items-center h-5/6 w-4/5 p-5 bg-gray-100">
        <strong className="text-black text-6xl m-3 mt-5 pt-10 ">맛P.T</strong>
        <p className="text-gray-500 text-2xl m-2">subtitle</p>
        <div className="m-2">
          <button className="bg-black text-white p-1 px-3 rounded-md text-sm border border-black">
            start
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
