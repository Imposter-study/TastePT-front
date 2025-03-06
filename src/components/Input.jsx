function Input({ inputLabel, isrequired }) {
  return (
    <div className="flex flex-col">
      <label className="">{inputLabel}</label>
      <input
        className="border rounded-md p-1 pl-3 my-2 border-gray-400"
        placeholder={inputLabel}
        required={isrequired}
      />
    </div>
  );
}

export default Input;
