import Button from "../components/Button";
import Input from "../components/Input";

function Signin() {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20">
      <div className="border-2 rounded-md w-1/3 border-gray-300 m-5 px-5 pb-3 min-w-[300px]">
        <form onSubmit={onSubmit}>
          <div className="py-4">
            <Input inputLabel="Email" isrequired={true} inputType="email" />
            <Input
              inputLabel="Password"
              isrequired={true}
              inputType="password"
            />
          </div>
          <div className="pb-2">
            <Button buttonName="Sign in" />
          </div>
        </form>
        <a className="text-sm underline" href="">
          Forgot password?
        </a>
      </div>
    </div>
  );
}

export default Signin;
