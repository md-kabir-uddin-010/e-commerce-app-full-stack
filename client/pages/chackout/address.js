import React, { useEffect, useState } from "react";
import addressValidator from "../../components/utils/adderessValidator";

export default function Address() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
    post_code: "",
  });
  const [touched, setTouched] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const isValid = addressValidator(values);
  useEffect(() => {}, []);

  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleBluer = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (Object.keys(isValid).length === 0) {
      console.log(values);
    }
  };
  return (
    <div className=" w-full h-screen dark:on-dark">
      <form
        className=" w-full px-1 sm:w-[500px] sm:mx-auto md:w-[600px] md:pt-4"
        onSubmit={handleSubmit}
      >
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
            onChange={handleInput}
            onBlur={handleBluer}
          />
          <p className=" text-red-500">
            {(touched.name && isValid?.name) || (isSubmit && isValid?.name)}
          </p>
        </div>
        <div className=" my-2">
          <label className=" capitalize block" htmlFor="phone">
            phone
          </label>
          <input
            className=" w-full my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md "
            type="number"
            name="phone"
            id="phone"
            placeholder="01712345678"
            value={values.phone}
            onChange={handleInput}
            onBlur={handleBluer}
          />
          <p className=" text-red-500">
            {(touched.phone && isValid?.phone) || (isSubmit && isValid?.phone)}
          </p>
        </div>
        <div className=" my-2">
          <label className=" capitalize block" htmlFor="post_code">
            post code
          </label>
          <input
            className=" w-full my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md "
            type="number"
            name="post_code"
            id="post_code"
            placeholder="1234"
            value={values.post_code}
            onChange={handleInput}
            onBlur={handleBluer}
          />
          <p className=" text-red-500">
            {(touched.post_code && isValid?.post_code) ||
              (isSubmit && isValid?.post_code)}
          </p>
        </div>
        <div className=" my-2">
          <label className=" capitalize block" htmlFor="address">
            address
          </label>
          <textarea
            className=" w-full h-60 my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md resize-none"
            name="address"
            id="address"
            placeholder="Dhaka,Bangladesh"
            value={values.address}
            onChange={handleInput}
            onBlur={handleBluer}
          ></textarea>
          <p className=" text-red-500">
            {(touched.address && isValid?.address) ||
              (isSubmit && isValid?.address)}
          </p>
        </div>

        <div className=" text-center mt-2">
          <input
            className=" bg-indigo-600 text-white my-2 py-1 px-4 rounded-md"
            type="submit"
            value="Order"
          />
        </div>
      </form>
    </div>
  );
}
