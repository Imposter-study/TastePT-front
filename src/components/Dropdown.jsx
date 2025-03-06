function Dropdown({ dropdownLabel, options }) {
  return (
    <div>
      <div className="select flex flex-col">
        <label>{dropdownLabel}</label>
        <select className="bg-gray-100 border border-gray-300 p-1 pl-3 my-2 rounded-md">
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
