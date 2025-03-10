function Dropdown({ dropdownLabel, options }) {
  // 특수문자 및 공백 제거 후 id 생성
  const optionID =
    dropdownLabel.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() + "-input";

  return (
    <div>
      <div className="select flex flex-col pt-4">
        <label htmlFor={optionID}>{dropdownLabel}</label>
        <select
          id={optionID}
          className="bg-gray-100 border border-gray-300 p-1 pl-3 my-2 rounded-md"
        >
          <option value="" selected disabled hidden>
            {dropdownLabel}
          </option>
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
