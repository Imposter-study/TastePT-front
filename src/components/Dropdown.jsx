function Dropdown({ dropdownLabel, options }) {
  return (
    <div>
      <div className="select">
        <label>{dropdownLabel}</label>
        <select className="bg-gray-100 border border-gray-300 p-1 px-3 rounded-md my-2 w-64">
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
