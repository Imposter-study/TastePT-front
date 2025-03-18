function Input({ inputLabel, isrequired, inputType, value, onChange, defaultValue }) {
  // 특수문자 및 공백 제거 후 id 생성
  const inputID =
    inputLabel.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() + "-input";
  //   console.log(inputID);

  return (
    <div className="flex flex-col pt-3">
      <label className="">{inputLabel}</label>
      <input
        id={inputID}
        className="border rounded-md p-1 pl-3 my-2 border-gray-400"
        placeholder={inputLabel}
        required={isrequired}
        type={inputType}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default Input;
