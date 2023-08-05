import React from "react";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className=" text-center py-4 dark:on-dark">
      <p>Copyright 2020 - {date}</p>
    </div>
  );
}
