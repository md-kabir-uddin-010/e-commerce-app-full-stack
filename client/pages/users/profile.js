import Cookies from "js-cookie";
import React from "react";

export default function Profile() {
  const data = JSON.parse(Cookies.get("info"));
  console.log(data);
  return <div className=" w-full h-screen dark:on-dark">Profile</div>;
}
