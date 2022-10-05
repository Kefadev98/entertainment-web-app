import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Helmet } from "react-helmet";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginUser } = useContext(AuthContext);

  console.log(watch());

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <Helmet>
        <title>Entertainment Login From</title>
        <meta name="description" content="Login form" />
      </Helmet>
      <img src="./assets/logo.svg" alt="logo" className="w-8 h-7 mb-20" />
      <form
        className="w-[450px] h-auto bg-[#161D2F] rounded-3xl flex flex-col"
        onSubmit={handleSubmit(loginUser)}
      >
        <h1 className="m-9 text-3xl font-light">Login</h1>
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
        <button className="bg-[#FC4747] text-white p-3 mx-7 my-8 rounded-md active:bg-slate-100 active:text-black">
          Login to your account
        </button>
        <div className="flex justify-center mb-10">
          <p>Don't have an account?</p>
          <Link to="/" className="ml-2 text-[#FC4747]">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
