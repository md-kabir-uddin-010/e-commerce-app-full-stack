import React, { useEffect, useState } from "react";
import SignupForm from "../components/form/SignupForm";
import { useDispatch } from "react-redux";
import { menuUpdate } from "../redux/slice/menuSlice";
import Loading from "../components/loading/Loading";
import { useRouter } from "next/router";
import { updateLoginStatus } from "../redux/slice/logedinSlice";

export default function signup() {
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

  const handleNabar = () => {
    dispatch(menuUpdate(false));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      onClick={handleNabar}
      className="w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 min-h-screen dark:on-dark"
    >
      <SignupForm />
    </div>
  );
}
