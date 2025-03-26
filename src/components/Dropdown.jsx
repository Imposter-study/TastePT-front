import PropTypes from "prop-types";

function Dropdown({ dropdownLabel, options, defaultValue }) {
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
          defaultValue={defaultValue ? defaultValue : ""}
        >
          <option value="" disabled hidden>
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

Dropdown.propTypes = {
  dropdownLabel: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
};
