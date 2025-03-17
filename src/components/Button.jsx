function Button({
  buttonName,
  bgColor,
  textColor,
  borderColor,
  onClick,
  textSize,
}) {
  const btnColorList = {
    black: "bg-black",
    white: "bg-white",
    gray: "bg-gray-200",
    yellow: "bg-yellow-100",
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
    gray4: "border-gray-400",
    yellow: "border-yellow-300",
    red: "border-red-500",
  };

  const textSizeList = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  return (
    <>
      <button
        className={`p-1 px-4 border rounded-md min-w-max max-w-full cursor-pointer
        ${btnColorList[bgColor] || "bg-black"} 
        ${textColorList[textColor] || "text-white"} 
        ${borderColorList[borderColor] || "border-black"}
        ${textSizeList[textSize] || "text-sm"}`}
        onClick={onClick}
      >
        {buttonName}
      </button>
    </>
  );
}

export default Button;
