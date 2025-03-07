import Button from "../components/Button";
import Input from "../components/Input";

function Signin() {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 rounded-md w-fit border-gray-300 m-5 px-5 pb-3">
        <form onSubmit={onSubmit}>
          <Input inputLabel="Email" isrequired={true} inputType="email" />
          <Input inputLabel="Password" isrequired={true} inputType="password" />
          <Button buttonName="Sign in" />
        </form>
        <a className="text-sm underline" href="">
          Forgot password?
        </a>
      </div>
    </div>
  );
}

export default Signin;
