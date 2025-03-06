import Dropdown from "../components/Dropdown";
import Input from "../components/Input";

function Signup() {
  return (
    <div className="flex justify-center">
      <div className="border-2 rounded-md w-fit border-gray-300 m-5">
        <form>
          <div className="flex">
            <div className="flex-1 p-5 min-w-[300px] w-full">
              <div className="pt-3">
                <Input inputLabel="Email *" isrequired={true} />
              </div>
              <div className="pt-3">
                <Input inputLabel="Password *" isrequired={true} />
              </div>
              <div className="pt-3">
                <Input inputLabel="Confirm Password *" isrequired={true} />
              </div>
              <div className="pt-3">
                <Input inputLabel="Nickname *" isrequired={true} />
              </div>
              <div className="pt-3">
                <Input inputLabel="Age" isrequired={false} />
              </div>
            </div>
            <div className="flex-1 p-5 min-w-[300px] w-full">
              <div className="pt-3">
                <Dropdown
                  dropdownLabel="Gender"
                  options={["Male", "Female", "Other"]}
                />
              </div>
              <div className="pt-4">
                <Dropdown
                  dropdownLabel="Allerge"
                  options={["알러지1", "알러지2", "Other"]}
                />
              </div>
              <div className="pt-4">
                <Dropdown
                  dropdownLabel="Preferred cuisine"
                  options={["cuisine1", "cuisine2", "cuisine3"]}
                />
              </div>
              <div className="pt-4">
                <Dropdown
                  dropdownLabel="Diet"
                  options={["유", "무", "Other"]}
                />
              </div>
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
