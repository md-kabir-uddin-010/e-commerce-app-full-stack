import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../components/loading/Loading";
import { updateLoginStatus } from "../../redux/slice/logedinSlice";

export default function Failed() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
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
      Login failed!
    </div>
  );
}

Failed.getLayout = (page) => {
  return <>{page}</>;
};
