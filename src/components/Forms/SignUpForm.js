import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../../services/Services";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", name: "" },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate("/LoginForm");
    SignUpUser({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  console.log(watch());

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <img src="./assets/logo.svg" alt="logo" className="w-8 h-7 mb-20" />
      <form
        className="w-[450px] h-auto bg-[#161D2F] rounded-3xl flex flex-col"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <h1 className="m-9 text-3xl font-light">Sign Up</h1>
        <input
          className="mx-7 p-4 bg-transparent border-b-2 border-[#5A698F] outline-0"
          type="text"
          placeholder="Email adress"
          {...register("email", {
            required: "Can't be empty",
            pattern: { value: /^\S+@\S+$/i },
          })}
        />
        <small className="text-[#FC4747] translate-x-80 translate-y-[-2.3rem]">
          {errors.email?.message}
        </small>
        <input
          className="mx-7 p-4 bg-transparent border-b-2 border-[#5A698F] outline-0"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Can't be empty",
          })}
        />
        <small className="text-[#FC4747] translate-x-80 translate-y-[-2.3rem]">
          {errors.password?.message}
        </small>
        <input
          className="mx-7 p-4 bg-transparent border-b-2 border-[#5A698F] outline-0"
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Can't be empty",
          })}
        />
        <small className="text-[#FC4747] translate-x-80 translate-y-[-2.3rem]">
          {errors.name?.message}
        </small>
        <button className="bg-[#FC4747] p-3 mx-7 my-8 rounded-md active:bg-white active:text-black">
          Create an account
        </button>
        <div className="flex justify-center mb-10">
          <p>Already have an account?</p>
          <Link to="/LoginForm" className="ml-2 text-[#FC4747]">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
