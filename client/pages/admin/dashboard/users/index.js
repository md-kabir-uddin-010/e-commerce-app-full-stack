import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateUser from "../../../../components/form/user/CreateUser";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import UsersTable from "../../../../components/table/UsersTable";

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
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
    <div className=" relative">
      <DashboardLayout>
        <div>
          {!modal && (
            <div className=" py-2 px-2 text-right">
              <button
                onClick={() => setModal(true)}
                type="button"
                className=" bg-indigo-500 py-1 px-2 rounded-md text-white"
              >
                Add User
              </button>
            </div>
          )}
          {modal && (
            <div className=" ">
              <div className="">
                <div className=" pr-6 py-2 text-right">
                  <button
                    onClick={() => setModal(false)}
                    className=" hover:text-white px-2 py-1 text-2xl rounded-full hover:bg-slate-500"
                    type="button"
                  >
                    &times;
                  </button>
                </div>
                <div className=" w-full sm:w-96 sm:mx-auto md:w-2/3 md:mx-auto  lg:w-full">
                  <CreateUser modal={modal} setModal={setModal} />
                </div>
              </div>
            </div>
          )}
          <div className="w-full overflow-x-scroll px-2">
            <h2>All users</h2>
            <UsersTable modal={modal} />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

Users.getLayout = function (page) {
  return <>{page}</>;
};
