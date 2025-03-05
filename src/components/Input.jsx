function Input({ inputLabel }) {
  return (
    <div>
      <label className="">{inputLabel}</label>
      <input
        className="border rounded-md p-1 pl-3 my-2 border-gray-400"
        placeholder={inputLabel}
      />
    </div>
  );
}

export default Input;
