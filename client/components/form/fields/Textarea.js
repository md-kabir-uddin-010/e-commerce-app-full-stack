import React from "react";

export default function Textarea({
  title,
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
      <textarea
        className=" w-full h-60 my-1 py-1 px-2 border outline-none dark:border-gray-500 dark:bg-transparent rounded-md resize-none"
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
      ></textarea>
    </div>
  );
}
