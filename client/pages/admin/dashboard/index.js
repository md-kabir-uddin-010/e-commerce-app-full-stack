import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_refresh_token");
    if (!token) {
      router.push("/admin/dashboard/login");
      return;
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className=" dark:on-dark">
      <DashboardLayout>
        <h1> i am index page</h1>
      </DashboardLayout>
    </div>
  );
}

Index.getLayout = function (page) {
  return <>{page}</>;
};
