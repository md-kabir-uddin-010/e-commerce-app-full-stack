import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInterceptor from "../../axios/adminInterceptor";

export default function UsersTable({ modal }) {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const { data } = await adminInterceptor.get("/api/v1/users");
      setUsers(data.info);
    } catch (error) {
      setUsers([]);
    }
  };

  useEffect(() => {
    getUsers();
  }, [modal]);

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you seure delete this user");
      if (confirm) {
        const { data } = await adminInterceptor.delete(
          `/api/v1/admin/delete/user/${userId}`
        );
        getUsers();
        data?.toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <table className="w-full border-collapse">
        <thead>
          <tr className=" bg-indigo-400 text-white border capitalize">
            <th className="text-center border py-1 px-2">profile</th>
            <th className="text-center border py-1 px-2">name</th>
            <th className="text-center border py-1 px-2">email</th>
            <th className="text-center border py-1 px-2">role</th>
            <th className="text-center border py-1 px-2">scope</th>
            <th className="text-center border py-1 px-2">verifyed</th>
            <th className="text-center border py-1 px-2">created</th>
            <th className="text-center border py-1 px-2">actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr
                key={user._id}
                className=" border even:bg-gray-200 odd:bg-transparent dark:even:bg-slate-600"
              >
                <td className="text-center border py-1 px-2">
                  {user.profile_pic && (
                    <img
                      className="mx-auto w-8 h-8 rounded-full"
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${user.profile_pic}`}
                      alt=""
                    />
                  )}
                </td>
                <td className="text-center border py-1 px-2 whitespace-nowrap">
                  {user.name && user.name}
                </td>
                <td className="text-center border py-1 px-2 whitespace-nowrap">
                  {user.email && user.email}
                </td>
                <td className="text-center border py-1 px-2 whitespace-nowrap">
                  {user.role && user.role}
                </td>
                <td className="text-center border py-1 px-2 whitespace-nowrap">
                  {user.scope && user.scope}
                </td>
                <td className="text-center border py-1 px-2 whitespace-nowrap">
                  {user.verifyed && user.verifyed ? "verifyed" : "none"}
                </td>
                <td className="text-center border py-1 px-2 whitespace-nowrap">
                  {user.createdAt && new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="text-center border py-1 px-2 whitespace-nowrap">
                  <Link href={`/admin/dashboard/users/edit/${user._id}`}>
                    <a>
                      <button
                        className=" my-1 bg-orange-300 capitalize py-1 px-2 mx-1 rounded-md"
                        type="button"
                      >
                        edit
                      </button>
                    </a>
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className=" my-1 bg-red-400 text-white capitalize py-1 px-2 mx-1 rounded-md"
                    type="button"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
