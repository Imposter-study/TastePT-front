import PropTypes from "prop-types";

function DisabledInput({ inputLabel, inputValue }) {
  // 특수문자 및 공백 제거 후 id 생성
  const inputID =
    inputLabel.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() + "-input";
  //   console.log(inputID);

  return (
    <div className="flex flex-col pt-3">
      <label className="">{inputLabel}</label>
      <input
        id={inputID}
        className="p-1 pl-3 my-2 text-gray-400"
        value={inputValue}
        disabled={true}
      />
    </div>
  );
}

export default DisabledInput;

DisabledInput.propTypes = {
  inputLabel: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
};
