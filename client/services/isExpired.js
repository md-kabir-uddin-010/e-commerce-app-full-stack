import decode from "jwt-decode";

function isExpired(token) {
  const expirationDate = token && decode(token).exp;
  const currentDate = new Date().getTime() / 1000;
  return currentDate >= expirationDate;
}

export default isExpired;
