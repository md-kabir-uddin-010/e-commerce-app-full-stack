import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { instance } from "../../axios/interceptors";
import Loading from "../../components/loading/Loading";
import { updateLoginStatus } from "../../redux/slice/logedinSlice";

export default function Success() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fatchToken = async () => {
    try {
      const { data } = await instance.get("/auth/login/success", {
        withCredentials: true,
      });
      localStorage.setItem("acces_token", data.acces_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      dispatch(updateLoginStatus(true));
      router.push("/");
    } catch (error) {
      dispatch(updateLoginStatus(false));
      // router.push("/login/failed");
    }
  };

  useEffect(() => {
    fatchToken();
    const isLogedin = localStorage.getItem("refresh_token");
    isLogedin && dispatch(updateLoginStatus(true));

    if (isLogedin) {
      setIsLoading(true);
      router.replace("/");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      Login success
    </div>
  );
}

Success.getLayout = (page) => {
  return <>{page}</>;
};
