import React from "react";

export default function Chackbox({
  upper,
  label,
  name,
  value,
  checked,
  handleInput,
}) {
  return (
    <div className="my-2 mr-2">
      <input
        className=" cursor-pointer "
        type="checkbox"
        name={name}
        id={name}
        value={value}
        checked={checked}
        onChange={handleInput}
      />
      <label
        className={
          upper === false
            ? "ml-1 capitalize  cursor-pointer "
            : "ml-1  uppercase  cursor-pointer "
        }
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}
