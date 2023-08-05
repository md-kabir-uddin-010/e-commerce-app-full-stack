import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../../../axios/interceptors";
import Loading from "../../../../components/loading/Loading";
import useSetPasswordValidatior from "../../../../hooks/useSetPasswordValidator";
import { updateLoginStatus } from "../../../../redux/slice/logedinSlice";

export default function setPassword() {
  const router = useRouter();
  const { userId, token } = router.query;
  const [values, setValues] = useState({
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [isDisabeled, setIsDisabeled] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsDisabeled(false);
    const isLogedin = localStorage.getItem("refresh_token");
    isLogedin && dispatch(updateLoginStatus(true));
    if (isLogedin) {
      setIsLoading(true);
      router.replace("/");
    }
    setIsLoading(false);
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = useSetPasswordValidatior(values);
    setErrors(error);

    if (Object.keys(error).length === 0) {
      try {
        setIsDisabeled(true);
        const obj = {
          id: userId,
          token: token,
          new_password: values.password,
        };
        const { data } = await instance.post("/api/v1/auth/set/password", obj);
        console.log(data);
        toast.success(data.message);
        setIsDisabeled(false);
        if (data) {
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } catch (error) {
        setIsDisabeled(false);
        if (!error?.response) {
          toast.error("Internal server error");
        } else if (error.response?.status === 401) {
          toast.error(error.response.data.errors.message);
        } else if (error.response?.status === 422) {
          toast.error(error.response.data.errors.message);
        } else if (error.response?.status === 404) {
          toast.error(error.response.data.errors.message);
        } else {
          toast.error("Internal server error");
        }
      }
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" w-full h-[88vh] flex justify-center items-center dark:on-dark">
      <ToastContainer />
      <div className=" p-10 bg-slate-300 rounded-lg shadow-lg dark:bg-slate-700">
        <form onSubmit={onSubmit}>
          <div className="">
            <label
              className=" py-1 text-xl font-semibold block"
              htmlFor="password"
            >
              New password
            </label>
            <div className=" relative">
              <input
                className=" w-96 border outline-none py-1 px-2 rounded-md dark:bg-transparent dark:border-gray-400"
                type={showPass ? "text" : "password"}
                name="password"
                id="password"
                placeholder="******"
                value={values.password}
                onChange={(e) => handleChange(e)}
              />
              <p className=" italic text-red-500 dark:text-red-400">
                {errors && errors.password}
              </p>

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className=" outline-none border-none absolute top-1 right-2"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="">
            <label
              className=" py-1 text-xl font-semibold block"
              htmlFor="password2"
            >
              Confirm new password
            </label>
            <input
              className=" w-96 border outline-none py-1 px-2 rounded-md dark:bg-transparent dark:border-gray-400"
              type={showPass ? "text" : "password"}
              name="password2"
              id="password2"
              placeholder="******"
              value={values.password2}
              onChange={(e) => handleChange(e)}
            />
            <p className=" italic text-red-500 dark:text-red-400">
              {errors && errors.password2}
            </p>
          </div>
          <div className=" text-center">
            <input
              disabled={isDisabeled}
              className=" cursor-pointer mt-4 text-xl bg-sky-700 text-white py-2 px-4 rounded-md shadow-md"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
