import React from "react";

export default function Select({ name, value, handleInput }) {
  return (
    <div className=" my-2">
      <label className="capitalize block" htmlFor={name}>
        currency format
      </label>
      <select
        className=" cursor-pointer  w-40 border outline-none dark:on-dark rounded-md"
        name={name}
        id={name}
        value={value}
        onChange={handleInput}
      >
        <option value="$">Us-$</option>
        <option value="৳">Us-৳</option>
      </select>
    </div>
  );
}
