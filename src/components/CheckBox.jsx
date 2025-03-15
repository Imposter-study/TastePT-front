function CheckBox({ boxTitle, componentList, defaultChecked, disabled }) {
  return (
    <div className="flex flex-col space-y-2 py-3">
      <div className="">{boxTitle}</div>
      <div className="my-2">
        {componentList.map((component) => (
          <label className="cursor-pointer" key={component}>
            <input
              type="checkbox"
              className="hidden peer"
              defaultChecked={defaultChecked}
              disabled={disabled}
            />
            <span className="p-1 px-5 border border-gray-300 rounded-full text-gray-700 peer-checked:bg-gray-500 peer-checked:text-white transition">
              # {component}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckBox;
