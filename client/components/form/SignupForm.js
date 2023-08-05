import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../axios/interceptors";
import useSignupValidator from "../../hooks/useSignupValidator";
import GoogleBtn from "../btn/GoogleBtn";

export default function SignupForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDisabeled, setIsDisabeled] = useState(false);

  useEffect(() => {
    setIsDisabeled(false);
  }, []);

  const handleChang = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = useSignupValidator(values);
    setErrors(error);
    if (Object.keys(error).length === 0) {
      try {
        setIsDisabeled(true);
        const obj = {
          name: values.name,
          email: values.email,
          password: values.password,
        };
        const { data } = await instance.post("/api/v1/auth/signup", obj);
        toast.success(data.message);
        setIsDisabeled(false);
      } catch (error) {
        setIsDisabeled(false);

        if (!error?.response) {
          toast.error("Internal server error");
        } else if (error.response?.status === 422) {
          toast.error(error.response.data.errors.message);
        } else if (error.response?.status === 409) {
          toast.error(error.response.data.errors.message);
        } else {
          toast.error("Internal server error");
        }
      }
    }
  };

  const handleGoogleAuth = async () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" px-3 py-4 max-w-lg mx-auto shadow-md rounded-lg dark:border dark:border-gray-600"
      >
        <ToastContainer />
        <div>
          <GoogleBtn
            handleGoogleAuth={handleGoogleAuth}
            text={"Signup with Google"}
          />
        </div>
        <div className=" py-2 dark:on-dark">
          <label
            className=" capitalize text-gray-600 dark:text-gray-300"
            htmlFor="name"
          >
            name
          </label>
          <input
            className=" w-full p-2 border outline-none bg-transparent rounded-md dark:border-gray-600"
            type="text"
            name="name"
            id="name"
            value={values.name}
            placeholder="sk kabir islam"
            onChange={(e) => handleChang(e)}
          />
          <p className=" italic text-red-600 dark:text-red-400">
            {errors.name && errors.name}
          </p>
        </div>
        <div className=" py-2 dark:on-dark">
          <label
            className=" capitalize text-gray-600 dark:text-gray-300"
            htmlFor="email"
          >
            email
          </label>
          <input
            className=" w-full p-2 border outline-none bg-transparent rounded-md dark:border-gray-600"
            type="email"
            name="email"
            id="email"
            value={values.email}
            placeholder="example@gmail.com"
            onChange={(e) => handleChang(e)}
          />
          <p className=" italic text-red-600 dark:text-red-400">
            {errors.email && errors.email}
          </p>
        </div>
        <div className=" py-2 dark:on-dark">
          <label
            className=" capitalize text-gray-600 dark:text-gray-300"
            htmlFor="password"
          >
            password
          </label>
          <div className=" relative">
            <input
              className=" w-full p-2 border outline-none bg-transparent rounded-md dark:border-gray-600"
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              value={values.password}
              placeholder="******"
              onChange={(e) => handleChang(e)}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className=" outline-none border-none absolute top-2 right-2"
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
          <p className=" italic text-red-600 dark:text-red-400">
            {errors.password && errors.password}
          </p>
        </div>
        <div className=" py-2 dark:on-dark">
          <label
            className=" capitalize text-gray-600 dark:text-gray-300"
            htmlFor="password2"
          >
            confirm password
          </label>
          <input
            className=" w-full p-2 border outline-none bg-transparent rounded-md dark:border-gray-600"
            type={showPass ? "text" : "password"}
            name="password2"
            id="password2"
            value={values.password2}
            placeholder="******"
            onChange={(e) => handleChang(e)}
          />
          <p className=" italic text-red-600 dark:text-red-400">
            {errors.password2 && errors.password2}
          </p>
        </div>
        <div className=" py-2 text-white dark:on-dark">
          <input
            disabled={isDisabeled}
            className="w-full transition-all cursor-pointer capitalize p-2 bg-indigo-800 rounded-md hover:bg-indigo-600"
            type="submit"
            value="sign up"
          />
        </div>
        <div className=" py-2 text-center">
          <p className=" py-2">or</p>
          <p>
            Alredy have an account ?{" "}
            <Link href="/login">
              <a className=" underline">Login</a>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
