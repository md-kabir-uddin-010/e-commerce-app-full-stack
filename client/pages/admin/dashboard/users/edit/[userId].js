import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import adminInterceptor from "../../../../../axios/adminInterceptor";
import DashboardLayout from "../../../../../components/layout/DashboardLayout";
import editUserValidato from "../../../../../components/utils/editUserValidato";

export default function EditUser() {
  const router = useRouter();
  const { userId } = router.query;

  const [values, setValues] = useState({
    name: "",
    email: "",
    role: "user",
    verifyed: false,
  });
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [visited, setVisited] = useState({});
  let errors = editUserValidato(values);

  const getUserById = async (id) => {
    try {
      const { data } = await adminInterceptor.get(`/api/v1/admin/user/${id}`);
      setUser(data.info);
      setValues({
        ...values,

        name: data.info.name,
        email: data.info.email,
        role: data.info.role,
        verifyed: data.info.verifyed,
      });
    } catch (error) {
      setUser({});
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("admin_refresh_token");
    if (!token) {
      router.push("/admin/dashboard/login");
      return;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    userId && getUserById(userId);
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "verifyed") {
      setValues({
        ...values,
        [e.target.name]: e.target.checked,
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleBlur = (e) => {
    setVisited({
      ...visited,
      [e.target.name]: true,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("verifyed", values.verifyed);
      formData.set("role", values.role);
      if (image) {
        formData.append("profile_pic", image);
      }
      if (Object.keys(errors).length === 0) {
        const { data } = await adminInterceptor.put(
          `/api/v1/admin/edit/user/${userId}`,
          formData
        );
        toast.success(data.message);
      }
    } catch (error) {
      if (error?.response.status === 406) {
        toast.error(error.response.data.errors.message);
      } else if (error?.response.status === 409) {
        toast.error(error.response.data.errors.message);
      } else if (error?.response.status === 422) {
        toast.error(error.response.data.errors.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleImage = (e) => {
    let img = e.target.files[0];
    setImage(img);
    if (img) {
      setImageURL(URL.createObjectURL(img));
    }
  };

  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <DashboardLayout>
      <div className=" w-full">
        <ToastContainer />
        <form
          className="w-full sm:w-96 sm:max-w-2xl sm:mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="">
            <div className="">
              {user && !imageURL && (
                <img
                  className=" w-40 h-40 mx-auto object-cover rounded-full"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/profiles/${user.profile_pic}`}
                  alt="no image found"
                />
              )}
            </div>
            <div className=" my-3">
              <p className=" capitalize">profile picture</p>
              {imageURL && (
                <img
                  className=" w-40 h-40 mx-auto object-cover rounded-full"
                  src={imageURL}
                  alt="no image select"
                />
              )}
            </div>
            <input
              className=" file:bg-indigo-500 file:text-white file:py-1 file:px-2 file:border-none file:rounded-md"
              type="file"
              onChange={handleImage}
            />
          </div>
          <div className=" mx-2">
            <div className=" my-2">
              <label className=" capitalize block" htmlFor="name">
                name
              </label>
              <input
                className=" w-full my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md "
                type="text"
                name="name"
                id="name"
                placeholder="sk kabir islam"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {visited.name && errors.name && (
                <p className=" text-red-400">{errors.name}</p>
              )}
            </div>
            <div className=" my-2">
              <label className=" capitalize block" htmlFor="email">
                email
              </label>
              <input
                className=" w-full my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md "
                type="email"
                name="email"
                id="email"
                placeholder="skkabirislam@gmail.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                readOnly
              />
              {visited.email && errors.email && (
                <p className=" text-red-400">{errors.email}</p>
              )}
            </div>
            <div className="">
              <p className=" capitalize">user role</p>
              <select
                className=" w-52 py-1 px-2 capitalize outline-none border rounded-md"
                name="role"
                id="role"
                value={values.role}
                onChange={handleChange}
              >
                <option value="user">user</option>
                <option value="manager">manager</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
          <div className=" mx-2">
            <div className="">
              <p className=" capitalize">user verify</p>
              <input
                type="checkbox"
                name="verifyed"
                id="verifyed"
                checked={values.verifyed}
                onChange={handleChange}
              />
              <label htmlFor="verifyed" className=" ml-1 capitalize">
                verify
              </label>
            </div>
          </div>

          <div className=" text-center my-4">
            <input
              className=" cursor-pointer py-1 px-2 capitalize bg-indigo-500 text-white rounded-md"
              type="submit"
              value="update"
            />
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

EditUser.getLayout = (page) => <>{page}</>;
