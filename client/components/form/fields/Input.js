import React from "react";

export default function TextInput({
  title,
  type,
  name,
  placeholder,
  value,
  handleInput,
}) {
  return (
    <div className=" my-2">
      <label className=" capitalize block" htmlFor={title}>
        {title}
      </label>
      <input
        className=" w-full my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md "
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
      />
    </div>
  );
}
