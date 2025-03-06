import Dropdown from "../components/Dropdown";
import Input from "../components/Input";

function Signup() {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 rounded-md w-fit border-gray-300 m-5">
        <form id="signUpForm" onSubmit={onSubmit}>
          <div className="flex">
            <div className="flex-1 p-5 min-w-[300px] w-full">
              <Input inputLabel="Email *" isrequired={true} inputType="email" />
              <Input
                inputLabel="Password *"
                isrequired={true}
                inputType="password"
              />
              <Input
                inputLabel="Confirm Password *"
                isrequired={true}
                inputType="password"
              />
              <Input inputLabel="Nickname *" isrequired={true} />
              <Input inputLabel="Age" isrequired={false} inputType="number" />
            </div>
            <div className="flex-1 p-5 min-w-[300px] w-full">
              <Dropdown
                dropdownLabel="Gender"
                options={["Male", "Female", "Other"]}
              />
              <Dropdown
                dropdownLabel="Allerge"
                options={["알러지1", "알러지2", "Other"]}
              />
              <Dropdown
                dropdownLabel="Preferred cuisine"
                options={["cuisine1", "cuisine2", "cuisine3"]}
              />
              <Dropdown dropdownLabel="Diet" options={["유", "무", "Other"]} />
            </div>
          </div>
          <div className="flex justify-center p-10">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
