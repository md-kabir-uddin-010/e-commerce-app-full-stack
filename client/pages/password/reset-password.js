import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../axios/interceptors";
import Loading from "../../components/loading/Loading";
import useEmailValidator from "../../hooks/useEmailValidator";
import { updateLoginStatus } from "../../redux/slice/logedinSlice";

export default function ResetPassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [isDisabeled, setIsDisabeled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const isError = useEmailValidator(email);
    setErrors(isError);
    if (!isError) {
      try {
        setIsDisabeled(true);
        const { data } = await instance.post("/api/v1/auth/reset/password", {
          email,
        });
        toast.success(data.message);
        setIsDisabeled(false);
      } catch (error) {
        setIsDisabeled(false);
        if (!error?.response) {
          toast.error("Internal server error");
        } else if (error.response?.status === 401) {
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
              htmlFor="email"
            >
              Email
            </label>
            <input
              className=" w-96 border outline-none py-1 px-2 rounded-md dark:bg-transparent dark:border-gray-400"
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className=" italic text-red-500 dark:text-red-400">
              {errors && errors}
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
