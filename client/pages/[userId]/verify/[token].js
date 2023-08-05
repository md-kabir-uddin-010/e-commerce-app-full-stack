import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { instance } from "../../../axios/interceptors";
import Loading from "../../../components/loading/Loading";

export default function VerifyUser() {
  const router = useRouter();
  const { userId, token } = router.query;
  const [isLoding, setIsLoding] = useState(true);

  const userVerification = async (id, token) => {
    try {
      const { data } = await instance.get(`/api/v1/auth/${id}/verify/${token}`);
      localStorage.setItem("acces_token", data.acces_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      Cookies.set("info", JSON.stringify(data.info), { expires: 1 });
      router.push("/");
    } catch (error) {
      if (!error?.response) {
        toast.error("Internal server error");
      } else if (error.response?.status === 404) {
        toast.error("404 not found");
      } else {
        toast.error("Something went wrong?");
      }
    }
  };

  useEffect(() => {
    setIsLoding(false);
  }, []);

  if (isLoding) {
    return <Loading />;
  }

  return (
    <div className="w-full h-[90vh] flex justify-center items-center  shadow-sm text-center">
      <ToastContainer />
      <div className="text-center">
        <h1>Click verify button to verify your acount?</h1>
        <button
          className="my-2 p-2 capitalize bg-green-600 text-white rounded-md"
          onClick={() => userVerification(userId, token)}
        >
          verify
        </button>
      </div>
    </div>
  );
}

VerifyUser.getLayout = (page) => {
  return <>{page}</>;
};
