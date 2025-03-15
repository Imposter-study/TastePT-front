function CheckBox({
  boxTitle,
  componentList,
  defaultChecked,
  disabled,
  selectedData,
}) {
  const handleChange = (component, isChecked) => {
    selectedData((prev) =>
      isChecked
        ? [...prev, component]
        : prev.filter((item) => item !== component)
    );
  };

  return (
    <div className="flex flex-col space-y-2 py-3">
      <div className="">{boxTitle}</div>
      <div className="flex flex-wrap gap-2 my-2">
        {componentList.map((component) => (
          <label className="cursor-pointer inline-block" key={component}>
            <input
              type="checkbox"
              className="hidden peer"
              defaultChecked={defaultChecked}
              disabled={disabled}
              onChange={(e) => handleChange(component, e.target.checked)}
            />
            <span className="inline-block p-1 px-5 border border-gray-300 rounded-full text-gray-700 peer-checked:bg-gray-500 peer-checked:text-white transition whitespace-nowrap">
              # {component}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckBox;
