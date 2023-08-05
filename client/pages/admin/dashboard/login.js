import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { instance } from "../../../axios/interceptors";
import Login from "../../../components/dashboard/forms/Login";

export default function LoginPage({ isAdmin }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_refresh_token");
    if (token) {
      router.push("/admin/dashboard");
      return;
    }

    if (!isAdmin) {
      router.push("/admin/dashboard/signup");
      return;
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <div className=" mt-20">
      <Login />
    </div>
  );
}

LoginPage.getLayout = function (page) {
  return <>{page}</>;
};

export async function getServerSideProps(ctx) {
  let isAdmin;
  try {
    const { data } = await instance.get("/api/v1/auth/find/admin");
    isAdmin = true;
  } catch (error) {
    isAdmin = false;
  }
  return {
    props: {
      isAdmin,
    },
  };
}
