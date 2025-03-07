function Button({ buttonName, bgColor, textColor, borderColor, onClick }) {
  const btnColorList = {
    black: "bg-black",
    white: "bg-white",
    gray: "bg-gray-200",
    yellow: "bg-yellow-200",
    red: "bg-red-200",
  };

  const textColorList = {
    black: "text-black",
    white: "text-white",
    gray: "text-gray-500",
  };

  const borderColorList = {
    black: "border-black",
    white: "border-white",
    gray: "border-gray-500",
    yellow: "border-yellow-500",
    red: "border-red-500",
  };

  return (
    <>
      <button
        className={`text-sm p-2 px-4 border rounded-md w-full
        ${btnColorList[bgColor] || "bg-black"} 
        ${textColorList[textColor] || "text-white"} 
        ${borderColorList[borderColor] || "border-black"}`}
        onClick={onClick}
      >
        {buttonName}
      </button>
    </>
  );
}

export default Button;
