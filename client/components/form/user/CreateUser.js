import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import adminInterceptor from "../../../axios/adminInterceptor";
import validator from "../../utils/Validator_user";

export default function CreateUser({ modal, setModal }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "user",
    verifyed: false,
  });
  const [loading, setLoading] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [visited, setVisited] = useState({});
  const router = useRouter();
  let errors = validator(values);

  useEffect(() => {
    const token = localStorage.getItem("admin_refresh_token");
    if (!token) {
      router.push("/admin/dashboard/login");
      return;
    }
    setLoading(false);
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
      formData.set("email", values.email);
      formData.set("password", values.password);
      formData.set("verifyed", values.verifyed);
      formData.set("role", values.role);
      if (image) {
        formData.append("profile_pic", image);
      }
      if (Object.keys(errors).length === 0) {
        const { data } = await adminInterceptor.post(
          "/api/v1/admin/create/user",
          formData
        );
        toast.success(data.message);
        setModal(!modal);
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
    <div className=" w-full">
      <ToastContainer />
      <form
        className="lg:w-full lg:grid lg:grid-cols-3"
        onSubmit={handleSubmit}
      >
        <div className="">
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
              required
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
            </select>
          </div>
        </div>
        <div className=" mx-2">
          <div className=" relative">
            <button
              onClick={() => setShowPass(!showPass)}
              className=" absolute top-7 right-2 capitalize py-1 px-2 outline-none"
              type="button"
            >
              {showPass ? "hide" : "show"}
            </button>
            <label className=" capitalize block" htmlFor="password">
              password
            </label>
            <input
              className=" w-full my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md "
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              placeholder="******"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {visited.password && errors.password && (
              <p className=" text-red-400">{errors.password}</p>
            )}
          </div>
          <div className=" my-2">
            <div className="">
              <label className=" capitalize block" htmlFor="password2">
                confirm password
              </label>
              <input
                className=" w-full my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md "
                type={showPass ? "text" : "password"}
                name="password2"
                id="password2"
                placeholder="******"
                value={values.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {visited.password2 && errors.password2 && (
                <p className=" text-red-400">{errors.password2}</p>
              )}
            </div>
          </div>
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
            value="create user"
          />
        </div>
      </form>
    </div>
  );
}
